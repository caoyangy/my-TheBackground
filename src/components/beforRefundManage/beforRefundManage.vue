<template>
	<div class="flex side_sdx">
		<!--头部信息-->
		<div class="H_t flex side_sdx mainAlign_center">
			<div>提前还款管理</div>
			<div>
                <router-link class="colorCCC blod" to="/beforRefundManage">提前还款管理</router-link>
            </div>
		</div>
		<!--列表-->
		<div class=" list_header ">
			<div class="list_h flex main_zdy sideAlign_center">
				<button v-for='(item,index) in state' :key="index" :class="stateName == item.name?'list_h_btnon' :'list_h_btn'" @click="stateon(item.name,item.id)">{{item.name}}</button>
			</div>
		</div>
		<div class="list">

			<div class=" search_box ">

				<div class=" search_input ">
					<input type="text" v-model=" searchVal.searchIpt " placeholder="请输入关键字,包括订单编号,借款人">
				</div>
				<div class=" search_btn ">
					<button @click=" searchList "> 搜索 </button>
					<button @click=" clearVal "> 清空 </button>
				</div>

				<div style=" clear:both "></div>
			</div>

			<div class="list_data" >
				<!--列表头部-->
				<div class="list_data_h flex main_zdy mainAlign_around">
					<div>流水号</div>
					<div>提起还款申请时间</div>
					<div>借款人</div>
					<div>分期金额</div>
					<div>还款方式</div>
					<div>已还期数</div>
					<!-- <div>未还本金</div> -->
					<div>提前还款明细</div>
					<div>操作</div>
				</div>
				<!--数据列表-->
				<div class="list_data_c flex main_zdy mainAlign_around" v-for="(item,index) in listOrder" :key="index">
					<div :title="item.orderId">{{item.orderId}}</div>
					<div :title="item.createTime">{{item.createTime}}</div>
					<div>{{item.username}}</div>
					<div>{{item.totalPrice}}</div>

					<div v-if="item.repaymentWay == '1'"> 等额本息 </div>
					<div v-else-if="item.repaymentWay == '2'"> 等本等息 </div>
					<div v-else-if="item.repaymentWay == '3'"> 等额本金 </div>
					<div v-else-if="item.repaymentWay == null"> 暂无字段 </div> <!-- 还款方式 -->

					<div> {{ item.currentPeriod }} </div> <!-- 已还期数 -->

					<!-- <div> 暂无字段 </div>  已还本金 -->

					<!-- <div> 暂无字段 </div> 未还本金 -->

				 	<!-- <div> 暂无字段 </div> 当前利息 -->

					<!-- <div> 暂无字段 </div>  提前还款违约金 -->
					
					<!-- <div> 暂无字段 </div> 提前还款管理费-->

					<div> <span class="get_total_monery" @click="getTotalMonery(item.orderId,index,item.userId)"> 获取 </span> </div> <!-- 提前还款减免 -->
					

					<div class="flex sideAlign_center mainAlign_center"><button @click="audit(item.orderId , item.instalmentId, item.instalmentAddId, item.storeId )">查看</button></div>
				</div>
			</div>
			<!--页码-->
			<div class="list_data_b flex main_ydz">
				<Page :total="Page.total" :page-size="Page.pageSize" :current="Page.current" @on-change="page"></Page>
			</div>
		</div>

		<div class="hide flex sideAlign_center mainAlign_center" v-if="overduePiceDetailModel">
			<div class="hide_d">
				<h3>提前还款费用明细</h3>
				<ul class="li_border_none">
					<li>
						当前利息
						<span> ￥{{ overduePiceDetailList.immediateInterest }} </span>
					</li>
					<li>
						提前还款违约金
						<span> ￥{{ overduePiceDetailList.earlyRepaymentViolateMoney }} </span>
					</li>
					<li>
						提前还款管理费
						<span> ￥{{ overduePiceDetailList.earlyRepaymentManagementFee }} </span>
					</li>
					<li class="border_top_2px">
						还款总额
						<span> ￥{{ overduePiceDetailList.earlyRepaymentTotalMoney }} </span>
					</li>
				</ul>
				<div  @click="closeModel" class="close">
					<Icon size="22" type="md-close" color="#ccc" />
				</div>
			</div>
		</div>


	</div>
