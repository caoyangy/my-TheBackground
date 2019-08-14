<template>
	<div class="login flex sideAlign_center mainAlign_center">
		<div class="login_d flex main_zdy mainAlign_between">
			<div class="login_d_l">
				<img src="../../assets/img/login/user_img.png" />
			</div>
			<div class="login_d_r">
				<div class="title">芒果商家管理后台</div>
				<div class="debark">
					<div class="flex main_zdy">
						<div @click="loginWay('验证码登录')" :class="loginway == '验证码登录'?'logintypeon' :'logintype'">验证码登录
							<div class="login_s" v-if='loginway == "验证码登录"'></div>
						</div>
						<div :class="loginway == '密码登录'?'logintypeon' :'logintype'" style="margin-left: 99px;"
							@click="loginWay('密码登录')">密码登录
							<div class="login_ss" v-if='loginway == "密码登录"'></div>
						</div>
					</div>

					<div class="flex side_sdx" v-if='loginway == "验证码登录"'>
						<div><input type="text" placeholder="手机号" class="input" maxlength="11" ref='phone' /></div>
						<div class="flex mainAlign_between">
							<input type="text" placeholder="验证码" class="code" ref='code' maxlength="4">
							<button :disabled='flage' :style=" {'backgroundColor' : flage ? '#ccc' : '#52B095' }"
								class="codeimg" @click=" getCode "> {{ getCodeBtnVal }} </button>
						</div>
						<div class="hint">若您输入的手机号未注册，将为您直接注册.</div>
						<div v-if=" flage " style=" color:red " class="hint"> 短信已发送至您的手机 </div>
						<div @click=" codeLogin " class="btn flex main_zdy sideAlign_center mainAlign_center">登录</div>
					</div>

					<div class="flex side_sdx" v-if='loginway == "密码登录"'>
						<div><input type="text" placeholder="手机号 " class="input " maxlength="11 " ref='phone' /></div>
						<div><input type="password" placeholder="密码" class="input " ref='password' maxlength="8" />
						</div>
						<div class="btn flex main_zdy sideAlign_center mainAlign_center" style="margin-top: 40px;"
							@click=" passWordLogin ">登录</div>
					</div>

				</div>
			</div>
		</div>
		<Button @click="error" v-show="false"></Button>
	</div>
</template>

<script>
	import { BaseUrl, API } from '../../Baseurl/common.js';
	export default {
		data() {
			return {
				loginway: '验证码登录',
				getCodeNum: '', // 后台返回的验证码
				success: '', // 判断是否发送成功
				getCodeBtnVal: '获取验证码',
				flage: false,
			}
		},
		methods: {
			// 提示文字
			error: function (content) {
				this.$Message.error(content);
			},
			// 密码登陆
			passWordLogin: function () {
				var that = this
				var password = that.$refs.password.value;
				var phone = that.$refs.phone.value;
				// var code = that.$refs.code.value.toUpperCase();
				this.$API('post', 'storeLogin', {
					"usertype": 1,
					"phone": phone,
					"passWord": password,
				}, '', '', (res) => {
					console.log(res)
					localStorage.setItem('token', res.data.data.token);
					localStorage.setItem('userid', res.data.data.userId);
					sessionStorage.setItem('token', res.data.data.token);
					sessionStorage.setItem('userid', res.data.data.userId);
					if (res.data.result == "success") {
						sessionStorage.setItem('userName', res.data.data.allShopMsg);
						sessionStorage.setItem('tabMsg', '课程管理');
						sessionStorage.setItem('userType', res.data.data.userType);
						that.$router.push({
							path: '/allShopMsg',
						})
					}
				},(res) =>{
					this.error(res.data.message)
				})
			},

			//验证码登陆
			codeLogin: function () {
				var that = this
				var codeNum = that.$refs.code.value;
				var phone = that.$refs.phone.value;
				// var code = that.$refs.code.value.toUpperCase();
				this.$API('post', 'storeLogin', {
					"usertype": 1,
					"phone": phone,
					"verifyCode": codeNum,
				}, '', '', (res) => {
					localStorage.setItem('token', res.data.data.token);
					localStorage.setItem('userid', res.data.data.userId);
					sessionStorage.setItem('token', res.data.data.token);
					sessionStorage.setItem('userid', res.data.data.userId);
					sessionStorage.setItem('userName', res.data.data.allShopMsg);
					sessionStorage.setItem('tabMsg', '课程管理');
					sessionStorage.setItem('tabMsges', '');
					sessionStorage.setItem('userType', res.data.data.userType);
					that.$router.push({
						path: '/allShopMsg',
					})
				}, (res) => {
					this.error(res.data.message)
				}, (res) => {
					console.log(2)
				})
			},

			//登陆方式
			loginWay: function (e) {
				this.loginway = e
			},
			//发送验证码
			getCode: function () {
				var timestamp = Date.parse(new Date());
				this.flage = true;
				let num = 59;
				let that = this;
				let id = setInterval(function () {
					num--;
					that.getCodeBtnVal = `重新发送( ${num} )`;
					if (num <= 1) {
						clearInterval(id);
						that.getCodeBtnVal = `重新发送`
						that.flage = false;
					}
				}, 1000);
				// var code = this.$refs.code.value.toUpperCase(); // 验证码
				var phoneNum = this.$refs.phone.value; // 验证码
				var senUrl = BaseUrl + 'sendVerifyCode?timestamp='+timestamp+'&phoneNum=' + phoneNum;
				this.$http.get(senUrl).then(function (res) {
					if (res.data.result == "success") {
						that.success = 'success';
					}
				}).catch(function (error) {
					console.log(error);
				})
			},
		}
	}
