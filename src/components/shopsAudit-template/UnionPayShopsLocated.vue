<template>
  <div class="flex side_sdx wary">
    <!--头部信息-->
    <div class="H_t flex side_sdx mainAlign_center">
      <div>详情</div>
      <div class="flex mina_zdy">
        <router-link class="colorCCC" to="/shopsAudit">入驻中心</router-link>&nbsp;&nbsp; /&nbsp;&nbsp;
        <span class="colorCCC blod">详情</span>
      </div>
    </div>
    <!-- 是否只创建了门店没有申请入驻 -->
    <!-- 基本信息 -->
      <div class="basic" v-if="id ==''">
        <div class="title flex main_zdy sideAlign_center">基本信息</div>
        <div class="message">
          <div class="flex main_zdy message_d">
            <div class="flex mian_zdy message_d_v">
              <div>管理员手机号</div>
              <div>{{userPhone}}</div>
            </div>
            <div class="flex mian_zdy message_d_v">
              <div>门店名称</div>
              <div>{{storeInfo.name}}</div>
            </div>
          </div>
          <div class="flex main_zdy message_d">
            <div class="flex mian_zdy message_d_v">
              <div>所在城市</div>
              <div>{{storeInfo.province}}</div>
            </div>
            <div class="flex mian_zdy message_d_v">
              <div>门店地址</div>
              <div style="width:500px">{{storeInfo.address}}</div>
            </div>
          </div>
          <div class="flex main_zdy message_d">
            <div class="flex mian_zdy message_d_v">
              <div>门店电话</div>
              <div>{{storeInfo.tel}}</div>
            </div>
            <div class="flex mian_zdy message_d_v">
              <div>实际定位地址</div>
              <div>{{storeInfo.tel}}</div>
            </div>
          </div>
          <div class="flex main_zdy message_d">
            <div class="flex mian_zdy message_d_v">
              <div>经营品类</div>
              <div>{{storeInfo.categoryName}}</div>
            </div>
          </div>
          <div class="flex main_zdy message_d">
            <div class="flex mian_zdy message_d_v">
              <div>课程价格</div>
              <div>{{storeInfo.priceRange}}</div>
            </div>
          </div>
          <div class="flex main_zdy message_d">
            <div class="flex mian_zdy message_d_v">
              <div>营业时间</div>
              <div>{{storeInfo.operateOpenTime}}~{{storeInfo.operateEndTime}}</div>
            </div>
          </div>
          <div class="flex main_zdy message_d">
            <div class="flex mian_zdy message_d_v">
              <div>门头图</div>
              <div>
                <img :src="storeInfo.headImageUrl" @click="imgon(storeInfo.headImageUrl)" :onerror="onerror" alt>
              </div>
            </div>
            <div class="flex mian_zdy message_d_v">
              <div>教育产品</div>
              <div>
                <img :src="storeInfo.productUrl" @click="imgon(storeInfo.productUrl)" :onerror="onerror" alt>
              </div>
            </div>
          </div>
          <div class="flex main_zdy message_d">
            <div class="flex mian_zdy message_d_v">
              <div>收银台</div>
              <div>
                <img :src="storeInfo.cashierUrl"  @click="imgon(storeInfo.cashierUrl)" :onerror="onerror" alt>
              </div>
            </div>
            <div class="flex mian_zdy message_d_v">
              <div>办公照片</div>
              <div>
                <img :src="storeInfo.officeUrl"  @click="imgon(storeInfo.officeUrl)" :onerror="onerror" alt>
              </div>
            </div>
          </div>
        </div>
      </div>
    <!-- 审核信息 -->
    <div class="conten" v-else>
      <!-- 基本信息 -->
      <div class="basic">
        <div class="title flex main_zdy sideAlign_center">基本信息</div>
        <div class="message">
          <div class="flex main_zdy message_d">
            <div class="flex mian_zdy message_d_v">
              <div>管理员手机号</div>
              <div>{{userPhone}}</div>
            </div>
            <div class="flex mian_zdy message_d_v">
              <div>门店名称</div>
              <div>{{storeInfo.name}}</div>
            </div>
          </div>
          <div class="flex main_zdy message_d">
            <div class="flex mian_zdy message_d_v">
              <div>所在城市</div>
              <div>{{storeInfo.province}}</div>
            </div>
            <div class="flex mian_zdy message_d_v">
              <div>门店地址</div>
              <div style="width:500px">{{storeInfo.address}}</div>
            </div>
          </div>
          <div class="flex main_zdy message_d">
            <div class="flex mian_zdy message_d_v">
              <div>门店电话</div>
              <div>{{storeInfo.tel}}</div>
            </div>
            <div class="flex mian_zdy message_d_v">
              <div>实际定位地址</div>
              <div>{{storeInfo.tel}}</div>
            </div>
          </div>
          <div class="flex main_zdy message_d">
            <div class="flex mian_zdy message_d_v">
              <div>经营品类</div>
              <div>{{storeInfo.categoryName}}</div>
            </div>
          </div>
          <div class="flex main_zdy message_d">
            <div class="flex mian_zdy message_d_v">
              <div>课程价格</div>
              <div>{{storeInfo.priceRange}}</div>
            </div>
          </div>
          <div class="flex main_zdy message_d">
            <div class="flex mian_zdy message_d_v">
              <div>营业时间</div>
              <div>{{storeInfo.operateOpenTime}}~{{storeInfo.operateEndTime}}</div>
            </div>
          </div>
          <div class="flex main_zdy message_d">
            <div class="flex mian_zdy message_d_v">
              <div>门头图</div>
              <div>
                <img :src="storeInfo.headImageUrl" @click="imgon(storeInfo.headImageUrl)" :onerror="onerror" alt>
              </div>
            </div>
            <div class="flex mian_zdy message_d_v">
              <div>教育产品</div>
              <div>
                <img :src="storeInfo.productUrl" @click="imgon(storeInfo.productUrl)" :onerror="onerror" alt>
              </div>
            </div>
          </div>
          <div class="flex main_zdy message_d">
            <div class="flex mian_zdy message_d_v">
              <div>收银台</div>
              <div>
                <img :src="storeInfo.cashierUrl"  @click="imgon(storeInfo.cashierUrl)" :onerror="onerror" alt>
              </div>
            </div>
            <div class="flex mian_zdy message_d_v">
              <div>办公照片</div>
              <div>
                <img :src="storeInfo.officeUrl"  @click="imgon(storeInfo.officeUrl)" :onerror="onerror" alt>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 资质信息 -->
      <div class="basic">
        <div class="title flex main_zdy sideAlign_center">资质信息</div>
        <div class="aptitude">
          <!-- 企业法人 -->
          <div class="Corp">
            <div class="h5 flex main_zdy sideAlign_center">
              <div></div>
              <div>企业法人</div>
            </div>
          </div>
          <div class="flex main_zdy message_d">
            <div class="flex mian_zdy message_d_v">
              <div>法人姓名</div>
              <div>{{list.corporation}}</div>
            </div>
          </div>
          <div class="flex main_zdy message_d">
            <div class="flex mian_zdy message_d_v">
              <div>身份证号</div>
              <div>{{list.idcard}}</div>
            </div>
          </div>
          <div class="flex main_zdy message_d">
            <div class="flex mian_zdy message_d_v">
              <div>法人手机号</div>
              <div>{{list.phone}}</div>
            </div>
          </div>
          <div class="flex main_zdy message_d">
            <div class="flex mian_zdy message_d_v">
              <div>身份证照片正面</div>
              <div>
                <img :src="list.idcardFrontUrl" @click="imgon(list.idcardFrontUrl)" :onerror="onerror" alt>
              </div>
            </div>
          </div>
          <div class="flex main_zdy message_d">
            <div class="flex mian_zdy message_d_v">
              <div>身份证照片反面</div>
              <div>
                <img :src="list.idcardBackUrl"  @click="imgon(list.idcardBackUrl)" :onerror="onerror" alt>
              </div>
            </div>
          </div>
          <div class="dashed"></div>
        </div>
        <div class="aptitude">
          <!-- 营业执照 -->
          <div class="Corp">
            <div class="h5 flex main_zdy sideAlign_center">
              <div></div>
              <div>营业执照</div>
            </div>
          </div>
          <div class="flex main_zdy message_d">
            <div class="flex mian_zdy message_d_v">
              <div>营业执照注册号</div>
              <div>{{list.regNo}}</div>
            </div>
          </div>
          <div class="flex main_zdy message_d">
            <div class="flex mian_zdy message_d_v">
              <div>执照名称</div>
              <div style="width:300px">{{list.businessLicenseName}}</div>
            </div>
          </div>
          <div class="flex main_zdy message_d">
            <div class="flex mian_zdy message_d_v">
              <div>法人姓名</div>
              <div>{{list.corporation}}</div>
            </div>
          </div>
          <div class="flex main_zdy message_d">
            <div class="flex mian_zdy message_d_v">
              <div>成立日期</div>
              <div>{{list.businessBeginDate}}</div>
            </div>
          </div>
          <div class="flex main_zdy message_d">
            <div class="flex mian_zdy message_d_v">
              <div>有效期</div>
              <div>{{list.businessLicenseDate}}</div>
            </div>
          </div>
          <div class="flex main_zdy message_d">
            <div class="flex mian_zdy message_d_v">
              <div>营业执照照片</div>
              <div>
                <img :src="list.businessLicenseStoreUrl"  @click="imgon(list.businessLicenseStoreUrl)" :onerror="onerror" alt>
              </div>
            </div>
          </div>
          <div class="dashed"></div>
        </div>
        <div class="aptitude">
          <!-- 开户许可证 -->
          <div class="Corp">
            <div class="h5 flex main_zdy sideAlign_center">
              <div></div>
              <div>开户许可证</div>
            </div>
          </div>
          <div class="flex main_zdy message_d">
            <div class="flex mian_zdy message_d_v">
              <div>开户许可证照片</div>
              <div>
                <img :src="list.accountLicenseUrl"  @click="imgon(list.accountLicenseUrl)" :onerror="onerror" alt>
              </div>
            </div>
          </div>
          <div class="dashed"></div>
        </div>
        <div class="aptitude">
          <!-- 机构信用代码证 -->
          <div class="Corp">
            <div class="h5 flex main_zdy sideAlign_center">
              <div></div>
              <div>机构信用代码证</div>
            </div>
          </div>
          <div class="flex main_zdy message_d">
            <div class="flex mian_zdy message_d_v">
              <div>机构信用代码证照片</div>
              <div>
                <img :src="list.institutionalCreditCodeCertificate"  @click="imgon(list.institutionalCreditCodeCertificate)" :onerror="onerror" alt>
              </div>
            </div>
          </div>
          <div class="dashed"></div>
        </div>
        <div class="aptitude">
          <!-- 经营用地 -->
          <div class="Corp">
            <div class="h5 flex main_zdy sideAlign_center">
              <div></div>
              <div>经营用地</div>
            </div>
          </div>
          <div class="flex main_zdy message_d">
            <div class="flex mian_zdy message_d_v">
              <div>经营用地类型</div>
              <div>{{list.placeType}}</div>
            </div>
          </div>
          <div class="flex main_zdy message_d">
            <div class="flex mian_zdy message_d_v">
              <div>房产证/租赁合同</div>
              <div v-for="(item,index) in placeimg">
                <img :src="item"  @click="imgon(item)" :onerror="onerror" alt>
              </div>
            </div>
          </div>
          <div class="dashed"></div>
        </div>
        <div class="aptitude">
          <!-- 品牌 -->
          <div class="Corp">
            <div class="h5 flex main_zdy sideAlign_center">
              <div></div>
              <div>品牌</div>
            </div>
          </div>
          <div class="flex main_zdy message_d">
            <div class="flex mian_zdy message_d_v">
              <div>品牌类型</div>
              <div>{{list.brandType}}</div>
            </div>
          </div>
          <div class="flex main_zdy message_d" v-if="list.brandType == '自营'">
            <div class="flex mian_zdy message_d_v">
              <div>品牌商标照片</div>
              <div>
                <img :src="list.brandLogoUrl"  @click="imgon(list.brandLogoUrl)" :onerror="onerror" alt>
              </div>
            </div>
          </div>
          <div class="flex main_zdy message_d" v-if="list.brandType == '加盟'">
            <div class="flex mian_zdy message_d_v">
              <div>加盟合同</div>
              <div v-for="(item,index) in brandimg">
                <img :src="item"  @click="imgon(item)" :onerror="onerror" alt>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 收单工具 -->
      <div class="basic">
        <div class="title flex main_zdy sideAlign_center">收单工具</div>
        <div class="message">
          <div class="flex main_zdy message_d">
            <div class="flex mian_zdy message_d_v">
              <div>收单工具类型</div>
              <div>银联支付</div>
            </div>
          </div>
          <div class="flex main_zdy message_d">
            <div class="flex mian_zdy message_d_v">
              <div>结算账户开户行</div>
              <div>{{list.openingBankName}}</div>
            </div>
          </div>
          <div class="flex main_zdy message_d">
            <div class="flex mian_zdy message_d_v">
              <div>结算账户账号</div>
              <div>{{list.balanceAccount}}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- 商户联系方式 -->
      <div class="basic">
        <div class="title flex main_zdy sideAlign_center">基本信息</div>
        <div class="message">
          <div class="flex main_zdy message_d">
            <div class="flex mian_zdy message_d_v">
              <div>业务负责人姓名</div>
              <div>{{list.charger}}</div>
            </div>
            <div class="flex mian_zdy message_d_v">
              <div>负责人手机号</div>
              <div>{{list.chargerPhone}}</div>
            </div>
          </div>
          <div class="flex main_zdy message_d">
            <div class="flex mian_zdy message_d_v">
              <div>推荐人姓名</div>
              <div>{{list.referee}}</div>
            </div>
            <div class="flex mian_zdy message_d_v">
              <div>推荐人手机号</div>
              <div>{{list.refereePhone}}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- 第三方征信 -->
      <div class="basic">
        <div class="title flex main_zdy sideAlign_center">
          第三方征信
          <Upload
                  v-if="status=='1001' || status=='1003'|| status == '1002' || status == '1004' || status == '1005'"
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
                  style="display: inline-block;margin:20px">
                  <div style="height:22px;line-height: 22px;">
                      <!-- <Icon type="ios-camera" size="20"></Icon> -->
                      <span class="btnimg flex main_zdy sideAlign_center">上传征信截图</span>
                  </div>
              </Upload>
              <Modal v-model="visible"  >
                  <img :src="imgNames"  v-if="visible"  style="width: 100%">
              </Modal>
          <!-- <span class="btn flex main_zdy sideAlign_center">上传征信截图</span> -->
        </div>
        <div class="message flex main_zdy">
          
              <div style="margin-top:20px" class="demo-upload-list" v-for="(item,index) in otherAuthUrl" :key="index">
                      <img :src="item"  class="creditImg">
                      <div class="demo-upload-list-cover">
                          <Icon type="ios-eye-outline" @click.native="handleView(index)"></Icon>
                          <Icon type="ios-trash-outline" @click.native="handleRemove(index)"></Icon>
                      </div>
                  <template>
                      <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
                  </template>
              </div>
        </div>
      </div>

      <!-- 电话核实 -->
      <div class="basic">
        <div class="title flex main_zdy sideAlign_center">
          电话核实
          <span class="btn flex main_zdy sideAlign_center" @click="tel">拨打电话</span>
        </div>
        <div class="messages">
          <div class="table">
            <div class="tel_th flex main_zdy">
              <div>时间</div>
              <div>操作人</div>
              <div>内容</div>
            </div>
            <div class="tel_tb flex main_zdy" v-for="(item,index) in telList">
              <div>{{item.createDate}}</div>
              <div>{{item.createBy}}</div>
              <div>{{item.remark}}</div>
            </div>
          </div>
        </div>
      </div>
      <!-- 订单日志 -->
      <div class="basic">
        <div class="title flex main_zdy sideAlign_center">订单日志</div>
        <div class="messages">
          <div class="table">
            <div class="log_th flex main_zdy">
              <div>时间</div>
              <div>操作人</div>
              <div>标记</div>
              <div>建议额度</div>
              <div>备注</div>
            </div>
            <div class="log_tb flex main_zdy" v-for="(item,index) in logList">
              <div>{{item.createDate}}</div>
              <div>{{ item.createBy }}</div>
              <div>{{item.type}}</div>
              <div>{{item.creditLine}}</div>
              <div>{{item.note}}</div>
            </div>
          </div>
        </div>
      </div>
      <!-- 审核 -->
      <div class="basic" v-if='status == "1001" || status == "1003" || status == "1002" || status == "1004" || status == "1005"'>
        <div class="title flex main_zdy sideAlign_center">审核</div>
        <div class="messages flex main_zdy sideAlign_center mainAlign_center">
          <div class="click" @click="pass()">通过</div>
          <div class="click" @click="reject()">驳回</div>
          <div class="click" @click="refuse()">拒绝</div>
          <div class="click" @click="impeach()" v-if='status == "1001" || status == "1002"'>存疑</div>
          <div class="click" @click="impeachA()" v-else>打回</div>
        </div>
      </div>
    </div>
    <!--打电话-->
    <div class="hide flex sideAlign_center mainAlign_center" v-show="telshow">
      <!-- <div class="hide flex sideAlign_center mainAlign_center"> -->
      <div class="hide_d">
        <div class="flex main_ydz">
          <img src="../../assets/img/shut.png" class="cha" @click="shut">
        </div>
        <div class="hide_title">请输入通话内容</div>
        <textarea name="6" rows="4" cols placeholder="填写拨打电话原因" ref="telcontent"></textarea>
        <div class="flex mainAlign_center">
          <input type="button" name id value="提交" class="btns" @click="telrecheck">
          <input type="button" name id value="取消" class="btns" @click="shut">
        </div>
      </div>
    </div>
    <!--提交原因-->
    <div class="hide flex sideAlign_center mainAlign_center" v-show="firstshow">
      <!-- <div class="hide flex sideAlign_center mainAlign_center"> -->
      <div class="hide_d">
        <div class="flex main_ydz">
          <img src="../../assets/img/shut.png" class="cha" @click="shut">
        </div>
        <div>
          <div class="hide_title">请填写原因</div>
          <textarea name="6" rows="4" cols placeholder="请填写原因" v-model="Reason"></textarea>
          <div class="flex mainAlign_center">
            <input type="button" name id value="提交" class="btns" @click="AuditSubmission">
            <input type="button" name id value="取消" class="btns" @click="shut">
          </div>
        </div>
      </div>
    </div>
    <!--图片-->
		<div class="hide flex side_sdx sideAlign_center mainAlign_center" v-show="imgshow">
			<div class="flex main_ydz" style="width: 50%;margin-bottom: 10px;"><img src="../../assets/img/shut.png" class="cha" @click="shut"></div>
			<img :src="imgurl" alt="" class="imgurl" />
		</div>
  </div>
