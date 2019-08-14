<template>
	<div id="app" class="flex main_zdy">
			
		<!--<div class="left">-->
			<!--<login-vue v-if='num == 1'></login-vue>
			<home-vue v-if='num != 1'></home-vue>-->
			<router-view></router-view>
		<!--</div>-->
		<!--<div class="right">
			<div class="r_h flex main_ydz sideAlign_center">
				<div class="flex main_zdy quit sideAlign_center">
					<img src="./assets/img/quit.png"/>
					<div>退出登录</div>
				</div>
				<div class="greet">欢迎来到后台管理系统！</div>
			</div>
			<router-view/>
		</div>-->
	</div>
</template>

<script>
	import userVue from './components/login/user.vue';
	// import homeVue from './components/home.vue';
	export default {
		data(){
			return{
				num:2
			}
		},
		components: {
			userVue,
			// homeVue
		}
	}
</script>

<style scoped="scoped">
	html,
	body,
	#app {
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		left: 0;
	}
	
	
	/*.left {
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
	
	.r_h{
		width: 100%;
		height: 60px;
		background: #F3F3F4;
		border-bottom:2px solid #E7EAEC ;
	}
	
	.quit{
		margin-right: 40px;
		cursor: pointer;
	}
	
	.quit img{
		width: 18px;
		height: 18px;
		display: block;
		margin-right: 15px;
	}
	
	.quit div{
		font-size:18px;
		font-family:PingFangSC-Regular;
		font-weight:400;
		color: #6A6C6E;
	}
	
	.greet{
		position: relative;
		top: 0;
		left: -40%;
		font-size:18px;
		font-family:PingFangSC-Regular;
		font-weight:400;
		color: #6A6C6E;
	}*/
</style>