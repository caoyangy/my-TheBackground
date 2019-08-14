<template>
	<div class="flex side_sdx">
		<!--头部信息-->
		<div class="H_t flex side_sdx mainAlign_center">
			<div>逾期催收管理</div>
			<div>
                <span class="colorCCC blod">逾期催收管理</span>
            </div>
		</div>
		<!--列表-->
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

					<div class=" search_status " >
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
						<button @click=" searchLists "> 搜索 </button>
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
					<!-- <div>逾期违约金</div> -->
					<!-- <div>逾期罚息</div> -->
					<div>优惠减免</div>
					<div>逾期减免</div>
					<div>部分还款</div>
					<div>还款日</div>
					<!-- <div>已逾期(天)</div> -->
					<div>垫付状态</div>
					<div  class="hidden_ellipsis" title="逾期费用明细" >逾期费用明细</div>
					<div class="last_child_flex">操作</div>
				</div>
				<!--数据列表-->
					<div class="list_data_c flex main_zdy mainAlign_around" v-for="(item,index) in listOrder" :key="index">
						<div :title="item.orderId">{{item.orderId}}</div>
						<div :title="item.createDate" > {{ item.createDate }} </div>
						<div> {{ item.username }} </div>
						<div> {{ item.totalPrice }} </div>

						<div v-if="item.repaymentWay == '1'"> 等额本息 </div>
						<div v-else-if="item.repaymentWay == '2'"> 等本等息 </div>
						<div v-else-if="item.repaymentWay == '3'"> 等额本金 </div>
						<div v-else-if="item.repaymentWay == null"> 暂无字段 </div> <!-- 还款方式 -->

						<div>  {{ item.phase }} </div>
						<div> {{ item.principal + item.interest  | toFixTwo }} </div>
						<div> {{ item.principal }} </div>
						<div> {{ item.interest }} </div>
						<!-- <div> {{ item.username }} </div> -->
						<!-- <div> {{ item.lateCharge }} </div> -->
						<div> {{ item.interest }} </div>
						<div> {{ item.overdueRelief }} </div>
						<div> {{ item.principal }} </div>
						<div :title="item.planDate"> {{ item.planDate }} </div>
 
						<div v-if="item.payMatStatus == '0' "> 未垫付 </div>
						<div v-if="item.payMatStatus == '1' "> 已垫付 </div>
						<div v-if="item.payMatStatus == '2' "> 处理中 </div>
						<div v-if="item.payMatStatus == '3' "> 垫付失败 </div>
						
						<div> <span class="get_total_monery" @click="getTotalMonery( item.userId , item.id )"> 获取 </span> </div>

						<div class="flex sideAlign_center mainAlign_center last_child_flex last_child_flex_btn flex1">

							<button class="margin_left_20" v-if="item.overdueRelief == '0.00'" @click="oppenAdvancedModel('减免',item)">减免</button>
							<button @click="oppenAdvancedModel('减免调整',item)" v-else class="disable_dianfu" >减免调整</button>
							<button @click="audit(item.orderId ,  item.instalmentId, item.instalmentAddId, item.storeId )">查看</button>
								 
						</div>
					</div>
			</div>
			<!--页码-->
			<div class="list_data_b flex main_ydz">
				<Page :total="Page.total" :page-size="Page.pageSize" :current="Page.current" @on-change="page"></Page>
			</div>
		</div>
		

		<!-- 垫付记录model -->
		<div class="hide flex sideAlign_center mainAlign_center" v-if="advancedModel">
			<div class="hide_d">
				<h3  v-if="advancedModelType == '减免调整'">减免调整</h3>
				<h3  v-if="advancedModelType == '减免'">减免</h3>
				<ul>
					<li>
						借款流水号
						<span> {{ advancedList.orderId }} </span>
					</li>
					<li>
						借款人
						<span> {{ advancedList.username }}  </span>
					</li>
					<li>
						期数
						<span> {{ advancedList.phase }} </span>
					</li>
					<li>
						还款日
						<span> {{ advancedList.planDate }} </span>
					</li>
					<li>
						逾期违约金
						<span>  ￥{{ advancedList.overdueViolateMoney }} </span>
					</li>
					<li>                                 
						逾期罚息
						<span> ￥{{ advancedList.overduePenaltyInterest }} </span>
					</li>
					<li>
						减免金额
						<span>
							￥<input class="derate_text_ipt" type="text" v-model="derateVal">
						</span>
					</li>
					<div class="text_algin_right"> 减免金额不可大于 {{ (advancedList.overdueViolateMoney*1 + advancedList.overduePenaltyInterest*1).toFixed(2)  }} ， 即违约金与罚息之和 </div>
				</ul>

				<div  class="advanced_btn">
					<button @click="sbmitAdvanced( advancedList.id ,  advancedList.overdueViolateMoney , advancedList.overduePenaltyInterest )">确定调整</button>
					<button  @click="closeModel" >取消</button>
				</div>

				<div @click="closeModel" class="close">
					<Icon size="22" type="md-close" color="#ccc" />
				</div> 
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
						还款总额
						<span> ￥{{ overduePiceDetailList.remainRepaymentMoney }} </span>
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
				
				stateName: '逾期催收管理',
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
				overduePiceDetailModel: false, // 逾期费用明细model
				overduePiceDetailList:[], //逾期费用明细列表
				advancedModel:false, // 减免model
				advancedList:[], // 垫付列表
				advancedModelType : '',
				derateVal:'', // 减免金额
				content:'',//提示框内容
			}
		},
		created() {
			this.userid = localStorage.getItem('userid');
			this.token = localStorage.getItem('token');
			this.List(this.stateType,this.Page.current,this.Page.pageSize,this.userid,this.token);
		},
		filters: {
			toFixTwo: function (value) {
				if (!value) return +''
				value = Number(value)
				return (value.toFixed(2))
			} // 过滤保留两位小数
		},
		methods: {
			//获取页数
			page(e) {
				this.List(this.stateType,e,this.Page.pageSize,this.userid,this.token)
			},
			//减免model
			oppenAdvancedModel : function ( state,item ) {
				if(item.overdueRelief != ''){
					this.derateVal = item.overdueRelief;
				}
				this.advancedModelType = state;
				this.advancedList = item;
				if( this.advancedList.shouldRepaymentMoneyTotal == undefined ){
					this.handleSpinCustom();
				};
				
				var detailsUrl = BaseUrl + 'repaymentToBalance?'+ '&userId=' + this.userid + '&token=' + this.token;
				var dataList = {
					"userId":item.userId,
					"repaymentId":item.id,
				};
				this.$http.post(detailsUrl,dataList).then((res) => {
					let advancedList = this.advancedList,
						resData = res.data.data;
					advancedList.shouldRepaymentMoneyTotal = resData.shouldRepaymentMoneyTotal;// 本期应还总额
					advancedList.overdueViolateMoney = resData.overdueViolateMoney;// 逾期违约金
					advancedList.overduePenaltyInterest = resData.overduePenaltyInterest;// 逾期罚息
					this.advancedModel = true;
					console.log( advancedList )
					}).catch((error) => {
					console.log(error);
				});
			},
			// 提交减免
			sbmitAdvanced : function (id ,overdueViolateMoney , overduePenaltyInterest) {
				let detailsUrl = BaseUrl + 'repaymentPlan/overdueUpdate?'+ '&userId=' + this.userid + '&token=' + this.token;
				let dataList = {
					"id":id,
					"overdueRelief":this.derateVal,
					"currentPage":this.current,
  					"pageSize":this.pageSize
				};
				let maxReducingMonery = (( overdueViolateMoney + overduePenaltyInterest)*1).toFixed(2);
				if(this.derateVal != '' && this.derateVal <= maxReducingMonery && this.derateVal > 0 ){
					this.$http.post(detailsUrl,dataList).then((res) => {
						this.advancedModel = false;
						this.derateVal = ' ';
						this.List(this.stateType,this.Page.current,this.Page.pageSize,this.userid,this.token);
						}).catch((error) => {
						console.log(error);
					});
				} else {
						this.content = "请输入正确的违约金";
						this.infos();
						return false;
				}
			},
			//调用逾期费用明细model
			getTotalMonery : function (userid,id) {
				// transactionRecord/repaymentRecordQuery
					this.handleSpinCustom();
				var detailsUrl = BaseUrl + 'repaymentToBalance?'+ '&userId=' + this.userid + '&token=' + this.token;
				var dataList = {
					"userId":userid,
					"repaymentId":id,
				};
				this.$http.post(detailsUrl,dataList).then((res) => {
					this.overduePiceDetailList = res.data.data;
					this.overduePiceDetailModel = true;
					}).catch((error) => {
					console.log(error)	
				});
			},
			// 关闭模态框
			closeModel : function (state) {
				this.overduePiceDetailModel = false;
				this.advancedModel = false;
				this.derateVal = ' ';
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
				let searchVal = this.searchVal;
				if(this.searchVal.searchIpt.length == 18) {
					this.$API('post','repaymentPlan/overduePayment',{
						"orderId" :  searchVal.searchIpt,
						"beginPlanDate" : searchVal.searchDateStart ,
						"endPlanDate" : searchVal.searchDateEnd ,
						"payMatStatus" :searchVal.paymentStatus,
						"currentPage":current,
						"pageSize":pageSize
					},userid,token,(res)=>{
						this.listOrder = [];
						let data = res.data.data.list;
						this.listOrder = res.data.data.list;
						this.Page.total = res.data.data.total;
					})
				} else {
					this.$API('post','repaymentPlan/overduePayment',{
						"username" :  searchVal.searchIpt,
						"beginPlanDate" : searchVal.searchDateStart ,
						"endPlanDate" : searchVal.searchDateEnd ,
						"payMatStatus" :searchVal.paymentStatus,
						"currentPage":current,
						"pageSize":pageSize
					},userid,token,(res)=>{
						this.listOrder = [];
						let data = res.data.data.list;
						this.listOrder = res.data.data.list;
						this.Page.total = res.data.data.total;
					})
				}
			},
			//查看
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
			// loadding 加载事件
            handleSpinCustom () {
                this.$Spin.show({
                    render: (h) => {
                        return h('div', [
                            h('Icon', {
                                'class': 'demo-spin-icon-load',
                                props: {
                                    type: 'ios-loading',
                                    size: 18
                                }
                            }),
                            h('div', 'Loading')
                        ])
                    }
                });
                setTimeout(() => {
                    this.$Spin.hide();
                }, 1000);
			},
			//  警告提示框
			infos(nodesc) {
				this.$Notice.info({
					desc: nodesc ? '' : this.content
				});
			},
			clearVal: function () {
				let searchVal =  this.searchVal
				for( let item in searchVal ) {
					searchVal[item] = '';
				}
				this.$refs.searchDateEndName.handleClear();
				this.$refs.searchDateStartName.handleClear();
			},
			searchLists : function () {
				this.List(this.stateType,this.Page.current, this.Page.pageSize, this.userid, this.token);
			},
			searchDateStartFn : function (e) {
				this.searchVal.searchDateStart = e;
			},
			searchDateEndFn : function (e) {
				this.searchVal.searchDateEnd = e;
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
		display:flex;
	}
	
	.list_data_h div {
		height: 44px;
		line-height: 44px;
		flex: 1;
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

	.list_data_c {
		display:flex;
	}
	
	.list_data_c div {
		height: 44px;
		line-height: 44px;
		text-align: center;
		border: 1px solid #E7EAEC;
		font-size: 14px;
		font-family: PingFangSC-Regular;
		font-weight: 400;
		color: #686A6C;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		flex: 1;
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

	.last_child_flex {
		flex: 1.8 !important;
	}

	.margin_left_20 {
		margin-right: 20px;
	}

	.disable_dianfu {
		margin-right: 20px;
		font-size: 12px !important;
		background:rgba(208,208,208,1) !important;
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
		text-align: right;
	}

	.text_algin_right {
		margin-top:10px;
		text-align: right;
		font-size:10px;
		font-family:PingFangSC-Regular;
		font-weight:400;
		color:rgba(153,153,153,1);
	}
	
	.last_child_flex_btn {
		display: flex;
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