</template>

<script>
import { BaseUrl, API } from "../../Baseurl/common.js";
export default {
  data() {
    return {
      userPhone:"",
      onerror:'this.src="' + require('../../assets/img/img.png') + '"',
      tab: ["订单资料", "第三方", "电核", "审核"],
      id: "", //列表id
      type: "", //审核类型
      list: [], //数据列表
      storeInfo: [],
      placeimg: [], //经营场所
      brandimg: [], //品牌合同
      telList: [], //电话审核列表
      logList: [], //订单日志列表
      telshow: false, //电话show
      firstshow: false, //提交show
      Reason: "", //原因内容
      showReason: false, //是否需要填写建议额度
      storeId:"",
      //上传图片
      defaultList: [],
      imgName: '',
      visible: false,
      uploadList: [],
      otherAuthUrl:[],//图片集合
      imgshow: false, //图片的show
      imgurl: '',
      status:'',
      myUrl:"",
      item:{},
    };
  },
  created() {
    this.myUrl=this.$myUrl+"/uploadImg"
    this.id =this.$route.query.id;
    this.status = this.$route.query.status
    this.type = unescape(this.$route.query.type);
     this.item=eval("(" + localStorage.getItem("item") + ")")
    console.log(this.item)
    if (this.status == "1001") {
      this.showReason = false;
      this.otherAuthUrl=[]
    } else if(this.status == "1003"){
      this.showReason = true;
      this.otherAuthUrl=[]
    }else{
      
    }
    if(this.id !="" ){
        // 订单数据
        API(
          "post",
          "examine/findByEntity",
          {
            id:this.id
          },
          localStorage.getItem("userid"),
          localStorage.getItem("token"),
          res => {
            this.list = res.data.data.list[0];
            this.receivedType=this.list.storeInfo.receivedType
            this.storeInfo = res.data.data.list[0].storeInfo;
            this.storeId = res.data.data.list[0].storeId;
            console.log(res.data.data.list[0].otherAuthUrl)
            if(res.data.data.list[0].otherAuthUrl != "" && res.data.data.list[0].otherAuthUrl != undefined){
              this.otherAuthUrl=res.data.data.list[0].otherAuthUrl
              this.otherAuthUrl=this.otherAuthUrl.split(",")
            }
            
            if (res.data.data.list[0].placeUrl != "") {
              this.placeimg = res.data.data.list[0].placeUrl.split(",");
            } else {
              this.placeimg = [];
            }
            if (res.data.data.list[0].brandUrl != "") {
              this.brandimg = res.data.data.list[0].brandUrl.split(",");
            } else {
              this.brandimg = [];
            }
            var userid=res.data.data.list[0].storeInfo.userId
            this.userclick(userid)
          },
          res => {

          },
          res => {

          }
        );
        // 电话审核
        this.tellist(this.id);
        //订单日志
        API(
          "post",
          "examineLog/findByEntity",
          {
            examineId: this.id
          },
          localStorage.getItem("userid"),
          localStorage.getItem("token"),
          res => {
            this.logList = res.data.data.list;
          },
          res => {
            
          }
        );
    }else{
      this.storeInfo = this.item.storeInfo
    }
     var userId=localStorage.getItem("userid")
    
    
  },
  methods: {
    //关闭提示框
    shut: function() {
      this.telshow = false;
      this.firstshow = false;
      this.imgshow = false;
    },
    //图片
			imgon: function(e) {
				this.imgshow = !this.imgshow;
				this.imgurl = e;
			},
    // 打电话按钮
    tel: function() {
      this.telshow = true;
    },
    userclick(userId){
        API(
          "post",
          "queryUserPhone",
          {
            userId:userId
          },
          localStorage.getItem("userid"),
          localStorage.getItem("token"),
          res => {
            this.userPhone=res.data.data
          },
          res => {
            
          }
        );
    },
    // 电话核实列表
    tellist(id) {
      //电话的核实
      API(
        "post",
        "phoneLog/findByEntity",
        {
          examineId: id
        },
        localStorage.getItem("userid"),
        localStorage.getItem("token"),
        res => {
          this.telList = res.data.data.list;
        },
       res => {
         
      }
      );
    },
    // 发布电话评论
    telrecheck: function() {
      var that = this;
      var telcontent = that.$refs.telcontent.value;
      console.log(telcontent);
      if (telcontent != "") {
        API(
          "post",
          "phoneLog/create",
          {
            examineId: that.id,
            createBy: localStorage.getItem("userid"),
            remark: telcontent
          },
          localStorage.getItem("userid"),
          localStorage.getItem("token"),
          res => {
            this.telshow = false;
            this.tellist(that.id);
          },
          res => {
            this.telshow = false;
            that.$Message.error(res.data.message);
          }
        );
      } else {
        that.$Message.error("内容不能为空");
      }
    },
        // "1000":"待补充资料",
				// 	"1011":"开户处理中",
				// 	"1010":"待开户",
				// 	"1008":"复审驳回",
				// 	"1007":"初审拒绝",
				// 	"1006":"初审驳回",
				// 	"1005":"复审打回",
				// 	"1004":"初审存疑",
				// 	"1003":"初审通过",
				// 	"1002":"补件订单",
				// 	"1001":"新订单",
				// 	"1012":"入驻成功",
				// 	"1009":"复审拒绝" 
    //通过
    pass() {
      this.firstshow = true;
      if (this.status == "1001" || this.status == "1002" || this.status == "1005") {
        this.first = "1003";
      } else if (this.status == "1003" ) {
        this.again = "1012";
      }
    },
    //驳回
    reject() {
      this.firstshow = true;
      if (this.status == "1001"  || this.status == "1002" || this.status == "1005") {
        this.first = "1006";
      } else if (this.status == "1010" || this.status == "1004") {
        this.again = "1008";
      }
    },
    //拒绝
    refuse() {
      this.firstshow = true;
      if (this.status == "1001" || this.status == "1002" || this.status == "1005" ) {
        this.first = "1007";
      } else if (this.status == "1010" || this.status == "1004") {
        this.again = "1009";
      }
    },
    //存疑
    impeach() {
      this.firstshow = true;
      if (this.status == "1001" || this.status == "1002" || this.status == "1005") {
        this.first = "1004";
      } else if (this.status == "1010" || this.status == "1004") {
        this.again = "1005";
      }
    },
    //復審打回
    impeachA() {
      this.firstshow = true;
       this.again = "1005";
      
    },
    //提交
    AuditSubmission() {
      this.otherAuthUrl=this.otherAuthUrl.join(',')
      console.log(this.first)
      var type=""
      if(this.status == "1001"  || this.status == "1002" || this.status == "1005"){
          type=this.first
          console.log(1)
      }else{
         type=this.again
         console.log(2)
      }
      API(
        "post",
        "examineLog/create",
        {
          examine: {
            id: this.id,
            otherAuth: this.threeinput,
            otherAuthUrl: this.otherAuthUrl,
            status: type,
            storeId: this.storeId
          },
          receivedType:this.receivedType,
          examineId: this.id,
          note: this.Reason,
          sign: type,
          type:type,
          createBy: localStorage.getItem("userid")
        },
        localStorage.getItem("userid"),
        localStorage.getItem("token"),
        res => {
          this.$Message.success("成功");
          this.firstshow = false;
          this.$router.push({
            path: "/shopsAudit"
          });
        },
        res => {
         this.$Message.error(res.data.message);
        },
       res => {

      }
      );
    },
    //图片上传
     handleView (index) {
				this.visible = true;
				this.imgNames = this.otherAuthUrl[index];
      },
    handleRemove (file) {
        const fileList = this.otherAuthUrl;
        this.otherAuthUrl.splice(fileList.indexOf(file), 1);
    },
    handleSuccess (res, file,fileList) {
      console.log(res.data.url)
      console.log(this.otherAuthUrl)
        this.otherAuthUrl.push(res.data.url)
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
        const check = this.uploadList.length < 5;
        if (!check) {
            this.$Notice.warning({
                title: 'Up to five pictures can be uploaded.'
            });
        }
        return check;
    }
    // "1000":"待补充资料",
    // "1011":"开户处理中",
    // "1010":"待开户",
    // "1008":"复审驳回",
    // "1007":"初审拒绝",
    // "1006":"初审驳回",
    // "1005":"复审打回",
    // "1004":"初审存疑",
    // "1003":"初审通过",
    // "1002":"补件订单",
    // "1001":"新订单",
    // "1012":"入驻成功",
    // "1009":"复审拒绝"
  },
  //  mounted () {
  //     this.uploadList = this.$refs.upload.fileList;
  // }
};
</script>

