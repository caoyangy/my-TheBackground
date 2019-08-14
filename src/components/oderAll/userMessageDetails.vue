<template>
  <div class="flex side_sdx">
    <!--头部信息-->
    <div class="H_t flex side_sdx mainAlign_center">
      <div>订单管理</div>
      <div>
        <router-link class="colorCCC" to="/oderAll">订单管理</router-link>&nbsp;&nbsp; /&nbsp;&nbsp;
        <router-link class="colorCCC blod" to="/userMessageDetails">订单详情</router-link>
      </div>
    </div>
    <!-- 信息区域 -->
    <div class="list">
      <Card style="width: 100%">
        <Row>
          <i-col span="4">订单状态:</i-col>
          <i-col span="20">
            <div v-if="orderInfo.orderStatus==1">待付款</div>
						<div v-if="orderInfo.orderStatus==2">待消费</div>
						<div v-if="orderInfo.orderStatus==3">交易成功</div>
						<div v-if="orderInfo.orderStatus==4">交易关闭</div>
          </i-col>
        </Row>
        <Row>
          <i-col span="4">课程名称：</i-col>
          <i-col span="16"><div>{{goodsName}}</div></i-col>
        </Row>
        <Row>
          <i-col span="4">课程价格：</i-col>
          <i-col span="20"><div>{{goodsAmount}}</div></i-col>
        </Row>
        <Row>
          <i-col span="4">购买数量：</i-col>
          <i-col span="20"><div>{{buyNum}}</div></i-col>
        </Row>
        
        
        <!-- <Row>
          <i-col span="3">颜色：</i-col>
          <i-col span="21">{{orderInfo.orderGoodsList[0].specItemName}}</i-col>
        </Row>
        <Row>
          <i-col span="3">数量：</i-col>
          <i-col span="21">{{orderInfo.orderGoodsList[0].buyNum}}</i-col>
        </Row> -->

          <Row>
          <i-col span="4">订单金额：</i-col>
          <i-col span="20">{{orderInfo.orderTotalAmount}}</i-col>
        </Row>
        <Row>
          <i-col span="4">订单编号：</i-col>
          <i-col span="20">{{orderInfo.orderId}}</i-col>
        </Row>
        <Row>
          <i-col span="4">下单时间：</i-col>
          <i-col span="20">{{orderInfo.createTime}}</i-col>
        </Row>
        <Row>
          <i-col span="4">支付时间：</i-col>
          <i-col span="20">{{orderInfo.paymentTime}}</i-col>
        </Row>
        <Row>
          <i-col span="4">支付方式：</i-col>
          <i-col span="20">{{orderInfo.paymentWay}}</i-col>
        </Row>
        <Row>
          <i-col span="4">成交/关闭时间：</i-col>
          <i-col span="20">{{orderInfo.endTime}}</i-col>
        </Row>
        <Row>
          <i-col span="4" class="blod">分期银行卡：</i-col>
          <i-col span="20" >{{orderInfo.useBankCard}}</i-col>
        </Row>
        <Row>
          <i-col span="4" class="blod">分期金额：</i-col>
          <i-col span="20" class="blod">{{orderInfo.stagesTotalAmount}}</i-col>
        </Row>
        <Row>
          <i-col span="4" class="blod">期数：</i-col>
          <i-col span="20" class="blod">{{orderInfo.stagesNum}}</i-col>
        </Row>
      </Card>
    </div>
  </div>
