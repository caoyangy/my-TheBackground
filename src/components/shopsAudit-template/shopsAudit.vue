<template>
	<div class="flex side_sdx">
		<!--头部信息-->
		<div class="H_t flex side_sdx mainAlign_center">
			<div>商家资质审核</div>
			<div>
				<router-link class="colorCCC " to="/shopsAudit">入驻中心</router-link>
				&nbsp;&nbsp; /&nbsp;&nbsp;
				<router-link class="colorCCC blod" to="/shopsAudit">商家资质审核</router-link>
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
					<input type="text" v-model=" searchVal.searchName " placeholder="请输入需要筛选的门店名称">
				</div>

				<div class=" search_input ">
					<input type="text" v-model=" searchVal.searchAddress " placeholder="请输入需要筛选的详细地址">
				</div>

				<div class=" search_input ">
					<input type="text" v-model=" searchVal.searchCharger " placeholder="请输入需要筛选的商家负责人">
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
					<div>流水号</div>
					<div>申请时间</div>
					<div>门店名称</div>
					<div>所在城市</div>
					<div>详细地址</div>
					<div>门店电话</div>
					<div>经营品类</div>
					<div>创建时间</div>
					<div>状态</div>
					<div>操作</div>
				</div>
				<!--数据列表-->
				<div class="list_data_c flex main_zdy mainAlign_around" v-for="(item,index) in listOrder" :key='index'>
					<div :title="item.id">{{item.id}}</div>
					<div v-if="item.createDate != ''">{{item.createDate}}</div>
					<div v-else>{{item.storeInfo.createDate}}</div>
					<div :title="item.storeInfo.name">{{item.storeInfo.name}}</div>
					<div>{{item.storeInfo.county}}</div>
					<div :title="item.storeInfo.address">{{item.storeInfo.address}}</div>
					<div>{{item.storeInfo.tel}}</div>
					<div>{{item.storeInfo.categoryName}}</div>
					<div>{{item.storeInfo.createDate}}</div>
					<div v-if=" item.status == '1001' ">新订单</div>
					<div v-if=" item.status == '1002' ">补件订单</div>
					<div v-if=" item.status == '1008' ">复审驳回</div>
					<div v-if=" item.status == '1007' ">初审拒绝</div>
					<div v-if=" item.status == '1006' ">初审驳回</div>
					<div v-if=" item.status == '1005' ">复审打回</div>
					<div v-if=" item.status == '1004' ">初审存疑</div>
					<div v-if=" item.status == '1003' ">初审通过</div>
					<div v-if=" item.status == '1009' ">复审拒绝</div>
					<div v-if=" item.status == '1010' ">复审通过</div>
					<div v-if=" item.status == '1012' ">入驻成功</div>
					<div v-if=" item.status == '1000' ">待补充资料</div>
					<div v-if=" item.status == '1011' ">开户处理中</div>
					<div v-if=" item.status == ''">待补充资料</div>
					<div class="flex sideAlign_center mainAlign_center" v-if="item.status == '1001' || item.status == '1002' || item.status == '1003'"><button @click="audit(item.id,item.status,item)">审核</button></div>
					<div class="flex sideAlign_center mainAlign_center" v-else><button @click="audit(item.id,item.status,item)">查看</button>
					</div>
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
				</div>
			</div>
			<div class="list_data" v-if='stateName == "待初审"'>
				<!--列表头部-->
				<div class="list_data_h flex main_zdy mainAlign_around">
					<div>流水号</div>
					<div>申请时间</div>
					<div>门店名称</div>
					<div>所在城市</div>
					<div>详细地址</div>
					<div>门店电话</div>
					<div>经营品类</div>
					<div>创建时间</div>
					<div>状态</div>
					<div>操作</div>
				</div>
				<!--数据列表-->
				<div class="list_data_c flex main_zdy mainAlign_around" v-for="(item,index) in listOrder" :key="index">
					<div :title="item.id">{{item.id}}</div>
					<div>{{item.createDate}}</div>
					<div :title="item.storeInfo.name">{{item.storeInfo.name}}</div>
					<div> {{ item.storeInfo.county }} </div>
					<div :title="item.storeInfo.address">{{item.storeInfo.address}}</div>
					<div>{{item.storeInfo.tel}}</div>
					<div>{{item.storeInfo.categoryName}}</div>
					<div>{{item.storeInfo.createDate}}</div>
					<div v-if=" item.status == '1001' ">新订单</div>
					<div v-if=" item.status == '1002' ">补件订单</div>
					<div v-if=" item.status == '1008' ">复审驳回</div>
					<div v-if=" item.status == '1007' ">初审拒绝</div>
					<div v-if=" item.status == '1005' ">复审打回</div>
					<div v-if=" item.status == '1004' ">初审存疑</div>
					<div v-if=" item.status == '1003' ">初审通过</div>
					<div v-if=" item.status == '1009' ">复审拒绝</div>
					<div v-if=" item.status == '1010' ">复审通过</div>

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
					<div class="flex sideAlign_center mainAlign_center"><button
							@click="audit(item.id,item.status,item)">审核</button></div>
				</div>
			</div>

			<div class="list_data" v-if='stateName == "待复审"'>
				<!--列表头部-->
				<div class="list_data_h flex main_zdy mainAlign_around">
					<div>流水号</div>
					<div>申请时间</div>
					<div>门店名称</div>
					<div>所在城市</div>
					<div>详细地址</div>
					<div>门店电话</div>
					<div>经营品类</div>
					<div>创建时间</div>
					<div>状态</div>
					<div>操作</div>
				</div>
				<!--数据列表-->
				<div class="list_data_c flex main_zdy mainAlign_around" v-for="(item,index) in listOrder" :key="index">
					<div :title="item.id">{{item.id}}</div>
					<div>{{item.createDate}}</div>
					<div :title="item.storeInfo.name">{{item.storeInfo.name}}</div>
					<div>{{item.storeInfo.county}}</div>
					<div :title="item.storeInfo.address">{{item.storeInfo.address}}</div>
					<div>{{item.storeInfo.tel}}</div>
					<div>{{item.storeInfo.categoryName}}</div>
					<div>{{item.storeInfo.createDate}}</div>
					<div v-if=" item.status == '1001' ">新订单</div>
					<div v-if=" item.status == '1002' ">补件订单</div>
					<div v-if=" item.status == '1008' ">复审驳回</div>
					<div v-if=" item.status == '1006' ">初审驳回</div>
					<div v-if=" item.status == '1007' ">初审拒绝</div>
					<div v-if=" item.status == '1005' ">复审打回</div>
					<div v-if=" item.status == '1004' ">初审存疑</div>
					<div v-if=" item.status == '1003' ">初审通过</div>
					<div v-if=" item.status == '1009' ">复审拒绝</div>
					<div v-if=" item.status == '1010' ">复审通过</div>
					<div class="flex sideAlign_center mainAlign_center"><button @click="audit(item.id,item.status,item)">审核</button>
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
						'id': '2'
					},
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
			audit: function (id, status,item) {
				console.log(id)
				var itemS= JSON.stringify(item)
				console.log(itemS)
				localStorage.setItem('item',itemS);
				var type = escape(this.stateName);
				this.$router.push({
						path: '/UnionPayShopsLocated',
						query:{
							id: id,
							type:type,
							status:status,
							item:item
						}
					})
				// console.log(receivedType)
				// var type = escape(this.stateName);
				// if (receivedType == 2) {
				// 	console.log(1)
					
				// } else if(receivedType == 1) {
				// 	console.log(2)
				// 	this.$router.push({
				// 		path: '/UnionPayShopsLocated',
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
				//获取列表
				this.$API('post', 'examine/findByEntity', {
					"status": type,
					"name": searchVal.searchName,
					"address": searchVal.searchAddress,
					"charger": searchVal.searchCharger,
					"currentPage": current,
					"pageSize": pageSize
				}, userid, token, (res) => {
					this.listOrder = [];
					this.listOrder = res.data.data.list;
					this.Page.total = res.data.data.total;
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