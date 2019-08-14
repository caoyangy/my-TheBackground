<template>
  <div class="flex side_sdx wary">
    <!--头部信息-->
    <div class="H_t flex side_sdx mainAlign_center">
      <div>详情</div>
      <div class="flex mina_zdy">
        <router-link class="colorCCC" to="/franchiseCenter">加盟中心</router-link>&nbsp;&nbsp; /&nbsp;&nbsp;
        <span class="colorCCC blod">详情</span>
      </div>
    </div>

    <!-- 审核信息 -->
    <div class="conten">
      <!-- 基本信息 -->
      <div class="basic">
        <div class="title flex main_zdy sideAlign_center">基本信息</div>
        <div class="message">
          <div class="flex main_zdy message_d">
            <div class="flex mian_zdy message_d_v">
              <div>公司名称</div>
              <div>{{list.agencyName}}</div>
            </div>
            <div class="flex mian_zdy message_d_v">
              <div>公司所在地</div>
              <div>{{list.companyAddress}}</div>
            </div>
          </div>
          <div class="flex main_zdy message_d">
            <div class="flex mian_zdy message_d_v">
              <div>联系人姓名</div>
              <div>{{list.principalName}}</div>
            </div>
            <div class="flex mian_zdy message_d_v">
              <div>联系人手机号</div>
              <div>{{list.principalPhone}}</div>
            </div>
          </div>
          <div class="flex main_zdy message_d">
            <div class="flex mian_zdy message_d_v">
              <div>联系人邮箱</div>
              <div>{{list.principalMail}}</div>
            </div>
          </div>
          <div class="flex main_zdy message_d">
            <div class="flex mian_zdy message_d_v">
              <div>直营团队人数</div>
              <div>{{list.teamNumber}}</div>
            </div>
          </div>
          <div class="flex main_zdy message_d">
            <div class="flex mian_zdy message_d_v">
              <div>申请理由</div>
              <!-- <div>{{storeInfo.priceRange}}</div> -->
              <div>
                <textarea
                  style="width:300px;"
                  disabled
                  :rows="4"
                  :autosize="true"
                  v-model="list.applyReason"
                />
              </div>
            </div>
          </div>
          <div class="flex main_zdy message_d">
            <div class="flex mian_zdy message_d_v">
              <div>推荐公司</div>
              <div>{{list.recommendCompanyName}}</div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="receivedType != '1' && receivedType != '2' && receivedType != '3' ">
        <!-- 资质信息 -->
        <div class="basic">
          <div class="title flex main_zdy sideAlign_center">资质信息</div>
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
                <div>执照名称</div>
                <div>{{list.businessLicenseName}}</div>
              </div>
            </div>
            <div class="flex main_zdy message_d">
              <div class="flex mian_zdy message_d_v">
                <div>统一社会信用代码</div>
                <div>{{list.regNo}}</div>
              </div>
            </div>
            <div class="flex main_zdy message_d">
              <div class="flex mian_zdy message_d_v">
                <div>公司类型</div>
                <div v-if="list.companyType==0 ">有限责任公司</div>
                <div v-if="list.companyType==1 ">股份有限公司</div>
                <div v-if="list.companyType==2 ">有限合伙企业</div>
                <div v-if="list.companyType==3 ">外商独资公司</div>
                <div v-if="list.companyType==4 ">个人独资企业</div>
                <div v-if="list.companyType==5 ">国有独资公司</div>
                <div v-if="list.companyType==6 ">个人经营</div>
                <div v-if="list.companyType==7 ">家庭经营</div>
                <div v-if="list.companyType==8 ">其他</div>
              </div>
            </div>
            <div class="flex main_zdy message_d">
              <div class="flex mian_zdy message_d_v">
                <div>成立日期</div>
                <div>{{list.companyCreateTime}}</div>
              </div>
            </div>
            <div class="flex main_zdy message_d">
              <div class="flex mian_zdy message_d_v">
                <div>有效期</div>
                <div>{{list.companyEndTime}}</div>
              </div>
            </div>
            <div class="flex main_zdy message_d">
              <div class="flex mian_zdy message_d_v">
                <div>营业执照照片</div>
                <div>
                  <img :src="list.businessLicensePicture" @click="imgon(list.businessLicensePicture)" :onerror="onerror" alt>
                </div>
              </div>
            </div>
            <div class="dashed"></div>
          </div>
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
                <div>{{list.corporationName}}</div>
              </div>
            </div>
            <div class="flex main_zdy message_d">
              <div class="flex mian_zdy message_d_v">
                <div>身份证号</div>
                <div>{{list.corporationIdcard}}</div>
              </div>
            </div>
            <div class="flex main_zdy message_d">
              <div class="flex mian_zdy message_d_v">
                <div>法人手机号</div>
                <div>{{list.corporationPhone}}</div>
              </div>
            </div>
            <div class="flex main_zdy message_d">
              <div class="flex mian_zdy message_d_v">
                <div>身份证照片正面</div>
                <div>
                  <img :src="list.idcardFrontPicture" @click="imgon(list.idcardFrontPicture)" :onerror="onerror"  alt>
                </div>
              </div>
            </div>
            <div class="flex main_zdy message_d">
              <div class="flex mian_zdy message_d_v">
                <div>身份证照片反面</div>
                <div>
                  <img :src="list.idcardBackPicture"  @click="imgon(list.idcardBackPicture)" :onerror="onerror" alt>
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
                  <img :src="list.institutionalCreditCodeCertificate" @click="imgon(list.institutionalCreditCodeCertificate)" :onerror="onerror" alt>
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
                <img :src="list.accountLicensePicture" @click="imgon(list.accountLicensePicture)" :onerror="onerror" alt>
                </div>
              </div>
            </div>
            <div class="dashed"></div>
          </div>
        </div>

        <!-- 收单工具 -->
        <div class="basic" v-if="this.receivedType=='7' ">
          <div class="title flex main_zdy sideAlign_center">签约信息</div>
          <div class="message">
            <div class="flex main_zdy message_d">
              <div class="flex mian_zdy message_d_v">
                <div>签约时间</div>
                <div>{{list.addTime}}</div>
              </div>
            </div>
            <div class="flex main_zdy message_d">
              <div class="flex mian_zdy message_d_v">
                <div>所属等级</div>
                <div v-if="list.companyType=='0'">合伙人</div>
                <div v-if="list.companyType=='1'">代理人</div>
              </div>
            </div>
            <div class="flex main_zdy message_d">
              <div class="flex mian_zdy message_d_v">
                <div>合同照片</div>
                <div>
                    <div v-for="(item,index) in list.contractPicture" class="contract">
                      <img :src="item" @click="imgon(item)" :onerror="onerror" alt>
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- 第三方征信 -->
      <div class="basic">
        <div class="title flex main_zdy sideAlign_center">
          第三方征信
          <Upload
            v-if="type=='待初审' || type=='待复审'"
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
            style="display: inline-block;margin:20px"
          >
            <div style="height:22px;line-height: 22px;">
              <!-- <Icon type="ios-camera" size="20"></Icon> -->
              <span class="btnimg flex main_zdy sideAlign_center">上传征信截图</span>
            </div>
          </Upload>
          <Modal v-model="visible">
            <img :src="imgNames" v-if="visible" style="width: 100%">
          </Modal>
          <!-- <span class="btn flex main_zdy sideAlign_center">上传征信截图</span> -->
        </div>
        <div class="message flex main_zdy">
          <div
            style="margin-top:20px"
            class="demo-upload-list"
            v-for="(item,index) in otherAuthUrl"
            :key="index"
          >
            <img :src="item" class="creditImg">
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
              <div>{{item.userName}}</div>
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
              <div>操作类型</div>
              <div>说明</div>
            </div>
            <div class="log_tb flex main_zdy" v-for="(item,index) in logList">
              <div>{{item.auditTime}}</div>
              <div>{{item.operatorUserName}}</div>
              <div>{{item.auditType}}</div>
              <div>{{item.auditExplain}}</div>
            </div>
          </div>
        </div>
      </div>
      <!-- 审核 -->
      <div class="basic" v-if="btnShow">
        <div class="title flex main_zdy sideAlign_center">{{type}}</div>
        <div class="messages flex main_zdy sideAlign_center mainAlign_center">
          <div class="click" @click="pass()" v-if="!showReason">通过</div>
          <div class="click" @click="reject()" v-if="!showReason">驳回</div>
          <div class="click" @click="impeach()" v-if="showReason">开始配置</div>
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
    <!--签约配置-->
    <div class="hide flex sideAlign_center mainAlign_center" v-show="SigningShow">
      <!-- <div class="hide flex sideAlign_center mainAlign_center"> -->
      <div class="hide_d">
        <div class="flex main_ydz">
          <img src="../../assets/img/shut.png" class="cha" @click="shut">
        </div>
        <div>
          <div class="hide_title">签约配置</div>
          <span class="red">配置成功立即生效，请谨慎操作</span>
          <div class="flex mian_zdy message_d_v">
            <div>签约时间</div>
            <DatePicker
              type="date"
              confirm
              placeholder
              v-model="SigningForm.addTime"
              style="width: 200px"
            ></DatePicker>
          </div>
          <div class="flex mian_zdy message_d_v">
            <div>代理商等级</div>
            <Select v-model="SigningForm.type" style="width:200px">
              <Option
                v-for="item in cityList"
                :value="item.value"
                :key="item.value"
              >{{ item.label }}</Option>
            </Select>
          </div>
          <div class="flex mian_zdy">
            <div class="Signing">合同照片</div>
            <div>
              <div
                class="demo-upload-list"
                v-for="(item,index) in SigningForm.SigningImg"
                :key="index"
              >
                <img :src="item" class="creditImg">
                <div class="demo-upload-list-cover">
                  <Icon type="ios-eye-outline" @click.native="SigningView(index)"></Icon>
                  <Icon type="ios-trash-outline" @click.native="SigningRemove(index)"></Icon>
                </div>
                <template>
                  <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
                </template>
              </div>
              <Upload
                ref="upload"
                :show-upload-list="false"
                :default-file-list="defaultLists"
                :on-success="SigningSuccess"
                :format="['jpg','jpeg','png']"
                :max-size="2048"
                :on-format-error="SigningFormatError"
                :on-exceeded-size="SigningMaxSize"
                :before-upload="SigningBeforeUpload"
                multiple
                type="drag"
                :action="myUrl"
                style="display: inline-block;margin:20px;width:56px;"
              >
                <div style="width:56px;height:56px;line-height: 56px;">
                  <Icon type="ios-camera" size="30"></Icon>
                </div>
              </Upload>
              <Modal v-model="visibleSigning">
                <img :src="imgName" v-if="visibleSigning" style="width: 100%">
              </Modal>
            </div>
          </div>
          <div class="flex mainAlign_center">
            <input type="button" name id value="提交" class="btns" @click="ContSubmission">
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
import moment from "moment";
export default {
  data() {
    return {
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
      SigningShow: false, //签约配置
      storeId: "",
      //上传图片第三方征信
      defaultList: [],
      imgName: "",
      visible: false,
      uploadList: [],
      otherAuthUrl: [], //第三方征信图片集合
      //签约配置
      defaultLists: [],
      visibleSigning: false,
      cityList: [
        {
          value: "1",
          label: "合伙人"
        },
        {
          value: "2",
          label: "代理人"
        }
      ],
      SigningForm: {
        addTime: "",
        type: "",
        SigningImg: [] //签约配置合同图片集合
      },
      receivedType: "",
      btnShow: true,
      imgshow: false, //图片的show
      imgurl: '',
      myUrl:"",
    };
  },
  // 审核状态 2初审驳回、3 初审通过 5复审驳回 6复审通过
  // 状态1待初审、2初审驳回、3 待提交审核资质 4待复审、5复审驳回 6待签约 7签约成功 不传查所有
  created() {
    this.myUrl=this.$myUrl+"/uploadImg"
    this.userid = localStorage.getItem("userid"),
      this.token = localStorage.getItem("token"),
      this.id = this.$route.query.id;
    this.receivedType = this.$route.query.receivedType;
    // this.type = unescape(this.$route.query.type);
    console.log(this.id);
    console.log(this.receivedType);
    if (this.receivedType == "1") {
      this.type = "待初审";
    } else if (this.receivedType == "4") {
      this.type = "待复审";
    } else if (this.receivedType == "6") {
      this.type = "待签约";
    } else {
      this.btnShow = false;
    }
    if (this.type == "待初审") {
      this.showReason = false;
      this.otherAuthUrl = [];
    } else if (this.type == "待复审") {
      this.showReason = false;
      this.otherAuthUrl = [];
    } else if (this.type == "待签约") {
      this.showReason = true;
    }
    console.log(this.receivedType)
    // 订单数据
    this.$APIA(
      "post",
      "agencyinfomanager/getAgency?userId="+this.userid+"&agencyId="+this.id,
      {
        // userId: this.userid,
        // agencyId: this.id
      },
      this.userid,
      this.token,
      res => {
        console.log(res.data.data);
        this.list = res.data.data;
        this.logList=res.data.data.agencyInfoOperatorRecord
        console.log(this.logList)
        for(var i=0;i<this.logList.length;i++){
            this.logList[i].auditTime=moment(this.logList[i].auditTime).format('YYYY-MM-DD HH:mm:ss')

        }
        this.list.contractPicture=this.list.contractPicture.split(",")
        if(this.list.creditReportImage !=null){
            this.otherAuthUrl=this.list.creditReportImage.split(",")
        }
        
      }
    );
    // 电话审核
    this.tellist(this.id);
    // 订单日志
    // this.$APIA(
    //   "post",
    //   "phonelogmanager/selectByExamineId",
    //   {
    //     examineId: this.id
    //   },
    //   this.userid,
    //   this.token,
    //   res => {
    //     this.logList = res.data.data.list;
    //   }
    // );
  },
  methods: {
    beforeDestroy(){
			localStorage.setItem('imgurl','')
		},
    //图片
			imgon: function(e) {
				this.imgshow = !this.imgshow;
				this.imgurl = e;
			},
    //关闭提示框
    shut: function() {
      this.telshow = false;
      this.firstshow = false;
      this.SigningShow = false;
      this.imgshow = false;
    },
    // 打电话按钮
    tel: function() {
      this.telshow = true;
    },
    // 电话核实列表
    tellist(id) {
      console.log(id)
      //电话的核实
      this.$APIA(
        "post",
        "phonelogmanager/selectByExamineId?examineId="+id,
        {
          // examineId: id
        },
        this.userid,
        this.token,
        res => {
          console.log( res.data.data);
          this.telList = res.data.data;
          for(var i=0;i<this.telList.length;i++){
            this.telList[i].createDate=moment(this.telList[i].createDate).format('YYYY-MM-DD HH:mm:ss')

          }
        }
      );
    },
    // 发布电话评论
    telrecheck: function() {
      var that = this;
      var telcontent = that.$refs.telcontent.value;
      console.log(telcontent);
      if (telcontent != "") {
        this.$APIA(
          "post",
          "phonelogmanager/add",
          {
            examineId: that.id,
            createUserId: this.userid,
            remark: telcontent
          },
          this.userid,
          this.token,
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
    //通过
    pass() {
      this.firstshow = true;
      if (this.type == "待初审") {
        this.first = "3";
      } else if (this.type == "待复审") {
        this.again = "6";
      }
    },
    //驳回
    reject() {
      this.firstshow = true;
      if (this.type == "待初审") {
        this.first = "2";
      } else if (this.type == "待复审") {
        this.again = "5";
      }
    },
    // 审核状态 2初审驳回、3 初审通过 5复审驳回 6复审通过
    //存疑
    impeach() {
      this.SigningShow = true;
    },
    //签约提交ContSubmission
    ContSubmission() {
      var contractPicture = this.SigningForm.SigningImg.join(",");
      this.SigningForm.addTime = moment(this.SigningForm.addTime).format(
        "YYYY-MM-DD HH:mm:ss"
      );
      console.log(this.SigningForm);
      this.$APIA(
        "post",
        "agencyinfoexaminemanager/uploadContract",
        {
          userId:this.userid,
          agencyInfoId: this.id,
          companyRank: this.SigningForm.type,
          addTime: this.SigningForm.addTime,
          contractPicture: contractPicture
        },
        this.userid,
        this.token,
        res => {
          this.$Message.success("成功");
          this.firstshow = false;
          this.$router.push({
            path: "/franchiseCenter"
          });
        },
        res => {
          this.$Message.error(res.data.message);
        }
      );
    },
    //提交
    AuditSubmission() {
      console.log(this.Reason);
      var type = "";
      if (this.type == "待初审") {
        type = this.first;
        console.log(1);
      } else if (this.type == "待复审") {
        type = this.again;
      }
      if(this.otherAuthUrl != 0){
        var otherAuthUrl=this.otherAuthUrl.join(',')
        this.$APIA(
          "post",
          "agencyinfoexaminemanager/uploadCreditImage",
          {
            agencyInfoId: this.id,
            creditReportImage:otherAuthUrl,
          },
          this.userid,
          this.token,
          res => {
            this.$Message.success("征信三方成功");
          },
          res => {
            this.$Message.error(res.data.message);
          }
        );
      }
      this.$APIA(
        "post",
        "agencyinfomanager/updateStatus",
        {
          id: this.id,
          userId: this.userid,
          auditExplain: this.Reason,
          agencyStatus: type
        },
        this.userid,
        this.token,
        res => {
          this.$Message.success("成功");
          this.firstshow = false;
          this.$router.push({
            path: "/franchiseCenter"
          });
        },
        res => {
          this.$Message.error(res.data.message);
        }
      );
    },
    //微信三方图片上传
    handleView(index) {
      this.visible = true;
      this.imgNames = this.otherAuthUrl[index];
    },
    handleRemove(file) {
      const fileList = this.otherAuthUrl;
      this.otherAuthUrl.splice(fileList.indexOf(file), 1);
    },
    handleSuccess(res, file, fileList) {
      this.otherAuthUrl.push(res.data.url);
    },
    handleFormatError(file) {
      this.$Notice.warning({
        title: "The file format is incorrect",
        desc:
          "File format of " +
          file.name +
          " is incorrect, please select jpg or png."
      });
    },
    handleMaxSize(file) {
      this.$Notice.warning({
        title: "Exceeding file size limit",
        desc: "File  " + file.name + " is too large, no more than 2M."
      });
    },
    handleBeforeUpload() {
      const check = this.uploadList.length < 5;
      if (!check) {
        this.$Notice.warning({
          title: "Up to five pictures can be uploaded."
        });
      }
      return check;
    },
    //签约配置合同图片上传
    SigningView(index) {
      this.SigningForm.SigningImg = true;
      this.imgName = this.SigningForm.SigningImg[index];
    },
    SigningRemove(file) {
      const fileList = this.SigningForm.SigningImg;
      this.SigningForm.SigningImg.splice(fileList.indexOf(file), 1);
    },
    SigningSuccess(res, file, fileList) {
      this.SigningForm.SigningImg.push(res.data.url);
    },
    SigningFormatError(file) {
      this.$Notice.warning({
        title: "The file format is incorrect",
        desc:
          "File format of " +
          file.name +
          " is incorrect, please select jpg or png."
      });
    },
    SigningMaxSize(file) {
      this.$Notice.warning({
        title: "Exceeding file size limit",
        desc: "File  " + file.name + " is too large, no more than 2M."
      });
    },
    SigningBeforeUpload() {
      const check = this.uploadList.length < 10;
      if (!check) {
        this.$Notice.warning({
          title: "Up to five pictures can be uploaded."
        });
      }
      return check;
    }
    // 审核状态 2初审驳回、3 初审通过 5复审驳回 6复审通过
    //状态1待初审、2初审驳回、3 待提交审核资质 4待复审、5复审驳回 6待签约 7签约成功 不传查所有
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
  mounted() {
    this.uploadList = this.$refs.upload.fileList;
  }
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
  margin: 15px 0px;
}
.Signing {
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
  font-size: 14px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(87, 87, 87, 1);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.message_d_v div:nth-child(1) {
  width: 120px;
}

.message_d_v div:nth-child(2) {
  width: 400px;
}

.message_d_v div img {
  width: 120px;
  height: 76px;
  display: inline-block;
  margin-right: 18px;
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
  width: 25%;
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
  width: 25%;
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
.demo-upload-list {
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
.red {
  font-size: 14px;
  color: red;
  line-height: 28px;
}
.contract{
  display: inline;
}
</style>