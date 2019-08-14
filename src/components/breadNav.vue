<template>
    <div id="brednav">

        <div class="H_t flex side_sdx mainAlign_center">
        
			<div>课程管理</div>

            <el-breadcrumb separator="/">

                <el-breadcrumb-item  v-for="( item,index ) in levelList" :to="item.name" :key="index">
                    <router-link :to="item.path"> {{ item.meta.title }} </router-link>
                </el-breadcrumb-item>
              
            </el-breadcrumb>
           

		</div>

    </div>
</template>

<script>
export default {
    data(){
        return {
            levelList : null
        }
	},
	methods:{
		getBreadcrumb () {
            let matched = this.$route.matched;
            
            console.log( matched  )

            this.levelList = matched;
            let appid = this.$route.params.appid;
            let type = this.$route.params.type;
            this.levelList.map( function (i) {
                i.path = i.path.replace( /:appid/g,appid );
                i.path = i.path.replace( /:type/g,type );
                console.log(i)
            } )
            this.levelList = this.levelList.slice(1);
        
		}
	},
	created(){
		console.log(213213)
		this.getBreadcrumb()
    },
    watch: {
        $route() {
            this.getBreadcrumb();
        }
    }
}
</script>

<style>

</style>
