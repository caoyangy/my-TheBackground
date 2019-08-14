<template>
	<div class="login">
		<div class="login_d  main_zdy mainAlign_between">
			<div class="login_l">
				<img src="../../assets/img/login/staff_img.png" />
			</div>
			<div class="login_r">
				<div class="login_r_t">芒果运营管理后台</div>
				<div class="debark">
					<div class="title">登录账号</div>
					<div><input type="text" placeholder="账号" class="input" ref='phone'
							value="" /></div>
					<div><input type="password" placeholder="密码" class="input" ref='password' value="" />
					</div>
					<div class="flex mainAlign_between">
						<input type="text" placeholder="验证码" class="code" ref='code' maxlength="4" />
						<div class="codeimg" @click="imageurl">
							<img :src="imageUrl" />
						</div>
					</div>
					<div class="btn flex main_zdy sideAlign_center mainAlign_center" @click="login">登录</div>
				</div>
			</div>
		</div>
		<Button @click="error" v-show="false"></Button>
	</div>
</template>

<script>
	import { BaseUrl,myUrl,imgUrl } from '../../Baseurl/common.js';
	export default {
		data() {
			return {
				imageUrl: '',
				imageKey: '',
			}
		},
		created() {
			// 图形验证
			var imageKey = Math.random().toString().split('.')[1];
			var url = this.$imgUrl+'?imageKey=' + imageKey;
			this.imageUrl = url;
			this.imageKey = imageKey;
		},
		methods: {
			// 提示文字
			error: function (content) {
				this.$Message.error(content);
			},
			// 图形验证
			imageurl: function () {
				var imageKey = Math.random().toString().split('.')[1];
				var url = this.$imgUrl+'?imageKey=' + imageKey; 
				console.log(url)
				this.imageUrl = url;
				this.imageKey = imageKey;
			},
			login: function () {
				var that = this
				var password = that.$refs.password.value;
				var phone = that.$refs.phone.value;
				var code = that.$refs.code.value.toUpperCase();
				var loginurl = 'staffUserLogin?&platform=PC&isRememberMe=false&userName=' + phone + '&passWord=' + password + '&sysVeriCode=' + that.imageKey + '&sysVeriCodeKey=' + code;
				var data={
					"phone":phone,
					  "passWord":password,
					  "imageIdenCodeKey":that.imageKey,
					  "code":code,
					  "userType":3,
				}
				if (password != '' && phone != '' && code != '') {
					this.$APIS('post', 
					"operateLogin", 
					data,
					'',
					'',
					 (res) => {
						sessionStorage.setItem('userName', res.data.data.userName);
						sessionStorage.setItem('tabMsges', '商家资质审核');
						sessionStorage.setItem('tabMsg', '入驻中心');
						sessionStorage.setItem('userType', res.data.data.userType);
						localStorage.setItem('token', res.data.data.token);
						localStorage.setItem('userid', res.data.data.userId);
						sessionStorage.setItem('token', res.data.data.token);
						sessionStorage.setItem('userid', res.data.data.userId);
						that.$router.push({
							path: '/shopsAudit',
						})
					}, (res) => {
						that.error(res.data.message);
						this.imageurl()
					}, (res) => {
						console.log(res)
					})
				} else {
					that.error('账户密码或验证码不能为空');
				}

			},

		}
	}
</script>

<style scoped="scoped">
	.login {
		width: 100%;
		height: 100%;
		background-image: url(../../assets/img/login/staff.png);
		background-size: 100% 100%;
		box-sizing: border-box;
		/* padding: 0 420px; */
		overflow: hidden;
		position: relative;
	}

	.login_d {
		width: 1295px;
		position: absolute;
		left: 50%;
		top: 50%;
		margin-left: -647px;
		margin-top: -220px;
	}

	.login_l {
		width: 465px;
		height: 439px;
		float: left;
		margin-left: 7%;
	}

	.login_l img {
		width: 100%;
		height: 100%;
	}

	.login_r {
		width: 400px;
		float: left;
		margin-left: 213px;
	}

	.login_r_t {
		height: 35px;
		font-size: 36px;
		font-family: PingFangSC-Regular;
		font-weight: 400;
		line-height: 35px;
		text-align: center;
		color: #112243;
		margin-bottom: 34px;
	}

	.debark {
		width: 400px;
		height: 360px;
		background: rgba(255, 255, 255, 1);
		box-shadow: 0px 2px 38px 0px rgba(92, 92, 92, 0.65);
		padding: 20px;
		box-sizing: border-box;
	}

	.title {
		height: 19px;
		font-size: 20px;
		font-family: PingFangSC-Light;
		font-weight: 300;
		line-height: 19px;
		color: #252525;
		margin-bottom: 25px;
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
	}

	.codeimg img {
		width: 120px;
		height: 48px;
	}

	.btn {
		font-size: 16px;
		font-family: PingFangSC-Regular;
		font-weight: 400;
		color: #FFF;
		height: 50px;
		background: #52B095;
		border-radius: 4px;
		text-align: center;
		margin-top: 42px;
		cursor: pointer;
	}
</style>