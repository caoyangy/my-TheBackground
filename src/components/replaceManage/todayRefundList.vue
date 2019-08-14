<template>
	<div class="flex side_sdx">
		<!--头部信息-->
		<div class="H_t flex side_sdx mainAlign_center">
			<div>今日还款列表</div>
			<div>
                <span class="colorCCC ">代付管理</span>
				 &nbsp;&nbsp; /&nbsp;&nbsp; 
                <router-link class="colorCCC blod" to="/todayRefundList">今日还款列表</router-link>
            </div>
		</div>
		<!--列表-->
		<div class="list">

			<div class=" search_box ">

				<div class=" search_input ">
					<input type="text" v-model=" searchVal.searchIpt " placeholder="请输入需要筛选的订单编号">
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
					<div>借款时间</div>
					<div>借款人</div>
					<div>分期金额</div>
					<div>还款方式</div>
					<div>本期期数</div>
					<div>应还本息</div>
					<div>本金</div>
					<div>利息</div>
					<div>优惠减免</div>
					<div>垫付状态</div>
					<div>还款总额</div>
					<div>操作</div>
				</div>

				<!--数据列表-->
				<div class="list_data_c flex main_zdy mainAlign_around" v-for="(item,index) in listOrder" :key="index">
					<div :title="item.orderId">{{item.orderId}}</div>
					<div :title="item.createDate">{{item.createDate}}</div>
					<div>{{item.username}}</div>
					<div>{{item.totalPrice}}</div>
					<div v-if="item.repaymentWay == '1'"> 等额本息 </div>
					<div v-else-if="item.repaymentWay == '2'"> 等本等息 </div>
					<div v-else-if="item.repaymentWay == '3'"> 等额本金 </div>
					<div v-else-if="item.repaymentWay == null"> 暂无字段 </div> <!-- 还款方式 -->
					<div>  {{ item.phase }} </div>
					<div> {{ (item.principal + item.interest).toFixed(2) }} </div>
					<div>{{item.principal}}</div>
					<div>{{item.interest}} </div>
					<div>{{item.interest}}</div>
					<div>{{item.payMatStatus}}</div>
					<div v-if="item.totalMonery">{{item.totalMonery}}</div>
					<div v-else> <span class="get_total_monery" @click="getTotalMonery(item.id,index,item.userId)"> 获取 </span> </div>
					<div class="flex sideAlign_center mainAlign_center"><button @click="audit(item.id)"> 查看 </button></div>
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
	import { BaseUrl,API } from '../../Baseurl/common.js';
	export default {
		data() {
			return {
				stateName: '今日还款列表',
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
			// 获取总额
			getTotalMonery : function (id,index,userid) {
				var detailsUrl = BaseUrl + 'repaymentToBalance?' +'&storeId=' + this.storeId + '&userId=' + this.userid + '&token=' + this.token;
				var dataList = {
					"userId":userid,
					"repaymentId":id,
					"currentPage":this.current,
  					"pageSize":this.pageSize
				}
				this.$http.post(detailsUrl,dataList).then((res) => {
					console.log(   res.data.data )
					this.listOrder[0].totalMonery  = res.data.data.shouldRepaymentMoneyTotal;
					console.log( this.listOrder[0].totalMonery  )
					}).catch((error) => {
					console.log(error)
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
				console.log( this.searchVal.searchIpt  )
				//获取列表
				if(this.searchVal.searchIpt.length == 18) {
					this.$API('post','repaymentPlan/selectTodayRepaymentList',{
						"orderId" :  this.searchVal.searchIpt,
						"currentPage":current,
						"pageSize":pageSize
					},userid,token,(res)=>{
						this.listOrder = [];
						let data = res.data.data.list;
							for(let i=0;i<data.length;i++){
								data[i]["totalMoery"] = "获取"
								this.$set( data,i,data[i]);
							}
						this.listOrder = res.data.data.list;
						this.Page.total = res.data.data.total;
					})
				} else {
					this.$API('post','repaymentPlan/selectTodayRepaymentList',{
						"username" :  this.searchVal.searchIpt,
						"currentPage":current,
						"pageSize":pageSize
					},userid,token,(res)=>{
						this.listOrder = [];
						let data = res.data.data.list;
							for(let i=0;i<data.length;i++){
								data[i]["totalMoery"] = "获取"
								this.$set( data,i,data[i]);
							}
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
				console.log('222')
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
		line-height:44px;
		text-align: center;
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
	.list_data_c:hover{
        background-color: #f5f5f5;
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