<template>
  <div class="flex side_sdx ivuInput-box">
    <!--头部信息-->
    <div class="H_t flex side_sdx mainAlign_center">
      <div>代理商交易账单</div>
      <div>
        <router-link class="colorCCC" to="/platformBilling">首页</router-link>&nbsp;&nbsp; /&nbsp;&nbsp;
        <router-link class="colorCCC blod" to="/platformBilling">代理商交易账单</router-link>
      </div>
    </div>

    <div class="list">
      <!-- 搜索区域 -->
      <div class="search_box">
        <Form :model="queryData" ref="queryData" label-position="right" inline>
          <!-- <FormItem prop="searchName">
					<Input :style="input_width" icon="ios-search" v-model="queryData.searchName" placeholder="请输入订单编号、店铺名称"></Input>
          </FormItem>-->

          <FormItem label="日期" prop="completeDatetimeStart" :label-width="60">
            <DatePicker
              type="date"
              placeholder="起始时间"
              :style="selectStyle"
              @on-change="createChange"
              v-model="queryData.completeDatetimeStart"
            ></DatePicker>
          </FormItem>

          <FormItem :label-width="15" label="-" prop="completeDatetimeEnd">
            <DatePicker
              type="date"
              placeholder="截止时间"
              :style="selectStyle"
              @on-change="TransactionChange"
              v-model="queryData.completeDatetimeEnd"
            ></DatePicker>
          </FormItem>
          <FormItem label="代理商" prop="toAgencyName" :label-width="90">
            <Input :style="input_width" v-model="queryData.toAgencyName" placeholder="请输入代理商名称"></Input>
          </FormItem>
          <!-- <FormItem label="状态：" prop="orderStatus" :label-width="80">
					<Select placeholder="请选择" v-model="queryData.orderStatus" :style="selectStyle">
						<Option :value="item.value" v-for="(item,i) in orderTypeList" :key="i">{{item.label}}</Option>
					</Select>
          </FormItem>-->
          <div class="clearfix search">
            <Button type="primary" @click="clearVal()" class="fr mar_l20">清空</Button>
            <Button type="primary" @click="getList()" class="fr">搜索</Button>
          </div>
        </Form>
      </div>
      <div class="transaction">
        <span>
          总交易单数
          <i>{{orderCount}}</i>
        </span>
        <span>
          分润总金额
          <i>{{amountCount}}</i>
        </span>
      </div>
      <!-- 信息列表 -->
      <div class="list_data_h flex main_zdy mainAlign_around">
        <div>交易时间</div>
        <div>支付方式</div>
        <div>分期银行</div>
        <div>分期期数</div>
        <div>分润来源</div>
        <div>来源名称</div>
        <div>员工名称</div>
        <div>分润金额</div>
      </div>
      <!--数据列表-->
      <div v-if="dataList.length==0" class="nolist">暂无数据</div>
      <div
        v-else
        class="list_data_c flex main_zdy mainAlign_around"
        v-for="(item,index) in dataList"
        :key="index"
      >
        <div class="lineH">{{item.businessDateTime}}</div>
        <div class="lineH">{{item.payType}}</div>
        <div class="lineH">{{item.stagesNum}}</div>
        <div class="lineH">{{item.stagesNum}}</div>
        <div class="lineH">{{item.stagesName}}</div>
        <div class="lineH">{{item.fromName}}</div>
        <div class="lineH">{{item.recommendName}}</div>
        <div class="lineH">{{item.amount}}</div>
      </div>
      <!-- table表格 -->
      <div class="list_data">
        <!-- <Table border stripe :columns="columns" :data="dataList"></Table> -->
        <div class="list_data_b flex main_ydz">
          <Page
            :total="Page.total"
            :page-size="Page.pageSize"
            :current="Page.current"
            @on-change="pageChange"
          ></Page>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import moment from "moment";
