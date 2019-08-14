<template>
  <div class="flex side_sdx ivuInput-box">
	<!--头部信息-->
	<div class="H_t flex side_sdx mainAlign_center">
		<div>商城频道配置</div>
		<div>
			<router-link class="colorCCC" to="/supplierManagementList">首页</router-link>&nbsp;&nbsp; /&nbsp;&nbsp;
			<router-link class="colorCCC blod" to="/supplierManagementList">商城频道配置</router-link>
		</div>
	</div>
    
    <div class="list">
		<!-- 搜索区域 -->
		<div class="search_box">
				<div class="clearfix">
					<Button type="primary" @click="add()">新增频道</Button>
				</div>
		</div>
		<!-- 信息列表 -->
		<div class="list_data_h flex main_zdy mainAlign_around">
					<div>频道名称</div>
					<div>所在行ID</div>
					<div>顺序</div>
					<div>说明</div>
					<div>图片</div>
					<div>课程/商品数量</div>
					<div>状态</div>
					<div>操作</div>
				</div>
				<!--数据列表-->
				<div v-if="!dataList" class="nolist">暂无数据</div>
				<div v-else class="list_data_c flex main_zdy mainAlign_around" v-for='(item,index) in dataList' :key='index'> 
					<div :title="item.name">{{item.name}}</div>
					<div>{{item.rowNum}}</div>
					<div>{{item.columnNum}}</div>
					<div :title="item.channelExplain">{{item.channelExplain}}</div>
					<div><img :src="item.displayPic" alt=""></div>
					<div>{{item.channelGoodsVOs.length}}</div>
					<div>
						<span v-if="item.status==0">待启用</span>
						<span v-if="item.status==1">启用中</span>
						<span v-if="item.status==2">已过期</span>
					</div>
					<div>
						<Button class="warning" size="small" @click="edit(item.id)">编辑</Button>
						<Button class="warning" size="small" @click="See(item.id,item)">查看</Button>
						<!-- <Button type="primary" size="small" @click="del(item.id)">删除</Button> -->
					</div>
				
				</div>
			<!-- </div> -->

		<!-- table表格 -->

		<div class="list_data">
			<!-- <Table border stripe :columns="columns" :data="dataList"></Table> -->
			<div class="list_data_b flex main_ydz">
				<Page :total="Page.total" :page-size="Page.pageSize" :current="Page.current"  @on-change="pageChange"></Page>
			</div>	
		</div>	
  	</div>

  </div>
</template>
<script>
import moment from 'moment'
export default {
data() {
	return {
		input_width: 'width: 250px',
		selectStyle: "width: 170px",
		userid: "",
		token: "",
		dataList: [],
      	//分页
		Page: {
			total: 0,
			pageSize: 5,
			current: 1
		},
	};
  },
  created() {
    this.userid = localStorage.getItem("userid");
    this.token = localStorage.getItem("token");
		this.getList();
  },
  methods: {
    //获取列表数据
    getList() {
			// var URL='/channel/queryAll'
			// if(this.queryData.shopName){
			// 	URL="/shop/queryShopByNameLike"
			// }else{
			// 	URL="/shop/queryShopList"
			// }
			const params = {
				// ...this.queryData,
				pageNum:  this.Page.current,
				pageSize: this.Page.pageSize,
			};
			var data = "";
      for (var i in params) {
        data +=
          encodeURIComponent(i) + "=" + encodeURIComponent(params[i]) + "&";
      }
      data = data.slice(0, -1);
			console.log(params)
	  	this.$API(
        "post",
		"channel/queryAll",
        data,
        this.userid,
        this.token,
        res => {
					console.log(res.data.data.list)
					
				  this.dataList = res.data.data.list;
					this.Page.total = res.data.data.total;
					// console.log(this.Page.total)
        }
			);
	},
	// 新增销售代表
	add(){
		this.$router.push({ path: '/MallChannelAdd' })
	},
	// 删除
	del(id){
		this.$APIMy(
			"post",
			"provider/deleteProvider",
			{id: id},
			this.userid,
			this.token,
			res => {
				this.$Message.success("删除成功")
			},
			res =>{
				this.$Message.warning(res.data.message)
			},
			res =>{
				this.$Message.error(res.data.message)
			}
		);
		this.getList()
	},
	// 清空
    clearVal() {
      this.$refs.queryData.resetFields();
			this.Page.current = 1;
			this.queryData.shopName=''
      this.getList();
    },
    // 分页操作
    pageChange(e) {
		// console.log(e)
		this.Page.current = e;
		this.getList();
	},
	//编辑
	edit(id,item){
		this.$router.push({ path: "/MallChannelUpdate", query: { id:id} })
	},
	//查看
	See(id,item){
		this.$router.push({ path: "/MallChannelDetails", query: { id:id , data:item} })
	},
	//切换停启用接口
	Discontinuation(e){

	},
	//搜索
	// search() {
	// 	this.dataList=[]
	// 		const params = {
	// 			...this.queryData,
	// 			pageNum:  this.Page.current,
	// 			pageSize: this.Page.pageSize,
	// 		};
	// 		var data = "";
  //     for (var i in params) {
  //       data +=
  //         encodeURIComponent(i) + "=" + encodeURIComponent(params[i]) + "&";
  //     }
  //     data = data.slice(0, -1);
	// 		console.log(params)
	//   	this.$APIMy(
  //       "post",
	// 			// "provider/selectProvider",
	// 			"/shop/queryShopByNameLike",
  //       data,
  //       this.userid,
  //       this.token,
  //       res => {
	// 				if(res.data.data.list.length != undefined){
	// 					console.log(res.data.data)
	// 					this.dataList = res.data.data.list;
	// 					this.Page.total = res.data.data.total;
	// 				}else{
	// 					let list = [];
	// 					list.push(res.data.data);
	// 					this.dataList = list;
	// 					this.Page.total = 0;
	// 				}
	// 				// this.dataList = res.data。data;
	// 				// console.log(this.dataList)
  //       }
	// 		);
	// },
  }
};
</script>