</template>
<script>
	import { BaseUrl,API } from '../../Baseurl/common.js';
	export default {
		data() {
			return {
				state: [
					{
					'name': '提前还款审核中',
					'id': '2020'
					}, 
					{
					'name': '提前还款失败',
					'id': '2021'
					}
				],
				stateName: '提前还款审核中',
				stateType: '2020',
				listOrder: [],
				//分页
				Page: {
					total: 0,
					pageSize: 5,
					current: 1
				},
				searchVal:{
					searchIpt:'',
				},
				userid:'',
				token:'',
				overduePiceDetailModel:false,// 提前还款明细 model
				overduePiceDetailList:[],
			}
		},
		created() {
			this.userid = localStorage.getItem('userid');
			this.token = localStorage.getItem('token');
			this.List(this.stateType, this.Page.current,this.Page.pageSize,this.userid,this.token);
		},
		methods: {
			//获取页数
			page(e) {
				this.List(this.stateType,e,this.Page.pageSize,this.userid,this.token)
			},
			//审核
			audit: function( id , instalmentId , instalmentAddId , storeId) {
				var type = escape(this.stateName);
					this.$router.push({
					path: '/waitRefundDetail',
					query: {
						id:id,
						type:type,
						instalmentId:instalmentId,
						instalmentAddId:instalmentAddId,
						storeId:storeId
					}
					})	
			},
			//切换tab切换
			stateon: function(name, id) {
				this.stateName = name;
				this.stateType = id;
				this.Page.current = 1;
				this.List(this.stateType,this.Page.current,this.Page.pageSize,this.userid,this.token);
			},
			//获取列表数据
			List(type,current,pageSize,userid,token) {
				//获取列表
					if(this.searchVal.searchIpt.length == 18) {
						this.$API('post','queryTransactionRecordOrderAuth',{
							"orderId" :  this.searchVal.searchIpt,
							"dealType": "5",
							"status":type,
							"currentPage":current,
							"pageSize":pageSize
						},userid,token,(res)=>{
							this.listOrder = [];
							this.listOrder = res.data.data.list;
							this.Page.total = res.data.data.total;
						})
					} else {
						this.$API('post','queryTransactionRecordOrderAuth',{
							"username" :  this.searchVal.searchIpt,
							"dealType": "5",
							"status":type,
							"currentPage":current,
							"pageSize":pageSize
						},userid,token,(res)=>{
							this.listOrder = [];
							this.listOrder = res.data.data.list;
							this.Page.total = res.data.data.total;
						})
					}
				
			},
			// 获取提前还款明细
			getTotalMonery : function (id,index,userid) {
				var detailsUrl = BaseUrl + '/queryEarlyRepayment?'  + '&userId=' + this.userid + '&token=' + this.token;
				var dataList = {
					"userId":userid,
					"id":id,
				}
				this.$http.post(detailsUrl,dataList).then((res) => {
					this.overduePiceDetailModel = true;
					this.listOrder[0].totalMonery  = res.data.data.shouldRepaymentMoneyTotal;
					}).catch((error) => {
					console.log(error)
				})
			},
			// 关闭模态框
			closeModel : function (state) {
				this.overduePiceDetailModel = false;
				this.advancedModel = false;
			},
			clearVal: function () {
				let searchVal =  this.searchVal
				for( let item in searchVal ) {
					searchVal[item] = '';
				}
			},
			searchList : function () {
				this.List(this.stateType,this.Page.current,this.Page.pageSize,this.userid,this.token);
				// this.clearVal();
			},
		}
	}
</script>