</template>
<script>
import moment from 'moment'
export default {
  data() {
    return {
        userid:"",
        token:"",
        id: "",
        StarNumber:[],
        orderInfo: {
            orderId: "",
            realName: "",
            phoneNum: "",
            provinceAreaName: "",
            cityAreaName:"",
            districtAreaName: "",
            address: "",
            goodsName: "",
            buyAmount: "",
            orderTotalPriceYuan: "",
            createTime: "",
            paymentTime: "",
            orderStatus: ""
        },
				goodsName:"",
				goodsAmount:"",
				buyNum:"",
        orderStatusText: ""
    };
  },
  created() {
      // this.orderInfo = this.$route.query.data;
      // const status = this.$route.query.data.orderStatus
      // console.log(this.orderInfo)
      // // 转化订单状态
      // 	  if(status == 1){
      //       this.orderStatusText = "待付款"
			// 		}
			// 		else if(status == 2){
			// 			this.orderStatusText = "待发货"
			// 		}
			// 		else if(status == 3){
			// 			this.orderStatusText = "待收货"
			// 		}
			// 		else if(status == 4){
			// 			this.orderStatusText = "交易成功"
			// 		}
			// 		else if(status == 5){
			// 			this.orderStatusText = "交易关闭"
      //     }
         this.id=this.$route.query.id
         console.log(this.id)
        this.userid = localStorage.getItem("userid");
        this.token = localStorage.getItem("token");
       this.getList(this.id)
  },
  methods: {
      //获取列表数据
      getList(id) {
        var params={orderId:id}
        var data = "";
        for (var i in params) {
          data += encodeURIComponent(i) + "=" + encodeURIComponent(params[i]) + "&";
        }
        data = data.slice(0, -1);
        this.$API(
          "post",
          "order/orderDetail?"+data,
          {},
          this.userid,
          this.token,
          res => {
            this.orderInfo = res.data.data;
            console.log(this.orderInfo)
            this.orderInfo.createTime=moment(this.orderInfo.createTime).format('YYYY-MM-DD HH:mm:ss')
            this.orderInfo.endTime=moment(this.orderInfo.endTime).format('YYYY-MM-DD HH:mm:ss')
            this.orderInfo.paymentTime=moment(this.orderInfo.paymentTime).format('YYYY-MM-DD HH:mm:ss')
            this.goodsName=this.orderInfo.orderGoodsList[0].goodsName
            this.goodsAmount=this.orderInfo.orderGoodsList[0].goodsAmount
            this.buyNum=this.orderInfo.orderGoodsList[0].buyNum
            // var status = res.data.data.orderStatus
            // if(status == 1){
            //   this.orderStatusText = "待付款"
            // }
            // else if(status == 2){
            //   this.orderStatusText = "待发货"
            // }
            // else if(status == 3){
            //   this.orderStatusText = "待收货"
            // }
            // else if(status == 4){
            //   this.orderStatusText = "交易成功"
            // }
            // else if(status == 5){
            //   this.orderStatusText = "交易关闭"
            // }
            
          },
          res =>{
            this.$Message.warning(res.data.message)
          },
          res =>{
            this.$Message.error(res.data.message)
          }
        );	
    },
  }
};
</script>
<style scoped>
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

.list {
  background: #fff;
  margin: 15px;
  padding: 5px;
}
.colorCCC {
  color: #686a6c;
}

.blod {
  font-weight: bold;
}
/* 订单详情css */
.details {
      width: 396px;
      background: #fff;
      margin: 7px;
      float: left;
      border: 1px solid #E7EAEC;
      border-radius: 4px;
      padding-bottom: 18px;
      box-shadow: 0 0 0 #E7EAEC;
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
      color:#252525;
  }
  .time {
      font-size: 10px;
      font-family: PingFangSC-Regular;
      color:#999999;
  }
  .Specification{
      font-size: 10px;
      font-family: PingFangSC-Regular;
      color:#999999;
  }
  .starImg {
      width: 10px;
      height: 10px;
      display: block;
      margin-left: 10px;
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
      font-size: 16px;
      font-family: PingFangSC-Medium;
      font-weight:600;
      color: #252525;
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
      font-size: 14px;
      font-family: PingFangSC-Medium;
      color: #252525;
      margin-bottom: 20px;
  }

  .btn{
      margin-top: 20px;
  }
  .Complaintreply{
    width: 100%;
    height: 24px;
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

</style>


