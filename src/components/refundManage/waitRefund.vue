<template>
	<div class="flex side_sdx">
		<!--头部信息-->
		<div class="H_t flex side_sdx mainAlign_center">
			<div> {{ stateName }} </div>
			<div>
				<span class="colorCCC">还款管理</span>
				&nbsp;&nbsp; /&nbsp;&nbsp; 
                <router-link class="colorCCC " to="/waitRefund">还款中</router-link>
				&nbsp;&nbsp; /&nbsp;&nbsp; 
				<span class="colorCCC blod "> {{ stateName }} </span>
            </div>
		</div>

		<!--待还款列表-->
		<div class=" list_header ">
			<div class="list_h flex main_zdy sideAlign_center">
				<button v-for='(item,index) in state' :key="index" :class="stateName == item.name?'list_h_btnon' :'list_h_btn'" @click="stateon(item)">{{item.name}}</button>
			</div>
		</div>
		<div class="list">
			<div class=" search_box ">

				<div class=" search_input ">
					<input type="text" v-model=" searchVal.searchIpt " placeholder="请输入关键字,包括订单编号,借款人">
				</div>

				<div  class=" search_date ">
					<span> 还款日 : </span>

					<div>
						<DatePicker 
						@on-change=" searchDateStartFn " 
						clearable type="date" 
						format="yyyy-MM-dd"  
						placeholder="请选择" 
						style="width: 120px"  
						ref="searchDateStartName"
						>
						</DatePicker>
					</div>
					<div>
						~
					</div>
					<div>
						<DatePicker  
						@on-change=" searchDateEndFn "  
						clearable  type="date"  
						format="yyyy-MM-dd"  
						placement="bottom-end" 
						placeholder="请选择" 
						style="width: 120px" 
						ref="searchDateEndName"
						>
						</DatePicker>
					</div>
				</div>

				<div class=" search_status " v-if=" stateName == '已逾期' " >
					<span >	垫付状态 : </span>
						<select name=" paymentStatus " id="paymentStatus" v-model=" searchVal.paymentStatus ">
							<option value="">请选择</option>
							<option value="0">未垫付</option>
							<option value="1">已垫付</option>
							<option value="2">处理中</option>
							<option value="3">垫付失败</option>
						</select>
				</div>

				<div class=" search_btn ">
					<button @click=" searchList "> 搜索 </button>
					<button @click=" clearVal "> 清空 </button>
				</div>

				<div style=" clear:both "></div>
			</div>

			<div  v-if='stateName == "未逾期"' class="list_data" >
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
					<div>还款日</div>
					<!-- <div>距还款日(天)</div> -->
					<div>还款总额</div>
					<div>操作</div>	
				</div>
				<!--数据列表-->
				<div class="list_data_c flex main_zdy mainAlign_around" v-for="(item,index) in listOrder" :key="index">
					<div :title="item.orderId">{{item.orderId}}</div>
					<div :title="item.createDate | cAPItalize">{{item.createDate | cAPItalize}}</div>
					<div> {{item.username}} </div>
					<div> {{item.totalPrice}} </div>
					<div v-if="item.repaymentWay == '1'"> 等额本息 </div>
					<div v-else-if="item.repaymentWay == '2'"> 等本等息 </div>
					<div v-else-if="item.repaymentWay == '3'"> 等额本金 </div>
					<div v-else-if="item.repaymentWay == null"> 暂无字段 </div> <!-- 还款方式 -->
					<div>   {{ item.phase }} </div>
					<div> {{item.principal + item.interest | toFixTwo}} </div>
					<div> {{item.principal}} </div>
					<div> {{item.interest}} </div>
					<div> {{item.interest}} </div>
					<div :title="item.planDate"> {{item.planDate}} </div>
					<div  v-if=" item.totalMoery != '获取' "   @click=" getTotalMoery(item.userId , item.id ,index) "   class=" get_total_monery "> {{ item.totalMoery }} </div>
					<div  v-else  @click=" getTotalMoery(item.userId , item.id ,index) "  class=" get_total_monery "> 获取 </div>
					<!-- <div  @click=" getTotalMoery(item.userId , item.id ,index) " class=" get_total_monery ">  {{ item.totalMoery }} </div> -->
					<div class="flex sideAlign_center mainAlign_center"><button @click="audit(item.orderId , item.instalmentId, item.instalmentAddId, item.storeId )">查看</button></div>
				</div>
			</div>

		<!--已逾期列表-->
			<div  v-if='stateName == "已逾期"' class="list_data" >
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
					<div>逾期减免</div>
					<div>还款日</div>
					<div>垫付状态</div>
					<div>逾期费用明细</div>
					<div>操作</div>
				</div>
				<!--数据列表-->
				<div class="list_data_c flex main_zdy mainAlign_around" v-for="(item,index) in listOrder" :key="index">
					<div :title="item.orderId">{{item.orderId}}</div>
					<div :title="item.createDate | cAPItalize">{{item.createDate | cAPItalize}}</div>
					<div>{{item.username}}</div>
					<div> {{item.totalPrice}} </div>
					<div v-if="item.repaymentWay == '1'"> 等额本息 </div>
					<div v-else-if="item.repaymentWay == '2'"> 等本等息 </div>
					<div v-else-if="item.repaymentWay == '3'"> 等额本金 </div>
					<div v-else-if="item.repaymentWay == null"> 暂无字段 </div> <!-- 还款方式 -->
					<div>  {{ item.phase }}  </div>
					<div> {{item.principal + item.interest | toFixTwo}} </div> <!-- 应还本息 -->
					<div> {{item.principal}} </div>
					<div> {{item.interest}} </div>	<!-- 利息 -->
					<div> {{item.interest}} </div>	<!-- 优惠减免 -->
					<div> {{item.overdueDedit}} </div> <!-- 逾期减免 -->
					<div> {{ item.planDate }} </div>
					<div v-if="item.payMatStatus == '0' "> 未垫付 </div>
					<div v-if="item.payMatStatus == '1' "> 已垫付 </div>
					<div v-if="item.payMatStatus == '2' "> 处理中	 </div>
					<div v-if="item.payMatStatus == '3' "> 垫付失败 </div>	
					<div  @click=" getTotalMoery(item.userId , item.id ,index,'已逾期') " class=" get_total_monery "> 获取 </div>
					<!-- <div :title="item.validDate"> {{item.validDate}} </div> -->
					<div class="flex sideAlign_center mainAlign_center"><button @click="audit(item.orderId ,  item.instalmentId, item.instalmentAddId, item.storeId )">查看</button></div>
				</div>
			</div>

		<!--已还款列表-->
			<div  v-if='stateName == "已还款"' class="list_data" >
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
					<div>逾期违约金</div>
					<div>逾期罚息</div>
					<div>逾期减免</div>
					<div>还款总额</div>
					<div>还款日</div>
					<div>操作</div>
				</div>
				<!--数据列表-->
				<div class="list_data_c flex main_zdy mainAlign_around" v-for="(item,index) in listOrder" :key="index">
					<div :title="item.orderId">{{item.orderId}}</div>
					<div :title="item.createDate | cAPItalize">{{item.createDate | cAPItalize}}</div>
					<div>{{item.username}}</div>
					<div> {{item.totalPrice}} </div>

					<div v-if="item.repaymentWay == '1'"> 等额本息 </div>
					<div v-else-if="item.repaymentWay == '2'"> 等本等息 </div>
					<div v-else-if="item.repaymentWay == '3'"> 等额本金 </div>
					<div v-else-if="item.repaymentWay == null"> 暂无字段 </div> <!-- 还款方式 -->
					<div> {{ item.phase }} </div> <!-- 本期 -->
					<div> {{item.principal + item.interest | toFixTwo}} </div> <!-- 应还本息 -->
					<div> {{item.principal}} </div>
					<div> {{item.interest}} </div>
					<div> {{item.overdueDedit}} </div> <!-- 逾期违约金 -->
					<div> {{ item.lateCharge }} </div>
					<div> {{item.lateCharge + item.overdueDedit | toFixTwo }} </div> <!-- 逾期减免 -->
					<div> {{item.money}} </div> <!-- 还款总额 -->
					<div :title=" item.planDate "> {{item.planDate}} </div>	 <!-- 还款日 -->
					<div class="flex sideAlign_center mainAlign_center"><button @click="audit(item.orderId ,  item.instalmentId, item.instalmentAddId, item.storeId )">查看</button></div>
				</div>
			</div>


			<!--页码-->
			<div class="list_data_b flex main_ydz">
				<Page :total="Page.total" :page-size="Page.pageSize" :current="Page.current" @on-change="page"></Page>
			</div>
		</div>
		<!-- 逾期费用明细model -->
		<div class="hide flex sideAlign_center mainAlign_center" v-if="overduePiceDetailModel">
			<div class="hide_d">
				<h3>逾期费用明细</h3>
				<ul class="li_border_none">
					<li>
						已逾期
						<span> {{ overduePiceDetailList.overdueDays }}天 </span>
					</li>
					<li>
						逾期违约金
						<span> ￥{{ overduePiceDetailList.overdueViolateMoney }} </span>
					</li>
					<li>
						逾期罚息
						<span> ￥{{ overduePiceDetailList.overduePenaltyInterest }} </span>
					</li>
					<li>
						部分还款
						<span> ￥{{ overduePiceDetailList.actualRepaymentMoney }} </span>
					</li>
					<li class="border_top_2px">
						剩余还款总额
						<span> ￥{{ overduePiceDetailList.remainRepaymentMoney }} </span>
					</li>
				</ul>
				<div @click="closeModel" class="close">
					<Icon size="22" type="md-close" color="#ccc" />
				</div>
			</div>
		</div>

	</div>
