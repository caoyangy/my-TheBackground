<template>
	<div class="flex home side_sdx">
		<div class="content">
			<div class="user flex side_sdx mainAlign_center">
				<img src="https://p0.ssl.qhimg.com/t017d56700723291418.jpg" />
				<!-- <div v-if="userName == 'undefined'"> 未登录 </div> -->
				<div> {{userName}} </div>
			</div>
			<div class="list flex side_sdx">

				<div v-if=" userType == '3' " class="curser_pointer">
					<!-- <div class="list_d flex main_zdy  sideAlign_center" :class="tabMsg == '入驻中心'?'list_d_on' :'list_d'" @click="tabState('入驻中心')">

						<i v-if="tabMsg == '入驻中心'" class="list_d_i_on">
							<img src="../assets/img/leftNav/Resident-select.png"/>
						</i>

						<i v-else class="list_d_i_on">
							<img src="../assets/img/leftNav/Resident.png"/>
						</i>

						<div :class="tabMsg == '入驻中心'?'list_d_i_on' :'list_d_i'">入驻中心</div>
					</div> -->

					<!-- <div class="two_nav" v-if="tabMsg == '入驻中心'">
						<ul>

							<li>
								<router-link to="/shopsAudit">
									<div class="list_d flex main_zdy  sideAlign_center" @click="tabSelect('商家资质审核')">
										<div class="name_style" :style="{'color': tabSelectVal == '商家资质审核' ?  '#fff' : '#A9B1C0'} ">商家资质审核</div>
									</div>
								</router-link>
							</li>

							<li>
								<router-link to="/shopsDepositAccount">
									<div class="list_d flex main_zdy  sideAlign_center" @click="tabSelect('商家存管账户')">
										<div class="name_style" :style="{'color': tabSelectVal == '商家存管账户' ?  '#fff' : '#A9B1C0'} ">商家存管账户</div>
									</div>
								</router-link>
							</li>

							<li>
								<router-link to="/shopAlready">
									<div class="list_d flex main_zdy  sideAlign_center" @click="tabSelect('已入驻商家')">
										<div class="name_style" :style="{'color': tabSelectVal == '已入驻商家' ?  '#fff' : '#A9B1C0'} ">已入驻商家</div>
									</div>
								</router-link>
							</li>

						</ul>
					</div> -->
				</div>
				<!-- 入驻中心 -->

				<!-- <router-link v-if=" userType == '3' "  to="/waitRefund" class="curser_pointer" >
					<div class="list_d flex main_zdy  sideAlign_center" :class="tabMsg == '还款管理'?'list_d_on' :'list_d'" @click="tabState('还款管理')">
						<i v-if="tabMsg == '还款管理'" class="list_d_i_on">
							<img src="../assets/img/leftNav/refundManage-select.png"/>
						</i>

						<i v-else class="list_d_i_on">
							<img src="../assets/img/leftNav/refundManage.png"/>
						</i>
						<div :class="tabMsg == '还款管理'?'list_d_i_on' :'list_d_i'">还款管理</div>
					</div>

					<div class="two_nav" v-if="tabMsg == '还款管理'">
						<ul>

							<li>
								<router-link to="/waitRefund">
									<div class="list_d flex main_zdy  sideAlign_center" @click="tabSelect('还款中')">
										<div class="name_style" :style="{'color': tabSelectVal == '还款中' ?  '#fff' : '#A9B1C0'} ">还款中</div>
									</div>
								</router-link>
							</li>

							<li>
								<router-link to="/overRefund">
									<div class="list_d flex main_zdy  sideAlign_center" @click="tabSelect('已结清')">
										<div class="name_style" :style="{'color': tabSelectVal == '已结清' ?  '#fff' : '#A9B1C0'} ">已结清</div>
									</div>
								</router-link>
							</li>

						</ul>
					</div>
				</router-link> -->
				<!-- 还款管理 -->

				<!-- <router-link v-if=" userType == '3' "  to="/todayRefundList" class="curser_pointer" >
					<div class="list_d flex main_zdy  sideAlign_center" :class="tabMsg == '代付管理'?'list_d_on' :'list_d'" @click="tabState('代付管理')">
						<i v-if="tabMsg == '代付管理'" class="list_d_i_on">
							<img src="../assets/img/leftNav/repacaManage-select.png"/>
						</i>

						<i v-else class="list_d_i_on">
							<img src="../assets/img/leftNav/repacaManage.png"/>
						</i>
						<div :class="tabMsg == '代付管理'?'list_d_i_on' :'list_d_i'">代付管理</div>
					</div>

					<div class="two_nav" v-if="tabMsg == '代付管理'">
						<ul>

							<li>
								<router-link to="/todayRefundList">
									<div class="list_d flex main_zdy  sideAlign_center" @click="tabSelect('今日还款列表')">
										<div class="name_style" :style="{'color': tabSelectVal == '今日还款列表' ?  '#fff' : '#A9B1C0'} ">今日还款列表</div>
									</div>
								</router-link>
							</li>

							<li>
								<router-link to="/overdueList">
									<div class="list_d flex main_zdy  sideAlign_center" @click="tabSelect('已逾期列表')">
										<div class="name_style" :style="{'color': tabSelectVal == '已逾期列表' ?  '#fff' : '#A9B1C0'} ">已逾期列表</div>
									</div>
								</router-link>
							</li>

							<li>
								<router-link to="/replaceDatail">
									<div class="list_d flex main_zdy  sideAlign_center" @click="tabSelect('代付明细')">
										<div class="name_style" :style="{'color': tabSelectVal == '代付明细' ?  '#fff' : '#A9B1C0'} ">代付明细</div>
									</div>
								</router-link>
							</li>

							<li>
								<router-link to="/gatheringDatail">
									<div class="list_d flex main_zdy  sideAlign_center" @click="tabSelect('收款明细')">
										<div class="name_style" :style="{'color': tabSelectVal == '收款明细' ?  '#fff' : '#A9B1C0'} ">收款明细</div>
									</div>
								</router-link>
							</li>

						</ul>
					</div>
				</router-link> -->
				<!-- 代付管理 -->

				<router-link v-if=" userType == '3' " to="/shopsAudit">
					<div class="list_d flex main_zdy  sideAlign_center" :class="tabMsg == '入驻中心'?'list_d_on' :'list_d'" @click="tabState('入驻中心')">
						<!-- <i class="iconfont icon-yunpingtai_kehushouxin" :class="tabMsg == '入驻中心'?'list_d_i_on' :'list_d_i'"></i> -->
						<i v-if="tabMsg == '入驻中心'" class="list_d_i_on">
							<img src="../assets/img/leftNav/Resident-select.png"/>
						</i>

						<i v-else class="list_d_i_on">
							<img src="../assets/img/leftNav/Resident.png"/>
						</i>
						<div :class="tabMsg == '入驻中心'?'list_d_i_on' :'list_d_i'">入驻中心</div>
					</div>
				</router-link>
				<!-- 提前还款管理 -->
				<!-- 商家管理 -->
				<router-link v-if=" userType == '3' " to="/Business">
					<div class="list_d flex main_zdy  sideAlign_center" :class="tabMsg == '商家管理'?'list_d_on' :'list_d'" @click="tabState('商家管理')">
						
						<i v-if="tabMsg == '商家管理'" class="list_d_i_on">
							<img src="../assets/img/leftNav/enter-select.png"/>
						</i>

						<i v-else class="list_d_i_on">
							<img src="../assets/img/leftNav/enter.png"/>
						</i>
						<div :class="tabMsg == '商家管理'?'list_d_i_on' :'list_d_i'">商家管理</div>
					</div>
				</router-link>
				<!-- 商家管理 -->
				<!-- 课程管理 -->
				<router-link v-if=" userType == '1' " to="/allShopMsg">
					<div class="list_d flex main_zdy  sideAlign_center" :class="tabMsg == '课程管理'?'list_d_on' :'list_d'" @click="tabState('课程管理')">
						<i v-if="tabMsg == '课程管理'" class="list_d_i_on img_with_15">
							<img src="../assets/img/leftNav/courser-select.png"/>
						</i>

						<i v-else class="list_d_i_on img_with_15">
							<img src="../assets/img/leftNav/courser.png"/>
						</i>
						<div :class="tabMsg == '课程管理'?'list_d_i_on' :'list_d_i'">课程管理</div>
					</div>
				</router-link>
				<!-- 课程管理 -->
				<!-- 门店管理 -->
				<router-link v-if=" userType == '1' " to="/storeList">
					<div class="list_d flex main_zdy  sideAlign_center" :class="tabMsg == '门店管理'?'list_d_on' :'list_d'" @click="tabState('门店管理')">
						<i v-if="tabMsg == '门店管理'" class="list_d_i_on img_with_15">
							<img src="../assets/img/leftNav/courser-select.png"/>
						</i>

						<i v-else class="list_d_i_on img_with_15">
							<img src="../assets/img/leftNav/courser.png"/>
						</i>
						<div :class="tabMsg == '门店管理'?'list_d_i_on' :'list_d_i'">门店管理</div>
					</div>
				</router-link>
				<!-- 门店管理 -->

					<!-- 供应商管理 start-->
				<router-link v-if=" userType == '3' " to="/supplierManagementList">
					<div class="list_d flex main_zdy  sideAlign_center" :class="tabMsg == '供应商管理'?'list_d_on' :'list_d'" @click="tabState('供应商管理')">
						<i v-if="tabMsg == '供应商管理'" class="list_d_i_on">
							<img src="../assets/img/leftNav/Supplier-select.png"/>
						</i>

						<i v-else class="list_d_i_on">
							<img src="../assets/img/leftNav/Supplier.png"/>
						</i>
						<div :class="tabMsg == '供应商管理'?'list_d_i_on' :'list_d_i'">供应商管理</div>
					</div>
				</router-link>
				<!-- 供应商管理 end-->

				<!-- 商品管理 start-->
				<router-link v-if=" userType == '3' " to="/commodityManagementList">
					<div class="list_d flex main_zdy  sideAlign_center" :class="tabMsg == '商品管理'?'list_d_on' :'list_d'" @click="tabState('商品管理')">
						<i v-if="tabMsg == '商品管理'" class="list_d_i_on">
							<img src="../assets/img/leftNav/Commodity.png"/>
						</i>

						<i v-else class="list_d_i_on">
							<img src="../assets/img/leftNav/Commodity-b.png"/>
						</i>
						<div :class="tabMsg == '商品管理'?'list_d_i_on' :'list_d_i'">商品管理</div>
					</div>
				</router-link>
				<!-- 商品管理 end-->

				<!-- 自营订单 start-->
				<router-link v-if=" userType == '3' " to="/proprietaryOrdersList">
					<div class="list_d flex main_zdy  sideAlign_center" :class="tabMsg == '自营订单'?'list_d_on' :'list_d'" @click="tabState('自营订单')">
						<i v-if="tabMsg == '自营订单'" class="list_d_i_on">
							<img src="../assets/img/leftNav/order-select.png"/>
						</i>

						<i v-else class="list_d_i_on">
							<img src="../assets/img/leftNav/order.png"/>
						</i>
						<div :class="tabMsg == '自营订单'?'list_d_i_on' :'list_d_i'">自营订单</div>
					</div>
				</router-link>
				<!-- 自营订单 end-->
				<!-- 订单管理 -->
				<router-link v-if=" userType == '3' " to="/oderAll">
					<div class="list_d flex main_zdy  sideAlign_center" @click="tabState('订单管理')">

						<i v-if="tabMsg == '订单管理'" class="list_d_i_on">
							<img src="../assets/img/leftNav/orderManage-select.png"/>
						</i>

						<i v-else class="list_d_i_on">
							<img src="../assets/img/leftNav/orderManage.png"/>
						</i>
						<div :class="tabMsg == '订单管理'?'list_d_i_on' :'list_d_i'">订单管理</div>
					</div>
				</router-link>
				<!-- 订单管理 -->
				<!-- 退款/售后 -->
				<router-link v-if=" userType == '3' " to="/refundList">
					<div class="list_d flex main_zdy  sideAlign_center" @click="tabState('退款售后')">

						<i v-if="tabMsg == '退款售后'" class="list_d_i_on">
							<img src="../assets/img/leftNav/refundList-select.png"/>
						</i>

						<i v-else class="list_d_i_on">
							<img src="../assets/img/leftNav/refundList.png"/>
						</i>
						<div :class="tabMsg == '退款售后'?'list_d_i_on' :'list_d_i'">退款售后</div>
					</div>
				</router-link>
				<!-- 退款/售后 -->
				
				<!-- 评价管理 -->
				<router-link v-if=" userType == '3' " to="/evaluateList">
					<div class="list_d flex main_zdy  sideAlign_center" :class="tabMsg == '评价管理'?'list_d_on' :'list_d'" @click="tabState('评价管理')">
						<i v-if="tabMsg == '评价管理'" class="list_d_i_on">
							<img src="../assets/img/leftNav/evaluate@3x.png"/>
						</i>

						<i v-else class="list_d_i_on">
							<img src="../assets/img/leftNav/evaluatex@3x.png"/>
						</i>
						<div :class="tabMsg == '评价管理'?'list_d_i_on' :'list_d_i'">评价管理</div>
					</div>
				</router-link>
				<!-- 商城频道配置 -->
				<router-link v-if=" userType == '3' " to="/MallChannelList">
					<div class="list_d flex main_zdy  sideAlign_center" :class="tabMsg == '商城频道配置'?'list_d_on' :'list_d'" @click="tabState('商城频道配置')">
						<i v-if="tabMsg == '商城频道配置'" class="list_d_i_on">
							<img src="../assets/img/leftNav/MallChannelList-select.png"/>
						</i>
						<i v-else class="list_d_i_on">
							<img src="../assets/img/leftNav/MallChannelList.png"/>
						</i>
						<div :class="tabMsg == '商城频道配置'?'list_d_i_on' :'list_d_i'">商城频道配置</div>
					</div>
				</router-link>
				<!-- 商城频道配置 -->
				<!-- 课程管理 -->
				<router-link v-if=" userType == '3' " to="/YallShopMsg">
					<div class="list_d flex main_zdy  sideAlign_center" :class="tabMsg == '课程管理'?'list_d_on' :'list_d'" @click="tabState('课程管理')">
						<i v-if="tabMsg == '课程管理'" class="list_d_i_on img_with_15">
							<img src="../assets/img/leftNav/courser-select.png"/>
						</i>

						<i v-else class="list_d_i_on img_with_15">
							<img src="../assets/img/leftNav/courser.png"/>
						</i>
						<div :class="tabMsg == '课程管理'?'list_d_i_on' :'list_d_i'">课程管理</div>
					</div>
				</router-link>
				<!-- 课程管理 -->
				<!-- 费率配置 -->
				<router-link v-if=" userType == '3' " to="/rateAllocation">
					<div class="list_d flex main_zdy  sideAlign_center" :class="tabMsg == '费率配置'?'list_d_on' :'list_d'" @click="tabState('费率配置')">
						<i v-if="tabMsg == '费率配置'" class="list_d_i_on img_with_15">
							<img src="../assets/img/leftNav/rateAllocation-select.png"/>
						</i>

						<i v-else class="list_d_i_on img_with_15">
							<img src="../assets/img/leftNav/rateAllocation.png"/>
						</i>
						<div :class="tabMsg == '费率配置'?'list_d_i_on' :'list_d_i'">费率配置</div>
					</div>
				</router-link>
				<!-- 费率配置 -->
				<!-- 代理商交易账单 -->
				<router-link v-if=" userType == '3' " to="/agentBill">
					<div class="list_d flex main_zdy  sideAlign_center" :class="tabMsg == '代理商交易账单'?'list_d_on' :'list_d'" @click="tabState('代理商交易账单')">
						<i v-if="tabMsg == '代理商交易账单'" class="list_d_i_on img_with_15">
							<img src="../assets/img/leftNav/agentBill-select.png"/>
						</i>

						<i v-else class="list_d_i_on img_with_15">
							<img src="../assets/img/leftNav/agentBill.png"/>
						</i>
						<div :class="tabMsg == '代理商交易账单'?'list_d_i_on' :'list_d_i'">代理商交易账单</div>
					</div>
				</router-link>
				<!-- 代理商交易账单 -->
				<!-- 平台交易账单 -->
				<!-- <router-link v-if=" userType == '3' " to="/platformBilling">
					<div class="list_d flex main_zdy  sideAlign_center" :class="tabMsg == '平台交易账单'?'list_d_on' :'list_d'" @click="tabState('平台交易账单')">
						<i v-if="tabMsg == '平台交易账单'" class="list_d_i_on img_with_15">
							<img src="../assets/img/leftNav/platformBilling-select.png"/>
						</i>

						<i v-else class="list_d_i_on img_with_15">
							<img src="../assets/img/leftNav/platformBilling.png"/>
						</i>
						<div :class="tabMsg == '平台交易账单'?'list_d_i_on' :'list_d_i'">平台交易账单</div>
					</div>
				</router-link> -->
				<!-- 平台交易账单 -->
				<!-- 分润系数配置 -->
				<router-link v-if=" userType == '3' " to="/distributionAllocation">
					<div class="list_d flex main_zdy  sideAlign_center" :class="tabMsg == '分润系数配置'?'list_d_on' :'list_d'" @click="tabState('分润系数配置')">
						<i v-if="tabMsg == '分润系数配置'" class="list_d_i_on img_with_15">
							<img src="../assets/img/leftNav/distributionAllocation-select.png"/>
						</i>

						<i v-else class="list_d_i_on img_with_15">
							<img src="../assets/img/leftNav/distributionAllocation.png"/>
						</i>
						<div :class="tabMsg == '分润系数配置'?'list_d_i_on' :'list_d_i'">分润系数配置</div>
					</div>
				</router-link>
				<!-- 分润系数配置 -->
				<!-- 代理商管理 -->
				<router-link v-if=" userType == '3' " to="/agentManagement">
					<div class="list_d flex main_zdy  sideAlign_center" :class="tabMsg == '代理商管理'?'list_d_on' :'list_d'" @click="tabState('代理商管理')">
						<i v-if="tabMsg == '代理商管理'" class="list_d_i_on img_with_15">
							<img src="../assets/img/leftNav/agentManagement-select.png"/>
						</i>

						<i v-else class="list_d_i_on img_with_15">
							<img src="../assets/img/leftNav/agentManagement.png"/>
						</i>
						<div :class="tabMsg == '代理商管理'?'list_d_i_on' :'list_d_i'">代理商管理</div>
					</div>
				</router-link>
				<!-- 代理商管理 -->
				<!-- 加盟中心 -->
				<router-link v-if=" userType == '3' " to="/franchiseCenter">
					<div class="list_d flex main_zdy  sideAlign_center" :class="tabMsg == '加盟中心'?'list_d_on' :'list_d'" @click="tabState('加盟中心')">
						<i v-if="tabMsg == '加盟中心'" class="list_d_i_on img_with_15">
							<img src="../assets/img/leftNav/franchiseCenter-select.png"/>
						</i>

						<i v-else class="list_d_i_on img_with_15">
							<img src="../assets/img/leftNav/franchiseCenter.png"/>
						</i>
						<div :class="tabMsg == '加盟中心'?'list_d_i_on' :'list_d_i'">加盟中心</div>
					</div>
				</router-link>
				<!-- 加盟中心 -->
			</div>
		</div>
	</div>