</script>

<style scoped="scoped ">
	.login {
		width: 100%;
		height: 100%;
		box-sizing: border-box;
		background-image: url(../../assets/img/login/user.png);
		background-size: 100% 100%;
	}

	.login_d {
		width: 1295px;
		height: 680px;
		box-shadow: 0px 2px 38px 0px rgba(92, 92, 92, 0.29);
		background: rgba(255, 255, 255, 0.9);
		border-radius: 40px;
	}

	.login_d_l {
		margin: 140px 0 0 95px;
		width: 458px;
		height: 400px;
	}

	.login_d_l img {
		width: 100%;
		height: 100%;
		display: block;
	}

	.login_d_r {
		margin: 125px 123px 0 0;
		width: 400px;
	}

	.title {
		height: 35px;
		font-size: 36px;
		font-family: PingFangSC-Regular;
		font-weight: 400;
		line-height: 35px;
		color: #252525;
		text-align: center;
		margin-bottom: 34px;
	}

	.debark {
		width: 400px;
		height: 360px;
		border: 1px solid rgba(204, 204, 204, 1);
		background: rgba(255, 255, 255, 0.96);
		padding: 0 20px;
		box-sizing: border-box;
		border-radius: 4px;
	}

	.logintype {
		height: 19px;
		font-size: 20px;
		font-family: PingFangSC-Light;
		font-weight: 300;
		line-height: 19px;
		color: #252525;
		margin: 30px 0 30px 0;
		cursor: pointer;
	}

	.logintypeon {
		height: 19px;
		font-size: 20px;
		font-family: PingFangSC-Light;
		font-weight: 300;
		line-height: 19px;
		color: #52B095;
		margin: 30px 0 30px 0;
		cursor: pointer;
	}

	.login_s,
	.login_ss {
		width: 60px;
		height: 3px;
		background: #52B095;
		border-radius: 2px;
		margin-top: 8px;
		position: relative;
	}

	.login_s {
		left: 20px;
	}

	.login_ss {
		left: 10px;
	}

	.input {
		width: 100%;
		height: 48px;
		background: rgba(255, 255, 255, 1);
		border: 1px solid rgba(227, 227, 227, 1);
		border-radius: 4px;
		line-height: 48px;
		text-indent: 17px;
		outline: none;
		margin-bottom: 20px;
	}

	.code {
		width: 220px;
		height: 48px;
		background: rgba(255, 255, 255, 1);
		border: 1px solid rgba(227, 227, 227, 1);
		border-radius: 4px;
		line-height: 48px;
		text-indent: 17px;
		outline: none;
	}

	.codeimg {
		width: 120px;
		height: 48px;
		font-size: 14px;
		font-family: PingFangSC-Regular;
		font-weight: 400;
		text-align: center;
		line-height: 48px;
		background: #52B095;
		border-radius: 4px;
		color: #fff;
		cursor: pointer;
		border: none;
	}

	.hint {
		height: 15px;
		font-size: 14px;
		font-family: PingFangSC-Regular;
		font-weight: 400;
		line-height: 15px;
		color: #939699;
		margin-top: 15px;
	}

	.btn {
		height: 50px;
		background: rgba(82, 176, 149, 1);
		border-radius: 4px;
		text-align: center;
		font-size: 16px;
		font-family: PingFangSC-Regular;
		font-weight: 400;
		color: #fff;
		margin-top: 30px;
		cursor: pointer;
	}
</style>