<template>
  <div class="flex side_sdx ivuInput-box">
	<!--头部信息-->
	<div class="H_t flex side_sdx mainAlign_center">
		<div>自营订单管理</div>
		<div>
			<router-link class="colorCCC" to="/proprietaryOrdersList">自营订单管理</router-link>&nbsp;&nbsp; /&nbsp;&nbsp;
			<router-link class="colorCCC blod" to="/proprietaryOrdersList">自营订单管理列表</router-link>
		</div>
	</div>
    
    <div class="list">
		<!-- 搜索区域 -->
		<div class="search_box">
			<Form :model="queryData" ref="queryData" label-position="right" inline>
				<FormItem prop="searchName">
					<Input :style="input_width" icon="ios-search"  v-model="queryData.searchName" placeholder="请输入订单编号、店铺名称"></Input>
				</FormItem>

				<FormItem label="创建时间：" prop="startTime" :label-width="110">
					<DatePicker type="date" placeholder="起始时间" :style="selectStyle" @on-change="createChange" v-model="queryData.startTime"></DatePicker>
				</FormItem>

				<FormItem :label-width="15" label="-" prop="endTime">
					<DatePicker type="date" placeholder="截止时间" :style="selectStyle" @on-change="TransactionChange" v-model="queryData.endTime"></DatePicker>
				</FormItem>

				<FormItem label="状态：" prop="orderStatus" :label-width="80">
					<Select placeholder="请选择" v-model="queryData.orderStatus" :style="selectStyle">
						<Option :value="item.value" v-for="(item,i) in orderTypeList" :key="i">{{item.label}}</Option>
					</Select>
				</FormItem>
				<div class="clearfix search">
					<Button type="primary" @click="clearVal()" class="fr mar_l20">清空</Button>
					<Button type="primary" @click="getList()" class="fr">搜索</Button>
				</div>
			</Form>
		</div>
			<!-- 信息列表 -->
		<div class="list_data_h flex main_zdy mainAlign_around">
					<div>序号</div>
					<div>订单编号</div>
					<div>店铺名称</div>
					<div>收件人</div>
					<div>联系电话</div>
					<div>收货地址</div>
					<div>商品名称及价格</div>
					<div>合计价格</div>
					<div>创建时间</div>
					<div>付款时间</div>
					<div>状态</div>
					<div>操作</div>
				</div>
				<!--数据列表-->
				<div v-if="dataList.length==0" class="nolist">暂无数据</div>
				<div v-else class="list_data_c flex main_zdy mainAlign_around" v-for='(item,index) in dataList' :key='index'> 
					<div class="lineH">{{item.indexs}}</div>
					<div class="lineH" :title="item.orderId">{{item.orderId}}</div>
					<div class="lineH">{{item.shopName}}</div>
					<div class="lineH">{{item.address.realName}}</div>
					<div class="lineH">{{item.address.phoneNum}}</div>
					<div class="lineH" :title="item.address.fullAddress">{{item.address.fullAddress}}</div>
					<!-- <div class="lineH">{{item.address.realName}}</div>
					<div class="lineH">{{item.address.phoneNum}}</div>
					<div class="lineH">
						{{item.address.fullAddress}}
					</div> -->
					<div class="textL">
						<div class="ordername" :title="item.orderGoodsList[0].goodsName">
								{{item.orderGoodsList[0].goodsName}}
						</div>
						<div class="ordername">
							{{item.orderGoodsList[0].goodsAmount}} 
						</div>
						 
					</div>
					<div class="lineH">{{item.orderTotalAmount}}</div>
					<div class="lineH">{{item.createTime}}</div>
					<div class="lineH">{{item.paymentTime}}</div>
					<div class="lineH">
						<div v-if="item.orderStatus==1">待付款</div>
						<div v-if="item.orderStatus==2">待发货</div>
						<div v-if="item.orderStatus==3">待收货</div>
						<div v-if="item.orderStatus==4">交易成功</div>
						<div v-if="item.orderStatus==5">交易关闭</div>
					</div>
					<div class="lineH">
						<a  style="color:#52B095" @click="See(item.orderId,item)">查看</a>
					</div>
				
			</div>
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
		input_width: 'width: 200px',
		selectStyle: "width: 170px",
		userid: "",
		token: "",
		queryData: {
			searchName: "",
			startTime: "",
			endTime: "",
			orderStatus: "",
		},
		orderTypeList: [
			{
				value: "1",
				label:"待付款"
			},
			{
				value: "2",
				label:"待发货"
			},
			{
				value: "3",
				label:"待收货"
			},
			{
				value: "4",
				label:"交易成功"
			},
			{
				value: "5",
				label:"交易关闭"
			}
		], // 状态列表
		columns: [
			{
				title: "序号",
				key: "index",
				align: "center",
				fixed: "left",
				width: 80,
				render: (h, params) => {
				let index =
					(this.Page.current - 1) * this.Page.pageSize + (params.index + 1);
				return h("div", [h("p", index)]);
				}
			},
			{
				title: "订单编号",
				key: "orderId",
				align: "center",
				width: 180,
			},
			{
				title: "销售代表",
				key: "storeName",
				width: 120,
				align: "center"
			},
			{
				title: "收件人",
				key: "realName",
				width: 120,
				align: "center"
			},
			{
				title: "联系电话",
				key: "phoneNum",
				width: 120,
				align: "center"
			},
			{
				title: "收货地址",
				key: "address",
				width: 250,
				align: "center",
				render: (h, params) => {
					if(params.row.provinceAreaName == params.row.cityAreaName){
						return h('div', [
							h('span', {}, params.row.cityAreaName),
							h('span', {}, params.row.districtAreaName),
							h('span', {}, params.row.address),
						]);
					}else {
						return h('div', [
							h('span', {}, params.row.provinceAreaName),
							h('span', {}, params.row.cityAreaName),
							h('span', {}, params.row.districtAreaName),
							h('span', {}, params.row.address),
						]);
					}
				}
			},        
			{
				title: "商品名称及价格",
				key: "goodsName",
				width: 150,
				align: "center",
			},
			{
				title: "合计价格",
				key: "orderTotalPriceYuan",
				width: 100,
				align: "center"
			},
			{
				title: "创建时间",
				key: "createTime",
				width: 150,
				align: "center",
				render: (h, params) => {
					return h('div', [
						h('span', moment(params.row.createTime).format('YYYY-MM-DD HH:mm:ss')),
					]);
				}
			},
			{
				title: "付款时间",
				key: "paymentTime",
				width: 150,
				align: "center",
				render: (h, params) => {
					return h('div', [
						h('span', moment(params.row.paymentTime).format('YYYY-MM-DD HH:mm:ss')),
					]);
				}
			},
			{
				title: "状态",
				key: "orderStatus",
				width: 100,
				align: "center",
				render: (h, params) => {
					const status = params.row.orderStatus;
					if(status == 1){
						return h('div', [h('span',"待付款"),]);
					}
					else if(status == 2){
						return h('div', [h('span',"待发货"),]);
					}
					else if(status == 3){
						return h('div', [h('span',"待收货"),]);
					}
					else if(status == 4){
						return h('div', [h('span',"交易成功"),]);
					}
					else if(status == 5){
						return h('div', [h('span',"交易关闭"),]);
					}
				}
			},
			{
				title: "操作",
				key: "action",
				align: "center",
				fixed: "right",
				width: 100,
				render: (h, params) => {

					return h('div', [
						h('a', {
							style: {
								color: 'rgba(82, 176, 149, 1)'
							},
							on: {
								click: () => {
										//console.log(params.row.id)
										this.$router.push({ path: '/proprietaryOrderDetail' ,query: { id: params.row.id, data: params.row }})
								}
							}
						}, '查看')
						
					]);
				}
			}
		],
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
		// 开始时间
		createChange(daterange) {
				this.queryData.startTime = daterange
		},
		// 结束时间
		TransactionChange(daterange) {
				console.log(daterange)
				this.queryData.endTime = daterange
		},
    //获取列表数据
    getList() {
			console.log(this.queryData)
			const params = {
				...this.queryData,
				pageNum:  this.Page.current,
				pageSize: this.Page.pageSize,
			};
			console.log(params)
			var data = "";
      for (var i in params) {
        data += encodeURIComponent(i) + "=" + encodeURIComponent(params[i]) + "&";
      }
			data = data.slice(0, -1);
			this.$APIMy(
        		"post",
				// "order/queryPlatformOrder",
				"order/queryAllOrders",
				data,
				this.userid,
				this.token,
				res => {
					console.log(res.data.data);
					var	data = res.data.data.list;
					var aa=''
					var bb=""
					var indexs=''
					for(var i=0;i<data.length;i++){
						aa=moment(data[i].createTime).format('YYYY-MM-DD HH:mm:ss')
						bb=moment(data[i].paymentTime).format('YYYY-MM-DD HH:mm:ss')
						indexs=	(this.Page.current - 1) * this.Page.pageSize + (i+ 1);
						data[i].createTime=aa
						data[i].paymentTime=bb
						data[i].indexs=indexs
						this.dataList=data
					}
					// this.dataList = res.data.data.goodsList;
					this.Page.total = res.data.data.total;
				},
				res =>{
          this.$Message.warning(res.data.message)
        },
        res =>{
          this.$Message.error(res.data.message)
        }
			);	
	},
	// 清空
    clearVal() {
      this.$refs.queryData.resetFields();
      this.Page.current = 1;
      this.getList();
    },
    // 分页操作
    pageChange(e) {
			//console.log(e)
			this.Page.current = e;
			this.getList();
		},
		See(Id,item){
			console.log(Id)
			this.$router.push({ path: '/proprietaryOrderDetail' ,query: { id:Id, data:item }})
		},
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
.list_data_b {
		margin-top: 12px;
		padding-bottom: 10px;
	}

