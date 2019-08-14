<template>
	<div class="flex side_sdx">
		<!--头部信息-->
		<div class="H_t flex side_sdx mainAlign_center">
			<div>加盟中心</div>
			<div>
				<router-link class="colorCCC " to="/franchiseCenter">首页</router-link>
				&nbsp;&nbsp; /&nbsp;&nbsp;
				<router-link class="colorCCC blod" to="/franchiseCenter">加盟中心</router-link>
			</div>
		</div>
		<!--列表-->
		<div class=" list_header ">
			<div class="list_h flex main_zdy sideAlign_center">
				<button v-for='(item,index) in state' :key="index"
					:class="stateName == item.name?'list_h_btnon' :'list_h_btn'"
					@click="stateon(item.name,item.id)">{{item.name}}</button>
			</div>
		</div>
		<div class="list">

			<div class=" search_box ">

				<div class=" search_input ">
					<input type="text" v-model=" searchVal.searchName " placeholder="请输入搜索关键字">
				</div>

				<div class=" search_btn ">
					<button @click=" searchList "> 搜索 </button>
					<button @click=" clearVal "> 清空 </button>
				</div>

				<div style=" clear:both "></div>
			</div>
			<div class="list_data" v-if='stateName == "全部"'>
				<!--列表头部-->
				<div class="list_data_h flex main_zdy mainAlign_around">
					<div>申请时间</div>
					<div>公司名称</div>
					<div>公司所在地</div>
					<div> 联系人姓名 </div>
					<div>联系人手机号</div>
					<div>联系人邮箱</div>
					<div>直营团队人数</div>
					<div>申请理由</div>
					<div>推荐公司</div>
                    <div>状态</div>
					<div>操作</div>
				</div>
				<!--数据列表-->
				<div class="list_data_c flex main_zdy mainAlign_around" v-for="(item,index) in listOrder" :key="index">
					<div :title="item.createDate">{{item.createDate}}</div>
					<div :title="item.agencyName">{{item.agencyName}}</div>
					<div :title="item.companyAddress">{{item.companyAddress}}</div>
					<div> {{ item.principalName}} </div>
					<div :title="item.principalPhone">{{item.principalPhone}}</div>
					<div>{{item.principalMail}}</div>
					<div>{{item.teamNumber}}</div>
					<div :title="item.applyReason">{{item.applyReason}}</div>
                    <div :title="item.recommendCompanyName">{{item.recommendCompanyName}}</div>
					<div v-if=" item.agencyStatus == '1' ">待初审</div>
					<div v-if=" item.agencyStatus == '2' ">初审驳回</div>
					<div v-if=" item.agencyStatus == '3' ">待提交审核资质</div>
					<div v-if=" item.agencyStatus == '4' ">待复审</div>
					<div v-if=" item.agencyStatus == '5' ">复审驳回</div>
					<div v-if=" item.agencyStatus == '6' ">待签约</div>
					<div v-if=" item.agencyStatus == '7' ">签约成功</div>
					<!-- 状态1待初审、2初审驳回、3 待提交审核资质 4待复审、5复审驳回 6待签约 7签约成功 不传查所有 -->
					<!-- "1000":"待补充资料",
					"1011":"开户处理中",
					"1010":"待开户",
					"1008":"复审驳回",
					"1007":"初审拒绝",
					"1006":"初审驳回",
					"1005":"复审打回",
					"1004":"初审存疑",
					"1003":"初审通过",
					"1002":"补件订单",
					"1001":"新订单",
					"1012":"入驻成功",
					"1009":"复审拒绝" -->
					<div class="flex sideAlign_center mainAlign_center">
						<button v-if="item.agencyStatus=='1' || item.agencyStatus=='4' " @click="audit(item.id,item.agencyStatus)">审核</button>
						<button v-if="item.agencyStatus=='5' || item.agencyStatus=='2' || item.agencyStatus=='7'|| item.agencyStatus=='3' " @click="audit(item.id,item.agencyStatus)">查看</button>
                        <button v-if="item.agencyStatus=='6' " @click="audit(item.id,item.agencyStatus)">签约</button>
                        <!-- <button @click="audit(item.id,item.storeInfo.receivedType)">查看</button> -->
                    </div>
				</div>
			</div>
			<div class="list_data" v-if='stateName == "待初审"'>
				<!--列表头部-->
				<div class="list_data_h flex main_zdy mainAlign_around">
					<div>申请时间</div>
					<div>公司名称</div>
					<div>公司所在地</div>
					<div> 联系人姓名 </div>
					<div>联系人手机号</div>
					<div>联系人邮箱</div>
					<div>直营团队人数</div>
					<div>申请理由</div>
					<div>推荐公司</div>
                    <div>状态</div>
					<div>操作</div>
				</div>
				<!--数据列表-->
				<div class="list_data_c flex main_zdy mainAlign_around" v-for="(item,index) in listOrder" :key="index">
					<div :title="item.createDate">{{item.createDate}}</div>
					<div>{{item.agencyName}}</div>
					<div>{{item.companyAddress}}</div>
					<div> {{ item.principalName}} </div>
					<div :title="item.principalPhone">{{item.principalPhone}}</div>
					<div>{{item.principalMail}}</div>
					<div>{{item.teamNumber}}</div>
					<div>{{item.applyReason}}</div>
                    <div>{{item.recommendCompanyName}}</div>
					<div v-if=" item.agencyStatus == '1' ">待初审</div>
					<div v-if=" item.agencyStatus == '2' ">初审驳回</div>
					<div v-if=" item.agencyStatus == '3' ">待提交审核资质</div>
					<div v-if=" item.agencyStatus == '4' ">待复审</div>
					<div v-if=" item.agencyStatus == '5' ">复审驳回</div>
					<div v-if=" item.agencyStatus == '6' ">待签约</div>
					<div v-if=" item.agencyStatus == '7' ">签约成功</div>
					<!-- "1000":"待补充资料",
					"1011":"开户处理中",
					"1010":"待开户",
					"1008":"复审驳回",
					"1007":"初审拒绝",
					"1006":"初审驳回",
					"1005":"复审打回",
					"1004":"初审存疑",
					"1003":"初审通过",
					"1002":"补件订单",
					"1001":"新订单",
					"1012":"入驻成功",
					"1009":"复审拒绝" -->
					<div class="flex sideAlign_center mainAlign_center">
						<button v-if="item.agencyStatus=='1' || item.agencyStatus=='4' " @click="audit(item.id,item.agencyStatus)">审核</button>
						<button v-if="item.agencyStatus=='5' || item.agencyStatus=='2' || item.agencyStatus=='7'|| item.agencyStatus=='3' " @click="audit(item.id,item.agencyStatus)">查看</button>
                        <button v-if="item.agencyStatus=='6' " @click="audit(item.id,item.agencyStatus)">签约</button>
                        <!-- <button @click="audit(item.id,item.storeInfo.receivedType)">查看</button> -->
                    </div>
				</div>
			</div>

			<div class="list_data" v-if='stateName == "待复审"'>
				<!--列表头部-->
				<div class="list_data_h flex main_zdy mainAlign_around">
					<div>申请时间</div>
					<div>公司名称</div>
					<div>公司所在地</div>
					<div> 联系人姓名 </div>
					<div>联系人手机号</div>
					<div>联系人邮箱</div>
					<div>直营团队人数</div>
					<div>申请理由</div>
					<div>推荐公司</div>
                    <div>状态</div>
					<div>操作</div>
				</div>
				<!--数据列表-->
				<div class="list_data_c flex main_zdy mainAlign_around" v-for="(item,index) in listOrder" :key="index">
					<div :title="item.createDate">{{item.createDate}}</div>
					<div>{{item.agencyName}}</div>
					<div>{{item.companyAddress}}</div>
					<div> {{ item.principalName}} </div>
					<div :title="item.principalPhone">{{item.principalPhone}}</div>
					<div>{{item.principalMail}}</div>
					<div>{{item.teamNumber}}</div>
					<div>{{item.applyReason}}</div>
                    <div>{{item.recommendCompanyName}}</div>
					<div v-if=" item.agencyStatus == '1' ">待初审</div>
					<div v-if=" item.agencyStatus == '2' ">初审驳回</div>
					<div v-if=" item.agencyStatus == '3' ">待提交审核资质</div>
					<div v-if=" item.agencyStatus == '4' ">待复审</div>
					<div v-if=" item.agencyStatus == '5' ">复审驳回</div>
					<div v-if=" item.agencyStatus == '6' ">待签约</div>
					<div v-if=" item.agencyStatus == '7' ">签约成功</div>
					<!-- "1000":"待补充资料",
					"1011":"开户处理中",
					"1010":"待开户",
					"1008":"复审驳回",
					"1007":"初审拒绝",
					"1006":"初审驳回",
					"1005":"复审打回",
					"1004":"初审存疑",
					"1003":"初审通过",
					"1002":"补件订单",
					"1001":"新订单",
					"1012":"入驻成功",
					"1009":"复审拒绝" -->
					<div class="flex sideAlign_center mainAlign_center">
						<button v-if="item.agencyStatus=='1' || item.agencyStatus=='4' " @click="audit(item.id,item.agencyStatus)">审核</button>
						<button v-if="item.agencyStatus=='5' || item.agencyStatus=='2' || item.agencyStatus=='7'|| item.agencyStatus=='3' " @click="audit(item.id,item.agencyStatus)">查看</button>
                        <button v-if="item.agencyStatus=='6' " @click="audit(item.id,item.agencyStatus)">签约</button>
                        <!-- <button @click="audit(item.id,item.storeInfo.receivedType)">查看</button> -->
                    </div>
				</div>
			</div>

			<div class="list_data" v-if='stateName == "待签约"'>
				<!--列表头部-->
				<div class="list_data_h flex main_zdy mainAlign_around">
					<div>申请时间</div>
					<div>公司名称</div>
					<div>公司所在地</div>
					<div> 联系人姓名 </div>
					<div>联系人手机号</div>
					<div>联系人邮箱</div>
					<div>直营团队人数</div>
					<div>申请理由</div>
					<div>推荐公司</div>
                    <div>状态</div>
					<div>操作</div>
				</div>
				<!--数据列表-->
				<div class="list_data_c flex main_zdy mainAlign_around" v-for="(item,index) in listOrder" :key="index">
					<div :title="item.createDate">{{item.createDate}}</div>
					<div>{{item.agencyName}}</div>
					<div>{{item.companyAddress}}</div>
					<div> {{ item.principalName}} </div>
					<div :title="item.principalPhone">{{item.principalPhone}}</div>
					<div>{{item.principalMail}}</div>
					<div>{{item.teamNumber}}</div>
					<div>{{item.applyReason}}</div>
                    <div>{{item.recommendCompanyName}}</div>
					<div v-if=" item.agencyStatus == '1' ">待初审</div>
					<div v-if=" item.agencyStatus == '2' ">初审驳回</div>
					<div v-if=" item.agencyStatus == '3' ">待提交审核资质</div>
					<div v-if=" item.agencyStatus == '4' ">待复审</div>
					<div v-if=" item.agencyStatus == '5' ">复审驳回</div>
					<div v-if=" item.agencyStatus == '6' ">待签约</div>
					<div v-if=" item.agencyStatus == '7' ">签约成功</div>
					<!-- "1000":"待补充资料",
					"1011":"开户处理中",
					"1010":"待开户",
					"1008":"复审驳回",
					"1007":"初审拒绝",
					"1006":"初审驳回",
					"1005":"复审打回",
					"1004":"初审存疑",
					"1003":"初审通过",
					"1002":"补件订单",
					"1001":"新订单",
					"1012":"入驻成功",
					"1009":"复审拒绝" -->
					<div class="flex sideAlign_center mainAlign_center">
						<button v-if="item.agencyStatus=='1' || item.agencyStatus=='4' " @click="audit(item.id,item.agencyStatus)">审核</button>
						<button v-if="item.agencyStatus=='5' || item.agencyStatus=='2' || item.agencyStatus=='7'|| item.agencyStatus=='3' " @click="audit(item.id,item.agencyStatus)">查看</button>
                        <button v-if="item.agencyStatus=='6' " @click="audit(item.id,item.agencyStatus)">签约</button>
                        <!-- <button @click="audit(item.id,item.storeInfo.receivedType)">查看</button> -->
                    </div>
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
	import moment from 'moment'
	export default {
		data() {
			return {
				state: [
					{
						'name': '全部',
						'id': ''
					},
					{
						'name': '待初审',
						'id': '1'
					},
					{
						'name': '待复审',
						'id': '4'
					},
					{
						'name': '待签约',
						'id': '6'
					}
				],
				searchVal: {
					searchName: '',
					searchCharger: '',
					searchAddress: '',
				},
				stateName: '全部',
				stateType: '',
				listOrder: [],
				//分页
				Page: {
					total: 0,
					pageSize: 10,
					current: 1
				},
				userid: '',
				token: '',
			}
		},
		created() {
			this.userid = localStorage.getItem('userid');
			this.token = localStorage.getItem('token');
			this.List(this.stateType, this.Page.current, this.Page.pageSize, this.userid, this.token);
		},
		methods: {
			//获取页数
			page(e) {
				this.List(this.stateType, e, this.Page.pageSize, this.userid, this.token)
			},
			//审核
			audit: function (id, receivedType) {
				console.log(receivedType)
				var type = escape(this.stateName);
				this.$router.push({
						path: '/franchiseCenterDetail',
						query: {
							id: id,
							type: type,
							receivedType:receivedType
						}
					})
				// if (receivedType == 2) {
				// 	console.log(1)
				// 	this.$router.push({
				// 		path: '/franchiseCenterDetail',
				// 		query: {
				// 			id: id,
				// 			type: type
				// 		}
				// 	})
				// } else if(receivedType == 1) {
				// 	console.log(2)
				// 	this.$router.push({
				// 		path: '/franchiseCenterDetail',
				// 		query: {
				// 			id: id,
				// 			type: type
				// 		}
				// 	})
				// }

			},
			//切换tab切换
			stateon: function (name, id) {
				this.stateName = name;
				console.log(name)
				this.stateType = id;
				this.Page.current = 1;
				this.List(this.stateType, this.Page.current, this.Page.pageSize, this.userid, this.token);
				this.clearVal()
			},
			//获取列表数据
			List(type, current, pageSize, userid, token) {
				var searchVal = this.searchVal;
				 const params = {
						"agencyStatus": type,
						"currentPage": current,
						"pageSize": pageSize
						};
						var data = "";
				for (var i in params) {
					data +=
					encodeURIComponent(i) + "=" + encodeURIComponent(params[i]) + "&";
				}
				console.log(data)
				//获取列表
				this.$APIA(
				'post',
				'agencyinfomanager/findByEntity',
				params,
				 userid, token, (res) => {
					this.listOrder = [];
					this.listOrder = res.data.data.list;
					for(var i=0;i<this.listOrder.length;i++ ){
						this.listOrder[i].createDate=moment(this.listOrder[i].createDate).format('YYYY-MM-DD HH:mm:ss')
					}
					this.Page.total = res.data.data.total;
				},(res)=>{
					console.log(res)
				})
			},
			clearVal: function () {
				let searchVal = this.searchVal
				for (let item in searchVal) {
					searchVal[item] = '';
				}
			},
			searchList: function () {
				this.List(this.stateType, this.Page.current, this.Page.pageSize, this.userid, this.token);
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
		border-radius: 4px 4px 0 0;
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
		margin: 30px 0 10px 0;
	}

	.search_box .search_input {
		width: 300px;
		float: left;
	}

	.search_box .search_input input {
		width: 250px;
		height: 30px;
		/* background:rgba(255,255,255,1) url('../../assets/img/all/search.png') no-repeat 275px 7px; */
		background-size: 15px 15px;
		border: 1px solid rgba(231, 234, 236, 1);
		border-radius: 4px;
		font-size: 12px;
		color: rgba(169, 177, 192, 1);
		text-indent: 6px;
	}

	.search_box .search_date {
		float: left;
		margin-left: 10%;
	}

	.search_box .search_date span {
		float: left;
		font-size: 14px;
		font-family: PingFangSC-Medium;
		font-weight: 500;
		color: rgba(104, 106, 108, 1);
		margin-top: 4px;
		margin-right: 10px;
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
		font-size: 14px;
		font-family: PingFangSC-Medium;
		font-weight: 500;
		color: rgba(104, 106, 108, 1);
		margin-top: 4px;
		margin-right: 10px;
	}

	.search_box .search_status select {
		width: 200px;
		height: 30px;
		background: rgba(255, 255, 255, 1);
		border: 1px solid rgba(231, 234, 236, 1);
		border-radius: 4px;
		text-indent: 8px;
	}

	.search_box .search_btn {
		/* float: right; */
	}

	.search_box .search_btn button {
		width: 88px;
		height: 30px;
		background: rgba(82, 176, 149, 1);
		border-radius: 4px;
		color: rgba(255, 255, 255, 1);
		font-size: 14px;
		border: none;
		cursor: pointer;
	}

	.search_box .search_btn button:last-child {
		margin-left: 20px;
	}

	.list_data_c:hover {
		background-color: #f5f5f5;
	}
</style>