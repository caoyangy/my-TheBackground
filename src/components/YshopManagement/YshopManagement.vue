<template>
	<div>
		
		<!--头部信息-->
		<div class="H_t flex side_sdx mainAlign_center">
			<div>课程管理</div>
			<div>
                首页&nbsp;&nbsp; /&nbsp;&nbsp; 
                <router-link class="colorCCC " to="/YallShopMsg">门店信息</router-link>&nbsp;&nbsp; /&nbsp;&nbsp; 
                <router-link  class="colorCCC blod" to="/YshopManagement">课程管理</router-link>
            </div>
		</div>

        <div class="shop_content">

            <div class=" couser_shop_nav ">

                <div 
                    @click= " couserShopTabs('课程信息') "
                    :class= " couserShopTab == '课程信息' ? 'on_active_couser' : 'over_active_couser' "
                 > 

                 课程信息 

                 </div>
                <!-- <div 
                    @click=" couserShopTabs('门店信息') "
                    :class= " couserShopTab == '门店信息' ? 'on_active_couser' : 'over_active_couser' "
                >
                 门店信息 

                </div> -->

            </div>

            <div  v-if=" couserShopTab == '课程信息' " class=" shop_content_main ">

                <div class=" shop_content_main_top ">
                    课程信息 
                    <span> （点击课程图片可编辑） </span>
                </div>

                <div class=" shop_content_main_bottom ">
                    
                    <div  class=" shop_content_main_nav ">

                        <div class="shop_content_main_nav_btns">

                            <button
                                :style="{ 'background': searchTab == '' ? 'rgba(82,176,149,1)' : '#fff', 'color': searchTab == '' ?  '#fff' : '#000'} " 
                                class="all_couser"
                                @click=" searchAllShop('') "
                             >
                             全部
                             </button>

                             <button
                                :style="{ 'background': searchTab == '0' ? 'rgba(82,176,149,1)' : '#fff', 'color': searchTab == '0' ?  '#fff' : '#000'} " 
                                class="all_couser"
                                @click=" searchAllShop('0') "
                             >
                            上架
                             </button>

                             <button
                                :style="{ 'background': searchTab == '1' ? 'rgba(82,176,149,1)' : '#fff', 'color': searchTab == '1' ?  '#fff' : '#000'} " 
                                class="all_couser"
                                @click=" searchAllShop('1') "
                             >
                             下架
                             </button>

                        </div>

                        <div  class="shop_content_main_nav_search">

                            <input type="text" v-model="searchCouserNameVal" placeholder="请输入课程名称">

                            <button  @click=" searchCouserName ">搜索</button>

                        </div>

                    </div>
                    
                    <div v-for="( msg,index ) in couserList" :key="index" class="couser_name" @click="goPutCouser(msg)" >
                        <div class="couser_name_top">
                            <img :src="msg.regUrl[0]" alt="  ">
                        </div>
                        <!-- {{  msg.coursePictureUrl }} -->
                        <div class="couser_name_bottom">

                            <h5 :title="msg.name">{{ msg.name }}</h5>

                            <span style="background:rgba(82,176,149,1)" v-if=" msg.putAway == '0' ">上架</span>

                            <span  style="background:#DD616A" v-else-if=" msg.putAway == '1' ">下架</span>

                        </div>

                    </div> 
                
                </div>
                <!--页码-->
                <div class="list_data_b flex main_ydz">
                    <Page :total="Page.total" :page-size="Page.pageSize" :current="Page.current" @on-change="page"></Page>
                </div>
            </div>
            
       </div>   <!--课程信息  -->

        <div v-if=" couserShopTab == '门店信息' " class="shop_content couser_content ">
            
            <div class=" shop_content_main ">

                <div class=" shop_content_main_top ">
                    门店信息
                </div>
                 <div class="couser_content_main_bottom">·
                    123
                </div>
            </div>

        </div><!-- 门店信息  -->
		
	</div>
</template>