</template>

<script>
	
	export default {
		data() {
			return {
				userName: '123',
				tabMsg: '',
				tabSelectVal: '',
				userType: '',
				tablist:{
					'入驻中心':['资质审核','商家存款账户','已入驻中心']
				}
			}
		},
		created() {
			this.userType = sessionStorage.getItem('userType');
			this.tabMsg = sessionStorage.getItem('tabMsg');
			this.tabSelectVal = sessionStorage.getItem('tabMsges');
			// if(this.userType == '3') {
			// 	//后台管理人员登录默认是存款账户的页面
			// 	// this.$router.push({
			// 	// 	path: '/shopsAudit'
			// 	// })
			// } else if(this.userType == '1' || this.tabMsg == '课程管理') {
			// 	this.$router.push({
			// 		path: '/allShopMsg'
			// 	})
			// }

			if(sessionStorage.getItem('userName') == null) {
				this.userName = '用户未登录'
			} else {
				this.userName = sessionStorage.getItem('userName')
			}

		},
		methods: {
			tabState(e) {
				this.tabMsg = e;
				this.$store.commit('increment', e);
				if(this.$store.state.tabCut == '入驻中心' && this.userType == '3') {
					this.tabSelectVal = '商家资质审核'
					this.$router.push({
						path: '/shopsAudit'
					})
				}
			},
			tabSelect(e) {
				this.tabSelectVal = e;
				this.$store.commit('changeNav', e)
			}
		},

	}
