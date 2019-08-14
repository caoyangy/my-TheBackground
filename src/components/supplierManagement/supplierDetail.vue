<template>
  <div class="flex side_sdx">
    <!--头部信息-->
    <div class="H_t flex side_sdx mainAlign_center">
      <div>供应商管理</div>
      <div>
        <router-link class="colorCCC" to="/supplierManagementList">供应商管理</router-link>&nbsp;&nbsp; /&nbsp;&nbsp;
        <router-link class="colorCCC blod" to="/supplierDetail">供应商详情</router-link>
      </div>
    </div>
    <!-- 信息区域 -->
    <div class="list">
      <Card style="width: 100%">
        <Row>
          <Col span="3">店铺名称：</Col>
          <Col span="21">{{supplierAddForm.name}}</Col>
        </Row>
        <Row>
          <Col span="3">供货商名称：</Col>
          <Col span="21">{{supplierAddForm.contactName}}</Col>
        </Row>
        <Row>
          <Col span="3">联系地址：</Col>
          <Col span="16">{{supplierAddForm.addressDetail}}</Col>
        </Row>
        <Row>
          <Col span="3">联系人名：</Col>
          <Col span="21">{{supplierAddForm.contactName}}</Col>
        </Row>
        <Row>
          <Col span="3">联系电话：</Col>
          <Col span="21">{{supplierAddForm.contactPhoneNum}}</Col>
        </Row>
        <Row>
          <Col span="3">客服电话：</Col>
          <Col span="21">{{supplierAddForm.servicePhoneNum}}</Col>
        </Row>
        <Row>
          <Col span="3">业务负责人：</Col>
          <Col span="21">{{supplierAddForm.clerkHeadName}}</Col>
        </Row>
        <Row>
          <Col span="3">手机号：</Col>
          <Col span="21">{{supplierAddForm.clerkHeadPhoneNum}}</Col>
        </Row>
      </Card>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
    supplierAddForm: {
        // contactName: "",  //销售代表名称
        // addressDetail: "",  //联系地址
        // contactName: "", //联系人
        // contactPhoneNum: "",//联系电话
        // servicePhoneNum: "",//客服电话
        // clerkHeadName:"", //业务员负责人姓名
        // clerkHeadPhoneNum: "", //负责人手机号
        // providerPrincipalPhone: "",//
        // name:'' //店铺名称
      },
    };
  },
  created() {
      //获取详情
      this.supplierAddForm = this.$route.query.data
      console.log(this.supplierAddForm)
  },
  
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
  margin: 20px;
}
.colorCCC {
  color: #686a6c;
}

.blod {
  font-weight: bold;
}

</style>


