<template>
	<div class="flex side_sdx">
		<!--头部信息-->
		<div class="H_t flex side_sdx mainAlign_center">
			<div>商家资质审核</div>
			<div>首页&nbsp;&nbsp; /&nbsp;&nbsp; <span style="font-weight: bold;">用户授信核审</span></div>
		</div>
		<!--列表-->
		<div class="list">
			<div class="list_h flex main_zdy sideAlign_center">
				<button v-for='(item,index) in state' :key="index" :class="stateName == item.name?'list_h_btnon' :'list_h_btn'" @click="stateon(item.name,item.id)">{{item.name}}</button>
			</div>
			<div class="list_data" v-if='stateName == "待初审"'>
				<!--列表头部-->
				<div class="list_data_h flex main_zdy mainAlign_around">
					<div>流水号</div>
					<div>申请时间</div>
					<div>城市</div>
					<div>申请人姓名</div>
					<div>商家</div>
					<div>课程</div>
					<div>商品总价</div>
					<div>分期总额</div>
					<div>期数</div>
					<div>课程顾问</div>
					<div>初审结果</div>
					<div>操作</div>
				</div>
				<!--数据列表-->
				<div class="list_data_c flex main_zdy mainAlign_around" v-for='(item,index) in listOrder' :key="index">
					<div :title="item.id">{{item.id}}</div>
					<div :title="item.createDate">{{item.createDate}}</div>
					<div>{{item.instalment.city}}</div>
					<div>{{item.username}}</div>
					<div>{{item.instalment.storeName}}</div>
					<div>{{item.instalment.courseName}}</div>
					<div>{{item.instalment.coursePrice}}</div>
					<div>{{item.instalment.totalPrice}}</div>
					<div>{{item.instalmentAdd.periods}}</div>
					<div>{{item.instalment.adviserName}}</div>
					<div>{{item.status}}</div>
					<div class="flex sideAlign_center mainAlign_center"><button @click="audit(item.id,item.instalment.id,item.instalmentAdd.id,item.instalment.storeId)">审核</button></div>
				</div>
			</div>

			<div class="list_data" v-if='stateName == "待复审"'>
				<!--列表头部-->
				<div class="list_data_h flex main_zdy mainAlign_around">
					<div>流水号</div>
					<div>申请时间</div>
					<div>城市</div>
					<div>申请人姓名</div>
					<div>商家</div>
					<div>课程</div>
					<div>商品总价</div>
					<div>分期总额</div>
					<div>期数</div>
					<div>课程顾问</div>
					<div>初审结果</div>
					<div>操作</div>
				</div>
				<!--数据列表-->
				<div class="list_data_c flex main_zdy mainAlign_around" v-for='(item,index) in listOrder' :key='index'> 
					<div  :title="item.id">{{item.id}}</div>
					<div :title="item.createDate">{{item.createDate}}</div>
					<div>{{item.instalment.city}}</div>
					<div>{{item.username}}</div>
					<div>{{item.instalment.storeName}}</div>
					<div>{{item.instalment.courseName}}</div>
					<div>{{item.instalment.coursePrice}}</div>
					<div>{{item.instalment.totalPrice}}</div>
					<div>{{item.instalmentAdd.periods}}</div>
					<div>{{item.instalment.adviserName}}</div>
					<div>{{item.status}}</div>
					<div class="flex sideAlign_center mainAlign_center"><button @click="audit(item.id,item.instalment.id,item.instalmentAdd.id,item.instalment.storeId)">审核</button></div>
				</div>
			</div>

			<div class="list_data" v-if='stateName == "审核记录"'>
				<!--列表头部-->
				<div class="list_data_h flex main_zdy mainAlign_around">
					<div>流水号</div>
					<div>申请时间</div>
					<div>城市</div>
					<div>申请人姓名</div>
					<div>商家</div>
					<div>课程</div>
					<div>商品总价</div>
					<div>分期总额</div>
					<div>期数</div>
					<div>课程顾问</div>
					<div>复审结果</div>
					<div>操作</div>
				</div>
				<!--数据列表-->
				<div class="list_data_c flex main_zdy mainAlign_around" v-for='(item,index) in listOrder' :key='index'>
					<div :title="item.id">{{item.id}}</div>
					<div :title="item.createDate">{{item.createDate}}</div>
					<div>{{item.instalment.city}}</div>
					<div>{{item.username}}</div>
					<div>{{item.instalment.storeName}}</div>
					<div>{{item.instalment.courseName}}</div>
					<div>{{item.instalment.coursePrice}}</div>
					<div>{{item.instalment.totalPrice}}</div>
					<div>{{item.instalmentAdd.periods}}</div>
					<div>{{item.instalment.adviserName}}</div>
					<div>{{item.status}}</div>
					<div class="flex sideAlign_center mainAlign_center"><button @click="audit(item.id,item.instalment.id,item.instalmentAdd.id,item.instalment.storeId)">查看</button></div>
				</div>
			</div>
			<div class="list_data" v-if='stateName == "待补充资料"'>
				<!--列表头部-->
				<div class="list_data_h flex main_zdy mainAlign_around">
					<div>流水号</div>
					<div>申请时间</div>
					<div>城市</div>
					<div>申请人姓名</div>
					<div>商家</div>
					<div>课程</div>
					<div>商品总价</div>
					<div>分期总额</div>
					<div>期数</div>
					<div>课程顾问</div>
					<div>资料阶段</div>
					<div>操作</div>
				</div>
				<!--数据列表-->
				<div class="list_data_c flex main_zdy mainAlign_around" v-for='(item,index) in listOrder' :key='index'>
					<div :title="item.id">{{item.id}}</div>
					<div :title="item.createDate">{{item.createDate}}</div>
					<div>{{item.instalment.city}}</div>
					<div>{{item.username}}</div>
					<div>{{item.instalment.storeName}}</div>
					<div>{{item.instalment.courseName}}</div>
					<div>{{item.instalment.coursePrice}}</div>
					<div>{{item.instalment.totalPrice}}</div>
					<div>{{item.instalmentAdd.periods}}</div>
					<div>{{item.instalment.adviserName}}</div>
					<div>{{item.status}}</div>
					<div class="flex sideAlign_center mainAlign_center"><button @click="audit(item.id,item.instalment.id,item.instalmentAdd.id,item.instalment.storeId)">查看</button></div>
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
				state: [{
					'name': '待初审',
					'id': 'first'
				}, {
					'name': '待复审',
					'id': 'second'
				}, {
					'name': '审核记录',
					'id': 'end'
				}, {
					'name': '待补充资料',
					'id': 'unfinished'
				}],
				stateName: '待初审',
				stateType: 'first',
				listOrder:[],
				//分页
				Page: {
					total: 0,
					pageSize: 10,
					current: 1
				},
				userid:'',
				token:'',
			}
		},
		created(){
			this.userid = localStorage.getItem('userid');
			this.token = localStorage.getItem('token');
			this.List(this.stateType,this.Page.current,this.Page.pageSize,this.userid,this.token)
		},
		methods: {
			//获取页数
			page(e) {
				this.List(this.stateType,e,this.Page.pageSize,this.userid,this.token)
			},
			//点击审核
			audit: function(id,instalmentId,instalmentAddId,storeId) {
				var type = escape(this.stateName);
				this.$router.push({
					path: '/userMessageDetails',
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
			stateon: function(name,id) {
				this.stateName = name;
				this.stateType = id;
				this.Page.current = 1;
				this.List(this.stateType,this.Page.current,this.Page.pageSize,this.userid,this.token);
			},
			//获取列表
			List(type,current,pageSize,userid,token){
				this.$API('post','order/examineQuery',
					{"status": type,
					"currentPage":current,
  					"pageSize":pageSize},userid,token,(res)=>{
						  //console.log( res.data.data ) 可以请求 暂无数据 2018/11/29
  						this.listOrder = [];
						this.listOrder = res.data.data.list;
						console.log( this.listOrder )
						this.Page.total = res.data.data.total
  					})
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
</style>