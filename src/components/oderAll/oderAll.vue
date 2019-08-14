<template>
	<div class="flex side_sdx">
		<!--头部信息-->
		<div class="H_t flex side_sdx mainAlign_center">
			<div>订单管理</div>
			<div>
				<span class="colorCCC ">首页</span>
				&nbsp;&nbsp; /&nbsp;&nbsp;
				<router-link class="colorCCC blod" to="/oderAll">订单中心</router-link>
			</div>
		</div>
		<div class="list">

			<div class=" search_box ">
				<Form :model="searchData" :rules="searchData" ref='searchData' inline>
                    <FormItem prop="searchName">
                        <Input :style="input_width" icon="ios-search" v-model="searchData.searchName"
                            placeholder="订单id、商家名称"></Input>
                    </FormItem>
					 <FormItem prop="phoneNum">
                        <Input :style="input_width" icon="ios-search" v-model="searchData.phoneNum"
                            placeholder="用户手机号"></Input>
                    </FormItem>
                    <FormItem label="下单时间" :label-width="80" prop="startTime">
                        <DatePicker type="date" placeholder="起始时间" :style="selectStyle" @on-change="createChange" v-model="searchData.startTime">
                        </DatePicker>
                    </FormItem>
                    <FormItem :label-width="15" label="-" prop="endTime">
                        <DatePicker type="date" placeholder="截止时间" :style="selectStyle" @on-change="TransactionChange" v-model="searchData.endTime">
                        </DatePicker>
                    </FormItem>
                    <FormItem label="订单状态" :label-width="80" prop="orderStatus" >
                        <Select placeholder="请选择" v-model="searchData.orderStatus" :style="selectStyle">
                            <Option :value="item.value" v-for="(item,i) in evaluateTypeList" :key="i">{{item.label}}
                            </Option>
                        </Select>
                    </FormItem>
                    <!-- <FormItem prop="provider" :label-width="30">
                        <Select placeholder="请选择" v-model="searchData.provider" :style="selectStyle" @on-change="providerIdChange">
                            <Option :value="item.value" v-for="(item,i) in discussTypeList" :key="i">{{item.label}}
                            </Option>
                        </Select>
                    </FormItem> -->
					<div class=" search_btn ">
						<button @click=" searchList "> 搜索 </button>
						<button @click=" clearVal "> 清空 </button>
					</div>
                    
                </Form>
				<!-- <div class=" search_btn ">
					<button @click=" searchList "> 搜索 </button>
					<button @click=" clearVal "> 清空 </button>
				</div> -->
				<div style=" clear:both "></div>
			</div>

			<div class="list_data">
				<!--列表头部-->
				<div class="list_data_h flex main_zdy mainAlign_around">
					<div>订单ID</div>
					<div>商家名称</div>
                    <div>下单时间</div>
					<div> 课程名称 </div>
					<div>课程价格</div>
					<!-- <div>商品数量</div> -->
					<div>数量</div>
					<div>订单金额</div>
					<div>订单状态</div>
					<div>支付方式</div>
					<div>操作</div>
				</div>
				<!--数据列表-->
				<div class="list_data_c flex main_zdy mainAlign_around" v-for="(item,index) in listOrder" :key="index">
					<div :title="item.orderId">{{item.orderId}}</div>
					<div :title="item.shopName">{{item.shopName}}</div>
					<div>{{item.createTime}}</div>
					<div>{{item.orderGoodsList[0].goodsName}}</div>
					<div>{{item.orderGoodsList[0].goodsAmount}}</div>
					<div>{{item.orderGoodsList[0].buyNum}}</div>
					<div>{{item.orderTotalAmount}}</div>
					<div>
						<div v-if="item.orderStatus==1">待付款</div>
						<div v-if="item.orderStatus==2">待消费</div>
						<div v-if="item.orderStatus==3">交易成功</div>
						<div v-if="item.orderStatus==4">交易关闭</div>
					</div>
                    
					<div >{{item.paymentWay}}</div>
					<div class="flex sideAlign_center mainAlign_center">
                        <button @click="audit(item.orderId)">查看</button>
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
				input_width: 'width: 180px',
                selectStyle: "width: 170px",
                searchData: {
                    searchName: '',
                    startTime: '',
                    endTime: '',
					phoneNum: "",
					orderStatus:"",
				},
				evaluateTypeList: [
                    {
                        label: '待付款',
                        value: '1',
                    },
                    {
                        label: '待消费',
                        value: '2',
                    },
                    {
                        label: '交易成功',
                        value: '3',
                    },
                    {
                        label: '交易关闭',
                        value: '4'
                    },
                ],
				searchVal: {
					searchName: '',
					searchCharger: '',
					searchAddress: '',
				},
				stateType: '1',
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
			this.List(1);
		},
		methods: {
			//获取页数
			page(e) {
				this.Page.current=e*1
				this.List(e)
			},
			//查看
			audit: function (id,agencyInfoId) {
                // var type = escape(this.stateName);
                this.$router.push({
						path:'/userMessageDetails',
						query: {
							id: id,
							agencyInfoId:agencyInfoId
						}
					})

			},
			List(e) {
				// var searchVal = this.searchVal;
				// if(e){
				// 	this.Page.current=e*1
				// }
				console.log(this.searchData)
				if(this.searchData.orderStatu==="undefined"){
					this.searchData.orderStatu=''
				}
				const params = {
					...this.searchData,
					"pageNum": this.Page.current,
					"pageSize":this.Page.pageSize
				};
				var data = "";
				for (var i in params) {
					data +=
					encodeURIComponent(i) + "=" + encodeURIComponent(params[i]) + "&";
				}
				//获取列表
				this.$API('post',
				    'order/queryAllOrders?'+data,
				    {},
				    this.userid,
					this.token, (res) => {
						var	data = res.data.data.list;
						console.log(data)
						var aa=''
						for(var i=0;i<data.length;i++){
							aa=moment(data[i].createTime).format('YYYY-MM-DD HH:mm:ss')
							data[i].createTime=aa
							this.listOrder=data
						}
					this.Page.total = res.data.data.total;
				}, (res) => {

				}
				)
			},
			evaluateIdChange(val){
				console.log(this.searchData.orderStatus)
			},
			  createChange(daterange) {
                // this.searchData.startScoretDateTime = daterange
            },
            // 结束时间
            TransactionChange(daterange) {
                console.log(daterange)
                // this.searchData.endScoreDateTime = daterange
            },
			clearVal: function () {
				let searchData = this.searchData
				for (let item in searchData) {
					searchData[item] = '';
					this.searchData.orderStatus= '';
					console.log(searchData)
				}
				this.List()
			},
			searchList: function () {
				this.List();
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
		/* color: rgba(169, 177, 192, 1); */
		color: #333;
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
		display: inline-block
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