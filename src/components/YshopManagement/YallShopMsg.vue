<template>
  <div class="flex side_sdx">
    <!--头部信息-->
    <div class="H_t flex side_sdx mainAlign_center">
      <div>课程管理</div>
      <div>
        首页&nbsp;&nbsp; /&nbsp;&nbsp;
        <router-link class="colorCCC blod" to="/YallShopMsg">门店信息</router-link>
      </div>
    </div>

    <!--列表-->
    <div class="list">
      <div class="back_color_fff"></div>

      <div class="list_data">
        <Form :model="queryData" ref="queryData" label-position="right" inline>
          <FormItem class="clearfix search_btn">
            <button  @click="getList()"> 搜索 </button>
            <button @click="clearVal()"> 清空 </button>
					  
          </FormItem>
          <FormItem prop="name">
            <Input
              :style="input_width"
              icon="ios-search"
              v-model="queryData.name"
              placeholder="请输入店铺名称"
            ></Input>
          </FormItem>
          <FormItem prop="productName">
            <Input
              :style="input_width"
              icon="ios-search"
              v-model="queryData.productName"
              placeholder="请输入课程名称"
            ></Input>
          </FormItem>
          <FormItem prop="address">
            <Input
              :style="input_width"
              icon="ios-search"
              v-model="queryData.address"
              placeholder="请输入地址信息"
            ></Input>
          </FormItem>
          <FormItem label="经营品类:" prop="status" :label-width="90">
            <!-- <Select placeholder="请选择" v-model="queryData.categoryId" :style="selectStyle">
              <Option :value="item.name" v-for="(item,i) in statusList" :key="i" @click.native="delet(item.id)">{{item.label}}</Option>
            </Select>-->
            <el-select v-model="queryData.firstCategoryId" size="small" placeholder="请选择">
              <el-option
                v-for="(item,index) in statusList"
                :key="index"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </FormItem>
          
        </Form>
        <div style="height:20px"></div>
        <!--列表头部-->
        <div class="list_data_h flex main_zdy mainAlign_around">
          <div>门店名称</div>
          <div>所在城市</div>
          <div>详细地址</div>
          <div>门店电话</div>
          <div>经营品类</div>
          <div>课程数量</div>
          <div>已上架</div>
          <div>已下架</div>
          <div>操作</div>
        </div>
        <!--数据列表-->
        <div v-if=" listOrder != [] ">
          <div
            class="list_data_c flex main_zdy mainAlign_around"
            v-for="(item,index) in listOrder"
            :key="index"
          >
            <div :title="item.name">{{item.name}}</div>
            <div :title="item.city">{{ item.city }}</div>
            <div :title="item.address">{{ item.address }}</div>
            <div :title="item.tel">{{ item.tel }}</div>
            <div>{{ item.categoryName }}</div>
            <!-- <div>{{ item.totalNum }}</div> -->
            <div>{{item.upPutAway*1+item.downPutAway*1}}</div>
            <div>{{ item.upPutAway }}</div>
            <div>{{ item.downPutAway }}</div>
            <div class="flex sideAlign_center mainAlign_center">
              <button @click="audit(item.id)">编辑</button>
            </div>
          </div>
        </div>

        <!--数据列表-->
        <div class="list_data_c flex main_zdy mainAlign_around" v-else>
          <div style="width:100%;text-algin:center;">暂无门店信息</div>
        </div>
      </div>
      <!--页码-->
      <div class="list_data_b flex main_ydz">
        <Page
          :total="Page.total"
          :page-size="Page.pageSize"
          :current="Page.current"
          @on-change="pageChange"
        ></Page>
      </div>
    </div>
    <!-- 添加课程model -->
    <div class="hide flex sideAlign_center mainAlign_center" v-if=" addCouserModel ">
      <div class="hide_d add_couser_content">
        <h3>选择门店</h3>
        <div class="select_store">请选择需要添加课程的门店</div>
        <div class="search_store">
          <input type="text" v-model=" searchCouserVal ">
          <button @click=" searchMsgFn ">
            <Icon size="18" color="#fff" type="ios-search-outline"/>
          </button>
        </div>
        <div class="add_couser_msg">
          <div v-for=" (item,index) in addCouserList " :key="index">
            <i v-if=" iconFlage == index ">
              <Icon size="18" color="#52B095" type="md-checkmark-circle"/>
            </i>
            <i v-else @click=" isShow( index ) " class="active_circle"></i>
            <span :title=" item.name  ">{{ item.name }}</span>
          </div>
        </div>
        <div class="sbmit_couser">
          <button @click=" goAddCouser">确定</button>
        </div>
        <div @click="closeModel" class="close">
          <Icon size="22" type="md-close" color="#ccc"/>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      stateType: "",
      listOrder: [],
      //分页
      Page: {
        total: 0,
        pageSize: 10,
        current: 1
      },
      input_width: "width: 250px",
      selectStyle: "width: 170px",
      userid: "",
      token: "",
      searchStoreName: "", // 搜索课程
      content: "", // 提示框内容
      courseId: null, //课程id
      addCouserModel: false, // 添加课程model
      addCouserList: [], // 查询店铺列表
      iconFlage: -1, // 判断icon的展示隐藏
      searchCouserVal: "", //搜索框的双向
      queryData: {
        address: "", //地址
        productName: "", //课程名称
        name: "", //店铺名称
        firstCategoryId: "" //经营品类
      },
      statusList: []
    };
  },
  created() {
    this.userid = localStorage.getItem("userid");
    this.token = localStorage.getItem("token");
    this.getList();
    this.$API(
      "post",
      "category/findByEntity",
      {
        level: "1"
      },
      this.userid,
      this.token,
      res => {
        this.statusList = res.data.data.list;
        console.log(this.statusList);
      }
    );
  },
  methods: {
    pageChange(e) {
      this.Page.current = e;
      this.getList();
    },

    audit: function(id) {
      this.$router.push({
        path: "/YshopManagement",
        query: {
          id: id
        }
      });
    },

    //获取列表数据
    getList() {
      const params = {
        ...this.queryData,
        // status: "1012",
        //  userid:this.userid,
        currentPage: this.Page.current,
        pageSize: this.Page.pageSize
      };
      var data = "";
      for (var i in params) {
        data +=
          encodeURIComponent(i) + "=" + encodeURIComponent(params[i]) + "&";
      }
      data = data.slice(0, -1);
      console.log(params);
      //获取列表
      this.$API(
        "post",
        "productInfo/backgroundFindAllStores",
        params,
        this.userid,
        this.token,
        res => {
          this.listOrder = [];
          this.listOrder = res.data.data.list;
          console.log(this.listOrder);
          this.Page.total = res.data.data.list.length;
        }
      );
    },

    // 判断选中门店
    isShow(num) {
      this.iconFlage = num;
    },
    // 搜索事件
    searchMsgFn: function() {
      if (this.searchCouserVal == "") {
        this.$Message.error("搜索信息不能为空");
        return false;
      } else {
        this.getSearchList(
          "productInfo/backgroundStores",
          "",
          "",
          this.userid,
          this.token,
          this.searchCouserVal
        );
      }
    },
    // 跳转到添加课程页面
    goAddCouser: function() {
      if (this.iconFlage == -1) {
        this.$Message.error("请选择一个门店");
        return false;
      } else {
        this.$router.push({
          path: "/YaddorputCouser",
          query: {
            id: this.addCouserList[this.iconFlage].id,
            userId: this.addCouserList[this.iconFlage].userId
          }
        });
      }
    },
    // 清空
    clearVal() {
      //   this.$refs.queryData.resetFields();
      this.queryData = {
        categoryName: "", //经营品类
        name: "", //课程名称
        storeName: "" //店铺名称
      };
      this.Page.current = 1;
      this.getList();
    },
    // 关闭模态框
    closeModel: function(state) {
      this.addCouserModel = false;
      this.iconFlage = -1;
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

.H_t div:nth-child(2) span {
  color: #686a6c;
}

.list {
  background: #fff;
  margin: 0 20px 0 20px;
  position: relative;
}

.list_h {
  height: 42px;
  background: #f3f3f4;
  margin: 0 -20px;
  border-bottom: 1px solid #e7eaec;
}

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
  border: none;
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
  padding: 20px 20px 0 20px;
}

.list_data_h {
  background: #f3f3f4;
  box-sizing: border-box;
}

.list_data_h div {
  width: 100%;
  height: 44px;
  text-align: center;
  line-height: 44px;
  border: 1px solid #dddddd;
  font-size: 14px;
  font-family: PingFangSC-Medium;
  font-weight: bold;
  color: #686a6c;
}

.list_data_c:nth-child(odd) {
  background: #fff;
  box-sizing: border-box;
}

.list_data_c:nth-child(even) {
  background: #f9f9f9;
  box-sizing: border-box;
}

.list_data_c div {
  width: 100%;
  height: 44px;
  text-align: center;
  line-height: 44px;
  border: 1px solid #e7eaec;
  font-size: 14px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: #686a6c;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.list_data_c div button {
  width: 54px;
  height: 24px;
  line-height: 24px;
  color: #fff;
  font-size: 14px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  border-radius: 4px;
  background: #eeaf68;
  border: none;
  outline: none;
  cursor: pointer;
}

.list_data_b {
  margin-top: 12px;
  padding-bottom: 10px;
  padding-right: 30px;
}

.colorCCC {
  color: #686a6c;
}

.blod {
  font-weight: bold;
}

.list_top {
  height: 45px;
  line-height: 40px;
  border-top: 6px solid #e7eaec;
  border-bottom: 1px solid #e7eaec;
  text-indent: 20px;
  font-size: 16px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: rgba(104, 107, 109, 1);
}

.oppen_add_couser_model {
  padding-left: 20px;
  margin: 10px 0px;
}

.oppen_add_couser_model button {
  width: 80px;
  height: 30px;
  line-height: 30px;
  background: rgba(82, 176, 149, 1);
  border-radius: 4px;
  font-size: 14px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: rgba(255, 255, 255, 1) !important;
  border: none;
  cursor: pointer;
}

.hide {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  position: absolute;
  top: 0;
  left: 0;
  z-index: 999999999;
}

.hide_d {
  width: 400px;
  /*height: 316px;*/
  background: #fff;
  border-radius: 10px;
  padding: 0 20px 20px 20px;
  box-sizing: border-box;
  position: relative;
}

.hide_d h3 {
  font-size: 24px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(87, 87, 87, 1);
  text-align: center;
  margin: 33px 0 30px;
}

.hide_d ul li {
  height: 36px;
  line-height: 36px;
  border-bottom: 1px solid rgba(239, 240, 244, 1);
  font-size: 12px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(153, 153, 153, 1);
}

.hide_d ul li span {
  float: right;
  margin-right: 2px;
  font-size: 12px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(87, 87, 87, 1);
}

.close {
  position: absolute;
  right: 12px;
  top: 10px;
  cursor: pointer;
}

.add_couser_content h3 {
  font-size: 24px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(87, 87, 87, 1);
  text-align: center;
}

.select_store {
  font-size: 14px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: rgba(37, 37, 37, 1);
  text-align: center;
}

.search_store {
  margin-top: 12px;
  text-align: center;
}

.search_store input {
  width: 282px;
  height: 32px;
  background: rgba(255, 255, 255, 1);
  border: 2px solid rgba(229, 230, 231, 1);
  border-radius: 2px 0px 0px 2px;
}

.search_store button {
  width: 40px;
  height: 32px;
  background: rgba(82, 176, 149, 1);
  border-radius: 0px 2px 2px 0px;
  border: none;
  margin-left: -4px;
  cursor: pointer;
}

.add_couser_msg {
  width: 320px;
  margin-left: 20px;
  margin-top: 20px;
  height: 200px;
  overflow: hidden;
  overflow-y: auto;
}

.add_couser_msg div {
  float: left;
  width: 50%;
  height: 54px;
  line-height: 54px;
}

.add_couser_msg div .active_circle {
  width: 16px;
  height: 16px;
  display: inline-block;
  background: #fff;
  border: 2px solid #cccccc;
  border-radius: 50%;
  float: left;
  margin-top: 18px;
  margin-right: 12px;
  cursor: pointer;
}

.add_couser_msg div .ivu-icon {
  float: left;
  margin-right: 10px;
  margin-top: 18px;
  cursor: pointer;
}

.add_couser_msg div span {
  /* display: inline-block; */
  width: 100px;
  float: left;
  overflow: hidden !important;
  font-size: 14px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(87, 87, 87, 1);
  white-space: nowrap;
  text-overflow: ellipsis;
}

.sbmit_couser {
  margin-top: 36px;
  text-align: center;
}

.sbmit_couser button {
  width: 120px;
  height: 40px;
  background: rgba(82, 176, 149, 1);
  border-radius: 6px;
  font-size: 16px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  cursor: pointer;
}

.back_color_fff {
  height: 20px;
  background-color: #f3f3f4;
}
 .search_btn {
		float: right;
	}

.search_btn button {
		width: 88px;
		height: 30px;
		background: rgba(82, 176, 149, 1);
		border-radius: 4px;
		color: rgba(255, 255, 255, 1);
		font-size: 14px;
		border: none;
		cursor: pointer;
	}

 .search_btn button:last-child {
		margin-left: 20px;
	}
</style>