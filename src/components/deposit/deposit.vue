<template>
	<div>
		
		<!--头部信息-->
		<div class="H_t flex side_sdx mainAlign_center">
			<div>存管账户管理</div>
			<div>
                首页&nbsp;&nbsp; /&nbsp;&nbsp; 
                <router-link class="colorCCC blod" to="/deposit">存管账户管理</router-link>
            </div>
		</div>
		
	</div>
</template>



<script>
export default {

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
	.colorCCC {
		color: #686A6C;
    }

    .blod {
        font-weight: bold;
    }
</style>