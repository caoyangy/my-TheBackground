<template>
	<div id="pp" class="flex main_zdy">
		<div class="left">
			<left-vue></left-vue>
		</div>
		<div class="right">

			<div class="r_h flex main_ydz sideAlign_center">
				<div class="flex main_zdy quit sideAlign_center">
					<img src="../assets/img/quit.png" />
					<div @click="quit">退出登录</div>
				</div>
				<div class="greet">欢迎来到后台管理系统！</div>
			</div>

			<!-- <div class="breadNav">
				<breadNav></breadNav>
			</div> -->

			<router-view />
		</div>
	</div>
</template>

<script>
	import leftVue from './left.vue';
	// import breadNav from './breadNav.vue';

	export default {
		components: {
			leftVue,
		},
		methods: {
			//推出登陆
			quit: function () {
				if (sessionStorage.getItem('userType') == 1) {

					this.$API('post', 'logout', {
						userId: sessionStorage.getItem('userid'),
						token: sessionStorage.getItem('token')
					}, sessionStorage.getItem('userid'), sessionStorage.getItem('token'), (res) => {
						console.log(res)
						// this.$Message.success('退出成功！');
						this.$router.push({
							path: '/'
						})
						清除缓存的数据
						localStorage.clear();
						sessionStorage.clear();
					},(res)=>{
						this.$Message.error(res.data.message);
					},(res)=>{
						this.$Message.error('请求超时');
					})
				} else {
					this.$router.push({
						path: '/staff'
					})
					清除缓存的数据
					localStorage.clear();
					sessionStorage.clear();
				}


			}
		}
	}
</script>

<style scoped="scoped">
	html,
	body,
	#pp {
		width: 100%;
		height: 100%;
		overflow: initial;
		margin: 0;
		padding: 0;
	}

	#pp {
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		left: 0;
	}

	.left {
		width: 220px;
		height: 100%;
	}

	.right {
		width: 100%;
		height: 100%;
		padding-left: -220px;
		background: #F3F3F4;
		overflow-y: auto;
	}

	.r_h {
		width: 100%;
		height: 60px;
		background: #F3F3F4;
		border-bottom: 2px solid #E7EAEC;
	}

	.quit {
		margin-right: 40px;
		cursor: pointer;
	}

	.quit img {
		width: 18px;
		height: 18px;
		display: block;
		margin-right: 15px;
	}

	.quit div {
		font-size: 18px;
		font-family: PingFangSC-Regular;
		font-weight: 400;
		color: #6A6C6E;
	}

	.greet {
		position: relative;
		top: 0;
		left: -40%;
		font-size: 18px;
		font-family: PingFangSC-Regular;
		font-weight: 400;
		color: #6A6C6E;
	}
</style>