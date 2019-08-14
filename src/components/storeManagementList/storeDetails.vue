<template>
  <div class="flex side_sdx wary">
    <!--头部信息-->
    <div class="H_t flex side_sdx mainAlign_center">
      <div>详情</div>
      <div>
        <router-link class="colorCCC" to="/storeList">首页</router-link>&nbsp;&nbsp; /&nbsp;&nbsp;
        <router-link class="colorCCC" to="/storeList">门店管理</router-link>&nbsp;&nbsp; /&nbsp;&nbsp;
        <router-link class="colorCCC blod" to="/storeDetails">详情</router-link>
      </div>
    </div>
    <!--tab切换-->
    <div class="tab flex main_zdy sideAlign_center">
      <a
        v-for="(item,index) in tab"
        :key="index"
        :class="tabname == item?'tab_don' :'tab_d'"
        @click="tabon(item,'#shops'+index)"
      >
        <div>{{item}}</div>
      </a>
    </div>
    <!-- 门店详情信息 -->
    <div class="list">
      <div class="header">
        <span class="modify" @click="modify" v-if="show">修改</span>
        <span>基本信息</span>
      </div>
      <Card style="width: 100%" v-if="show">
        <Row>
          <Col span="3">门店名称</Col>
          <Col span="21">{{InfoList.name}}</Col>
        </Row>
        <Row>
          <Col span="3">门店地址</Col>
          <Col span="16">{{InfoList.address}}</Col>
        </Row>
        <Row>
          <Col span="3">所在城市</Col>
          <Col span="21">{{province}}</Col>
        </Row>
        <Row>
          <Col span="3">注册手机号</Col>
          <Col span="21">{{InfoList.userPhone}}</Col>
        </Row>
        <Row>
          <Col span="3">门店二维码</Col>
          <Col span="21">
            <div><qriously :value="url1" :size="size" :backgroundAlpha="backgroundAlpha"/></div>
          </Col>
        </Row>
        <Row>
          <Col span="3">门店电话</Col>
          <Col span="21">{{InfoList.tel}}</Col>
        </Row>
        <Row>
          <Col span="3">经营品类</Col>
          <Col span="21">{{categoryName}}</Col>
        </Row>
        <Row>
          <Col span="3">课程价格</Col>
          <Col span="21">{{InfoList.priceRange}}</Col>
        </Row>
        <Row>
          <Col span="3">营业时间</Col>
          <Col span="21">{{InfoList.operateOpenTime}}~{{InfoList.operateEndTime}}</Col>
        </Row>
        <Row>
          <Col span="3">门店缩略图</Col>
          <Col span="21"><img class="storeImg" :src="InfoList.thumbnailImage" alt></Col>
        </Row>
        <Row>
          <Col span="3">门店首页banner图</Col>
          <!-- <Col span="21" v-for="item in InfoList.bannerList"> -->
          <Col span="21">
            <span v-for=" item in InfoList.bannerList">
                  <img class="storeImg" :src="item" alt>
            </span>
            
          </Col>
        </Row>
      </Card>
      <!-- //修改模块 -->
       <Form :model="supplierAddRules" ref="supplierAddRules" :rules="supplierAddRules" :label-width="120" v-else>
         <Card >
          <FormItem label="门店电话" prop="tel">
            <Input :style="inputWid" v-model="storeForm.tel" placeholder="门店电话"></Input>
          </FormItem>
          <FormItem label="营业时间" prop="businessHours">
            <!-- <Input :style="inputWid" v-model="storeForm.businessHours" placeholder="营业时间"></Input> -->
            <TimePicker format="HH:mm" type="timerange"  v-model="businessHours" placement="bottom-end" placeholder="Select time" style="width: 168px"></TimePicker>
          </FormItem>
           <FormItem label="课程縮略图" prop="picture">

              <div  class="demo-upload-list" v-for="(item,index) in thumbnailImage" :key="index">
                      <img :src="item">
                      <div class="demo-upload-list-cover">
                          <Icon type="ios-eye-outline" @click.native="handleViewCopy(index)"></Icon>
                          <Icon type="ios-trash-outline" @click.native="handleRemoveCopy(index)"></Icon>
                      </div>
                  <template>
                      <!-- <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress> -->
                  </template>
              </div>

              <Upload
                  v-if='thumbnailImage.length<1'
                  ref="upload"
                  :show-upload-list="false"
                  :default-file-list="defaultList"
                  :on-success="handleSuccessCopy"
                  :format="['jpg','jpeg','png']"
                  :max-size="2048"
                  :on-format-error="handleFormatErrorCopy"
                  :on-exceeded-size="handleMaxSizeCopy"
                  :before-upload="handleBeforeUploadCopy"
                  multiple
                  type="drag"
                  :action="myUrl"
                  style="display: inline-block;width:58px;">
                  <div style="width: 58px;height:58px;line-height: 58px;">
                      <Icon type="ios-camera" size="20"></Icon>
                  </div>
              </Upload>
              <Modal v-model="visibleCopy"  >
                  <img :src="imgNamesCopy"  v-if="visibleCopy"  style="width: 100%">
              </Modal>
              <div style="display: inline-block;margin-left:50px"> <span> <i class="red">*</i>图片可上传一张缩略图</span><br><span><i class="red">*</i>图片最佳尺寸至少为300X300</span></div>
          </FormItem>
          <FormItem label="门店首页banner图" prop="uploadImg">
            <div class="clearfix">
              <!-- 已上传文件的图片列表 -->
              <div style="margin-top:20px" class="demo-upload-list" v-for="(item,index) in otherAuthUrl" :key="index">
                      <img :src="item" class="creditImg">
                      <div class="demo-upload-list-cover">
                          <Icon type="ios-eye-outline" @click.native="handleView(index)"></Icon>
                          <Icon type="ios-trash-outline" @click.native="handleRemove(index)"></Icon>
                      </div>
                  <template>
                      <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
                  </template>
              </div>
              <Upload
                  ref="upload"
                  :show-upload-list="false"
                  :default-file-list="defaultList"
                  :on-success="handleSuccess"
                  :format="['jpg','jpeg','png']"
                  :max-size="2048"
                  :on-format-error="handleFormatError"
                  :on-exceeded-size="handleMaxSize"
                  :before-upload="handleBeforeUpload"
                  multiple
                  type="drag"
                  :action="myUrl"
                  style="display: inline-block;width:58px">
                  <div style="width:58px;height:58px;line-height: 58px;">
                      <Icon type="ios-camera" size="20"></Icon>
                      
                  </div>
              </Upload>
              <Modal v-model="visible"  >
                  <img :src="imgNames"  v-if="visible"  style="width: 100%">
              </Modal>
            </div>
          </FormItem>
          </Card>
          <div v-if="!show" class="Submission">
            <Button class="submission" @click="add">提交</Button>
            <Button class="mar_l20 cancel" @click="cancel">返回</Button>
          </div>
       </Form>
        
    </div>
  </div>

  <!-- 逾期费用明细 -->
