<template>
	<div>

		<!--头部信息-->
		<div class="H_t flex side_sdx mainAlign_center">
			<div>商家资质审核</div>
			<div>
                首页&nbsp;&nbsp; /&nbsp;&nbsp; 
                <router-link class="colorCCC " to="/deposit">商家资质审核</router-link>&nbsp;&nbsp; /&nbsp;&nbsp; 
                <router-link class="colorCCC blod" to="/depositDetails">充值</router-link>

            </div>
		</div>

		<div class="pay" style="display: none;">
			<div class="pay_t">充值</div>
			<div class="pay_c">
				<div class="pay_c_d flex main_zdy ">
					<div class='title flex main_ydz' style="padding-top: 7px;">充值方式</div>
					<div class="flex main_zdy sideAlign_center">
						<div v-for='(item,index) in tab' :key="index" :class="tabname == item?'tab_d' :'tab'" @click="tabon(item)">{{item}}</div>
					</div>
				</div>
				<div class="pay_c_d flex main_zdy ">
					<div class='title flex main_ydz'>充值金额</div>
					<div class="flex side_sdx">
						<div><input type="text" name="" id="" value="" placeholder="请输入金额" class="input" onkeyup="value=value.replace(/[^\d]/g,'') " ng-pattern="/[^a-zA-Z]/" /> <span class="unit">元</span></div>
						<div class="lowest">单笔充值最低100元</div>
					</div>
				</div>
				<div class="pay_c_d flex main_zdy ">
					<div class='title flex main_ydz'>手续费</div>
					<div class="price">0.00元</div>
				</div>
				<div class="pay_c_d flex main_zdy ">
					<div class='title flex main_ydz'>实际到账</div>
					<div class="price">0.00元</div>
				</div>
				
				<div class="hint">
					<button class="btn">确认充值</button>
					<div class="snug">温馨提示：</div>
					<div class="news">1、平台单笔充值最低100元，具体限额依据各银行限额为准；</div>
					<div class="news">2、请使用借记卡充值；</div>
					<div class="news">3、银行卡余额不足需要先补充金额后再次充值；</div>
					<div class="news">4、如存在银行卡状态异常，请联系银行做取消挂失或补卡处理；</div>
					<div class="service">
						<span>如需帮助请致电客服：</span>
						<span>400-139-1166</span>
					</div>
				</div>
			</div>
		</div>

		<div class="pay" >
			<div class="pay_t">提现</div>
			<div class="pay_c">
				<div class="pay_c_d flex main_zdy ">
					<div class='title flex main_ydz'>账户余额</div>
					<div class="price">0.00元</div>
				</div>
				<div class="pay_c_d flex main_zdy ">
					<div class='title flex main_ydz'>提现至银行卡</div>
					<div class="price flex main_zdy sideAlign_center">
						<div class="bankimg">
							<!--<img src="../../assets/img/bank/AgBank.png" class="bankCard" />-->
							<img src="../../assets/img/bank/BOB.png" class="bankCard" />
							<!--<img src="../../assets/img/bank/BOC.png" class="bankCard" />
							<img src="../../assets/img/bank/BOCOM.png" class="bankCard" />
							<img src="../../assets/img/bank/CCB.png" class="bankCard" />
							<img src="../../assets/img/bank/CEB.png" class="bankCard" />
							<img src="../../assets/img/bank/CGB.png" class="bankCard" />
							<img src="../../assets/img/bank/CIB.png" class="bankCard" />
							<img src="../../assets/img/bank/CMB.png" class="bankCard" />
							<img src="../../assets/img/bank/CMSB.png" class="bankCard" />
							<img src="../../assets/img/bank/CNCB.png" class="bankCard" />
							<img src="../../assets/img/bank/ICBC.png" class="bankCard" />
							<img src="../../assets/img/bank/postal.png" class="bankCard" />
							<img src="../../assets/img/bank/SPDB.png" class="bankCard" />
							<img src="../../assets/img/bank/SZPAB.png" class="bankCard" />
							<img src="../../assets/img/bank/HXB.png" class="bankCard" />-->
						</div>
						中国工商银行 尾号4777
					</div>
				</div>
				<div class="pay_c_d flex main_zdy ">
					<div class='title flex main_ydz'>提现金额</div>
					<div class="flex side_sdx">
						<div><input type="text" name="" id="" value="" placeholder="请输入金额" class="input" onkeyup="value=value.replace(/[^\d]/g,'') " ng-pattern="/[^a-zA-Z]/" /> <span class="unit">元</span></div>
						<div class="lowest">单笔充值最低100元</div>
					</div>
				</div>
				<div class="pay_c_d flex main_zdy ">
					<div class='title flex main_ydz'>手续费</div>
					<div class="price">0.00元</div>
				</div>
				<div class="pay_c_d flex main_zdy ">
					<div class='title flex main_ydz'>手续费</div>
					<div class="price">无</div>
				</div>
				<div class="pay_c_d flex main_zdy ">
					<div class='title flex main_ydz'>实际到账</div>
					<div class="price">0.00元</div>
				</div>
				<div class="pay_c_d flex main_zdy ">
					<div class='title flex main_ydz'>到账时间</div>
					<div class="price flex main_zdy sideAlign_center" style="cursor: pointer;"  @click="selecton">
						<img src="../../assets/img/deposit/select.png" class="select" v-if='!selectShow' />
						<img src="../../assets/img/deposit/select_on.png" class="select" v-if='selectShow' /> 
						预计隔日到账
					</div>
				</div>
				<div class="hint">
					<button class="btn">确认充值</button>
					<div class="snug">温馨提示：</div>
					<div class="news">1、平台单笔充值最低100元，具体限额依据各银行限额为准；</div>
					<div class="news">2、请使用借记卡充值；</div>
					<div class="news">3、银行卡余额不足需要先补充金额后再次充值；</div>
					<div class="news">4、如存在银行卡状态异常，请联系银行做取消挂失或补卡处理；</div>
					<div class="service">
						<span>如需帮助请致电客服：</span>
						<span>400-139-1166</span>
					</div>
				</div>
			</div>
		</div>

	</div>
