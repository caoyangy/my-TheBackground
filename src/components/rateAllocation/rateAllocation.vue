<template>
  <div class="flex side_sdx ivuInput-box">
    <!--头部信息-->
    <div class="H_t flex side_sdx mainAlign_center">
      <div>费率配置</div>
      <div>
        <router-link to="/YshopManagement" class="colorCCC">首页</router-link>&nbsp;&nbsp; /&nbsp;&nbsp;
        <router-link to="/YshopManagement" class="colorCCC blod">费率配置</router-link>
      </div>
    </div>
    <div style="height:20px"></div>
    <div class="list">
      <!-- 搜索区域 -->
      <!-- <div class="search_box">
        <Form :model="queryData" ref="queryData" label-position="right" inline>
          <FormItem prop="providerName">
            <Input
              :style="input_width"
              icon="ios-search"
              v-model="queryData.shopName"
              placeholder="费率名称"
            ></Input>
          </FormItem>
          <FormItem>
            <Button type="primary" @click="getList()" class>搜索</Button>
            <Button type="primary" @click="clearVal()" class="mar_l20">清空</Button>
          </FormItem>
        </Form>
      </div> -->
      
      <div class="list">
        <div style="height:20px"></div>
        <div class="onePayment">
          <div class="PaymentH">
            <span>交易费率</span>
            <span class="red"> &nbsp;&nbsp;单位： %</span>
          </div>
          <div  class="search_box" style="margin: 15px 0px;">
            <div class="clearfix">
              <Button type="primary" @click="shutAdd()">添加</Button>
            </div>
          </div>
          <div class="list_data_h flex main_zdy mainAlign_around">
            <div>支付方式</div>
            <div>交易费率成本</div>
            <div>交易费率报价</div>
            <div> 操作</div>
          </div>
          <div class="list_data_c flex main_zdy mainAlign_around" v-for="(item,index) in paymentList">
            <div>{{item.payTypeCodeName}}</div>
            <div>
              <span v-if="item.iSshow">{{item.costRate}}</span>
              <Input
                type="text"
                size="large"
                :style="selectStyle"
                :value="item.costRate"
                v-model="item.costRate"
                v-else
              />
            </div>
            <div>
              <span v-if="item.iSshow">{{item.quotationRate}}</span>
              <Input
                type="text"
                size="large"
                v-model="item.quotationRate"
                :value="item.quotationRate"
                :style="selectStyle"
                v-else
              />
            </div>
            <div class="blou">
              <div v-if="item.iSshow">
                <Button class="warning" size="small" @click="modify(item.costRate,item.quotationRate,index)">修改</Button>
              </div>
              <div v-else>
                <Button class="warning" size="small" @click="modifyOk(item.id,index,item.costRate,item.quotationRate)">确认</Button>
                <Button class="warningstop" size="small" @click="cancel(index)">取消</Button>
              </div>
            </div>
          </div>
        </div>
        
      </div>
      <!-- //一次性分期模态框 -->
      <div class="hide flex sideAlign_center mainAlign_center" v-show="telshow">
			<div class="hide_d">
				<div class="flex main_ydz"><img src="../../assets/img/shut.png" class="cha" @click="shut"></div>
				<div class="hide_title margin">添加费率内容</div>
        <div class="list_data_h flex main_zdy mainAlign_around">
            <div>支付方式</div>
            <div>交易费率成本</div>
            <div>交易费率报价</div>
        </div>
        <div class="list_data_c flex main_zdy mainAlign_around" >
            <div>
              <Select v-model="AddForm.payTypeCode" :style="selectStyle">
                  <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
            </div>
            <div>
              <Input
                type="text"
                size="large"
                :style="selectStyle"
                v-model="AddForm.costRate"
              />
            </div>
            <div>
              <Input
                type="text"
                size="large"
                :style="selectStyle"
                v-model="AddForm.quotationRate"
              />
            </div>
            
        </div>
				<div class="flex mainAlign_center margin">
					<input type="button" name="" id="" value="确定" class="btnsALL" @click="cancelAdd" />
					<input type="button" name="" id="" value="取消" class="btnsALL" @click="shut" />
				</div>
			</div>
    </div>
    <!-- 银行分期模态框 -->
      <div class="hide flex sideAlign_center mainAlign_center" v-show="telSshow">
			<div class="hide_d">
				<div class="flex main_ydz"><img src="../../assets/img/shut.png" class="cha" @click="shutStagerate"></div>
				<div class="hide_title margin" >添银行分期费率内容</div>
        <div class="list_data_h flex main_zdy mainAlign_around">
            <div>期数</div>
            <div>最低限额（100元)</div>
            <div>交易费率成本</div>
            <div>交易费率报价</div>
        </div>
        <div class="list_data_c flex main_zdy mainAlign_around " >
            <!-- <Select v-model="AddForm.payTypeCode" :style="selectStyle">
                <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select> -->
            <div>
                <Input
                  type="text"
                  size="large"
                  :style="selectStyle"
                  v-model="AddStagerateForm.stagesNum"
                />
            </div>
            <div>
              <Input
                type="text"
                size="large"
                :style="selectStyle"
                v-model="AddStagerateForm.floorLimit"
              />
            </div>
            <div>
              <Input
                type="text"
                size="large"
                :style="selectStyle"
                v-model="AddStagerateForm.costRate"
              />
            </div>
            <div>
                <Input
                  type="text"
                  size="large"
                  :style="selectStyle"
                  v-model="AddStagerateForm.quotationRate"
                />
            </div>
            
        </div>
				<div class="flex mainAlign_center margin">
					<input type="button" name="" id="" value="确定" class="btnsALL" @click="AddStagerate" />
					<input type="button" name="" id="" value="取消" class="btnsALL" @click="shutStagerate" />
				</div>
			</div>
    </div>
    </div>
    <div style="height:20px"></div>
      <div class="list">
          <!-- 银联分期费率 -->
      <div class="list">
        <div style="height:20px"></div>
          <div class="onePayment">
          <div class="PaymentH">
            <span>银联分期费率</span>
            <span class="red"> &nbsp;&nbsp;单位： %</span>
            <span style="lineHeight:36px;">&nbsp;&nbsp;&nbsp;&nbsp;选择分期银行，即可查看对应费率</span>
          </div>
          <div v-for="(item,i) in dataList" class="bankCode">
            <div>
              
              <Button @click="Stagerate(item.bankCode,item.id,i)" class="btn_w">{{item.bankName}}</Button>
              <div  class="search_box" style="display:inline;float: right">
                <Button @click="addStagerateAdd(item.bankCode)" type="primary">添加</Button>
              </div>
							
            </div>
            <div class="overflowY">
                <div class="title" v-if="item.type">
                  <span>期数</span>
                  <span>最低限额（100元)</span>
                  <span>费率成本</span>
                  <span>费率报价</span>
                  <span>操作</span>
                </div>
                <div class="title" v-for="(itemS,k) in StagerateList" v-if="item.type">
                    <div class="list_data_c flex main_zdy mainAlign_around">
                      <div>{{itemS.stagesNum}}</div>
                      <div>
                        <span v-if="itemS.iSshowS">{{itemS.floorLimit}}</span>
                        <Input
                          type="text"
                          size="large"
                          :style="selectStyle"
                          :value="itemS.floorLimit"
                          v-model="itemS.floorLimit"
                          v-else
                        />
                      </div>
                      <div>
                        <span v-if="itemS.iSshowS">{{itemS.costRate}}</span>
                        <Input
                          type="text"
                          size="large"
                          :style="selectStyle"
                          :value="itemS.costRate"
                          v-model="itemS.costRate"
                          v-else
                        />
                      </div>
                      <div>
                        <span v-if="itemS.iSshowS">{{itemS.quotationRate}}</span>
                        <Input
                          type="text"
                          size="large"
                          :style="selectStyle"
                          :value="itemS.quotationRate"
                          v-model="itemS.quotationRate"
                          v-else
                        />
                      </div>
                      <div class="blou">
                        <div v-if="itemS.iSshowS">
                          <Button class="warning" size="small" @click="StagerateListX(itemS.costRate,itemS.quotationRate,k)">修改</Button>
                        </div>
                        <div v-else>
                          <Button class="warning" size="small" @click="StagerateListS(itemS.id,itemS.costRate,itemS.quotationRate,itemS.floorLimit,k,i)">确认</Button>
                          <Button class="warningstop" size="small" @click="Stageratecancel(itemS.id,itemS.costRate,itemS.quotationRate,itemS.floorLimit,k,i)">取消</Button>
                        </div>
                      </div>
                    </div>
                </div>
            </div>
            
            
          </div>
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
      cityList: [
          {
              value: '1',
              label: '微信支付'
          },
          {
              value: '2',
              label: '银联卡支付'
          },
          {
              value: '5',
              label: '银联卡分期'
          },
          {
              value: '3',
              label: '支付宝支付'
          }
      ],
      index:0,
      StagerateId:"",
      StagerateName:"",
      telSshow:false,//银行分期模态框
      telshow:false,//一次模态框
      offer: "",
      cost: "",
      modify2: true,
      input_width: "width: 250px",
      selectStyle: "width: 170px",
      userid: "",
      token: "",
      queryData: {
        shopName: null
      },
      dataList: [],
			paymentList: [],
			StagerateList:[],  //查询到的分期数据
      //分页
      Page: {
        total: 0,
        pageSize: 5,
        current: 1
      },
      AddForm:{
        payTypeCode:"",
        costRate:"",
        quotationRate:""
      },
      AddStagerateForm:{
          shopId:"0",
          bankCode:"",
          stagesNum:1,
          costRate:"",
          quotationRate:"",
          floorLimit:"",
      }
    };
  },
  created() {
    this.userid = localStorage.getItem("userid");
    this.token = localStorage.getItem("token");
    this.bankList();
		this.deleateMsg();
		// this.Stagerate()
		// this.addStagerate()
  },
  methods: {
    // 提交事件
    deleateMsg() {
      var timestamp = Date.parse(new Date());
      this.$APIMy(
        "get",
        "ratedisposablemanager/querysepaccountsratedisposablelist?timestamp="+timestamp,
        {},
        this.userid,
        this.token,
        res => {
          var aa = res.data.data;
          for (var i = 0; i < aa.length; i++) {
            aa[i].iSshow = true;
          }
          this.paymentList = aa;
        },
        res => {
          this.$message.error(res.data.message);
        }
      );
      this.dialogVisible = false;
    },
    //查询银行数据集合
    bankList() {
      var timestamp = Date.parse(new Date());
      this.$APIMy(
        "get",
        "unionpaynojumpdata/querybankinfobystageslist?timestamp="+timestamp,
        {},
        this.userid,
        this.token,
        res => {
					console.log(res.data.data)
					var aa = res.data.data;
          for (var i = 0; i < aa.length; i++) {
            aa[i].type =false;
          }

					this.dataList=aa
				},
      );
    },
    addStagerateAdd(name){
      this.telSshow=true;
      this.AddStagerateForm.bankCode=name
    },
		//添加银行分期数据
			AddStagerate(name){
        console.log(name)
        if(this.toDecimal(this.AddStagerateForm.costRate)*1 >= 100 || this.toDecimal(this.AddStagerateForm.costRate)*1 < 0.01 || this.toDecimal(this.AddStagerateForm.quotationRate)*1 >= 100 || this.toDecimal(this.AddStagerateForm.quotationRate)*1 < 0.01){
          return  this.$Message.error("请填写99.99~0.01之间的费率值");
        }else if(this.Toggle(this.AddStagerateForm.costRate) || this.Toggle(this.AddStagerateForm.quotationRate)){
          return  this.$Message.error("费率值只可以保留两位小数噢，亲");
        }
        this.AddStagerateForm.stagesNum=this.AddStagerateForm.stagesNum*1
        this.AddStagerateForm.costRate=this.toDecimal(this.AddStagerateForm.costRate)
        this.AddStagerateForm.quotationRate=this.toDecimal(this.AddStagerateForm.quotationRate)
        const params = {
				...this.AddStagerateForm,
      };
      
			var data = "";
      for (var i in params) {
        data +=
          encodeURIComponent(i) + "=" + encodeURIComponent(params[i]) + "&";
      }
      data = data.slice(0, -1);
					 this.$APIMy(
					"post",
					"sepaccountsunionpaycreditcardmanager/addunionpayratedata?"+data,
					{},
					this.userid,
					this.token,
					res => {
            this.telSshow=false;
            this.bankList()
            // this.Stagerate(this.StagerateName,"",this.index)
						this.$Message.success("添加成功");
          },
          	res => {

            },
            res => {}
				);
			},
		//查询银行分期数据
    Stagerate(name,id,i,x) {
      console.log(this.dataList[i].type)
          
      if(!this.dataList[i].type){
        this.StagerateName=name
          this.StagerateId=id
          var timestamp = Date.parse(new Date());
          for (var y = 0; y < this.dataList.length; y++) {
            this.dataList[y].type = false;
          }
          this.dataList[i].type =true;
          this.$APIMy(
            "get",
            "sepaccountsunionpaycreditcardmanager/queryunionpaycreditcardlist?timestamp="+timestamp+"&shopId=0&bankCode="+name,
            {},
            this.userid,
            this.token,
            res => {
              var aa = res.data.data;
              for (var i = 0; i < aa.length; i++) {
                aa[i].iSshowS =true;
              }
              this.StagerateList=aa
              console.log(this.StagerateList)
              
              // this.Page.total = res.data.data.total;
            },
          	res => {

            },
            res => {}
          );
      }else{
        if(x){
          this.StagerateName=name
          this.StagerateId=id
          var timestamp = Date.parse(new Date());
          for (var y = 0; y < this.dataList.length; y++) {
            this.dataList[y].type = false;
          }
          this.dataList[i].type =true;
          this.$APIMy(
            "get",
            "sepaccountsunionpaycreditcardmanager/queryunionpaycreditcardlist?timestamp="+timestamp+"&shopId=0&bankCode="+name,
            {},
            this.userid,
            this.token,
            res => {
              var aa = res.data.data;
              for (var i = 0; i < aa.length; i++) {
                aa[i].iSshowS =true;
              }
              this.StagerateList=aa
              console.log(this.StagerateList)
              
              // this.Page.total = res.data.data.total;
            },
          );
        }else{
          this.dataList[i].type =! this.dataList[i].type;
        }
        
        
      }
      
		},
		//修改银行费率
		StagerateListS(id,costRate,quotationRate,floorLimit,k,i){
      console.log(i)
			var timestamp = Date.parse(new Date());
      if(this.toDecimal(costRate)*1 >= 100 || this.toDecimal(costRate)*1 < 0.01 || this.toDecimal(quotationRate)*1 >= 100 || this.toDecimal(quotationRate)*1 < 0.01){
        return  this.$Message.error("请填写99.99~0.01之间的费率值");
      }else if(this.Toggle(costRate) || this.Toggle(quotationRate)){
        return  this.$Message.error("费率值只可以保留两位小数噢，亲");
      }
      this.$APIMy(
        "post",
        "sepaccountsunionpaycreditcardmanager/updateunionpayratedata?id="+id+"&costRate="+this.toDecimal(costRate)+"&quotationRate="+this.toDecimal(quotationRate)+"&floorLimit="+floorLimit,
        {},
        this.userid,
        this.token,
        res => {
          this.StagerateList[k].iSshowS = true;
          this.Stagerate(this.StagerateName,id,i,1)
				},
      );
    },
    //取消银行分期修改
    Stageratecancel(id,costRate,quotationRate,floorLimit,k,i){
      this.StagerateList[k].iSshowS = true;
      this.Stagerate(this.StagerateName,id,i,1)
    },
    //修改一次性支付
    modifyAll(id,i,cost,offer) {
      var timestamp = Date.parse(new Date());
      var data = {
        id: id,
        costRate: this.cost,
        quotationRate: this.offer
      };
      if(this.toDecimal(cost)*1 >= 100 || this.toDecimal(cost)*1 < 0.01 || this.toDecimal(offer)*1 >= 100 || this.toDecimal(offer)*1 < 0.01){
        return  this.$Message.error("请填写99.99~0.01之间的费率值");
      }else if(this.Toggle(cost) || this.Toggle(offer)){
        return  this.$Message.error("费率值只可以保留两位小数噢，亲");
      }
      this.$APIMy(
        "post",
        "/ratedisposablemanager/updatesepaccountsratedisposable?timestamp="+timestamp+"&id=" + id +"&costRate=" +this.toDecimal(cost) + "&quotationRate=" +this.toDecimal(offer),
        {},
        this.userid,
        this.token,
        res => {
          this.$Message.success("修改成功");
          this.deleateMsg();
        },
        res => {
          this.$Message.warning(res.data.message);
        },
        res => {
          this.$Message.error(res.data.message);
        }
      );
    },
    Toggle(t){
      
          var to=t.split(".")[1]
          console.log(to)
          if(to != undefined){
              if(to.length>2){
                  return true
              }else{
                return  false
              }
          }
          return false
    },
		toDecimal(x) {    
        var f = parseFloat(x);    
        if (isNaN(f)) {    
            return false;    
        }    
        var f = Math.round(x*100)/100;  
        var s = f.toString();    
        var rs = s.indexOf('.');  
        console.log(rs)    
        if (rs < 0) {    
            rs = s.length;    
            s += '.';    
        }    
        while (s.length <= rs + 2) {    
            s += '0';    
        }    
				return s; 
				},
    // 删除
    del(id) {
      this.$APIMy(
        "post",
        "provider/deleteProvider",
        { id: id },
        this.userid,
        this.token,
        res => {
          this.$Message.success("删除成功");
        },
        res => {
          this.$Message.warning(res.data.message);
        },
        res => {
          this.$Message.error(res.data.message);
        }
      );
      this.getList();
    },
    // 清空
    clearVal() {
      this.$refs.queryData.resetFields();
      this.Page.current = 1;
      this.queryData.shopName = "";
      this.getList();
    },
    // 分页操作
    pageChange(e) {
      // console.log(e)
      this.Page.current = e;
      this.getList();
    },
    //编辑
    edit(id, item) {
      this.$router.push({
        path: "/MallChannelUpdate",
        query: { id: id, data: item }
      });
    },
    //查看
    See(id, item) {
      this.$router.push({
        path: "/MallChannelDetails",
        query: { id: id, data: item }
      });
    },
    //修改切换
    modify(x, y, i) {
      this.paymentList[i].iSshow = false;
      this.cost = x;
      this.offer = y;
		},
		StagerateListX(x, y, i) {
      this.StagerateList[i].iSshowS = false;
    },
    //确认修改
    modifyOk(id, i,cost,offer) {
      console.log(id, i);
      this.paymentList[i].iSshowS = true;
      this.modifyAll(id,i,cost,offer);
    },
    cancel(i) {
      this.paymentList[i].iSshow = true;
      this.deleateMsg();
    },
    shutStagerate(){
      this.telSshow=false
    },

    //关闭一次性付清弹框
    shut(){
      this.telshow=false
    },
    shutAdd(){
       this.telshow=true
    },
    //添加一次性费率
    cancelAdd() {
      if(this.toDecimal(this.AddForm.costRate)*1 >= 100 || this.toDecimal(this.AddForm.costRate)*1 < 0.01 || this.toDecimal(this.AddForm.quotationRate)*1 >= 100 || this.toDecimal(this.AddForm.quotationRate)*1 < 0.01){
        return  this.$Message.error("请填写99.99~0.01之间的费率值");
      }else if(this.Toggle(this.AddForm.costRate) || this.Toggle(this.AddForm.quotationRate)){
        return  this.$Message.error("费率值只可以保留两位小数噢，亲");
      }
      this.$APIMy(
        "post",
        "ratedisposablemanager/addsepaccountsratedisposable?payTypeCode="+this.AddForm.payTypeCode+"&costRate="+this.toDecimal(this.AddForm.costRate)+"&quotationRate="+this.toDecimal(this.AddForm.quotationRate),
        {},
        this.userid,
        this.token,
        res => {
          this.telshow=false
          this.deleateMsg();
          this.$Message.success("添加成功");
        },
        res => {
          this.$Message.warning(res.data.message);
        },
        res => {
          this.$Message.error(res.data.message);
        }
      );
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
.list_data_b {
  margin-top: 12px;
  padding-bottom: 10px;
}
.list {
  background: #fff;
  margin: 0px 20px 0 20px;
  /* padding: 0 20px; */
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

/* .search_box {
  margin: 20px 0 10px 0;
} */

.ivuInput-box .ivu-input {
  width: 100% !important;
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
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
/* .list_data_h div:nth-child(1){
			width: 40%;
	}
	.list_data_h div:nth-child(11){
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

.list_data_c>div {
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
/* .list_data_c div:nth-child(1){
			width: 40%;
	}
	.list_data_c div:nth-child(11){
			width: 160%;
	} */
/* .list_data_c:hover{
		background-color: #000;
	} */
.list_data_b {
  margin-top: 12px;
  padding-bottom: 10px;
}
.nolist {
  width: 100%;
  height: 50px;
  text-align: center;
  line-height: 50px;
  font-size: 16px;
}
.warning {
  width: 54px;
  height: 28px;
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
.warningstop {
  width: 54px;
  height: 28px;
  line-height: 24px;
  color: #fff;
  font-size: 14px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  border-radius: 4px;
  background: #ed5565;
  border: none;
  outline: none;
  cursor: pointer;
}
.list_data_c:hover {
  background-color: #f5f5f5;
}

.onePayment {
  width: 100%;
  padding: 20px;
}
.PaymentH {
  width: 100%;
  height: 40px;
  background-color: #fff;
  line-height: 40px;
  text-indent: 10px;
  font-size: 14px;
  border-bottom: 1px solid #ccc;
}
.PaymentH span:nth-child(1){
  font-weight: 600;
}
.Installment {
  width: 100%;
  height: 150px;
}
.Installment > div {
  display: inline-block;
  text-align: center;
  font-size: 14px;
  height: 100%;
}
.Installment > div:nth-child(1) {
  width: 19%;
  font-size: 14px;
  float: left;
  line-height: 150px;
}
/* .Installment>div:nth-child(2){
        width: 80%;
        border-bottom: 1px solid #ccc;
        float: right;

    }
    .Installment>div:nth-child(2)>div{
        width: 100%;
        text-align: center;
    } */
.aa {
  width: 80%;
  padding: 0;
  margin: 0;
  overflow-y: scroll;
  background-color: #fff;
}
.title {
  width: 100%;
  height: 44px;
  line-height: 44px;
  font-size: 14px;
  border-bottom: 1px solid #ccc;
}
.title span {
  display: inline-block;
  width: 19%;
  text-align: center;
}
.blou {
  color: #51b095;
}
.Instal {
  width: 100%;
  height: auto;
  float: right;
  border-bottom: 1px solid #ccc;
}
.Instal span {
  display: inline-block;
  width: 24%;
  height: 40px;
  line-height: 40px;
}
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
		width: 800px;
		background: #fff;
		border-radius: 10px;
		padding: 20px;
		box-sizing: border-box;
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
		font-size: 16px;
		font-family: PingFangSC-Regular;
		font-weight: 400;
		line-height: 24px;
		text-align: center;
		color: #575757;
    }  
     .btnsALL {
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
	
	.btnsALL:nth-child(1) {
		background: #52B095;
		color: #fff;
	}
	
	.btnsALL:nth-child(2) {
		background: #C7C7C7;
		color: #fff;
    }   
    .btn_w{
      width: 94%;
    }
    .bankCode{
      margin-top: 15px;
    }
    .ListNun{
      line-height: 46px;
      text-align: center;
    }
    .red{
      color: #52B095;
    }
    .margin{
      margin: 20px 0px;
    }
    .overflowY{
      width: 94%;
      max-height: 220px;
      overflow-y: auto;
    }
</style>