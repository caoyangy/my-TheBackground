<template>
    <div class="flex side_sdx ivuInput-box">
        <!--头部信息-->
        <div class="H_t flex side_sdx mainAlign_center">
            <div>评价管理</div>
            <div>
                <router-link class="colorCCC" to="/evaluateList">评价管理管理列表</router-link>&nbsp;&nbsp; /&nbsp;&nbsp;
                <router-link class="colorCCC blod" to="/evaluateDetails">评价管理管理详情</router-link>
            </div>
        </div>
        <!-- 信息区域 -->
        <div class="list">
        <!-- 订单详情 -->
            <div class="details">
                <div class="orderId">订单编号：{{datalist.goodsId}}</div>
                <div class="goodsName">商品：{{datalist.goodsName}}</div>
                <div class="goosdDescribe">
                    <div class="flex main_zdy mainAlign_between">
                        <div class="Hportrait flex main_zdy sideAlign_center">
                            <img :src="datalist.goodsPic" alt="" class="goodsImg">
                            <div class="name">{{datalist.userName}}</div>
                        </div>
                        <div class="flex main_zdy sideAlign_center">
                            <div class="name">打分</div>
                            <Rate disabled v-model="goodsScore" class="goodsScore"/>
                        </div>
                    </div>
                    <div class="flex main_zdy specification">
                        <div class="time">{{goodsScoreDateTime}}</div>
                        <div class="Specification">规格分类：{{datalist.specItemName}}</div>
                    </div>
                    <div class="evaluateContent">{{datalist.goodsScoreWordsComment}}</div>
                    <div class="comment">
                        <img :src="datalist.goodsPic" alt="" class="commentImg">
                    </div>
                    <div v-if="datalist.goodsScoreComplainWordsComment">
                        <div class="flex side_sdx complaint" >
                            <div class="flex main_zdy complaint_t sideAlign_center">
                                <div>投诉内容</div>
                                <div class="content">{{goodsScoreComplainDateTime}}</div>
                            </div>
                            <div class="complaintContent">{{datalist.goodsScoreComplainWordsComment}}</div> 
                        </div>
                        <div class="btn flex main_zdy mainAlign_center">
                            <Button  @click="add(datalist.goodsScoreComplainId)" class="Rejection">驳回投诉</Button>
                            <Button type="warning" class="fr mar_l20" @click="remove(datalist.goodsScoreComplainId)">同意并屏蔽评价</Button>
                        </div>
                    </div>
                    
                </div>
                
            </div>
        </div>
       
    </div>
</template>
<script>
     export default {
         data(){
             return {
                 datalist:{},
                 StarNumber:[],
                 row:{},
                 goodsScore:1,
                 goodsScoreDateTime:"",
                 goodsScoreComplainDateTime:'',
                 userid: "",
                 token: "",
             }
         },
         created (){
             this.userid = localStorage.getItem("userid");
             this.token = localStorage.getItem("token");
             if(this.$route.query.row){
                  this.datalist=this.$route.query.row  //评价数据取值
                  this.goodsScore=this.datalist.goodsScore*1
                  this.goodsScoreDateTime=this.datalist.goodsScoreDateTime.slice(5,10)
                  if(this.datalist.goodsScoreComplainWordsComment){
                      this.goodsScoreComplainDateTime=this.datalist.goodsScoreComplainDateTime.slice(5,10)
                  }
                  
                //   console.log(this.goodsScoreDateTime)
             }else{
                 
             }
             var obj = JSON.parse(sessionStorage.getItem('row'))
                 console.log(obj)
         },
         methods:{
             remove(id) {
                 var data={
                     complainId:id
                 }
                 sessionStorage.setItem('row',''); 
                 this.$APIMy(
                    "post",
                    "/goodsscoremanager/ordergoodscomplainpass?complainId="+id,{},
                    this.userid,
                    this.token,
                    res => {
                        this.$Message.success(res.data.message)
                        this.$router.push({ path: '/evaluateList'})
                    },
                    res => {
                    },
                    res => {
                    }
                );
             },
             add(id) {
                 sessionStorage.setItem('row',''); 
                 this.$APIMy(
                    "post",
                    "goodsscoremanager/ordergoodscomplainrebut?complainId="+id,{},
                    this.userid,
                    this.token,
                    res => {
                        this.$Message.success(res.data.message)
                        this.$router.push({ path: '/evaluateList'})
                    },
                    res => {
                    },
                    res => {
                    }
                );
             },
             
         },   
     }