</script>

<style scoped="scoped">
	.home {
		width: 220px;
		height: 100%;
	}
	
	.content {
		width: 220px;
		height: 100%;
		background: #35404E;
		overflow-y: scroll;
	}
	
	.user {
		height: 160px;
		background: url(../assets/img/user_H_img.png);
		background-size: 100% 100%;
		padding-left: 42px;
	}
	
	.user img {
		width: 50px;
		height: 50px;
		border-radius: 50%;
		margin-bottom: 20px;
	}
	
	.user div {
		font-size: 22px;
		font-family: PingFangSC-Medium;
		font-weight: 500;
		color: #E1E4EB;
	}
	
	.list {
		width: 100%;
	}
	
	.list_d {
		width: 100%;
		height: 48px;
		text-align: center;
		line-height: 48px;
		padding-left: 30px;
		box-sizing: border-box;
	}
	
	.list_d_i {
		font-size: 16px;
		color: #959DAC;
		margin-right: 20px;
	}
	
	.list_d_t {
		font-size: 16px;
		font-family: PingFangSC-Regular;
		font-weight: 400;
		color: #A9B1C0;
	}
	
	.list_d_on {
		width: 100%;
		height: 48px;
		text-align: center;
		line-height: 48px;
		border-left: 6px solid #4DA78E;
		padding-left: 22px;
		background: #2C3845;
		box-sizing: border-box;
	}
	
	.list_d_i_on {
		font-size: 16px;
		color: #fff;
		margin-right: 20px;
	}
	
	.list_d_t_on {
		font-size: 16px;
		font-family: PingFangSC-Regular;
		font-weight: 400;
		color: #fff;
	}
	
	.list_d_i_on img {
		width: 19px;
		margin-bottom: -3px;
	}
	
	.img_with_15 img {
		width: 15px !important;
		margin-left: 3px;
	}
	
	.two_nav {
		background: #2A3644;
	}
	
	.two_nav ul li .name_style {
		font-size: 14px !important;
		font-family: PingFangSC-Regular;
		font-weight: 400;
		color: rgba(169, 177, 192, 1);
		text-indent: 40px;
	}
	
	.curser_pointer {
		cursor: pointer;
	}
</style>