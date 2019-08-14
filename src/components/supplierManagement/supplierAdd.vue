<template>
  <div class="flex side_sdx ivuInput-box">
    <!--头部信息-->
    <div class="H_t flex side_sdx mainAlign_center">
      <div>供应商管理</div>
      <div>
        <router-link class="colorCCC" to="/supplierManagementList">供应商管理</router-link>&nbsp;&nbsp; /&nbsp;&nbsp;
        <router-link class="colorCCC blod" to="/supplierAdd">新增供应商</router-link>
      </div>
    </div>
    <!-- 表单区域 -->
    <div class="list">
      <Form :model="supplierAddForm" ref="supplierAddForm" :rules="supplierAddRules" :label-width="90">
        <Card style="width: 100%">
           <FormItem label="店铺名称" prop="name">
            <Input :style="inputWid" v-model="supplierAddForm.name" placeholder="店铺名称" id="name_input"></Input>
          </FormItem>
          <!-- <FormItem label="供应商名称" prop="providerName">
            <Input :style="inputWid" v-model="supplierAddForm.providerName" placeholder="供应商名称"></Input>
          </FormItem> -->
          <FormItem label="地址信息"  prop="model2" style="width:100px;display: inline-block;" >
            <Select v-model="supplierAddForm.model2" size="small" style="width:100px" >
                <Option v-for="item in cityList" :value="item.areaName" :key="item.id" @click.native="Municipal(item.id,2,item.areaCode)">{{ item.areaName }}</Option>
            </Select>
          </FormItem>
          <FormItem  prop="model3" style="width:100px;display: inline-block;">
            <Select v-model="supplierAddForm.model3" size="small" style="width:100px" >
                <Option v-for="item in region" :value="item.areaName" :key="item.id" @click.native="county(item.id,3,item.areaCode)">{{ item.areaName}}</Option>
            </Select>
          </FormItem>
          <FormItem  prop="model4" style="width:500px; display: inline-block;">
            <Select v-model="supplierAddForm.model4" size="small" style="width:100px" >
                <Option v-for="item in Countytown" :value="item.areaName" :key="item.id" @click.native="Countylevel(item.areaCode)">{{ item.areaName }}</Option>
            </Select>
          </FormItem>
          <FormItem label="联系地址" prop="addressDetail">
            <Input :style="inputWid" v-model="supplierAddForm.addressDetail " placeholder="联系地址"></Input>
          </FormItem>
          <FormItem label="联系人名" prop="contactName">
            <Input
              :style="inputWid"
              v-model="supplierAddForm.contactName"
              placeholder="联系人名"
            ></Input>
          </FormItem>
          <FormItem label="联系电话" prop="contactPhoneNum">
            <Input
              :style="inputWid"
              v-model="supplierAddForm.contactPhoneNum"
              placeholder="联系电话"
            ></Input>
          </FormItem>
          <FormItem label="客服电话" prop="servicePhoneNum">
            <Input
              :style="inputWid"
              v-model="supplierAddForm.servicePhoneNum"
              placeholder="客服电话"
            ></Input>
          </FormItem>
          <FormItem label="退货地址" prop="returnAddress">
            <Input
              :style="inputWid"
              v-model="supplierAddForm.returnAddress"
              placeholder="退货地址"
            ></Input>
          </FormItem>
        </Card>
        <Card style="width: 100%" class="lender_box">
          <FormItem label="业务负责人" prop="clerkHeadName">
            <Input
              :style="inputWid"
              v-model="supplierAddForm.clerkHeadName"
              placeholder="姓名"
            ></Input>
          </FormItem>
          <FormItem label="手机号" prop="clerkHeadPhoneNum">
            <Input
              :style="inputWid"
              v-model="supplierAddForm.clerkHeadPhoneNum"
              placeholder="手机号"
            ></Input>
          </FormItem>
          <div>
            <span class="color_red">*</span>
            <span class="annotationText">该手机号作为供应商帐号</span>
          </div>
          
        </Card>
      </Form>
    </div>
    <div class="footer">
      <Button class="submission" @click="add">提交</Button>
      <Button class="mar_l20 cancel" @click="cancel">返回</Button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      inputWid: "width: 300px",
      delBtn_style: {
        backgroundColor: "#5c6b77",
        border: "none",
        color: "#fff",
        width: "18px",
        height: "18px",
        fontSize: "16px",
        margin: "6px"
      },
      supplierAddForm: {
        // providerName: "",
        addressDetail: "",
        contactName: "",
        contactPhoneNum: "",
        servicePhoneNum: "",
        clerkHeadName: "", //负责人
        clerkHeadPhoneNum: "",
        returnAddress: "",  //退货地址
        name:'', //店铺名称
        addressProvinceCode: '',  //省级编码
        addressCityCode: '',  //市级编码
        addressRegionCode: '',  //县级编码
        model2: '',  //省级名称
        model3: '',  //市级名称
        model4: '',  //县级名称
        // userId:'',   //创建人userId
      },
      supplierAddRules: {
        // providerName: [{ required: true, message: '供应商不能为空', trigger: 'blur' }],
        addressDetail: [{ required: true, message: '联系地址不能为空', trigger: 'blur' }],
        contactName: [{ required: true, message: '联系人不能为空', trigger: 'blur' }],
        contactPhoneNum: [{ required: true, message: '联系电话不能为空', trigger: 'blur' }],
        servicePhoneNum: [{ required: true, message: '客服电话不能为空', trigger: 'blur' }],
        clerkHeadName: [{ required: true, message: '业务负责人不能为空', trigger: 'blur' }],
        clerkHeadPhoneNum: [{ required: true, message: '负责人手机号不能为空', trigger: 'blur' }], 
        returnAddress: [{ required: true, message: '退货地址不能为空', trigger: 'blur' }], 
        name: [{ required: true, message: '店铺名称不能为空', trigger: 'blur' }],
        // model2: [{ required: true, message: '省级区域不能为空', trigger: 'blur' }], 
        // model3: [{ required: true, message: '市级区域不能为空', trigger: 'blur' }],
        model4: [{ required: true, message: '地址信息不完整不能为空', trigger: 'blur' }],
      },
      cityList:[],//省列表
       region:[],//市列表
       Countytown:[],  //区列表
    };
  },
  created() {
    this.userid = localStorage.getItem("userid");
    this.token = localStorage.getItem("token");
    // this.supplierAddForm.userId=localStorage.getItem("userid");
    this.siteLIst(1,1)
  },
  methods: {
      changeFormDate() {
          const formdatas = { ...this.supplierAddForm };
          delete formdatas.model2;
          delete formdatas.model3;
          delete formdatas.model4;
          return formdatas;
        },

    // 提交
    add() {
      // this.supplierAddForm.userId=localStorage.getItem("userid");
      this.$refs['supplierAddForm'].validate((valid) => {
        if (valid) {
          let formdatas = this.changeFormDate();
          var params = "";
          for (var i in formdatas) {
            params += encodeURIComponent(i) + "=" + encodeURIComponent(formdatas[i]) + "&";
          }
          params = params.slice(0, -1);
          //字符串形式接收数据
          this.$APIMy(
            "post",
            "/shop/save",
            params,
            this.userid,
            this.token,
            res => {
              console.log(res)
              this.$Message.success("添加供应商成功！");
              this.$router.push({ path: "/supplierManagementList" });
            },
            res => {
              this.$Message.warning(res.data.message);
            },
            res => {
              this.$Message.error(res.data.message);
            }
          );
          this.$refs.supplierAddForm.resetFields();
        } else {
            this.$Message.error('请将信息填写完整！');
        }
      })
      
    },
    // 取消
    cancel() {
      this.$refs.supplierAddForm.resetFields();
      this.$router.push({ path: "/supplierManagementList" });
    },
    //省级点击
    Municipal(id,num,Code){
      this.siteLIst(id,num)
      this.supplierAddForm.addressProvinceCode=Code
      this.supplierAddForm.model3=''
      this.supplierAddForm.model4=''
      this.region=[]//市列表
       this.Countytown=[] //区列表
    } ,
    //市级点击
    county(id,num,Code){
      this.siteLIst(id,num)
      this.supplierAddForm.addressCityCode=Code
      this.supplierAddForm.model4=''
      this.Countytown=[] //区列表
    } ,
    //县级点击
    Countylevel(Code){
        this.supplierAddForm.addressRegionCode=Code
    },
    //获取地址信息
     siteLIst(id,num){
       this.$APIMy(
        "post",
        "/area/getByParentId?parentId="+id,
        {},
        this.userid,
        this.token,
        res =>{
          if(num == 1){
            this.cityList = res.data.data
          }else if(num ==2){
            this.region = res.data.data
          }else{
            this.Countytown = res.data.data
          }
          console.log(this.region)
        }
       )
    }
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
  margin: 20px;
}
.colorCCC {
  color: #686a6c;
}

.blod {
  font-weight: bold;
}
.lender_box {
  margin-top: 10px;
}

.color_red {
  color: red;
  margin: 10px;
}
.annotationText {
  font-size: 13px;
  color: #bbbec4;
}
.footer {
  text-align: center;
  margin-bottom: 20px;
}
.ivuInput-box .ivu-input {
  width: 100% !important;
}
.submission{
  width: 90px;
  height: 30px;
  background-color:#52B095;
  color: #fff;
  margin:0 20px;
}
.cancel{
  width: 90px;
  height: 30px;
  background-color:#C7C7C7;
  color: #fff;
  margin:0 20px;
}
</style>