</template>
<script>
	export default {
		data() {
			return {
				state: [
					{
					'name': '未逾期',
					'id': '100',
					'overdueStatus':0
					}, 
					{
					'name': '已逾期',
					'id': '200',
					'overdueStatus':1
					},
				 	{
					'name': '已还款',
					'id': '200',
					'overdueStatus':''
					}
				 	
				],
				searchVal:{
					searchIpt:'',
					searchDateStart:'',
					searchDateEnd:'',
					paymentStatus:''
				},
				overdueStatus:0,
				stateName: '未逾期',
				stateType: '100', // 请求的类型
				listOrder: [], 
				//分页
				Page: {
					total: 0,
					pageSize: 5,
					current: 1
				},
				userid:'',
				token:'',
				overduePiceDetailModel:false,
				overduePiceDetailList:[],
				isClearSearchVal:false // 是否是点击清空
			}
		},
		mounted() {
			this.userid = localStorage.getItem('userid');
			this.token = localStorage.getItem('token');
			// this.List(this.stateType,this.Page.current,this.Page.pageSize,this.userid,this.token);
			this.$API('post','queryRepaymentPlanOrderAuth',{
				"repayStatus": this.stateType,
				"currentPage":this.Page.current,
				"pageSize":this.Page.pageSize,
				"overdueStatus": 0,
			},this.userid,this.token,(res)=>{
				this.listOrder = [];
				var data = res.data.data.list;
				// for( let i=0;i<data.length;i++ ){
				// 	// this.$set( data[i],'totalMoery','获取')
				// 	data[i]["totalMoery"] = '获取';

				// }
				for( let i=0;i<data.length;i++ ){
					data[i]["totalMoery"] = "获取"
					this.$set( data,i,data[i])
				}

				this.listOrder = data;
				console.log(this.listOrder)
				this.Page.total = res.data.data.total;
			})
		},
		//过滤器
		filters: {
			toFixTwo: function (value) {
				if (!value) return ''
				value = Number(value)
				return (value.toFixed(2))
			} ,// 过滤保留两位小数
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
		methods: {
			//获取页数
			page(e) {
				if(this.stateName == '未逾期'){
					this.$API('post','queryRepaymentPlanOrderAuth',{
						"repayStatus": this.stateType,
						"overdueStatus": 0,
						"currentPage":e,
						"pageSize":this.Page.pageSize,
					},this.userid,this.token,(res)=>{
						var data = res.data.data.list;
						for( let i=0;i<data.length;i++ ){
								data[i]["totalMoery"] = "获取"
								this.$set( data,i,data[i])
						}
						this.listOrder = data;
						console.log(this.listOrder)
						this.Page.total = res.data.data.total;
					})
				} else if(this.stateName == '已还款'){
					this.$API('post','queryRepaymentPlanOrderAuth',{
						"repayStatus": this.stateType,
						"currentPage":e,
						"pageSize":this.Page.pageSize
					},this.userid,this.token,(res)=>{
						this.listOrder = [];
						this.listOrder = res.data.data.list;
						this.Page.total = res.data.data.total;
					})
				}else {
					console.log(123123)
					this.$API('post','queryRepaymentPlanOrderAuth',{
						"overdueStatus": this.stateType,
						"overdueStatus": 1,
						"currentPage":e,
						"pageSize":this.Page.pageSize
					},this.userid,this.token,(res)=>{
						this.listOrder = [];
						this.listOrder = res.data.data.list;
						this.Page.total = res.data.data.total;
						this.Page.total = res.data.data.total;
					})
				} // 判断逾期和还款请求 path: 
			},
			//审核
			audit: function( id , instalmentId , instalmentAddId , storeId) {
				console.log( storeId )
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
			getTotalMoery: function(userid,repaymentId,index,ele){
				this.$APIS('post','repaymentToBalance',{
					"userId":userid,
					"repaymentId":repaymentId
				},this.userid,this.token,(res)=>{
					if(ele){
						this.overduePiceDetailModel = true;
						this.overduePiceDetailList =  res.data.data;
					}else {
						this.listOrder[index].totalMoery = res.data.data.remainRepaymentMoney;
						console.log( this.listOrder[index].totalMoery )
					}
				}),(res)=>{
				}
			},
			// 关闭model
			closeModel: function(state) {
				this.overduePiceDetailModel = false;
			},
			//请求方法
			getListFn:function ( status ) {
				let isNameOrId = "";
				let searchVal = this.searchVal;
					if(this.searchVal.searchIpt.length == 18) {
						this.$API('post','queryRepaymentPlanOrderAuth',{
							"repayStatus": this.stateType,
							"overdueStatus": this.overdueStatus,
							"orderId" :  searchVal.searchIpt,
							"beginPlanDate" : searchVal.searchDateStart ,
							"endPlanDate" : searchVal.searchDateEnd ,
							"payMatStatus" :searchVal.paymentStatus,
							"currentPage":this.Page.current,
							"pageSize":this.Page.pageSize
						},this.userid,this.token,(res)=>{
							this.listOrder = [];
							this.listOrder = res.data.data.list;
							this.Page.total = res.data.data.total;
						})
					}else {
						this.$API('post','queryRepaymentPlanOrderAuth',{
							"repayStatus": this.stateType,
							"overdueStatus": this.overdueStatus,
							"username" :  searchVal.searchIpt,
							"beginPlanDate" : searchVal.searchDateStart ,
							"endPlanDate" : searchVal.searchDateEnd ,
							"payMatStatus" :searchVal.paymentStatus,
							"currentPage":this.Page.current,
							"pageSize":this.Page.pageSize
						},this.userid,this.token,(res)=>{
							this.listOrder = [];
							this.listOrder = res.data.data.list;
							this.Page.total = res.data.data.total;
						})
					}
			},
			//切换tab切换
			stateon: function(item ) {
				this.stateName = item.name;
				this.overdueStatus = item.overdueStatus;
				this.stateType = item.id;
				this.Page.current = 1;
				this.getListFn();
			},
			clearVal: function () {
				let searchVal =  this.searchVal
				for( let item in searchVal ) {
					searchVal[item] = '';
				}
				this.$refs.searchDateEndName.handleClear();
				this.$refs.searchDateStartName.handleClear();
			},
			searchList : function () {
				this.getListFn('search');
				this.clearVal();
			},
			searchDateStartFn : function (e) {
				this.searchVal.searchDateStart = e;
			},
			searchDateEndFn : function (e) {
				this.searchVal.searchDateEnd = e;
			}
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

	.get_total_monery {
		font-size:14px;
		font-family:PingFangSC-Regular;
		font-weight:400;
		color:rgba(62,131,193,1) !important;
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
		padding: 0 20px 30px 20px;
		box-sizing: border-box;
		position: relative;
	}
	
	.hide_d h3 {
		font-size: 24px;
		font-family: PingFangSC-Regular;
		font-weight: 400;
		color: rgba(87, 87, 87, 1);
		text-align: center;
		margin: 33px 0 30px;
	}
	
	.hide_d ul li {
		height: 36px;
		line-height: 36px;
		border-bottom: 1px solid rgba(239, 240, 244, 1);
		font-size: 12px;
		font-family: PingFangSC-Regular;
		font-weight: 400;
		color: rgba(153, 153, 153, 1);
	}
	
	.hide_d ul li span {
		float: right;
		margin-right: 2px;
		font-size: 12px;
		font-family: PingFangSC-Regular;
		font-weight: 400;
		color: rgba(87, 87, 87, 1);
	}
	
	.close {
		position: absolute;
		right: 12px;
		top: 10px;
		cursor: pointer;
	}
	
	.li_border_none li {
		border-bottom: none !important;
	}
	
	.border_top_2px {
		border-top: 2px solid rgba(239, 240, 244, 1);
	}
	
	.advanced_btn {
		margin-top: 24px;
	}
	
	.advanced_btn button {
		height: 40px;
		border-radius: 6px;
		font-size: 16px;
		font-family: PingFangSC-Regular;
		font-weight: 400;
		color: rgba(255, 255, 255, 1);
		border: none;
		cursor: pointer;
	}
	
	.advanced_btn button:first-child {
		width: 120px;
		background: rgba(82, 176, 149, 1);
		margin-left: 48px;
	}
	
	.advanced_btn button:last-child {
		width: 84px;
		background: rgba(199, 199, 199, 1);
		margin-left: 20px;
	}
	
	.demo-spin-icon-load {
		animation: ani-demo-spin 1s linear infinite;
	}

	.border_bottom_none {
		border-bottom:none !important;
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
	.list_data_c:hover{
        background-color: #f5f5f5;
    }
</style> 	