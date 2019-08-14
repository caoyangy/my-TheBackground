<template>
	<div class="flex side_sdx">
		<!--头部信息-->
		
		<div class="H_t flex side_sdx mainAlign_center">
			<div>退款售后</div>
			<div>
				<span class="colorCCC ">首页</span>
				&nbsp;&nbsp; /&nbsp;&nbsp;
				<router-link class="colorCCC blod" to="/refundList">退款售后</router-link>
			</div>
		</div>
		<div class="list">

			<div class=" search_box ">
				<Form :model="searchData" :rules="searchData" ref='searchData' inline>
                    <FormItem prop="shopName">
                        <Input :style="input_width" icon="ios-search" v-model="searchData.shopName"
                            placeholder="退款单id、商家名称"></Input>
                    </FormItem>
					 <FormItem prop="phoneNum">
                        <Input :style="input_width" icon="ios-search" v-model="searchData.phoneNum"
                            placeholder="用户手机号"></Input>
                    </FormItem>
                    <FormItem label="申请时间" :label-width="80" prop="beginDate">
                        <DatePicker type="date" placeholder="起始时间" :style="selectStyle" @on-change="createChange" v-model="searchData.beginDate">
                        </DatePicker>
                    </FormItem>
                    <FormItem :label-width="15" label="-" prop="endDate">
                        <DatePicker type="date" placeholder="截止时间" :style="selectStyle" @on-change="TransactionChange" v-model="searchData.endDate">
                        </DatePicker>
                    </FormItem>
                    <FormItem label="退款状态" :label-width="80" prop="refundState" >
                        <Select placeholder="请选择" v-model="searchData.refundState" :style="selectStyle">
                            <Option :value="item.value" v-for="(item,i) in evaluateTypeList" :key="i">{{item.label}}
                            </Option>
                        </Select>
                    </FormItem>
					<div class=" search_btn ">
						<button @click=" searchList "> 搜索 </button>
						<button @click=" clearVal "> 清空 </button>
					</div>
                </Form>
				<div style=" clear:both "></div>
			</div>

			<div class="list_data">
				<!--列表头部-->
				<div class="list_data_h flex main_zdy mainAlign_around">
					<div>订单ID</div>
					<div>用户手机号</div>
                    <div>商家名称</div>
					<div>申请时间</div>
					<div>课程名称</div>
					<div>课程价格</div>
					<div>数量</div>
					<div>退款金额</div>
					<div>退款状态</div>
					<div>操作</div>
				</div>
				<!--数据列表-->
				<div class="list_data_c flex main_zdy mainAlign_around" v-for="(item,index) in listOrder" :key="index">
					<div :title="item.orderId">{{item.orderId}}</div>
					<div>{{item.mgOrder.phoneNum}}</div>
					<div :title="item.mgOrder.shopName">{{item.mgOrder.shopName}}</div>
					<div>{{item.createTime}}</div>
					<div :title="item.goodsName">{{item.goodsName}}</div>
                    <div >{{item.goodsPrice}}</div>
					<div>{{item.buyNum}}</div>
					<div>￥{{item.refundPrice}}</div>
					<div>
                        <div v-if="item.refundState==1">退款处理中</div>
                        <div v-if="item.refundState==2">退款成功</div>
                        <div v-if="item.refundState==3">退款失败</div>
                        <div v-if="item.refundState==4">退款拒绝</div>
                        <div v-if="item.refundState==5">退款关闭</div>
						<div v-if="item.refundState==6">银行处理中</div>
					</div>
                    <!-- 0:交易取消;1:退款申请中;2:退款成功;3:退款拒绝;4:退款处理中;5:退款失败 -->
					<div class="flex sideAlign_center mainAlign_center">
                        <button @click="audit(item.orderId)">查看</button>
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
				input_width: 'width: 180px',
                selectStyle: "width: 170px",
                searchData: {
                    shopName: '',
                    beginDate: '',
                    endDate: '',
					phoneNum: "",
					refundState:"",
				},
				evaluateTypeList: [
                    {
                        label: '退款申请中',
                        value: '1',
                    },
                    {
                        label: '退款成功',
                        value: '2',
                    },
                    {
                        label: '退款失败',
                        value: '5',
                    }
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
			this.List();
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
						path:'/refundDetails',
						query: {
							id: id,
							agencyInfoId:agencyInfoId
						}
					})

			},
			List() {
				const params = {
					...this.searchData,
					"currentPage": this.Page.current,
					"pageSize":this.Page.pageSize
				};
				var data = "";
				for (var i in params) {
					data +=
					encodeURIComponent(i) + "=" + encodeURIComponent(params[i]) + "&";
				}
				//获取列表
				this.$API('post',
				    'mgreturn/backGroundQueryShopReturnList',
				    params,
				    this.userid,
					this.token, (res) => {
						var	data = res.data.data.list;
                        var aa=''
                        
						for(var i=0;i<data.length;i++){
                            data[i].goodsName=data[i].mgOrderGoods.goodsName
                            data[i].buyNum=data[i].mgOrderGoods.buyNum
                            data[i].goodsPrice=data[i].mgOrderGoods.goodsPrice
							aa=moment(data[i].createTime).format('YYYY-MM-DD HH:mm:ss')
                            data[i].createTime=aa
                        }
                        this.listOrder=data
					this.Page.total = res.data.data.total;
				}, (res) => {

				}, (res) => {

				}
				)
			},
			evaluateIdChange(val){
				console.log(this.searchData.refundState)
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
				}
				this.List()
			},
			searchList: function () {
				this.List(this.stateType, this.Page.current*1, this.Page.pageSize, this.userid, this.token);
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
