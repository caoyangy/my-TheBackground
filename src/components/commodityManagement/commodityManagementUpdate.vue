<template>
  <div class="flex side_sdx ivuInput-box">
    <!--头部信息-->
    <div class="H_t flex side_sdx mainAlign_center">
      <div>商品管理</div>
      <div>
        <router-link class="colorCCC" to="/commodityManagementList">商品管理</router-link>&nbsp;&nbsp; /&nbsp;&nbsp;
        <router-link class="colorCCC blod" to="/commodityManagementUpdate">修改商品</router-link>
      </div>
    </div>
    <!-- 表单区域 -->
    <div class="list">
      <div class="listTitle">
          修改商品
      </div>
      <Form :model="goodsAddForm" ref="goodsAddForm" :rules="goodsAddFormRules" :label-width="90">
        <!---------------------- 供应商 ok--------------------->
        <Card class="listFrom">
          <FormItem label="供应商" prop="name" :style="font_s14" class="ma-16">
            <Select
              v-model="goodsAddForm.name"
              :style="inputWid"
              @on-change="providerIdChange"
            >
              <Option
                v-for="item in supplierList"
                :value="item.id"
                :key="item.id"
              >{{item.name}}</Option>
            </Select>
          </FormItem>
        </Card>
        <!---------------------- 商品名称 ok--------------------->
        <Card style="width: 100%" class="listFrom" :style="font_s14">
          <FormItem label="商品名称" prop="goodsName">
            <Input :style="inputWid" v-model="goodsAddForm.goodsName" placeholder="请输入商品名称"></Input>
          </FormItem>
        </Card>
        <!---------------------- 商品价格 ok--------------------->
        <Card style="width: 100%" class="listFrom">
          <FormItem label="商品价格" prop="goods_price">
            <Input :style="inputWid" v-model="goodsAddForm.goods_price" placeholder="请输入商品价格"></Input>
            <span class="color_red">*</span>
            <span class="annotationText">如该商品的价格不因规格参数而变化，则在此输入统一价格</span>
          </FormItem>
        </Card>
        <!---------------------- 规格分类 ok--------------------->
        <Card style="width: 100%;" class="listFrom">
          <!-- 分割线 -->
         
          <div class="title  blod ">规格分类：</div>
          <div class="content clearfix">
            <div class="contant_left fl mar_t10">
              <Row style="text-align: center">
                <Col span="24" class="blod">规格名</Col>
              </Row>
              <Row style="text-align: center">
                <Col span="24">
                  <FormItem prop="attribute" :label-width="0" style="position: relative">
                    <i class="line_style"></i>
                    <Input :style="inputWid2" v-model="goodsAddForm.attribute" placeholder="比如：颜色"></Input>
                  </FormItem>
                </Col>
              </Row>
            </div>
            <div class="contant_right fl mar_t10">
              <Row style="text-align: center">
                <Col span="5" class="blod">参数类名</Col>
                <Col span="5" class="blod">对应价格</Col>
                <Col span="5" class="blod">库存</Col>
                <Col span="5" class="blod">缩略图</Col>
              </Row>

              <FormItem prop="attributeVal" :label-width="0">
                <Input style="display:none" v-model="attributeVal"></Input>

                <Row
                  style="text-align: center"
                  v-for="(item,i) in goodsAddForm.attributeList"
                  :key="i"
                >
                  <!-- 参数类名 -->
                  <Col span="5">
                    <FormItem prop="specParamName" :label-width="0">
                      <Input
                        :style="inputWid2"
                        v-model="goodsAddForm.attributeList[i].specParamName"
                        placeholder="比如：红色"
                      ></Input>
                    </FormItem>
                  </Col>
                  <!-- 对应价格 -->
                  <Col span="5">
                    <FormItem prop="goodsPrice" :label-width="0">
                      <Input
                        :style="inputWid2"
                        v-model="goodsAddForm.attributeList[i].goodsPrice"
                        placeholder="红色的价格"
                      ></Input>
                    </FormItem>
                  </Col>
                  <!-- 库存 -->
                  <Col span="5">
                    <FormItem prop="specGoodsStock" :label-width="0">
                      <Input
                        :style="inputWid2"
                        v-model="goodsAddForm.attributeList[i].specGoodsStock"
                      ></Input>
                    </FormItem>
                  </Col>
                  <!-- 缩略图 -->
                  <Col span="5">
                    <FormItem prop="specGoodsThumbnailImg" :label-width="0">
                      <Input
                        :style="inputWid2"
                        style="display:none"
                        v-model="goodsAddForm.attributeList[i].specGoodsThumbnailImg"
                      ></Input>
                      <Upload
                        class="specGoodsThumbnailImg-upload"
                        ref="upload"
                        :show-upload-list="false"
                        :on-success="specGoodsImgSuccess"
                        :format="['jpg','jpeg','png']"
                        :max-size="2048"
                        :on-format-error="handleFormatError"
                        :on-exceeded-size="handleMaxSize"
                        :action="myUrl"
                      >
                        <img style="display: inline-block;width:70px;" :src="goodsAddForm.attributeList[i].specGoodsThumbnailImg" alt>
                        <Icon class="upload_icon" type="ios-add" @click="record(i)"></Icon>
                      </Upload>
                    </FormItem>
                  </Col>
                  <Col span="4">
                      <!-- <Button size="small" @click="delParameters(i)">删除</Button> -->
                  </Col>
                </Row>
              </FormItem>
              <Button class="submission" style="margin-left:80px" size="small"  @click="addParameters()">新增</Button>
            </div>
          </div>
        </Card>
        
        <!---------------------- 缩略图 ok--------------------->
        <Card style="width: 100%;padding:0px" class="listFrom">
          <div class="prefix">缩略图</div>
          <div class="clearfix">
            <div class="litimg fl" style="position:relative">
              <Upload
                ref="upload"
                :show-upload-list="false"
                :on-success="goodsImgSuccess"
                :format="['jpg','jpeg','png']"
                :max-size="2048"
                :on-format-error="handleFormatError"
                :on-exceeded-size="handleMaxSize"
                :action="myUrl"
                style="display: inline-block;width:58px;"
              >
                <img :src="goodsAddForm.goodsThumbnailImg" alt>
                <Icon class="upload_icon" type="ios-add"></Icon>
              </Upload>
            </div>
            <div class="detail_text fl">
              <span class="color_red">*</span>
              <span class="annotationText">图片上传一张缩略图</span>
              <br>
              <span class="color_red">*</span>
              <span class="annotationText">图片尺寸至少为 300×300 像素</span>
            </div>
          </div>
          <div class="noborder-form">
            <FormItem label prop="goodsThumbnailImg">
              <Input v-model="goodsAddForm.goodsThumbnailImg" style="display:none"></Input>
            </FormItem>
          </div>
        </Card>
        <!---------------------- 轮播顶图 ok--------------------->
        <Card style="width: 100%" class="listFrom">
          <div class="prefix">轮播顶图</div>
          <div>
            <div class="clearfix">
              <!-- 已上传文件的图片列表 -->
              <div class="demo-upload-list fl" v-for="(item,i) in uploadList" :key="i">
                <template v-if="item.status === 'finished'">
                  <img :src="item.url">
                  <div class="demo-upload-list-cover">
                    <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
                  </div>
                </template>
                <template v-else>
                  <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
                </template>
              </div>

              <div class="fl litimg" style="position:relative">
                <Upload
                  ref="bannerUpload"
                  :show-upload-list="false"
                  :on-success="bannerImgsSuccess"
                  :format="['jpg','jpeg','png']"
                  :max-size="2048"
                  :on-format-error="handleFormatError"
                  :on-exceeded-size="handleMaxSize"
                  :before-upload="handleBeforeUpload"
                  multiple
                  :action="myUrl"
                  style="display: inline-block;width:58px;"
                >
                  <i class="upload_icon ivu-icon ivu-icon-ios-camera"></i>
                </Upload>
              </div>
              <div class="detail_text_lunbo">
                <span class="color_red">*</span>
                <span class="annotationText">可上传多张图片，图片最佳尺寸为 750×750 像素</span>
              </div>
            </div>
          </div>
          <div class="noborder-form">
            <FormItem label prop="bannerImgs">
              <Input v-model="goodsAddForm.bannerImgs" style="display:none"></Input>
            </FormItem>
          </div>
        </Card>
        <!---------------------- 商品参数 ok--------------------->
        <Card style="width: 100%" class="listFrom">
          
          <div class="prefix">商品参数</div>
          <Row class="blod mar_t10" style="text-align: center">
            <Col span="6">参数类名</Col>
            <Col span="4">描述</Col>
          </Row>
          <FormItem prop="paramsVal" :label-width="0">
            <Input style="display:none" v-model="paramsVal"></Input>
            <Row style="text-align: center" v-for="(item,i) in goodsAddForm.params" :key="i">
              <Col span="6">
                <FormItem prop="goodsParamName" :label-width="0" style="position: relative">
                  <!-- 分割线 -->
                 <!-- <i class="line_style2"></i> -->
                  <Input
                    :style="inputWid2"
                    v-model=" goodsAddForm.params[i].goodsParamName"
                    placeholder="比如：品牌"
                  ></Input>
                </FormItem>
              </Col>
              <Col span="4">
                <FormItem prop="goodsParamValue" :label-width="0">
                  <Input
                    :style="inputWid2"
                    v-model=" goodsAddForm.params[i].goodsParamValue"
                    placeholder="比如：智伴"
                  ></Input>
                </FormItem>
              </Col>
              <!-- <Col span="4">
                <Button size="small" @click="delGoodsParameters(i)">删除</Button>
              </Col> -->
            </Row>
          </FormItem>
          <Button class="submission" style="margin-left:160px" size="small"  @click="addGoodsParameters()">新增</Button>
        </Card>
        <!---------------------- 商品详情 ok--------------------->
        <Card style="width: 100%" class="listFrom">
          <div class="prefix">商品详情</div>
          <template>
            <Upload
              :show-upload-list="false"
              :on-success="quillEditorSuccess"
              :format="['jpg','jpeg','png','gif']"
              :max-size="2048"
              multiple
              :action="myUrl"
              style="display:none;width:500px;"
            >
              <Button icon="ios-cloud-upload-outline" class="btnImg"></Button>
            </Upload>
            <FormItem prop="goodsDetail" :label-width="0">
             
             
            <quill-editor v-model="goodsAddForm.goodsDetail" ref="QuillEditor" :options="editorOption" style="width:85%;margin-left:150px;">
            </quill-editor>
            </FormItem>
          </template>
        </Card>
        <!---------------------- 上下架 （0：下架 1：在售）--------------------->
        <Card style="width: 100%" class="listFrom">
          <div class="title">
            <span class="prefixSpan">
                商品状态
            </span>
            <div :class="goodsAddForm.status?'addStatus':'delteStatus'" @click="addStatus">上架</div>
              <div :class="goodsAddForm.status?'delteStatus':'addStatus'" @click="delteStatus">下架</div>
          </div>
          <!-- <RadioGroup v-model="goodsAddForm.status" vertical class="idAdded">
            <Radio :label="item.label" v-for="item in statusList" :key="item.label">
              <span>{{item.text}}</span>
            </Radio>
          </RadioGroup> -->
        </Card>
        <!---------------------- 推荐到主页--------------------->
        <Card style="width: 100%" class="listFrom">
          <div class="title">
            <span class="prefixSpan">
                推荐到首页
            </span>
            <div :class="goodsAddForm.recommend?'delteStatus':'addStatus'" @click="RecommendNo">否</div>
              <div :class="goodsAddForm.recommend?'addStatus':'delteStatus'" @click="Recommend">是</div>
          </div>
          <!-- <RadioGroup v-model="goodsAddForm.recommend" vertical class="idAdded">
            <Radio :label="item.label" v-for="item in recommendList" :key="item.label">
              <span>{{item.text}}</span>
            </Radio>
          </RadioGroup> -->
        </Card>
      </Form>
    </div>
 
    <div class="footer">
      <Button class="submission" @click="add">提交</Button>
      <Button class="cancel"  @click="cancel">取消</Button>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
     const attributeValid = (rule, value, callback) => {
      let array = this.goodsAddForm.attributeList;
      console.log(array)
      array.forEach(function(item, i) {
        console.log(item)
        for (let key in item) {
          // console.log('---'+item[key])
          if (item[key] == "" || item[key] == null || item[key] == undefined) {
            callback(new Error("请把规格分类填写完整"));
          } else {
            callback();
          }
        }
      });
    };
    const bannerValid = (rule, value, callback) => {
      if (
        this.uploadList == "" ||
        this.uploadList == null ||
        this.uploadList == undefined
      ) {
        callback(new Error("商品轮播图不能为空"));
      } else {
        callback();
      }
    };
    const paramsVal = (rule, value, callback) => {
      //console.log(this.goodsAddForm.attributeList)
      let array = this.goodsAddForm.params;
      array.forEach(function(item, i) {
        //console.log(item)
        for (let key in item) {
          console.log("---" + item[key]);
          if (item[key] == "" || item[key] == null || item[key] == undefined) {
            callback(new Error("请把商品参数填写完整"));
          } else {
            callback();
          }
        }
      });
    };
    const ThumbnailImgValid = (rule, value, callback) => {
      let img = this.goodsAddForm.goodsThumbnailImg;
      if (img == "" || img == null || img == undefined) {
        callback(new Error("商品缩略图不能为空"));
      } else {
        callback();
      }
    };
    
    
    // 工具栏配置
    const toolbarOptions = [
      ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
      ['blockquote', 'code-block'],
    
      [{'header': 1}, {'header': 2}],               // custom button values
      [{'list': 'ordered'}, {'list': 'bullet'}],
      [{'script': 'sub'}, {'script': 'super'}],      // superscript/subscript
      [{'indent': '-1'}, {'indent': '+1'}],          // outdent/indent
      [{'direction': 'rtl'}],                         // text direction
    
      [{'size': ['small', false, 'large', 'huge']}],  // custom dropdown
      [{'header': [1, 2, 3, 4, 5, 6, false]}],
    
      [{'color': []}, {'background': []}],          // dropdown with defaults from theme
      [{'font': []}],
      [{'align': []}],
      ['link', 'image']                                       // remove formatting button
    ];
    return {
      editorOption: {                
        modules: {
            toolbar: {
                container: toolbarOptions,  // 工具栏
                handlers: {
                    'image': function (value) {
                        if (value) {
                            //alert('自定义图片')
                            // 调用iview图片上传
                            //this.$refs.btnImg.click()
                            document.querySelector('.btnImg').click()
                        } else {
                            this.quill.format('image', false);
                        }
                    }
                }
            }
        }
      },
      attributeVal: "",
      paramsVal: "",
      // 表单
      goodsAddForm: {
        goodsId: this.$route.query.id,
        name: "", // 供应商
        shopId: "", //店铺id
        goodsName: "", //商品名称
        attribute: "", // 规格名
        attributeList: [
          {
            specParamName: "", // 参数类名
            goodsPrice: "", //价格
            specGoodsStock: "", // 库存
            specGoodsThumbnailImg: "" //缩略图
          }
        ],
        goods_price: "", //商品价格
        goodsThumbnailImg: "", //商品缩略图
        bannerImgs: "", //轮播图
        params: [
          {
            goodsParamName: "", //商品参数
            goodsParamValue: ""
          }
        ],
        goodsDetail: "", //商品详情
        status: 1, //上下架
        recommend: 0
      },
      statusList: [
        {
          label: 0,
          text: "下架"
        },
        {
          label: 1,
          text: "上架"
        },
      ],
      //是否自营好物（0：否 1：是）
      recommendList: [
        {
          label: 0,
          text: "否"
        },
        {
          label: 1,
          text: "是"
        }
      ],
      supplierList: [], //供应商list
      userid: "",
      token: "",
      inputWid: "width: 300px",
      inputWid2: "width:130px",
      font_s14: "font-size: 14px",
      delBtn_style: {
        backgroundColor: "#5c6b77",
        border: "none",
        color: "#fff",
        width: "18px",
        height: "18px",
        fontSize: "16px",
        margin: "6px"
      },

      // 图片
      i: Number,
      uploadList: [], //轮播图，已上传文件的图片列表
      imgName: "",
      visible: false,
      myUrl:"",
       // 表单验证
      goodsAddFormRules: {
        name: [
          { required: true, message: "供应商不能为空", trigger: "change" }
        ],
        goodsName: [
          { required: true, message: "商品名称不能为空", trigger: "blur" }
        ],
        attribute: [
          { required: true, message: "规格分类不能为空", trigger: "blur" }
        ],
        attributeVal: [{ validator: attributeValid }],
        goodsThumbnailImg: [{ validator: ThumbnailImgValid }],
        bannerImgs: [{ validator: bannerValid }],
        paramsVal: [{ validator: paramsVal }],
        goodsDetail: [
          { required: true, message: "商品详情不能为空", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.myUrl=this.$myUrl+"/uploadImg"
    // this.goodsAddForm.userId = localStorage.getItem("userid");
    this.userid = localStorage.getItem("userid");
    this.token = localStorage.getItem("token");
    this.getSupplierList();
    this.getInfo(this.$route.query.id)
  },
  mounted() {
    this.uploadList = this.$refs.bannerUpload.fileList;
  },
  methods: {
     // 获取供应商名称列表  ok
    getSupplierList() {
      this.$APIMy(
        "post",
        "/shop/queryAllShop",
        {},
        this.userid,
        this.token,
        res => {
          // console.log(res.data.data)
          this.supplierList = res.data.data;
        },
        res => {
          this.$Message.warning(res.data.result);
        },
        res => {
          this.$Message.error(res.data.result);
        }
      );
    },
    
    getInfo(id){
      var params = {goodsId: id };
      var data = "";
      for (var i in params) {
        data +=
          encodeURIComponent(i) + "=" + encodeURIComponent(params[i]) + "&";
      }
      data = data.slice(0, -1);
      this.$APIMy(
        "post",
        // "goods/goodsVoDetail",
        "/goods/goodsDetail",
        data,
        this.userid,
        this.token,
        res => {
          this.goodsAddForm.name = res.data.data.shopId;
          // console.log(res.data.data)
          this.goodsAddForm.shopId= res.data.data.shopId
          this.goodsAddForm.goodsName = res.data.data.goodsName;
          this.goodsAddForm.attribute = res.data.data.goodsSpecVOList[0].specName;
          this.goodsAddForm.attributeList = res.data.data.goodsSpecVOList[0].specItemVOList
          this.goodsAddForm.goodsThumbnailImg = res.data.data.goodsThumbnailImg
          // 轮播图
          let arry = res.data.data.goodsBannerList
          let newArry = []
          arry.forEach(function(item, i) {
            newArry.push(item.bannerUrl)//goodsBannerImg  8.6 11:33cao
          });
          this.goodsAddForm.bannerImgs = JSON.stringify(newArry)
          let uploadListArry = this.uploadList //[{url: ""}]
          newArry.forEach(function(item, i) {
             uploadListArry.push({url: item, status:'finished'})
          });
          this.goodsAddForm.params = res.data.data.goodsParamList
          this.goodsAddForm.goodsDetail = res.data.data.goodsDetail
          this.goodsAddForm.status = res.data.data.status
          this.goodsAddForm.recommend = res.data.data.recommend
        },
        res => {
          this.$Message.warning(res);
        },
        res => {
          this.$Message.error(res);
        }
      );
    },
   
    // 添加参数类名
    addParameters() {
      this.goodsAddForm.attributeList.push({
        specParamName: "", // 参数类名
        goodsPrice: "", //价格
        specGoodsStock: "", // 库存
        specGoodsThumbnailImg: "" //缩略图
      });
      //console.log(this.goodsAddForm.attributeList);
    },
    // 删除商品类名
    delParameters(i){
      let array = this.goodsAddForm.attributeList
      //console.log(array.length)
      if(array.length === 1){
        this.$Message.warning("至少填写一个参数！");
        return
      }else{
        array.splice(i,1)
      //console.log(array)
      }
    },
    // 添加商品参数
    addGoodsParameters() {
      this.goodsAddForm.params.push({
        goodsParamName: "",
        goodsParamValue: "" //商品参数
      });
      //console.log(this.goodsAddForm.params);
    },
    // 删除商品参数
    delGoodsParameters(i) {
     let array = this.goodsAddForm.params
      //console.log(array.length)
      if(array.length === 1){
        this.$Message.warning("至少填写一个参数！");
        return
      }else{
        array.splice(i,1)
      //console.log(array)
      }  
    },
    // 选中供应商，筛选店铺id
    providerIdChange(val) {
      console.log(val)
      this.goodsAddForm.shopId =val
      // let array = this.supplierList;
      // var self_ = this;
      // array.forEach(function(item, i) {
      //   if (item.id == val) {
      //     //console.log(item.storeId);
      //     self_.goodsAddForm.shopId = item.storeId;
      //   }
      // });
    },
    // 转化商品参数
    changeGoodsPar() {
      //console.log(this.goodsAddForm.attributeList)
      let arry = this.goodsAddForm.attributeList;
      //console.log("array=" + JSON.stringify(arry))
      let newObj = {};
      newObj[this.goodsAddForm.attribute] = JSON.stringify(arry);
      // console.log(newObj)
      //console.log(JSON.stringify(newObj))
      return JSON.stringify(newObj);
    },
    // 图片处理
    imgHandel() {
      let arry = this.uploadList;
      let newArry = [];
      arry.forEach(function(item, i) {
        newArry.push(item.url)
      });
      console.log(newArry)
      return JSON.stringify(newArry)
    },
    // 店铺 id
    shopid(){
      let arry =  this.supplierList
      var self_ = this;
      var providerId = this.goodsAddForm.providerId
      arry.forEach(function(item, i) {
        if (item.id == providerId) {
          self_.goodsAddForm.shopId = item.storeId;
        }
      })
    },

    // 转化发送数据
    changeFormDate() {
      this.shopid()
      const formdatas = { ...this.goodsAddForm };
      //console.log(formdatas);
      console.log(this.uploadList)
      //转化商品参数
      formdatas.specs = this.changeGoodsPar();
      // 轮播图
      formdatas.bannerImgs = this.imgHandel();
      
      formdatas.params = JSON.stringify(formdatas.params);
      delete formdatas.attribute;
      delete formdatas.attributeList;
      delete formdatas.goods_price;
      console.log(formdatas);
      return formdatas;
    },

    // 提交商品
    add() {
      this.$refs["goodsAddForm"].validate(valid => {
      if (valid) {
        var aa;
        let array = this.goodsAddForm.attributeList;
        for(var i=0;i<array.length;i++){
            for (let key in array[i]){
              if (array[i].specParamName == "" || array[i].specGoodsStock == '' || array[i].goodsPrice == ''){
                  aa=false
              }else{
                aa=true
              }
            }
        }
        console.log(this.goodsAddForm.attributeList)
        if(aa){
          let formdatas = this.changeFormDate();
          console.log(formdatas);
          // Content-Type: application/x-www-form-urlencoded
          var data = "";
          for (var i in formdatas) {
            data +=
              encodeURIComponent(i) + "=" + encodeURIComponent(formdatas[i]) + "&";
          }
          data = data.slice(0, -1);
          
          this.$APIMy(
            "post",
            "goods/update",
            data,
            this.userid,
            this.token,
            res => {
              this.$Message.success("修改商品成功！");
              this.$router.push({ path: "/commodityManagementList" });
            },
            res => {
              this.$Message.warning(res.message);
            },
            res => {
              this.$Message.error(res.message);
            }
          );
        }else{
          this.$Message.error("请把规格分类填写完整!");
        }
        
        
        // this.clear()
      }else {
          this.$Message.error("请将信息填写完整！");
        }
      });
    },
    // 清空
    clear(){
      this.$refs.goodsAddForm.resetFields();
      this.goodsAddForm.attributeList = [{
            specParamName: "", // 参数类名
            goodsPrice: "", //价格
            specGoodsStock: "", // 库存
            specGoodsThumbnailImg: "" //缩略图
      }]
      this.goodsAddForm.params = [
          {
            goodsParamName: "", //商品参数
            goodsParamValue: ""
          }
      ]
      this.goodsAddForm.goodsThumbnailImg = ""
      this.goodsAddForm.bannerImgs = ""
      this.goodsAddForm.status = 1
      this.uploadList = []
    },
    // 取消
    cancel() {
      this.clear()
      this.$router.push({ path: "/commodityManagementList" });
    },

    //<-------------------- 图片上传 ----------------------->

    record(i) {
      this.i = i;
    },
    // 参数缩略图上传成功
    specGoodsImgSuccess(res, file) {
      console.log(res.data);
      let i = this.i;
      this.goodsAddForm.attributeList[i].specGoodsThumbnailImg =
        res.data.url;
    },
    // 商品缩略图上传成功
    goodsImgSuccess(res) {
      console.log(res.data);
      this.goodsAddForm.goodsThumbnailImg = res.data.url;
    },
    // 轮播图上传成功
    bannerImgsSuccess(res,file){
      console.log(res.data);
      file.url = res.data.url;
    },
    //文件格式验证失败时的钩子
    handleFormatError(file) {
      this.$Notice.warning({
        title: "文件格式不正确",
        desc: file.name + " 文件格式不正确, 请选择 jpg 或 png"
      });
    },
    //文件超出指定大小限制时的钩子
    handleMaxSize(file) {
      this.$Notice.warning({
        title: "超过文件大小限制",
        desc: file.name + "文件太大了，不超过2M"
      });
    },
    //上传文件之前的钩子
    handleBeforeUpload() {
      const check = this.uploadList.length < 5;
      if (!check) {
        this.$Notice.warning({
          title: "最多可上传五张图片。"
        });
      }
      return check;
    },
   
    // 删除图片
    handleRemove(file) {
      const fileList = this.$refs.bannerUpload.fileList;
      this.$refs.bannerUpload.fileList.splice(fileList.indexOf(file), 1);
    },
     // 富文本上传图片
    quillEditorSuccess(res){
      //this.goodsAddForm. = res.data.url;
      let quill = this.$refs.QuillEditor.quill
      // console.log(quill)
      // console.log(res)
      // 如果上传成功
      if (res.data.url) {
          // 获取光标所在位置
          let length = quill.getSelection().index;
           console.log(quill.getSelection())
          // console.log(length)
          // 插入图片，res为服务器返回的图片链接地址
          quill.insertEmbed(length, 'image',  res.data.url)
          // 调整光标到最后
          quill.setSelection(length + 1)
      } else {
          // 提示信息，需引入Message
          Message.error('图片插入失败')
      }
    },
    addStatus(){
      this.goodsAddForm.status=1
    },
    delteStatus(){
      this.goodsAddForm.status=0
    },
    Recommend(){
      this.goodsAddForm.recommend=1
    },
    RecommendNo(){
      this.goodsAddForm.recommend=0
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
  margin: 20px;
  background-color: #fff;
  overflow: hidden;
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
.listFrom .title {
  width: 100%;
  height: 30px;
  font-size: 14px;
  font-family: PingFangSC-Medium;
  margin-left:15px;
  font-weight: 900;
}
.lender_box .inp_dis {
  display: inline-block;
}

.footer {
  text-align: center;
  margin-bottom: 20px;
}

/* 规格分类 */
.content {
  min-height: 210px;
}
.contant_left {
  width: 30%;
}
.contant_right {
  width: 70%;
}
/* .line_style {
  width: 1px;
  height: 156px;
  border-right: 1px solid #dddee1;
  position: absolute;
  top: 4px;
  right: 20px;
} */
.line_style2 {
  width: 1px;
  height: 90px;
  border-right: 1px solid #dddee1;
  position: absolute;
  top: 0px;
  right: 20px;
}

/* 缩略图 */
.litimg {
  width: 60px;
  height: 60px;
  border: 1px solid #e9eaec;
  margin-left:120px;
  position: relative;
}
.litimg img {
  width: 60px;
  height: 60px;
}
.litimg .upload_icon {
  font-size: 60px;
  color: #dddee1;
  position: absolute;
  line-height: 60px;
  top: 0px;
  left: 0px;
  cursor: pointer;
}
.detail_text {
  /* margin-top: 20px; */
  margin-left: 18px;
}
.detail_text_lunbo {
  /* margin-top: 20px; */
  margin-left: 50px;
}
.annotationText {
  font-size: 13px;
  color: #bbbec4;
}
.color_red {
  color: red;
  margin: 10px;
}
/* 轮播图 */
.camera {
  position: absolute;
  top: 50px;
  left: 50px;
}
/* 上下架 */
.idAdded {
  margin: 20px 100px;
}

/* 图片上传 */
.demo-upload-list {
  display: inline-block;
  width: 150px;
  height: 150px;
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

.listTitle{
    width: 100%;
    background-color: #fff;
    border-bottom: 1px solid #E7EAEC;
    font-size: 16px;
    font-weight:900;
    line-height: 52px;
    text-indent: 20px;
    font-family: PingFangSC-Medium;
}
.listFrom{
  width: 100%;
  margin-left: 38px;
  border-bottom: 2px dashed #E7EAEC;
  border-left: none;
  border-top: none;
  border-right: none;
}
.listFrom:hover{
  box-shadow: none;
}
.listpad{
  margin-top: 20px;
}
.ma-16{
  margin-top: 16px;
}
.addStatus{
  width: 60px;
  height: 30px;
  display: inline-block;
  border: 1px solid #52B095;
  color:#52B095;
  font-size:14px;
  font-family: PingFangSC-Medium;
  text-align: center;
  line-height: 28px;
  border-radius: 2px;
  margin: 0px 5px;
}
.delteStatus{
  width: 60px;
  height: 30px;
  display: inline-block;
  color:#686A6C;
  font-size:14px;
  border: 1px solid #E7EAEC;
  font-family: PingFangSC-Medium;
  text-align: center;
  line-height: 28px;
  border-radius: 2px;
  margin: 0px 5px;
}
.prefix{
  font-weight: bold;
  /* text-indent: 40px; */
  text-align: right;
  width: 80px;
}
.prefixSpan{
  display: inline-block;
  width: 100px;
  margin-right: 50px;
}
.submission{
  width: 90px;
  /* height: 30px; */
  background-color:#52B095;
  color: #fff;
  margin:0 20px;
}
.cancel{
  width: 90px;
  /* height: 30px; */
  background-color:#C7C7C7;
  color: #fff;
  margin:0 20px;
}
.buttonAll{
  width: 50px;
  border-color: #52B095;
  border-radius: 6px;
  border: none;
  outline: none;
}
.buttonAll span{
  margin: 0 auto;
  color: #52B095;
  text-align: center;
}
.iople{
  width: 130px;
  height:auto;

}
</style>


