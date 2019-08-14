import Vue from 'vue'
import Router from 'vue-router'
import { resolve } from 'url';
import { BaseUrl, API } from '../Baseurl/common.js';

Vue.use(Router)

const router = new Router({
	routes: [{
		path: '*',
		name: 'user',
		component: resolve =>
			require(["../components/login/user.vue"], resolve),
		meta: { title: '用户登录页面' }
	},
	{
		path: '/home',
		name: 'home',
		component: resolve =>
			require(["../components/home.vue"], resolve),
		meta: { title: '主页' },



		// 运营管理人员
		// 入驻中心 —— 商家资质审核列表
		children: [{
			path: '/shopsAudit',
			name: {userType:'3'},
			component: resolve =>
				require(["../components/shopsAudit-template/shopsAudit.vue"], resolve),
			meta: { title: ' 商家资质审核' },

		},
		// 入驻中心 —— 商家资质审核详情
		{
			path: '/shopsAuditDetails',
			name: {userType:'3'},
			component: resolve =>
				require(["../components/shopsAudit-template/shopsAuditDetails.vue"], resolve),
			meta: { title: ' 入驻审核详情' },
		},
		// 入驻中心 —— 已入驻商家列表
		{
			path: '/shopAlready',
			name: {userType:'3'},
			component: resolve =>
				require(["../components/shopsAudit-template/shopAlready.vue"], resolve),
			meta: { title: ' 已入驻商家' },
		},
		// 入驻中心 —— 已入驻商家详情
		{
			path: '/shopAlreadyDetails',
			name: {userType:'3'},
			component: resolve =>
				require(["../components/shopsAudit-template/shopAlreadyDetails.vue"], resolve),
			meta: { title: ' 入驻商家详情' },
		},
		// 入驻中心 ——  商家存管账户列表
		{
			path: '/shopsDepositAccount',
			name: {userType:'3'},
			component: resolve =>
				require(["../components/shopsAudit-template/shopsDepositAccount.vue"], resolve),
			meta: { title: ' 商家存管账户' },
		},
		// 入驻中心 ——  商家存管账户详情
		{
			path: '/shopsDepositAccountDetails',
			name: {userType:'3'},
			component: resolve =>
				require(["../components/shopsAudit-template/shopsDepositAccountDetails.vue"], resolve),
			meta: { title: ' 商家存管账户详情' },
		},
		// 入驻中心 ——  银联入驻审核
		{
			path: '/UnionPayShopsLocated',
			name: {userType:'3'},
			component: resolve =>
				require(["../components/shopsAudit-template/UnionPayShopsLocated.vue"], resolve),
			meta: { title: ' 入驻商家详情' },	
		},
		// 订单管理 ——  订单列表
		{
			path: '/oderAll',
			name: {userType:'3'},
			component: resolve =>
				require(["../components/oderAll/oderAll.vue"], resolve),
			meta: { title: '订单管理' },
		},
		// 订单管理 ——  订单详情
		{
			path: '/userMessageDetails',
			name: {userType:'3'},
			component: resolve =>
				require(["../components/oderAll/userMessageDetails.vue"], resolve),
			meta: { title: '初审复审流程' },
		},
		// 还款管理管理 ——  已结清列表
		{
			path: '/overRefund',
			name: {userType:'3'},
			component: resolve =>
				require(["../components/refundManage/overRefund.vue"], resolve),
			meta: { title: '已结清' },
		},
		// 还款管理管理 ——  还款中列表
		{
			path: '/waitRefund',
			name: {userType:'3'},
			component: resolve =>
				require(["../components/refundManage/waitRefund.vue"], resolve),
			meta: { title: '还款中' },
		},
		// 还款管理管理 ——  还款中详情
		{
			path: '/waitRefundDetail',
			name: {userType:'3'},
			component: resolve =>
				require(["../components/refundManage/waitRefundDetail.vue"], resolve),
			meta: { title: '还款中详情' },
		},
		// 商家管理
		{
			path: '/Business',
			name:{userType:'3'},
			component: resolve =>
				require(["../components/Business/Business.vue"], resolve),
			meta: { title: '商家管理' },
		},
		// 商家管理详情
		{
			path: '/BusinessDetail',
			name: {userType:'3'},
			component: resolve =>
				require(["../components/Business/BusinessDetail.vue"], resolve),
			meta: { title: '商家管理详情' },
		},
		//提前还款管理列表
		{
			path: '/beforRefundManage',
			name:  {userType:'3'},
			component: resolve =>
				require(["../components/beforRefundManage/beforRefundManage.vue"], resolve),
			meta: { title: '提前还款管理' },
		},
		// 代付管理 ——  今日还款列表
		{
			path: '/todayRefundList',
			name: {userType:'3'},
			component: resolve =>
				require(["../components/replaceManage/todayRefundList.vue"], resolve),
			meta: { title: '今日还款列表' },
		},
		// 代付管理 ——  代付明细列表
		{
			path: '/replaceDatail',
			name: {userType:'3'},
			component: resolve =>
				require(["../components/replaceManage/replaceDatail.vue"], resolve),
			meta: { title: '代付明细' },
		},
		// 代付管理 ——  已逾期列表
		{
			path: '/overdueList',
			name: {userType:'3'},
			component: resolve =>
				require(["../components/replaceManage/overdueList.vue"], resolve),
			meta: { title: '逾期列表' },
		},
		// 代付管理 ——  收款明细列表
		{
			path: '/gatheringDatail',
			name: {userType:'3'},
			component: resolve =>
				require(["../components/replaceManage/gatheringDatail.vue"], resolve),
			meta: { title: '收款明细' },
		},
		// 逾期催收管理列表
		{
			path: '/overdueCollectionManage',
			name: {userType:'3'},
			component: resolve =>
				require(["../components/overdueCollectionManage/overdueCollectionManage.vue"], resolve),
			meta: { title: '逾期催收管理' },
		},
		// 供应商管理
		{
			path: '/supplierManagementList',
			name: {userType:'3'},
			component: resolve =>
				require(["../components/supplierManagement/supplierManagementList.vue"], resolve),
			meta: { title: '供应商管理列表' },
		},
		// 供应商管理 —— 添加供应商
		{
			path: '/supplierAdd',
			name: {userType:'3'},
			component: resolve =>
				require(["../components/supplierManagement/supplierAdd.vue"], resolve),
			meta: { title: '供应商增加' },
		},
		// 供应商管理 —— 编辑供应商
		{
			path: '/supplierUpdate',
			name: {userType:'3'},
			component: resolve =>
				require(["../components/supplierManagement/supplierUpdate.vue"], resolve),
			meta: { title: '供应商编辑' },
		},
		// 供应商管理 —— 查看供应商
		{
			path: '/supplierDetail',
			name:  {userType:'3'},
			component: resolve =>
				require(["../components/supplierManagement/supplierDetail.vue"], resolve),
			meta: { title: '供应商详情' },
		},
		// 商品管理 —— 列表
		{
			path: '/commodityManagementList',
			name: {userType:'3'},
			component: resolve =>
				require(["../components/commodityManagement/commodityManagementList.vue"], resolve),
			meta: { title: '商品管理列表' },
		},// 商品管理 —— 新增商品
		{
			path: '/commodityManagementAdd',
			name: {userType:'3'},
			component: resolve =>
				require(["../components/commodityManagement/commodityManagementAdd.vue"], resolve),
			meta: { title: '新增商品' },
		},// 商品管理 —— 修改商品
		{
			path: '/commodityManagementUpdate',
			name: {userType:'3'},
			component: resolve =>
				require(["../components/commodityManagement/commodityManagementUpdate.vue"], resolve),
			meta: { title: '修改商品' },
		},

		// 自营订单管理 —— 列表
		{
			path: '/proprietaryOrdersList',
			name:  {userType:'3'},
			component: resolve =>
				require(["../components/proprietaryOrders/proprietaryOrdersList.vue"], resolve),
			meta: { title: '自营订单列表' },
		},
		// 自营订单管理 —— 详情
		{
			path: '/proprietaryOrderDetail',
			name:  {userType:'3'},
			component: resolve =>
				require(["../components/proprietaryOrders/proprietaryOrderDetail.vue"], resolve),
			meta: { title: '自营订单详情' },
		},
		// 评价管理  —— 列表
		{
			path:'/evaluateList',
			name:{userType:'3'},
			component: resolve =>
				require(["../components/evaluate/evaluate_list.vue"], resolve),
			meta: { title: '评价订单列表' },
		},
		// 评价管理  —— 详情
		{
			path:'/evaluateDetails',
			name:{userType:'3'},
			component: resolve =>
				require(["../components/evaluate/evaluate_details.vue"], resolve),
			meta: { title: '评价订单详情' },
		},
		// 退款/售后  —— 列表
		{
			path:'/refundList',
			name:{userType:'3'},
			component: resolve =>
				require(["../components/refund/refundList.vue"], resolve),
			meta: { title: '退款售后列表' },
		},
		// 退款/售后 —— 详情
		{
			path:'/refundDetails',
			name:{userType:'3'},
			component: resolve =>
				require(["../components/refund/refundDetails.vue"], resolve),
			meta: { title: '退款售后详情' },
		},
		// 商城频道配置  —— 列表5.29
		{
			path:'/MallChannelList',
			name:{userType:'3'},
			component: resolve =>
				require(["../components/ChannelConfigurationInMall/MallChannel_list.vue"], resolve),
			meta: { title: '商城频道配置' },
		},
		// 商城频道配置  —— 详情
		{
			path:'/MallChannelDetails',
			name:{userType:'3'},
			component: resolve =>
				require(["../components/ChannelConfigurationInMall/MallChannel_details.vue"], resolve),
			meta: { title: '商城频道配置详情' },
		},
		// 商城频道配置  —— 编辑
		{
			path:'/MallChannelUpdate',
			name:{userType:'3'},
			component: resolve =>
				require(["../components/ChannelConfigurationInMall/MallChannel_update.vue"], resolve),
			meta: { title: '商城频道配置编辑' },
		},
		// 商城频道配置  —— 添加
		{
			path:'/MallChannelAdd',
			name:{userType:'3'},
			component: resolve =>
				require(["../components/ChannelConfigurationInMall/MallChannel_add.vue"], resolve),
			meta: { title: '商城频道配置添加' },
		},
		//课程管理 —— 门店列表
		{
			path: '/YallShopMsg',
			name: {userType:'3'},
			component: resolve =>
				require(["../components/YshopManagement/YallShopMsg.vue"], resolve),
			meta: { title: '课程管理列表' },
		},
		//课程管理 —— 课程管理
		{
			path: '/YshopManagement',
			name: {userType:'3'},
			component: resolve =>
				require(["../components/YshopManagement/YshopManagement.vue"], resolve),
			meta: { title: '课程管理' },
		},
		//课程管理 —— 修改/添加列表
		{
			path: '/YaddorputCouser',
			name: {userType:'3'},
			component: resolve =>
				require(["../components/YshopManagement/YaddorputCouser.vue"], resolve),
			meta: { title: ['添加课程', '编辑课程']},
		},
		//费率配置 
		{
			path: '/rateAllocation',
			name: {userType:'3'},
			component: resolve =>
				require(["../components/rateAllocation/rateAllocation.vue"], resolve),
			meta: { title: '费率配置' },
		},
		//代理商交易账单
		{
			path: '/agentBill',
			name: {userType:'3'},
			component: resolve =>
				require(["../components/agentBill/agentBill.vue"], resolve),
			meta: { title: '代理商交易账单' },
		},
		//平台交易账单
		{
			path: '/platformBilling',
			name: {userType:'3'},
			component: resolve =>
				require(["../components/platformBilling/platformBilling.vue"], resolve),
			meta: { title: '平台交易账单' },
		},
		//分润系数配置
		{
			path: '/distributionAllocation',
			name: {userType:'3'},
			component: resolve =>
				require(["../components/distributionAllocation/distributionAllocation.vue"], resolve),
			meta: { title: '分润系数配置' },
		},
		//代理商管理agentManagement
		{
			path: '/agentManagement',
			name: {userType:'3'},
			component: resolve =>
				require(["../components/agentManagement/agentManagement.vue"], resolve),
			meta: { title: '代理商管理' },
		},
		//代理商管理详情
		{
			path: '/agentManagementDetail',
			name: {userType:'3'},
			component: resolve =>
				require(["../components/agentManagement/agentManagementDetail.vue"], resolve),
			meta: { title: '代理商管理详情' },
		},
		//加盟中心
		{
			path: '/franchiseCenter',
			name: {userType:'3'},
			component: resolve =>
				require(["../components/franchiseCenter/franchiseCenter.vue"], resolve),
			meta: { title: '加盟中心' },
		},
		//加盟中心详情
		{
			path: '/franchiseCenterDetail',
			name: {userType:'3'},
			component: resolve =>
				require(["../components/franchiseCenter/franchiseCenterDetail.vue"], resolve),
			meta: { title: '加盟中心详情' },
		},

		// 商家登录
		//课程管理 —— 门店列表
		{
			path: '/allShopMsg',
			name: {userType:'1'},
			component: resolve =>
				require(["../components/shopManagement/allShopMsg.vue"], resolve),
			meta: { title: '课程管理列表' },
		},
		//课程管理 —— 课程管理
		{
			path: '/shopManagement',
			name: {userType:'1'},
			component: resolve =>
				require(["../components/shopManagement/shopManagement.vue"], resolve),
			meta: { title: '课程管理' },
		},
		//课程管理 —— 修改/添加列表
		{
			path: '/addorputCouser',
			name: {userType:'1'},
			component: resolve =>
				require(["../components/shopManagement/addorputCouser.vue"], resolve),
			meta: { title: ['添加课程', '编辑课程']},
		},
		

		//门店管理 —— 门店列表
		{
			path: '/storeList',
			name: {userType:'1'},
			component: resolve =>
				require(["../components/storeManagementList/storeList.vue"], resolve),
			meta: { title: '门店管理列表' },
		},
		//门店管理 —— 门店管理详情页
		{
			path: '/storeDetails',
			name: {userType:'1'},
			component: resolve =>
				require(["../components/storeManagementList/storeDetails.vue"], resolve),
			meta: { title: '门店管理详情页' },
		}
		]
	},
	{
		path: '/staff',
		name: 'staff',
		component: resolve =>
			require(["../components/login/staff.vue"], resolve),
		meta: { title: '运营登录' },
	},
	{
		path: '/creditAuthorizationAgreement',
		name: {userType:'3'},
		component: resolve =>
			require(["../components/modelAgreement/creditAuthorizationAgreement.vue"], resolve),
		meta: { title: '征信授权协议' },
	},
	{
		path: '/confirmationElectronic',
		name: {userType:'3'},
		component: resolve =>
			require(["../components/modelAgreement/confirmationElectronic.vue"], resolve),
		meta: { title: '授权电子合同确认书' },
	},
	{
		path: '/powerAttorney',
		name: {userType:'3'},
		component: resolve =>
			require(["../components/modelAgreement/powerAttorney.vue"], resolve),
		meta: { title: '授权委托书' },
	},
	{
		path: '/upload',
		name: 'upload',
		component: resolve =>
			require(["../components/upload.vue"], resolve),
		meta: { title: '789' },
	}
	]
})

router.beforeEach((to, from, next) => {
	// setTimeout(() => {
	// 	var _hmt = _hmt || [];
	// 	(function () {
	// 		//每次执行前，先移除上次插入的代码
	// 		document.getElementById('cnzz_tj') && document.getElementById('cnzz_tj').remove();
	// 		var hm = document.createElement("script");
	// 		hm.src = '/static/upload.js'
	// 		hm.language = 'JavaScript'
	// 		//添加id
	// 		hm.id = "cnzz_tj"
	// 		var s = document.getElementsByTagName("script")[0];
	// 		s.parentNode.insertBefore(hm, s);
	// 	})();
	// }, 0);


	next();
	if (to.path !== '/staff' && to.path !== '*' && to.path !=='/') {
		API('get', 'islogin', {}, sessionStorage.getItem('userid'), sessionStorage.getItem('token'), (res) => {
		}, (res) => {
			next('/');
		}, (res) => {
			next('/');
		})
		console.log(sessionStorage.getItem('userType'))
		console.log(to.name.userType)
		if (sessionStorage.getItem('userType') !== to.name.userType) {
			if(to.name.userType == 1){
				next('/');
			}else if(to.name.userType == 3){
				next('/staff')
			}
		}
	}


});
export default router;