<script>

    export default {
		data() {
			return {
                couserShopTab : '课程信息',// 课程 商户信息 tab切换
                searchTab : '', // 筛选上架下架切换
                shopId : 0 ,
                couserList :[],
                storagUuserid:'',
                storagToken:'',
                keChengFengMian:[],
                Page: {
					total: 0,
					pageSize: 7,
					current: 1
                },
                searchCouserNameVal:''
			}
        },
        filters: {
			paresImg: function (value) {
				if (!value) return ''
				value = String(value)
				return (JSON.parse( value ))
			} 
		},
		methods: {
			//tab切换
			couserShopTabs: function(msgNames) {
				this.couserShopTab = msgNames ;
            },
            searchAllShop : function ( num ) {
                this.searchTab = num;
                this.getAllCourse(this.shopId,this.searchTab,this.storagUuserid, this.storagToken);
            },
            goAddCouser:function () {
                this.$router.push({ 
                path: '/YaddorputCouser',
					query: {
						id:this.shopId,
					}
                })
            },//添加

            keChengFengMianFn(url) {
				this.$API('get','queryTempUrl?userId=' + this.storagUuserid + '&key=' + url.substr(url.indexOf('com/') + 4) + '&bucket=mango1' + '&xOssProcess=image/resize,m_lfit,h_160,w_214' + '&token=' + this.storagToken,{},this.storagUuserid,this.storagToken,(res)=>{
					this.keChengFengMian.push(res.data.data) 
				})
            },
            
            page(e) {
                this.Page.current=e
                this.getAllCourse(this.shopId,this.searchTab,this.storagUuserid, this.storagToken);
            },

            goPutCouser(data){
                this.$router.push({ 
                path: '/YaddorputCouser',
					query: {
                        couserMsg:data,
                        num:1,
					}
                })
            },

            searchCouserName () {
                this.getAllCourse(this.shopId,this.searchTab,this.storagUuserid, this.storagToken);
            },

			//到账时间选择
			selecton: function() {
				this.selectShow = !this.selectShow;
            },
            
            getAllCourse : function ( shopid,stuta,userId,token,e) {
                if(e){
                    this.$API('post','productInfo/backgroundFindCourse',{
                        "storeId": shopid,
                        "name":this.searchCouserNameVal,
                        putAway:stuta,
                        "currentPage":this.Page.current,
                        "pageSize": this.Page.pageSize
                    },userId,token,(ree)=>{
                        console.log( res)
                        console.log( "1")
                        this.couserList =res.data.data.list;
                        for(var i=0;i<this.couserList.length;i++){
                            this.couserList[i].coursePictureUrl = JSON.parse(res.data.data.list[i].coursePictureUrl)[0]
                        }
                         
                        this.Page.total = res.data.data.total;
                    })
                } else {
                     this.$API('post','productInfo/backgroundFindCourse',{
                        "storeId": shopid,
                        "name":this.searchCouserNameVal,
                        putAway:stuta,
                        "currentPage": this.Page.current,
                        "pageSize": this.Page.pageSize
                    },userId,token,(res)=>{
                        console.log( res)
                        console.log( "2")
                        this.Page.total = res.data.data.total;
                        this.couserList =res.data.data.list;
                        for(var i=0;i<this.couserList.length;i++){
                            this.couserList[i].coursePictureUrl = JSON.parse(res.data.data.list[i].coursePictureUrl)[0]
                        }
                        
                        
                    })
                }
            }
        },
        created(){
            this.storagUuserid = localStorage.getItem('userid');
            this.storagToken = localStorage.getItem('token');
            this.shopId =  this.$route.query.id;
            this.getAllCourse(this.shopId,this.searchTab,this.storagUuserid, this.storagToken);
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

    .shop_content {
        padding: 20px;
        width: 100%;
        background:rgba(243,243,244,1);
    }
    
    .couser_shop_nav {
        height: 46px;
        width: 100%;
        background:rgba(243,243,244,1);
        margin-bottom: 5px;
    }

    .couser_shop_nav div {
        height: 36px;
        width: 80px !important;
        line-height: 36px;
        text-align: center;
        width:65px;
        font-size:16px;
        font-family:PingFangSC-Medium;
        font-weight:500;
        /* display: inline-block; */
        float: left;
        cursor: pointer;
        margin: 0 19px;
    }

    .shop_content_main {
        border-top: 6px solid rgba(231,234,236,1);
        height: 370px;
    }

    .shop_content_main_top {
        height: 44px;
        border-bottom: 1px solid rgba(231,234,236,1);
        line-height: 44px;
        text-indent: 19px;
        font-size:16px;
        font-family:PingFangSC-Medium;
        font-weight:500;
        color:rgba(104,107,109,1);
        background: #fff;
    }

    .shop_content_main_top span {
        font-size: 14px;
    }

    .shop_content_main_bottom {
       padding-top:5px;
       /* height: 338px; */
       background: #fff;
       padding-bottom: 20px;;
    }

    .shop_content_main_bottom .add_couser_name {
        display: inline-block;
    }

    .shop_content_main_bottom .add_couser_name {
        width:214px;
        height:238px;
        background:rgba(244,246,250,1);
        border:2px solid rgba(231,234,236,1);
        text-align: center;
        margin: 20px 0 0 20px;
        cursor: pointer;
    }

    .shop_content_main_bottom .add_couser_name img {
        margin-top: 78px;
        border: 1px dashed #ccc;
        padding: 1px;
    }

    .shop_content_main_bottom .add_couser_name div {
        margin-top: 14px;
        font-size:16px;
        font-family:PingFangSC-Medium;
        font-weight:500;
        color:rgba(105,107,109,1);
    }

    .couser_name {
        width:214px;
        height:238px;
        border:2px solid rgba(231,234,236,1);
        text-align: center;
        margin: 20px 0 0 20px;
        cursor: pointer;
        display: inline-block;
    }

    .couser_name_top {
        height: 160px;
        border-bottom: 1px solid rgba(231,234,236,1);
    }

    .couser_name_top img {
        width: 100%;
        height: 160px;
    }

    .couser_name_bottom {
        position: relative;
        height: 80px;
    }

    .couser_name_bottom h5 {
        width:161px;
        height:16px;
        font-size:16px;
        font-family:PingFangSC-Medium;
        font-weight:500;
        color:rgba(105,107,109,1);
        margin: 22px 0 0 21px;
        overflow : hidden;
        text-overflow:ellipsis;
        white-space:nowrap;
    }

    .couser_name_bottom span {
        position: absolute;
        bottom: 28px;
        right: 2px;
        width: 40px;
        height: 24px;
        text-align: center;
        line-height: 24px;
        font-size:14px;
        font-family:PingFangSC-Medium;
        font-weight:500;
        color:rgba(255,255,255,1);
        cursor: pointer;
    }

    .shop_content_main_nav {
        height: 30px;
        margin-top: 25px;
        padding-left: 20px;
    }

    .shop_content_main_nav_btns {
        width:340px;
        height:30px;
        float: left;
    }

    .shop_content_main_nav_btns button {
        width:80px;
        height:30px;
        border:1px solid rgba(82,176,149,1);
        border-radius:4px;
        margin-right: 30px;
        background: #fff;
        cursor: pointer;
        outline: none;
        /* border: none; */
    }

    .shop_content_main_nav_search {
        float: right;
        margin-right: 20px;
    }

    .shop_content_main_nav_search input {
        width:190px;
        height:30px;
        border:1px solid rgba(231,234,236,1);
        border-radius:4px 0px 0px 4px;
        float: left;
        outline: none;
        text-indent: 11px;
        font-size:14px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(169,177,192,1);
    }

    .shop_content_main_nav_search button {
        border: none;
        width:40px;
        height:30px;
        background:rgba(82,176,149,1);
        border-radius:0px 4px 4px 0px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(255,255,255,1);
        float: left;
        cursor: pointer;
    }

    .clear {
        clear: both;
    }

    .couser_content_main_bottom {
        background: #fff;
        height: 300px;
    }

    .couser_content {
        margin-top: -20px;
        padding-top: 0;
    }

    .on_active_couser {
        font-weight:500;
        color:rgba(82,176,149,1);
        border-bottom: 3px solid rgba(81,176,149,1);
    }

    .over_active_couser {
        font-weight:500;
        color:rgba(87,87,87,1);
        border: none;
    }

    .colorCCC {
        color: #686A6C;
    }

    .blod {
        font-weight: bold;
    }

    .list_data_b {
        margin: 20px 0 40px;
    }
</style>