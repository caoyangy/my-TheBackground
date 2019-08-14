<template>
	<div class="flex side_sdx">
		<!--头部信息-->
		<div class="H_t flex side_sdx mainAlign_center">
			<div>代付明细</div>
			<div>
                <span class="colorCCC ">代付管理</span>
				 &nbsp;&nbsp; /&nbsp;&nbsp; 
                <router-link class="colorCCC blod" to="/todayRefundList">代付明细</router-link>
            </div>
		</div>
		<!--列表-->
		<div class="list">

			<div class="list_data" >
				<!--列表头部-->
				<div class="list_data_h flex main_zdy mainAlign_around">
					<div>垫付申请时间</div>
					<div>流水号</div>
					<div>借款人</div>
					<div>本期期数</div>
					<div>应还本息</div>
					<div> 垫付金额 </div>
					<div>垫付状态</div>
				</div>
				<!--数据列表-->
				<div class="list_data_c flex main_zdy mainAlign_around" v-for="(item,index) in listOrder" :key="index">
					<div :title="item.createTime">{{item.createTime}}</div>
					<div>{{item.id}}</div>
					<div>{{item.userName}}</div>
					<div>  {{ item.currentPeriod }} / {{ item.totalPeriod }} </div>
					<div>{{item.principalInterest}}</div>
					<div> 垫付金额 </div>
					<div v-if="item.tradingStatus == '100' "> 处理中 </div>
					<div v-if="item.tradingStatus == '200' "> 已垫付 </div>
					<div v-if="item.tradingStatus == '300' "> 垫付失败 </div>
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
				stateName: '代付明细',
				listOrder: [],
				//分页
				Page: {
					total: 0,
					pageSize: 5,
					current: 1
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
				this.$API('post','transactionRecord/payOrReceiptDetail',{
					"dealType":4,
					"currentPage":current,
  					"pageSize":pageSize
				},userid,token,(res)=>{
					this.listOrder = [];
					this.listOrder = res.data.data.list;
					this.Page.total = res.data.data.total;
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
	.list_data_c:hover{
        background-color: #f5f5f5;
    }
</style>