</template>

<script>
	export default {
		data() {
			return {
				tab: ['委托充值', '快捷充值', '网银充值'],
				tabname: '委托充值',
				selectShow: true,
				caption:'充值'
			}
		},
		methods: {
			//tab切换
			tabon: function(e) {
				this.tabname = e;
			},
			//到账时间选择
			selecton: function() {
				this.selectShow = !this.selectShow;
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
	
	.pay {
		margin: 20px;
		background: #fff;
	}
	
	.pay_t {
		height: 45px;
		line-height: 40px;
		padding-left: 20px;
		border-top: 6px solid #E7EAEC;
		font-size: 16px;
		font-family: PingFangSC-Medium;
		font-weight: bold;
		color: #686B6D;
		background: #fff;
		border-bottom: 1px solid #E7EAEC;
	}
	
	.pay_c {
		padding: 0 40px;
		background: #fff;
	}
	
	.pay_c_d {
		border-bottom: 1px #E7EAEC dashed;
	}
	
	.title {
		width: 100px;
		font-size: 14px;
		font-family: PingFangSC-Medium;
		color: #686A6C;
		font-weight: bold;
		margin-right: 30px;
		margin-top: 23px;
	}
	
	.tab {
		width: 100px;
		height: 34px;
		display: flex;
		justify-content:center;
		align-items:center; 
		font-size: 16px;
		font-family: PingFangSC-Regular;
		color: #686A6C;
		border: 1px solid #E7EAEC;
		border-radius: 4px;
		cursor: pointer;
		margin: 23px 40px 23px 0;
	}
	
	.tab_d {
		width: 100px;
		height: 34px;
		display: flex;
		justify-content:center;
		align-items:center; 
		font-size: 16px;
		font-family: PingFangSC-Regular;
		color: #52B095;
		border: 1px solid #52B095;
		border-radius: 4px;
		cursor: pointer;
		margin: 23px 40px 23px 0;
	}
	
	.input {
		width: 354px;
		height: 34px;
		border: 1px solid rgba(231, 234, 236, 1);
		border-radius: 4px;
		cursor: pointer;
		margin-top: 13px;
		margin-right: 12px;
		text-indent: 11px;
		font-size: 14px;
		font-family: PingFangSC-Regular;
		outline: none;
	}
	
	.unit {
		font-size: 14px;
		font-family: PingFangSC-Medium;
		color: #686A6C;
		font-weight: bold;
	}
	
	input::-webkit-input-placeholder {
		color: #999;
	}
	
	input:-moz-placeholder {
		color: #999;
	}
	
	input::-moz-placeholder {
		color: #999;
	}
	
	input:-ms-input-placeholder {
		color: #999;
	}
	
	.lowest {
		font-size: 12px;
		font-family: PingFangSC-Regular;
		color: #999;
		margin-top: 7px;
		margin-bottom: 13px;
		margin-left: 11px;
	}
	
	.price {
		font-size: 14px;
		font-family: PingFangSC-Medium;
		font-weight: bold;
		color: #686A6C;
		margin: 23px 0;
	}
	
	.hint {
		margin: 30px 0 0 130px;
		padding-bottom: 20px;
	}
	
	.btn {
		width: 124px;
		height: 38px;
		background: #52B095;
		border-radius: 4px;
		border: none;
		cursor: pointer;
		margin: 0 0 85px 0;
		color: #FFFFFF;
	}
	
	.snug {
		font-size: 16px;
		font-family: PingFangSC-Medium;
		color: #686A6C;
		font-weight: bold;
		margin-bottom: 20px;
	}
	
	.news {
		font-size: 14px;
		font-family: PingFangSC-Regular;
		color: #686A6C;
		margin-bottom: 10px;
	}
	
	.service span:nth-child(1) {
		font-size: 14px;
		font-family: PingFangSC-Medium;
		color: #686A6C;
		font-weight: bold;
	}
	
	.service span:nth-child(2) {
		font-size: 14px;
		font-family: PingFangSC-Medium;
		color: #52B095;
		font-weight: bold;
	}
	
	.bankimg {
		height: 20px;
		margin-right: 12px;
		line-height: 20px;
	}
	
	.select {
		width: 18px;
		height: 18px;
		display: block;
		margin-right: 10px;
	}

	.colorCCC {
		color: #686A6C;
    }

    .blod {
        font-weight: bold;
    }
</style>