.H_t div:nth-child(2) span {
	color: #686a6c;
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
  margin: 30px 0 30px 0;
}
.ivuInput-box .ivu-input {
  width: 100% !important;
}
.search{
	display: inline-block;
	margin-left: 20px;
	/* float: right */
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
	
.list_data_h>div {
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
	.list_data_h>div:nth-child(1){
			width: 40%;
	}
	.list_data_h>div:nth-child(6){
			width: 160%;
	}
	.list_data_h>div:nth-child(7){
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
	.list_data_c>div:nth-child(1){
			width: 40%;
			line-height: 70px;
	}
	.list_data_c>div:nth-child(6){
			width: 160%;
			/* line-height: 80px; */
	}
	.list_data_c>div:nth-child(7){
			width: 160%;
			line-height: 22px;
	}
	.lineH{
		line-height: 80px;
		text-align: center;
	}
	.list_data_c>div {
		width: 100%;
		height: 80px;
		/* line-height: 44px; */
		border: 1px solid #E7EAEC;
		font-size: 14px;
		font-family: PingFangSC-Regular;
		font-weight: 400;
		color: #686A6C;
		/* padding: 5px 15px; */
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.list_data_c:hover{
		background-color: #f5f5f5;
	}
	.list_data_c>div:nth-child(1){
			width: 40%;
	}
	/* .list_data_c:hover{
		background-color: #000;
	} */
	.list_data_b {
		margin-top: 12px;
		padding-bottom: 10px;
	}
	.text-l{
		text-align: left;
	}
	.nolist{
		width: 100%;
		height: 50px;
		text-align: center;
		line-height: 50px;
		font-size: 16px;
	}
	.ordername{
		margin: 10px;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
</style>