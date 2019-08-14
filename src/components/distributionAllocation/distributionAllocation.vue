<template>
    <div class="flex side_sdx">
		<!--头部信息-->
		<div class="H_t flex side_sdx mainAlign_center">
			<div>分润系数配置</div>
			<div>
				<span class="colorCCC ">首页</span>
				&nbsp;&nbsp; /&nbsp;&nbsp;
				<router-link class="colorCCC blod" to="/distributionAllocation">分润系数配置</router-link>
			</div>
		</div>
        <!-- 分润系数 -->
      <div class="basic">
        <div class="title flex main_zdy sideAlign_center">分润系数 <div class="rightBtn"><Button v-if="isShow" @click="modifyShow(0)">修改</Button> <Button v-else @click="modifyShow(1)">确定</Button></div></div>
        <!-- <div class="Corp">
            <div class="h5 flex main_zdy sideAlign_center">
              <div></div>
              <div>固定系数</div>
            </div>
        </div> -->
        <div class="message">
          <div class=" main_zdy message_d">
            <div class="mian_zdy message_d_v" v-for="tiem in list">
              <div v-if="tiem.recommendRelationCode=='01'">合伙人固定系数</div>
              <div v-if="tiem.recommendRelationCode=='02'">代理人固定系数</div>
              <div v-if="tiem.recommendRelationCode=='11'">合伙人推荐合伙人系数</div>
              <div v-if="tiem.recommendRelationCode=='12'">合伙人推荐代理人系数</div>
              <div v-if="tiem.recommendRelationCode=='21'">代理人推荐合伙人系数</div>
              <div v-if="tiem.recommendRelationCode=='22'">代理人推荐代理人系数</div>
              <div v-if="isShow">{{tiem.ratio}}</div>
              <div v-else><input type="text" v-model="tiem.ratio" @change="modify(tiem.id,tiem.ratio)"/></div>
            </div>
          </div>
        </div>
      </div>
      
    </div>
</template>
<script>
import { BaseUrl, API } from "../../Baseurl/common.js";
export default {
    data(){
        return {
            formList:{
                name1:"0.5",
                name2:"0.6",
                name3:"0.7",
                name4:"0.8",
                name5:"0.9",
                name6:"0.1",
            },
            list:[],
            isShow:true,
            form:{
                id:"",
                name:""
            },
            userid:"",
            token:"",
        }
    },
     created() {
       this.userid = localStorage.getItem("userid");
       this.token = localStorage.getItem("token");
       this.allList()
     },
     methods: {
        allList(){
          var timestamp = Date.parse(new Date());
          //获取列表
          this.$APIMy(
            "post",
            "retailstoreratioconfigmanager/queryretailstoreratioconfigbyall?timestamp="+timestamp,
            {},
            this.userid,
            this.token,
            res => {
              console.log("刷新成功")
              this.list= res.data.data;
              
            },
            res=> {
              console.log(res)
              // var data= res.data.data.list;
              
            }
          );
        },
        toDecimal(x) {    
          var f = parseFloat(x);    
          if (isNaN(f)) {    
              return false;    
          }    
          var f = Math.round(x*100)/100;    
          var s = f.toString();    
          var rs = s.indexOf('.');    
          if (rs < 0) {    
              rs = s.length;    
              s += '.';    
          }    
          while (s.length <= rs + 1) {    
              s += '0';    
          }    
          return s; 
				},
         modify(id,time){
             if(time>=1 || time<=0 || time.length>3){
               this.$Message.error("数值填写错误,请填写1~0.1之间数据");
             }else{
               console.log(time)
               var timestamp = Date.parse(new Date());
                this.$APIMy(
                  "post",
                  "retailstoreratioconfigmanager/updateretailstoreratioconfig?timestamp="+timestamp,
                  {
                    id:id,
                    ratio:time
                  },
                  this.userid,
                  this.token,
                  res => {
                    console.log(res)
                    // var data= res.data.data.list;
                    
                  }
                );
             }
         },
         modifyShow(e){
             this.isShow=!this.isShow
             if(e==0){
               this.allList()
             }
         },
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
.colorCCC {
    color: #686A6C;
}

.blod {
    font-weight: bold;
}
.basic {
  background-color: #fff;
  padding:0 40px;
  margin: 20px;
}
.title {
  position: relative;  
  width: 100%;
  height: 50px;
  border-bottom: 1px solid #e7eaec;
  font-size: 16px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: rgba(104, 107, 109, 1);
}

.message {
  padding: 0 0 20px 40px;
  background: #fff;
}

.messages {
  padding: 20px;
  background: #fff;
}

.aptitude {
  padding: 0 0 10px 40px;
  background: #fff;
}

.message_d {
  padding-top: 20px;
}

.message_d_v {
  display: inline-block;
  width: 50%;
}
.Signing{
    width: 85px;
    font-size: 14px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(87, 87, 87, 1);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.message_d_v div {
  display: inline-block;
  margin: 20px 0px;
  font-size: 14px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(87, 87, 87, 1);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.message_d_v div:nth-child(1) {
  display: inline-block;
  width: 150px;
}

.message_d_v div:nth-child(2) {
  width: 200px;
}
.h5 {
  height: 50px;
}

.h5 div:nth-child(1) {
  width: 2px;
  height: 60%;
  background: blue;
  margin: 0 20px 0 -20px;
}

.h5 div:nth-child(2) {
  font-size: 16px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: rgba(104, 107, 109, 1);
}
.rightBtn{
    position:absolute;
    top: 10px;
    right: 0;
}    
</style>