</script>
<style scoped="scoped">
    .H_t {
        height: 70px;
        background: #fff;
        padding-left: 20px;
        border-bottom: 2px solid #e7eaec;
    }
    .H_t div:nth-child(1) {
        height: 16px;
        font-size: 16px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: #686a6c;
        line-height: 16px;
    }

    .H_t div:nth-child(2) {
        height: 14px;
        font-size: 14px;
        line-height: 14px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: #686a6c;
        margin-top: 10px;
    }

    .H_t div:nth-child(2) span {
        color: #686a6c;
    }

    .colorCCC {
        color: #686a6c;
    }

    .blod {
        font-weight: bold;
    }

    .details {
        width: 396px;
        background: #fff;
        margin: 0 auto;
        border: 1px solid #E7EAEC;
        border-radius: 4px;
        padding-bottom: 18px;
        box-shadow: 0 0 0 #E7EAEC;
        margin-bottom: 50px;
        margin-top: 30px;
        box-shadow: 2px 5px 6px #E7EAEC;
    }
    .Hportrait{
        margin-left: -28px;
     }
    .orderId {
        height: 36px;
        line-height: 36px;
        padding-left: 15px;
        font-size: 14px;
        font-family: PingFangSC-Regular;
        color: #252525;
    }

    .goodsName {
       padding:10px 0px;
      margin: 0px 10px;
      font-size: 14px;
      font-family: PingFangSC-Regular;
      color: rgba(37, 37, 37, 1);
      border-bottom: 1px solid #E7E7E7;
      border-top: 1px solid #E7E7E7;
    }

    .goosdDescribe {
        margin-left: 25px;
        padding: 10px 10px;
    }

    .goodsImg {
        width: 24px;
        height: 24px;
        display: block;
        margin-right: 5px;
        border-radius: 50%;
    }

    .name {
        font-size: 14px;
        font-family: PingFangSC-Regular;
        color: rgba(37, 37, 37, 1);
    }
    .time {
      font-size: 10px;
      font-family: PingFangSC-Regular;
      color:#999999;
    }
    .Specification{
      font-size: 12px;
      font-family: PingFangSC-Regular;
      color:#999999;
    }
    .starImg {
        width: 10px;
        height: 10px;
        display: block;
        margin-left: 10px;
    }
    .goodsScore{
        margin-left: 10px;
        font-size: 16px;
    }
    /* .StarNumber{
        width: 100px;
    } */

    .specification {
        margin: 10px 0;
    }

    .specification div:nth-child(1) {
        font-size: 14px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(169, 177, 192, 1);
        margin-right: 15px;
    }

    .specification div:nth-child(2) {
        font-size: 14px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(169, 177, 192, 1);
    }

    .evaluateContent {
        font-size: 14px;
        font-family: PingFangSC-Medium;
        font-weight: bold;
        color: rgba(64, 64, 64, 1);
        margin-bottom: 10px;
    }

    .comment{
        overflow: hidden;
        margin-bottom: 20px;
    }

    .commentImg{
        width: 110px;
        height: 110px;
        display: block;
        border-radius: 5px;
        float: left;
        margin-right: 6px;
    }

    .complaint_t div:nth-child(1){
        font-size: 14px;
        font-family: PingFangSC-Medium;
        color: #252525;
        margin-right: 10px;
    }

    .complaint_t div:nth-child(2){
        font-size: 14px;
        font-family: PingFangSC-Medium;
        color: rgba(169, 177, 192, 1);
        margin-right: 10px;
    }

    .complaintContent{
        font-size: 12px;
        font-family: PingFangSC-Medium;
        color: #252525;
        margin-bottom: 20px;
        margin-top: 10px;
        text-indent: 5px;
    }

    .btn{
        margin-top: 20px;
    }
    .list {
        background: #fff;
        margin: 15px;
        padding: 5px;
     }
     .Complaintreply{
        width: 100%;
        height: 24px;
        /* padding: 5px 0px 8px 0px; */
    }
    .complain{
        float: right;
        margin-right: 10px; 
        font-family: PingFangSC-Medium;
    }
    .complainImg{
        width: 12px;
        height: 12px;
        float: left;
        margin-right: 5px;
        margin-top: 3px;
    }
    .Rejection{
        background-color: #52B095;
        color:#fff;
    }
    /* 弹窗 */
    .hide {
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.6);
		position: absolute;
		top: 0;
		left: 0;
		z-index: 99;
	}
	
	.imgurl {
		width: 50%;
		height: 80%;
	}
	
	.hide_d {
		width: 440px;
		background: #fff;
		border-radius: 10px;
		padding: 0 20px 20px 20px;
		box-sizing: border-box;
        position: relative;
	}

	.hide_d_d {
		width: 55.5%;
		background: #fff;
		border-radius: 10px;
		padding: 0 20px 20px 20px;
		box-sizing: border-box;
        position: relative;
	}

	.hide_d_d_d {
		width: 60.95%;
		background: #fff;
		border-radius: 10px;
		padding: 0 20px 20px 20px;
		box-sizing: border-box;
        position: relative;
	}
	
	.cha {
		margin-top: 14px;
		width: 14px;
		height: 14px;
		display: block;
		cursor: pointer;
		margin-bottom: 5px;
	}
	
	.hide_title {
		height: 24px;
		font-size: 24px;
		font-family: PingFangSC-Regular;
		font-weight: 400;
		line-height: 24px;
		text-align: center;
		color: #575757;
		margin-bottom: 33px;
	}
	
	.limit {
		width: 100%;
		height: 32px;
		line-height: 32px;
		font-size: 12px;
		font-family: PingFangSC-Regular;
		font-weight: 400;
		color: #575757;
		text-indent: 15px;
		border: 1px solid #CCCCCC;
		outline: none;
		margin-bottom: 12px;
	}
	
	textarea {
		width: 100%;
		padding: 9px 11px;
		outline: none;
		font-size: 12px;
		font-family: PingFangSC-Regular;
		font-weight: 400;
		color: #575757;
		margin-bottom: 20px;
	}
    .btns {
		width: 84px;
		height: 40px;
		border-radius: 6px;
		font-size: 16px;
		font-family: PingFangSC-Regular;
		font-weight: 400;
		text-align: center;
		line-height: 40px;
		border: none;
		outline: none;
		margin: 0 10px;
		cursor: pointer;
	}
    .btns:nth-child(1) {
		background: #52B095;
		color: #fff;
	}
	
	.btns:nth-child(2) {
		background: #C7C7C7;
		color: #fff;
	}
    .content{
        font-size: 14px;
        font-family: PingFangSC-Regular;
        color: #666;
    }
    
</style>