</template>

<script>
import { BaseUrl, API } from "../../Baseurl/common.js";
import uploadVue from "../upload.vue";
export default {
  components: {
    uploadVue
  },
  data() {
    return {
      tab: ["基本信息"],
      tabname: "基本信息",
      inputWid: "width: 300px",
      id:"",
      show: true,
      token: "",
      userid: "",
      businessHours:[] ,//营业时间
      storeForm: {
        id:"",
        tel:"",//门店电话
        bannerPictureList: "",//轮播图
        operateOpenTime:"",//营业开始时间
        operateEndTime:"",//营业截止时间
        thumbnailImage:"",//課程縮略圖
      },
      supplierAddRules: {
        tel: [{ required: true, message: '联系电话不能为空', trigger: 'blur' }],
        uploadImg: [{ required: true, message: '联系人不能为空', trigger: 'blur' }],
        businessHours: [{ required: true, message: '营业时间不能为空', trigger: 'blur' }],
      },
      imgName: "",
      visible: false,
      InfoList:[],
      province:"",
      categoryName:"",
      defaultList: [],
      imgName: '',
      imgNamesCopy:"",
      visible: false,
      visibleCopy:false,
      uploadList: [],
      otherAuthUrl:[],//图片集合
      url1:"",
      size: 160,
      backgroundAlpha:1,
      myUrl:"",
      thumbnailImage:[], //缩略图集合
    };
  },
  created() {
    this.myUrl=this.$myUrl+"uploadImg"
    this.id = this.$route.query.id;
    this.province=this.$route.query.province;
    this.categoryName=this.$route.query.categoryName;
    console.log(this.$route.query)
    this.token = localStorage.getItem("token");
    this.userid = localStorage.getItem("userid");
    this.BaseInfoList()
  },
  methods: {
    //tab
    tabon: function(e, ele) {
      this.tabname = e;
      document.querySelector(ele).scrollIntoView(true);
    },
    BaseInfoList(){
        this.$API(
            "post",
            "productInfo/findDetailById",
            {id:this.id},
            this.userid,
            this.token,
            res => {
              console.log(res.data.data[0])
              this.InfoList=res.data.data[0]
              this.storeForm.tel=this.InfoList.tel
              this.businessHours[0]=this.InfoList.operateOpenTime
              this.businessHours[1]=this.InfoList.operateEndTime
              this.thumbnailImage.push(this.InfoList.thumbnailImage)
              this.otherAuthUrl=this.InfoList.bannerList
              // console.log(this.storeForm.thumbnailImage)
              this.$Message.success("查询成功！");
              this.url1="https://mgmall.huanyueguoji.com/ShopsDetails?shposid="+this.InfoList.id  //userId
            },
            res => {
              this.$Message.warning(res.data.message);
            },
            res => {
              this.$Message.error(res.data.message);
            }
          );
    },
    modify() {
      this.show = false;
    },
    // 图片上传方法集合
    //图片上传
     handleView (index) {
				this.visible = true;
				this.imgNames = this.otherAuthUrl[index];
      },
    handleRemove (index) {
        const fileList = this.otherAuthUrl;
        this.otherAuthUrl.splice(index, 1);
    },
    handleSuccess (res, file,fileList) {
        this.otherAuthUrl.push(
        res.data.url
        )
    },
    handleFormatError (file) {
        this.$Notice.warning({
            title: 'The file format is incorrect',
            desc: 'File format of ' + file.name + ' is incorrect, please select jpg or png.'
        });
    },
    handleMaxSize (file) {
        this.$Notice.warning({
            title: 'Exceeding file size limit',
            desc: 'File  ' + file.name + ' is too large, no more than 2M.'
        });
    },
    handleBeforeUpload () {
        const check = this.uploadList.length < 8;
        if (!check) {
            this.$Notice.warning({
                title: 'Up to five pictures can be uploaded.'
            });
        }
        return check;
    },


     //上传课程縮略图片
            
			handleViewCopy (index) {
				this.visibleCopy = true;
        this.imgNamesCopy = this.thumbnailImage[index];
        },
        handleRemoveCopy (index) {
            this.thumbnailImage.splice(index,1);
    this.uploadList.splice(index,1);
        },
        handleSuccessCopy (res, file,fileList) {
            this.thumbnailImage.push(
                    res.data.url
            )
            // this.formValidate.thumbnailImage=res.data.url
        },
        handleFormatErrorCopy (file) {
            this.$Notice.warning({
                title: 'The file format is incorrect',
                desc: 'File format of ' + file.name + ' is incorrect, please select jpg or png.'
            });
        },
        handleMaxSizeCopy (file) {
            this.$Notice.warning({
                title: 'Exceeding file size limit',
                desc: 'File  ' + file.name + ' is too large, no more than 2M.'
            });
        },
        handleBeforeUploadCopy () {
            const check = this.thumbnailImage.length < 1;
            if (!check) {
                this.$Notice.warning({
                    title: 'Up to five pictures can be uploaded.'
                });
            }
            return check;
        },
    // 提交
    add() {
      //图片格式转换
      this.storeForm.id=this.id
      this.storeForm.operateOpenTime=this.businessHours[0]
      this.storeForm.operateEndTime=this.businessHours[1]
      var otherAuthUrl=this.otherAuthUrl.join(',')
      var thumbnailImage=this.thumbnailImage.join(',')
      this.storeForm.thumbnailImage=thumbnailImage
      this.storeForm.bannerPictureList=otherAuthUrl
      // this.$router.push({ path: "/storeList" });
      // this.supplierAddForm.userId=localStorage.getItem("userid");
      console.log(this.storeForm)
      var params = this.storeForm
      var data = "";
      for (var i in params) {
        data +=
          encodeURIComponent(i) + "=" + encodeURIComponent(params[i]) + "&";
      }
      data = data.slice(0, -1);
      console.log(this.storeForm)
       this.$API(
            "post",
            "/storeInfo/updateBaseInfo",
            params,
            this.userid,
            this.token,
            res => {
              console.log(res)
              this.$Message.success("修改成功！");
              this.$router.push({ path: "/storeList" });
            },
            res => {
              this.$Message.warning(res.data.message);
            },
            res => {
              this.$Message.error(res.data.message);
            }
          );
     
      
    },
    // 取消
    cancel() {
      this.show=true
    },
  }
};
</script>