<style scoped="scoped">
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

.colorCCC {
  color: #686a6c;
}

.blod {
  font-weight: bold;
}

/* 审核信息 */
.conten {
  padding: 20px;
}

.basic {
  border: 1px solid #e7eaec;
  margin-bottom: 20px;
}

.title {
  height: 50px;
  /* line-height: 50px; */
  padding-left: 20px;
  border-bottom: 1px solid #e7eaec;
  font-size: 16px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: rgba(104, 107, 109, 1);
}

.message {
  min-height: 50px;
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
  width: 50%;
}

.message_d_v>div {
  font-size: 14px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(87, 87, 87, 1);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.message_d_v>div:nth-child(1) {
  width: 140px;
}

.message_d_v>div:nth-child(2) {
  width: 200px;
}

.message_d_v div img {
  width: 120px;
  height: 76px;
  display: block;
}

.h5 {
  height: 50px;
}

.h5 div:nth-child(1) {
  width: 4px;
  height: 50%;
  background: #4DA78E;
  margin: 0 20px 0 -20px;
}

.h5 div:nth-child(2) {
  font-size: 16px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: rgba(104, 107, 109, 1);
}

.dashed {
  border-bottom: 1px #e7eaec dashed;
  margin: 10px 0 0 0;
}

.btn {
  height: 22px;
  background: rgba(82, 176, 149, 1);
  border-radius: 4px;
  font-size: 12px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  padding: 2px 5px;
  margin: 0 0 0 20px;
  cursor: pointer;
}
.btnimg {
  height: 22px;
  background: rgba(82, 176, 149, 1);
  border-radius: 4px;
  font-size: 12px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  text-align: center;
  color: rgba(255, 255, 255, 1);
  padding: 2px 5px;
  /* margin: 0 0 0 20px; */
  cursor: pointer;
}
.credit {
  width: 120px;
  height: 75px;
  padding: 20px 0 0 0;
  position: relative;
  margin-right: 20px;
}

.creditImg {
  width: 120px;
  height: 75px;
  display: block;
}

.delImg {
  width: 10px;
  height: 10px;
  display: block;
  position: absolute;
  top: 15px;
  right: -5px;
  cursor: pointer;
}

.table {
  width: 100%;
  border: 1px #e7eaec solid;
}

.tel_th,
.log_th {
  background: #dddddd;
}

.tel_th div {
  width: 33.3333333333333%;
  height: 44px;
  line-height: 44px;
  font-size: 14px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: rgba(104, 106, 108, 1);
  text-align: center;
  border: 1px solid #dddddd;
}

.log_th div {
  width: 20%;
  height: 44px;
  line-height: 44px;
  font-size: 14px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: rgba(104, 106, 108, 1);
  text-align: center;
  border: 1px solid #dddddd;
}

.tel_tb div {
  width: 33.3333333333333%;
  height: 44px;
  line-height: 44px;
  font-size: 14px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(104, 106, 108, 1);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-align: center;
  border: 1px solid #dddddd;
}

.log_tb div {
  width: 20%;
  height: 44px;
  line-height: 44px;
  font-size: 14px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(104, 106, 108, 1);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-align: center;
  border: 1px solid #dddddd;
}

.tel_tb:nth-child(odd),
.log_tb:nth-child(odd) {
  background: #fff;
}

.tel_tb:nth-child(even),
.log_tb:nth-child(even) {
  background: #f9f9f9;
}

.click {
  width: 90px;
  height: 38px;
  background: rgba(82, 176, 149, 1);
  border-radius: 4px;
  font-size: 14px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  text-align: center;
  line-height: 38px;
  margin: 0 15px;
  cursor: pointer;
}

.hide {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  position: absolute;
  top: 0;
  left: 0;
  z-index: 9;
}

.imgurl {
  width: 50%;
  height: 80%;
}

.hide_d {
  width: 440px;
  /*height: 316px;*/
  background: #fff;
  border-radius: 10px;
  padding: 0 20px 20px 20px;
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
  font-size: 20px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  line-height: 20px;
  text-align: center;
  color: #575757;
  margin-bottom: 15px;
  margin-top: 15px;
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
  border: 1px solid #cccccc;
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
  background: #52b095;
  color: #fff;
}

.btns:nth-child(2) {
  background: #c7c7c7;
  color: #fff;
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