<style scoped="scoped">
	.H_t {
		height: 70px;
		background: #fff;
		padding-left: 20px;
		border-bottom: 2px solid #E7EAEC;
	}
	
	.H_t div:nth-child(1) {
		height: 16px;
		font-size: 16px;
		font-family: PingFangSC-Regular;
		font-weight: 400;
		color: #686A6C;
		line-height: 16px;
	}
	
	.H_t div:nth-child(2) {
		height: 14px;
		font-size: 14px;
		line-height: 14px;
		font-family: PingFangSC-Regular;
		font-weight: 400;
		color: #686A6C;
		margin-top: 10px;
	}
	
	.H_t div:nth-child(2) span {
		color: #686A6C;
	}
	
	.list {
		background: #fff;
		margin: 0 20px 0 20px;
		padding: 0 20px;
		border-left: 1px solid #E7EAEC;
	}
	
	.list_h {
		height: 43px;
		background: #F3F3F4;
		/* margin: 0 -20px; */
		border-bottom: 1px solid #E7EAEC;
	}

	.list_header {
		margin-top: 20px;
		padding: 0 20px;
	}
	
	.list_h_btn {
		width: 150px;
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
		border: none;
	}
	
	.list_h_btnon {
		width: 150px;
		height: 45px;
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
		border-left: 1px solid #E7EAEC;
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
        /* display:table */
	}
	
	.list_data_h div {
		width: 100%;
		height: 44px;
		line-height: 44px;
		text-align: center;
		border: 1px solid #DDDDDD;
		font-size: 14px;
		font-family: PingFangSC-Medium;
		font-weight: bold;
		color: #686A6C;
        /* display:table-cell;
        vertical-align:middle; */
	}
	
	.list_data_c:nth-child(odd) {
		background: #f9f9f9;
		box-sizing: border-box;
	}
	
	.list_data_c:nth-child(even) {
		background: #fff;
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
	
	.list_data_c div button {
		width: 54px;
		height: 24px;
		line-height: 24px;
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
	
	.list_data_b {
		margin-top: 12px;
		padding-bottom: 10px;
	}

	.colorCCC {
		color: #686A6C;
    }

    .blod {
        font-weight: bold;
    }

	.get_total_monery {
		font-size:14px;
		font-family:PingFangSC-Regular;
		font-weight:400;
		color:rgba(62,131,193,1);
		cursor: pointer;
	}

	
	.hide {
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.6);
		position: absolute;
		top: 0;
		left: 0;
		z-index: 999999999;
	}
	
	.hide_d {
		width: 360px;
		/*height: 316px;*/
		background: #fff;
		border-radius: 10px;
		padding: 0 20px 20px 20px;
		box-sizing: border-box;
		position: relative;
	}

	.hide_d h3 {
		font-size:24px;
		font-family:PingFangSC-Regular;
		font-weight:400;
		color:rgba(87,87,87,1);
		text-align: center;
		margin: 33px 0 30px;
	}

	.hide_d ul li {
		height: 36px;
		line-height: 36px;
		border-bottom: 1px solid rgba(239,240,244,1);
		font-size:12px;
		font-family:PingFangSC-Regular;
		font-weight:400;
		color:rgba(153,153,153,1);
	}

	.hide_d ul li span {
		float:right;
		margin-right: 2px;
		font-size:12px;
		font-family:PingFangSC-Regular;
		font-weight:400;
		color:rgba(87,87,87,1);
	}

	.close {
		position: absolute;
		right: 12px;
		top: 10px;
		cursor: pointer;
	}

	.li_border_none li{
		border-bottom: none !important;
	}

	.border_top_2px {
		border-top: 2px solid rgba(239,240,244,1);
	}

	.advanced_btn {
		margin-top: 24px;
	}

	.advanced_btn button {
		height:40px;
		border-radius:6px;
		font-size:16px;
		font-family:PingFangSC-Regular;
		font-weight:400;
		color:rgba(255,255,255,1);
		border: none;

		cursor: pointer;
	}

	.advanced_btn button:first-child {
		width:120px;
		background:rgba(82,176,149,1);
				margin-left: 48px;
	}

	.advanced_btn button:last-child {
		width:84px;
		background:rgba(199,199,199,1);
		margin-left: 20px;
	}

	.demo-spin-icon-load{
        animation: ani-demo-spin 1s linear infinite;
    }

	.derate_text_ipt {
		width:100px;
		height:24px;
		background:rgba(250,250,250,1);
		border:1px solid rgba(231,234,236,1);
		border-radius:4px;
	}

	.text_algin_right {
		margin-top:10px;
		text-align: right;
		font-size:10px;
		font-family:PingFangSC-Regular;
		font-weight:400;
		color:rgba(153,153,153,1);
	}

		.search_box {
		margin: 30px 0 10px 0 ;
	}

	.search_box .search_input {
		width: 300px;
		float: left;
	}

	.search_box .search_input input{
		width: 300px;
		height: 30px;
		background:rgba(255,255,255,1) url('../../assets/img/all/search.png') no-repeat 275px 7px;
		background-size: 15px 15px;
		border:1px solid rgba(231,234,236,1);
		border-radius:4px;
		font-size:12px;
		color:rgba(169,177,192,1);
		text-indent: 6px;
	}

	.search_box .search_date {
		float: left;
		margin-left: 10%;
	}

	.search_box .search_date span {
		float: left;
		font-size:14px;
		font-family:PingFangSC-Medium;
		font-weight:500;
		color:rgba(104,106,108,1);
		margin-top: 4px;
		margin-right:10px ;
	}

	.search_box .search_date div {
		float: left;
	}

	.search_box .search_date div:nth-child(3) {
		font-weight: bold;
		margin: 8px 10px 0;
	} 

	.search_box .search_status {
		float: left;
		margin-left: 8.91%;
	}

	.search_box .search_status span {
		font-size:14px;
		font-family:PingFangSC-Medium;
		font-weight:500;
		color:rgba(104,106,108,1);
		margin-top: 4px;
		margin-right:10px ;
	}

	.search_box .search_status select {
		width:200px;
		height:30px;
		background:rgba(255,255,255,1);
		border:1px solid rgba(231,234,236,1);
		border-radius:4px;
		text-indent: 8px;
	}

	.search_box .search_btn {
		float: right;
	}
	
	.search_box .search_btn button {
		width:88px;
		height:30px;
		background:rgba(82,176,149,1);
		border-radius:4px;
		color:rgba(255,255,255,1);
		font-size:14px;
		border: none;
		cursor: pointer;
	}

	.search_box .search_btn button:last-child {
		margin-left: 20px;
	}
</style>