<style scoped="scoped">
.colorCCC{
  color: #575757
}
.wary {
  overflow-y: auto;
  background: #f3f3f4;
}

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
/*切换*/

.tab {
  height: 66px;
  padding-left: 40px;
  background: #f3f3f4;
}
/*a{
		color: #575757;
	}
	a:active{
		color: #52B095;
	}*/

.tab_d {
  width: 80px;
  font-size: 16px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  line-height: 16px;
  margin-right: 90px;
  color: #575757;
  text-align: center;
  padding-bottom: 7px;
  box-sizing: border-box;
  cursor: pointer;
}

.tab_don {
  width: 80px;
  font-size: 16px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  line-height: 16px;
  margin-right: 90px;
  color: #52b095;
  text-align: center;
  padding-bottom: 7px;
  border-bottom: 3px solid #51b095;
  box-sizing: border-box;
  cursor: pointer;
}
.list {
  background: #fff;
  margin: 15px;
  padding: 5px;
}
.header {
  width: 100%;
  height: 42px;
  padding: 0px 30px;
  background-color: #ccc;
}
.header span {
  font-size: 14px;
  line-height: 42px;
}
.modify {
  float: right;
  color: #51b095;
}

/* 上传照片 */

.demo-upload-list {
  display: inline-block;
  width: 80px;
  height: 80px;
  text-align: center;
  line-height: 60px;
  border: 1px solid transparent;
  border-radius: 4px;
  overflow: hidden;
  background: #fff;
  position: relative;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
  margin-right: 4px;
}
.demo-upload-list img {
  width: 100%;
  height: 100%;
}
.demo-upload-list-cover {
  display: none;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.6);
}
.demo-upload-list:hover .demo-upload-list-cover {
  display: block;
}
.demo-upload-list-cover i {
  color: #fff;
  font-size: 20px;
  cursor: pointer;
  margin: 0 2px;
}
.specGoodsThumbnailImg-upload {
  width: 100px;
  height: 58px;
  border: 1px solid#e9eaec;
  font-size: 40px;
  display: inline-block;
  position: relative;
}
.specGoodsThumbnailImg-upload img {
  width: 100%;
  height: 100%;
}
.specGoodsThumbnailImg-upload .upload_icon {
  cursor: pointer;
  position: absolute;
  top: 7px;
  left: 30px;
}
.ivuInput-box .ivu-input {
  width: 100% !important;
}
.litimg {
  width: 80px;
  height: 80px;
  border: 1px solid #e9eaec;
  position: relative;
}
.litimg .upload_icon {
  font-size: 60px;
  color: #dddee1;
  position: absolute;
  line-height: 60px;
  top: 10px;
  left: 10px;
  cursor: pointer;
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
.Submission{
  text-align: center;
  padding: 20px;
}
.storeImg{
  width: 80px;
  height: 80px;
  margin: 10px;
}
/* 图片上传 */
.demo-upload-list{
        display: inline-block;
        width: 60px;
        height: 60px;
        text-align: center;
        line-height: 60px;
        border: 1px solid transparent;
        border-radius: 4px;
        overflow: hidden;
        background: #fff;
        position: relative;
        box-shadow: 0 1px 1px rgba(0,0,0,.2);
        margin-right: 4px;
    }
    .demo-upload-list img{
        width: 100%;
        height: 100%;
    }
    .demo-upload-list-cover{
        display: none;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0,0,0,.6);
    }
    .demo-upload-list:hover .demo-upload-list-cover{
        display: block;
    }
    .demo-upload-list-cover i{
        color: #fff;
        font-size: 20px;
        cursor: pointer;
        margin: 0 2px;
    }
</style>
