<template>
	<div class="flex side_sdx">
		<!--头部信息-->
		<div class="H_t flex side_sdx mainAlign_center">
			<div> {{ stateName }} </div>
			<div>
				<span class="colorCCC">还款管理</span>
				&nbsp;&nbsp; /&nbsp;&nbsp; 
                <router-link class="colorCCC blod" to="/overRefund"> {{ stateName }} </router-link>
            </div>
		</div>
		<!--列表-->
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
					<div>结清时间</div>
					<div>借款时间</div>
					<div>借款人</div>
					<div>分期金额</div>
					<div>还款方式</div>
					<div>应还本息</div>
					<div>已还本金</div>
					<div>已还利息</div>
					<div>减免总额</div>
					<div>逾期费用</div>
					<div class="hidden_ellipsis" title="提前还款费用">提前还款费用</div>
					<div>实还总额</div>
					<div>类型</div>
					<div>操作</div>
				</div>
				<!--数据列表-->
					<div class="list_data_c flex main_zdy mainAlign_around" v-for="(item,index) in listOrder" :key="index">
						<div :title="item.orderId"> {{ item.orderId }} </div>
						<div :title="item.updateDate | cAPItalize"> {{ item.updateDate | cAPItalize}} </div>   	<!--结清时间-->
						<div :title="item.createDate | cAPItalize"> {{ item.createDate | cAPItalize}} </div>    	<!--借款时间-->
						<div> {{ item.username }} </div>   	<!--借款人-->
						<div> {{ item.totalPrice }} </div>     <!--分期金额-->
						<div v-if="item.payMethod == '100' "> 正常还款  </div>     <!--还款方式-->
						<div v-else-if="item.payMethod == '200' "> 提前还款  </div>     <!--还款方式-->
						<div v-else> 暂无字段  </div>     <!--还款方式-->
						<div> {{ item.principal + item.interest | toFixTwo }}  </div>     <!--应还本息-->
						<div>  {{ item.principal }} </div>     <!--已还本金-->
						<div>  {{ item.interest }} </div>     <!--已还利息-->
						<div> {{ item.totalReduce }} </div>     <!--减免总额-->
						<div> {{ item.overdueDedit + item.lateCharge }} </div>     <!--逾期费用-->
						<div> {{ item.sheadRepaymentManagementCost + item.sheadRepaymentDedit }} </div> <!--提前还款费用-->
						<div> {{ item.dealAmount }} </div>     <!--实还总额-->
						<div v-if=" item.payMethod == '100' "> 正常还款 </div>         <!--类型-->
						<div v-else-if=" item.payMethod == '200' "> 提前还款 </div>         <!--类型-->
						<div v-else> 暂无字段 </div>         <!--类型-->
						
						<div class="flex sideAlign_center mainAlign_center"><button @click="audit(item.orderId ,  item.instalmentId, item.instalmentAddId, item.storeId )">查看</button></div>
					</div>
			</div>
			<!--页码-->
			<div class="list_data_b flex main_ydz">
				<Page :total="Page.total" :page-size="Page.pageSize" :current="Page.current" @on-change="page"></Page>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				stateName: '已结清',
				stateType: '1',
				listOrder: [],
				//分页
				Page: {
					total: 0,
					pageSize: 5,
					current: 1
				},
				searchVal:{
					searchIpt:'',
					searchDateStart:'',
					searchDateEnd:'',
					paymentStatus:''
				},
				userid:'',
				token:'',
			}
		},
		created() {
			this.userid = localStorage.getItem('userid');
			this.token = localStorage.getItem('token');
			this.List(this.stateType,this.Page.current,this.Page.pageSize,this.userid,this.token);
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
						"dealTypeQuery": '6,7',
						"orderId" :  this.searchVal.searchIpt,
						"tradingStatus":'200',
						"currentPage":current,
						"pageSize":pageSize
					},userid,token,(res)=>{
						this.listOrder = [];
						this.listOrder = res.data.data.list;
						this.Page.total = res.data.data.total;
					})
				}else {
					this.$API('post','queryTransactionRecordOrderAuth',{
						"dealTypeQuery": '6,7',
						"username" : this.searchVal.searchIpt,
						"tradingStatus":'200',
						"currentPage":current,
						  "pageSize":pageSize
					},userid,token,(res)=>{
						this.listOrder = [];
						this.listOrder = res.data.data.list;
						this.Page.total = res.data.data.total;
					})

				}
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
		},
		filters: {
			toFixTwo: function (value) {
				if (!value) return ''
				value = Number(value)
				return (value.toFixed(2))
			}, // 过滤保留两位小数
			cAPItalize: function(value) {
				var date = new Date(value);
				var Y = date.getFullYear() + '-';
				var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
				var D = date.getDate() + ' ';
				var h = date.getHours() + ':';
				var m = date.getMinutes() + ':';
				var s = date.getSeconds();
				var value = Y + M + D
				return value
			}
		},
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
		margin: 20px 20px 0 20px;
		padding: 0 20px;
	}
	
	.list_h {
		height: 42px;
		background: #F3F3F4;
		margin: 0 -20px;
		border-bottom: 1px solid #E7EAEC;
	}
	
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
		border: none;
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

	.hidden_ellipsis {
		overflow : hidden;
		text-overflow:ellipsis;
		white-space:nowrap;
	}
	.list_data_c:hover{
        background-color: #f5f5f5;
    }
</style>