export default {
  data() {
    return {
      input_width: "width: 250px",
      selectStyle: "width: 170px",
      userid: "",
      token: "",
      queryData: {
        completeDatetimeStart: "",//开始时间
        completeDatetimeEnd: "",//截止时间
        toAgencyName: "",//代理商名称
      },
      orderTypeList: [
        {
          value: "1",
          label: "待付款"
        },
        {
          value: "2",
          label: "待发货"
        },
        {
          value: "3",
          label: "待收货"
        },
        {
          value: "4",
          label: "交易成功"
        },
        {
          value: "5",
          label: "交易关闭"
        }
      ], // 状态列表
      dataList: [],
      //分页
      Page: {
        total: 0,
        pageSize: 10,
        current: 1
	  },
	  amountCount:"",//分润总金额
	  orderCount:"",//总交易单数
    };
  },
  created() {
    this.userid = localStorage.getItem("userid");
    this.token = localStorage.getItem("token");
    // this.getList();
  },
  methods: {
    // 开始时间
    createChange(daterange) {
      this.queryData.completeDatetimeStart = daterange;
    },
    // 结束时间
    TransactionChange(daterange) {
      console.log(daterange);
      this.queryData.completeDatetimeEnd = daterange;
    },
    //获取列表数据
    getList() {
      console.log(this.queryData);
      const params = {
        ...this.queryData,
        pageNum: this.Page.current,
        pageSize: this.Page.pageSize
      };
      console.log(params);
      var data = "";
      for (var i in params) {
        data +=
          encodeURIComponent(i) + "=" + encodeURIComponent(params[i]) + "&";
      }
      data = data.slice(0, -1);
      this.$APIMy(
        "post",
        // "order/queryPlatformOrder",
        "separateaccountsplan/queryseparateaccountsplanbycondition",
        data,
        this.userid,
        this.token,
        res => {
          console.log(res.data.data.list);
		  var data = res.data.data.list;
		  this.amountCount= res.data.data.amountCount;
		  this.orderCount= res.data.data.orderCount;
          this.dataList =data;
          this.Page.total = res.data.data.total;
        },
        res => {
          this.$Message.warning(res.data.message);
        },
        res => {
          this.$Message.error(res.data.message);
        }
      );
    },
    // 清空
    clearVal() {
      this.$refs.queryData.resetFields();
      this.Page.current = 1;
      this.getList();
    },
    // 分页操作
    pageChange(e) {
      //console.log(e)
      this.Page.current = e;
      this.getList();
    },
    See(Id, item) {
      console.log(Id);
      this.$router.push({
        path: "/proprietaryOrderDetail",
        query: { id: Id, data: item }
      });
    }
  }
};
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
.list_data_b {
  margin-top: 12px;
  padding-bottom: 10px;
}

.H_t div:nth-child(2) span {
  color: #686a6c;
}

.list {
  background: #fff;
  margin: 20px 20px 0 20px;
  padding: 0 20px;
}

.list_data {
  padding-top: 20px;
}

.colorCCC {
  color: #686a6c;
}

.blod {
  font-weight: bold;
}

.search_box {
  margin: 30px 0 30px 0;
}
.ivuInput-box .ivu-input {
  width: 100% !important;
}
.search {
    display: inline-block;
    margin-left: 20px;
    /* float: right; */
}
/* 修改 */
.list_h_btn {
  width: 120px;
  height: 40px;
  text-align: center;
  line-height: 40px;
  color: #565656;
  font-size: 16px;
  font-family: PingFangSC-Medium;
  font-weight: bold;
  border: none;
  outline: none;
  background: #f3f3f4;
}

.list_h_btnon {
  width: 120px;
  height: 42px;
  text-align: center;
  line-height: 40px;
  color: #51b095;
  font-size: 16px;
  font-family: PingFangSC-Medium;
  font-weight: bold;
  border: none;
  outline: none;
  background: #fff;
  border-top: 1px solid #e7eaec;
  /*border-left: 1px solid #E7EAEC;*/
  border-right: 1px solid #e7eaec;
  border-bottom: 1px solid #fff;
  border-radius: 4px 4px 0 0;
}

.list_data {
  padding-top: 20px;
}

.list_data_h {
  background: #f3f3f4;
  box-sizing: border-box;
}

.list_data_h > div {
  width: 100%;
  height: 44px;
  text-align: center;
  line-height: 44px;
  border: 1px solid #dddddd;
  font-size: 14px;
  font-family: PingFangSC-Medium;
  font-weight: bold;
  color: #686a6c;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
/* .list_data_h>div:nth-child(1){
			width: 40%;
	}
	.list_data_h>div:nth-child(6){
			width: 160%;
	}
	.list_data_h>div:nth-child(7){
			width: 160%;
	} */
.list_data_c:nth-child(odd) {
  background: #fff;
  box-sizing: border-box;
}

.list_data_c:nth-child(even) {
  background: #f9f9f9;
  box-sizing: border-box;
}
/* .list_data_c>div:nth-child(1){
			width: 40%;
			line-height: 70px;
	}
	.list_data_c>div:nth-child(6){
			width: 160%;
	}
	.list_data_c>div:nth-child(7){
			width: 160%;
			line-height: 22px;
	} */
.lineH {
  line-height: 80px;
  text-align: center;
}
.list_data_c > div {
  width: 100%;
  height: 80px;
  /* line-height: 44px; */
  border: 1px solid #e7eaec;
  font-size: 10px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: #686a6c;
  /* padding: 5px 15px; */
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.list_data_c:hover {
  background-color: #f5f5f5;
}
/* .list_data_c > div:nth-child(1) {
  width: 40%;
} */
/* .list_data_c:hover{
		background-color: #000;
	} */
.list_data_b {
  margin-top: 12px;
  padding-bottom: 10px;
}
.text-l {
  text-align: left;
}
.nolist {
  width: 100%;
  height: 50px;
  text-align: center;
  line-height: 50px;
  font-size: 16px;
}
.ordername {
  margin: 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.transaction {
  padding: 10px 0px;
}
.transaction span {
  display: inline-block;
  width: 150px;
  font-size: 14px;
  line-height: 22px;
}
.transaction span i {
  font-style: normal;
}
</style>