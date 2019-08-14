<template>
  <div class="flex side_sdx ivuInput-box">
	<!--头部信息-->
	<div class="H_t flex side_sdx mainAlign_center">
		<div>销售代表管理</div>
		<div>
			<router-link class="colorCCC" to="/supplierManagementList">销售代表管理</router-link>&nbsp;&nbsp; /&nbsp;&nbsp;
			<router-link class="colorCCC blod" to="/supplierManagementList">销售代表管理列表</router-link>
		</div>
	</div>
    
    <div class="list">
		<!-- 搜索区域 -->
		<div class="search_box">
			<Form :model="queryData" ref="queryData" label-position="right" inline>
				<FormItem prop="providerName">
					<Input :style="input_width" icon="ios-search" v-model="queryData.shopName" placeholder="店铺名称"></Input>
				</FormItem>
				<FormItem>
					<Button type="primary" @click="getList()" class="">搜索</Button>
					<Button type="primary" @click="clearVal()" class="mar_l20">清空</Button>
				</FormItem>
				<div class="clearfix">
					<Button type="primary" @click="add()">新增销售代表</Button>
				</div>
			</Form>
		</div>
		<!-- 信息列表 -->
		<div class="list_data_h flex main_zdy mainAlign_around">
					<div>序号</div>
					<div>店铺名称</div>
					<div>销售代表名称</div>
					<div>联系地址</div>
					<div>联系人</div>
					<div>联系电话</div>
					<div>客服电话</div>
					<div>商品数量</div>
					<div>负责人手机号</div>
					<div>创建时间</div>
					<div>操作</div>
				</div>
				<!--数据列表-->
				<div v-if="dataList.length==0" class="nolist">暂无数据</div>
				<div v-else class="list_data_c flex main_zdy mainAlign_around" v-for='(item,index) in dataList' :key='index'> 
					<div>{{item.indexs}}</div>
					<div :title="item.name">{{item.name}}</div>
					<div :title="item.contactName">{{item.contactName}}</div>
					<div :title="item.addressDetail">{{item.addressDetail}}</div>
					<div>{{item.contactName}}</div>
					<div>{{item.contactPhoneNum}}</div>
					<div>{{item.servicePhoneNum}}</div>
					<div>{{item.nature}}</div>
					<div>{{item.clerkHeadPhoneNum}}</div>
					<div>{{item.createTime}}</div>
					<div>
						<Button class="warning" size="small" @click="edit(item.id,item)">编辑</Button>
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
		queryData: {
			shopName: null,
		},
		// columns: [
		// 	{
		// 		title: "序号",
		// 		key: "index",
		// 		align: "center",
		// 		fixed: "left",
		// 		width: 80,
		// 		render: (h, params) => {
		// 		let index =
		// 			(this.Page.current - 1) * this.Page.pageSize + (params.index + 1);
		// 		return h("div", [h("p", index)]);
		// 		}
		// 	},
		// 	{
		// 		title: "店铺名称",
		// 		key: "name",
		// 		width: 200,
		// 		align: "center"
		// 	},
		// 	{
		// 		title: "销售代表名称",
		// 		key: "contactName",
		// 		align: "center",
		// 		width: 200,
		// 	},
		// 	{
		// 		title: "联系地址",
		// 		key: "addressDetail",
		// 		width: 200,
		// 		align: "center"
		// 	},
		// 	{
		// 		title: "联系人",
		// 		key: "contactName",
		// 		width: 160,
		// 		align: "center"
		// 	},
		// 	{
		// 		title: "联系电话",
		// 		key: "contactPhoneNum",
		// 		width: 160,
		// 		align: "center"
		// 	},
		// 	{
		// 		title: "客服电话",
		// 		key: "servicePhoneNum",
		// 		width: 160,
		// 		align: "center"
		// 	},        
		// 	{
		// 		title: "商品数量",
		// 		key: "nature",
		// 		width: 150,
		// 		align: "center"
		// 	},
		// 	{
		// 		title: "负责人手机号",
		// 		key: "clerkHeadPhoneNum",
		// 		width: 200,
		// 		align: "center"
		// 	},
		// 	{
		// 		title: "创建时间",
		// 		key: "createTime",
		// 		width: 150,
		// 		align: "center",
		// 		render: (h, params) => {
		// 			return h('div', [
		// 				h('span', moment(params.row.providerCreateTime).format('YYYY-MM-DD HH:mm:ss')),
		// 			]);
		// 		}
		// 	},
		// 	{
		// 		title: "操作",
		// 		key: "action",
		// 		align: "center",
		// 		fixed: "right",
		// 		width: 170,
		// 		render: (h, params) => {
		// 			return h('div', [
		// 				h('Button', {
		// 					props: {
		// 						type: 'primary',
		// 						size: 'small',
		// 					},
		// 					style: {
		// 						marginRight: '5px'
		// 					},
		// 					on: {
		// 						click: () => {
		// 							this.$router.push({ path: "/supplierUpdate", query: { id: params.row.id , data: params.row} })
		// 						}
		// 					}
		// 				 }, '编辑'),
		// 				h('Button', {
		// 					props: {
		// 						type: 'primary',
		// 						size: 'small'
		// 					},
		// 					style: {
		// 						marginRight: '5px'
		// 					},
		// 					on: {
		// 						click: () => {
		// 							this.$router.push({ path: "/supplierDetail", query: { id: params.row.id , data: params.row} })
		// 						}
		// 					}
		// 				}, '查看'),
		// 				h('Button', {
		// 				props: {
		// 					type: 'primary',
		// 					size: 'small'
		// 				},
		// 				on: {
		// 					click: () => {
		// 						alert("删除")
		// 						// 调用删除接口
		// 						this.del(params.row.id)
		// 					}
		// 				}
		// 			}, '删除')
		// 			]);
		// 		}
		// 	}
		// ],
		dataList: [],
      	//分页
		Page: {
			total: 0,
			pageSize: 10,
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
			var URL=''
			if(this.queryData.shopName){
				URL="/shop/queryShopByNameLike"
			}else{
				URL="/shop/queryShopList"
			}
			const params = {
				...this.queryData,
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
	  	this.$APIMy(
        "post",
				// "/shop/queryShopList",
				URL,
        data,
        this.userid,
        this.token,
        res => {
					console.log(res)
					
				  var	data = res.data.data.list;
					var aa=''
					var indexs=''
					for(var i=0;i<data.length;i++){
						aa=moment(data[i].createTime).format('YYYY-MM-DD HH:mm:ss')
						indexs=	(this.Page.current - 1) * this.Page.pageSize + (i+ 1);
						data[i].createTime=aa
						data[i].indexs=indexs
						this.dataList=data
					}
					this.Page.total = res.data.data.total;
					// console.log(this.Page.total)
        }
			);
	},
	// 新增销售代表
	add(){
		this.$router.push({ path: '/supplierAdd' })
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
		this.$router.push({ path: "/supplierUpdate", query: { id:id , data:item} })
	},
	//查看
	See(id,item){
		this.$router.push({ path: "/supplierDetail", query: { id:id , data:item} })
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
	.list_data_h div:nth-child(1){
			width: 40%;
	}
	.list_data_h div:nth-child(11){
			width: 160%;
	}
	.list_data_c:nth-child(odd) {
		background: #fff;
		box-sizing: border-box;
	}
	
	.list_data_c:nth-child(even) {
		background: #f9f9f9;
		box-sizing: border-box;
	}
	
	.list_data_c div {
		width: 100%;
		height: 44px;
		text-align: center;
		line-height: 44px;
		border: 1px solid #E7EAEC;
		font-size: 14px;
		font-family: PingFangSC-Regular;
		font-weight: 400;
		color: #686A6C;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.list_data_c div:nth-child(1){
			width: 40%;
	}
	.list_data_c div:nth-child(11){
			width: 160%;
	}
	/* .list_data_c:hover{
		background-color: #000;
	} */
	.list_data_b {
		margin-top: 12px;
		padding-bottom: 10px;
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