<style scoped="scoped">
.H_t {
  height: 70px;
  background: #fff;
  padding-left: 20px;
  border-bottom: 2px solid #e7eaec;
}

.H_t div:nth-child(1) {
  height: 16px;
  font-size: 16px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: #686a6c;
  line-height: 16px;
}

.H_t div:nth-child(2) {
  height: 14px;
  font-size: 14px;
  line-height: 14px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: #686a6c;
  margin-top: 10px;
}

.H_t div:nth-child(2) span {
  color: #686a6c;
}
.list_data_b {
		margin-top: 12px;
		padding-bottom: 10px;
	}
.list {
  background: #fff;
  margin: 20px 20px 0 20px;
  padding: 0 20px;
}

.list_data {
  padding-top: 20px;
}

.colorCCC {
  color: #686a6c;
}

.blod {
  font-weight: bold;
}

.search_box {
  margin: 30px 0 10px 0;
}

.ivuInput-box .ivu-input {
  width: 100% !important;
}
/* 修改 */
.list_h_btn {
		width: 120px;
		height: 40px;
		text-align: center;
		line-height: 40px;
		color: #565656;
		font-size: 16px;
		font-family: PingFangSC-Medium;
		font-weight: bold;
		border: none;
		outline: none;
		background: #F3F3F4;
	}
	
	.list_h_btnon {
		width: 120px;
		height: 42px;
		text-align: center;
		line-height: 40px;
		color: #51B095;
		font-size: 16px;
		font-family: PingFangSC-Medium;
		font-weight: bold;
		border: none;
		outline: none;
		background: #fff;
		border-top: 1px solid #E7EAEC;
		/*border-left: 1px solid #E7EAEC;*/
		border-right: 1px solid #E7EAEC;
		border-bottom: 1px solid #fff;
		border-radius:4px 4px 0 0 ;
	}
	
	.list_data {
		padding-top: 20px;
	}
	
	.list_data_h {
		background: #F3F3F4;
		box-sizing: border-box;
	}
	
.list_data_h div {
		width: 100%;
		height: 44px;
		text-align: center;
		line-height: 44px;
		border: 1px solid #DDDDDD;
		font-size: 14px;
		font-family: PingFangSC-Medium;
		font-weight: bold;
		color: #686A6C;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	/* .list_data_h div:nth-child(1){
			width: 40%;
	}
	.list_data_h div:nth-child(11){
			width: 160%;
	} */
	/* .list_data_c:nth-child(odd) {
		background: #f9f9f9;
		box-sizing: border-box;
	}
	
	.list_data_c:nth-child(even) {
		background: #fff;
		box-sizing: border-box;
	} */
	
	.list_data_c div {
		width: 100%;
		height: 120px;
		text-align: center;
		line-height: 120px;
		border: 1px solid #E7EAEC;
		font-size: 14px;
		font-family: PingFangSC-Regular;
		font-weight: 400;
		color: #686A6C;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		padding: 10px 0px;
	}
	.list_data_c div img{
		width: 50px;
		height: auto;
	}
	.list_data_c div img{
			width: 100px;
			height: 100px;
	}
	/* .list_data_c div:nth-child(11){
			width: 160%;
	} */
	/* .list_data_c:hover{
		background-color: #000;
	} */
	.list_data_b {
		margin-top: 12px;
		padding-bottom: 10px;
	}
	.list_data_c:nth-child(odd) {
		background: #fff;
		box-sizing: border-box;
	}
	
	.list_data_c:nth-child(even) {
		background: #f9f9f9;
		box-sizing: border-box;
	}
	.nolist{
		width: 100%;
		height: 50px;
		text-align: center;
		line-height: 50px;
		font-size: 16px;
	}
	.warning{
		width: 54px;
		height: 24px;
		line-height: 22px;
		color: #fff;
		font-size: 14px;
		font-family: PingFangSC-Regular;
		font-weight: 400;
		border-radius: 4px;
		background: #EEAF68;
		border: none;
		outline: none;
		cursor: pointer;
	}
	.list_data_c:hover{
        background-color: #f5f5f5;
    }
</style>