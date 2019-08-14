<template>
  <div class="flex side_sdx wary">
    <!--头部信息-->
    <div class="H_t flex side_sdx mainAlign_center">
      <div>详情</div>
      <div class="flex mina_zdy">
        <router-link class="colorCCC" to="/agentManagement">代理商管理</router-link>&nbsp;&nbsp; /&nbsp;&nbsp;
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
                  <textarea style="width:300px;" disabled :rows="4" :autosize="true" v-model="list.applyReason"/>
              </div>
            </div>
          </div>
          <div class="flex main_zdy message_d">
            <div class="flex mian_zdy message_d_v">
              <div>推荐公司</div>
              <div>{{list.recommendCompanyName}}</div>
            </div>
          </div>
           <!-- <div class="flex main_zdy message_d">
            <div class="flex mian_zdy message_d_v">
              <div>推荐商户二维码</div>
              <qriously :value="url1" :size="size" :backgroundAlpha="backgroundAlpha"/>
              <div id="qrcode"></div>
            </div>
            <div class="flex mian_zdy message_d_v">
              <div>推荐代理商二维码</div>
              <qriously :value="url" :size="size" :backgroundAlpha="backgroundAlpha"/>
            </div>
          </div> -->
        </div>
      </div>

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
                <img :src="list.businessLicensePicture"  @click="imgon(list.businessLicensePicture)" :onerror="onerror" alt>
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
                <img :src="list.idcardFrontPicture" @click="imgon(list.idcardFrontPicture)" :onerror="onerror" alt>
              </div>
            </div>
          </div>
          <div class="flex main_zdy message_d">
            <div class="flex mian_zdy message_d_v">
              <div>身份证照片反面</div>
              <div>
                <img :src="list.idcardBackPicture" @click="imgon(list.idcardBackPicture)" :onerror="onerror" alt>
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
      <div class="basic">
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
                  <div v-for="(item,index) in list.contractPicture" style="display: inline-block">
                      <img :src="item" @click="imgon(item)" :onerror="onerror" alt>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 推荐列表 -->
      <div class="basic">
        <div class="title flex main_zdy sideAlign_center">推荐列表</div>
        <div class="messages">
           <div class="flex main_zdy message_d">
            <div class="flex mian_zdy message_d_v">
              <div>共推荐</div>
              <div>{{ListTotal*1}}个</div>
            </div>
          </div> 
          <div class="flex main_zdy message_d">
            <div style="width:100%" class="flex mian_zdy">
              <div class="Signing">推荐名单</div>
              <div style="width:100%">
                  <div class="table ">
                    <div class="log_th flex main_zdy">
                        <div>时间</div>
                        <div>公司名称</div>
                        <div>等级</div>
                    </div>
                    <div class="log_tb flex main_zdy" v-for="(item,index) in listOrder">
                        <div>{{item.addTime}}</div>
                        <div>{{item.agencyName}}</div>
                        <div v-if="item.companyType=='0'">合伙人</div>
                        <div v-if="item.companyType=='1'">代理人</div>
                    </div>
                </div>
              </div>
            </div>
          </div> 
          <!--页码-->
			<div class="list_data_b flex main_ydz">
				<Page :total="PageA.total" :page-size="PageA.pageSize" :current="PageA.current" @on-change="pageA"></Page>
			</div>
        </div>
      </div>
        <!-- 商户列表 -->
      <div class="basic">
        <div class="title flex main_zdy sideAlign_center">商户列表</div>
        <div class="messages">
           <div class="flex main_zdy message_d">
            <div class="flex mian_zdy message_d_v">
              <div>共推荐</div>
              <div>{{MerchantTotal*1}}个</div>
            </div>
          </div> 
          <div class="flex main_zdy message_d">
            <div style="width:100%" class="flex mian_zdy">
              <div class="Signing">商户名单</div>
              <div style="width:100%">
                  <div class="table ">
                    <div class="log_th flex main_zdy">
                        <div>入驻时间</div>
                        <div>门店名称</div>
                        <div>所在城市</div>
                        <div>详细地址</div>
                        <div>门店电话</div>
                        <div>经营品类</div>
                    </div>
                    <div class="log_tb flex main_zdy" v-for="(item,index) in logList">
                        <div>{{item.createDate}}</div>
                        <div>{{item.name}}</div>
                        <div>{{item.province}}</div>
                        <div>{{item.city+item.county}}</div>
                        <div>{{item.tel}}</div>
                        <div>{{item.categoryName}}</div>
                    </div>
                </div>
              </div>
            </div>
          </div> 
          <!--页码-->
			<div class="list_data_b flex main_ydz">
				<Page :total="PageB.total" :page-size="PageB.pageSize" :current="PageB.current" @on-change="pageB"></Page>
			</div>
        </div>
      </div>
        <!-- 员工列表 -->
      <div class="basic">
        <div class="title flex main_zdy sideAlign_center">员工列表</div>
        <div class="messages">
           <div class="flex main_zdy message_d">
            <div class="flex mian_zdy message_d_v">
              <div>共</div>
              <div>{{stafftotal*1}}个</div>
            </div>
          </div> 
          <div class="flex main_zdy message_d">
            <div style="width:100%" class="flex mian_zdy">
              <div class="Signing">员工名单</div>
              <div style="width:100%">
                  <div class="table ">
                    <div class="log_th flex main_zdy">
                        <div>添加时间</div>
                        <div>手机号</div>
                        <div>姓名</div>
                        <div>身份证号</div>
                        <div>邮箱</div>
                    </div>
                    <div class="log_tb flex main_zdy" v-for="(item,index) in dataList">
                        <div>{{item.addTime}}</div>
                        <div>{{item.employeePhone}}</div>
                        <div>{{item.employeeName}}</div>
                        <div>{{item.employeeIdcard}}</div>
                        <div>{{item.employeeMail}}</div>
                    </div>
                </div>
              </div>
            </div>
          </div> 
          <!--页码-->
			<div class="list_data_b flex main_ydz">
				<Page :total="PageC.total" :page-size="PageC.pageSize" :current="PageC.current" @on-change="pageC"></Page>
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
      dataList:[],//员工列表
      stafftotal:"",
      //推荐列表分页
        PageA: {
            total: 0,
            pageSize: 5,
            current: 1
        },
        //推荐列表分页
        PageB: {
            total: 0,
            pageSize: 5,
            current: 1
        },
        //推荐列表分页
        PageC: {
            total: 0,
            pageSize: 5,
            current: 1
        },
        url1:"",
        url:"",
        agencyInfoId:"",
        listOrder:[],//推荐名单list
        ListTotal:"",
        MerchantTotal:"",
        size: 160,
        backgroundAlpha:1,
        imgshow: false, //图片的show
        imgurl: '',
    };
  },
  created() {
      this.userid = localStorage.getItem("userid"),
      this.token = localStorage.getItem("token"),
      this.id= this.$route.query.id;
      this.agencyInfoId= this.$route.query.agencyInfoId;
      console.log(this.agencyInfoId)
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
        this.list.contractPicture=this.list.contractPicture.split(",")
        console.log(this.list.contractPicture)
        this.url1='https://mgmall.huanyueguoji.com/shopsEnter?staffId=' + this.list.id + '&agencyInfoId=' + this.list.agencyInfoId
        // this.url1="http://www.baidu.com?id=437786067@qq.com"  
        this.url='https://mgmall.huanyueguoji.com/agent?staffId=' + this.list.id + '&agencyInfoId=' + this.list.agencyInfoId
        console.log(this.url1)
      }
    );
   
    this.staffList()
    this.List()
    this.MerchantList()
  },
  methods: {
    //关闭提示框
    shut: function() {
      this.imgshow = false;
    },
    //图片
			imgon: function(e) {
				this.imgshow = !this.imgshow;
				this.imgurl = e;
			},
    //获取推荐列表页数
    pageA(e) {
      this.PageA.current = e;
        this.List()
    },
    //获取推荐列表分页数据
    List(type, current, pageSize, userid, token) {
        const params = {
                agencyPid:this.agencyInfoId,
                pageNum:this.PageA.current,
                pageSize:this.PageA.pageSize,
          };
          console.log(params)
          var data = "";
          for (var i in params) {
            data += encodeURIComponent(i) + "=" + encodeURIComponent(params[i]) + "&";
          }
          data = data.slice(0, -1);
        let that=this
        //获取列表
        this.$APIA('post', 
        'agencyinfomanager/getRecommendAgency', 
          data,
           this.userid,this.token, (res) => {
            console.log(res)
            this.listOrder = [];
            this.listOrder = res.data.data.list;
            this.PageA.total = res.data.data.total;
            this.ListTotal = res.data.data.total;
        }, (res) => {
          console.log(res)
        })
    },
    //获取商户列表页数
    pageB(e) {
      this.PageB.current = e;
        this.MerchantList()
    },
    //获取商户列表分页数据
    MerchantList() {
        var searchVal = this.searchVal;
        const params = {
                // "userId":this.agencyInfoId,
                recommendCompanyId:this.id,
                pageNum:  this.PageB.current,
                pageSize: this.PageB.pageSize,
          };
           var data = "";
          for (var i in params) {
            data += encodeURIComponent(i) + "=" + encodeURIComponent(params[i]) + "&";
          }
          data = data.slice(0, -1);
        //获取列表
        this.$APIA('post', 'recommendstoremanager/getrecommendstore', 
        data,
        this.userid,this.token, (res) => {
            console.log(res)
            this.logList=res.data.data.list
            this.PageB.total = res.data.data.total;
            this.MerchantTotal = res.data.data.total;

        }, (res) => {
          console.log(res)
        })
    },
    //获取员工列表页数
    pageC(e) {
      this.PageC.current = e;
        this.staffList()
    },
    //获取员工列表分页数据
    staffList() {
        //获取列表
        this.$APIA('post', 'employeemanager/findByAgencyId', {
            agencyInfoId:this.id,
            currentPage: this.PageC.current,
            pageSize: this.PageC.pageSize
        }, 
        this.userid,
        this.token,
       (res) => {
            var data = res.data.data.list;
                var aa = "";
                for (var i = 0; i < data.length; i++) {
                  aa = moment(data[i].addTime).format("YYYY-MM-DD HH:mm:ss");
                  data[i].addTime = aa;
                  this.dataList = data;
            }
            console.log(data)
            this.PageC.total = res.data.data.total;
            this.stafftotal = res.data.data.total;
        }, (res) => {
          console.log(res)
        })
    },
    
  
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
//    mounted () {
//       this.uploadList = this.$refs.upload.fileList;
//   }
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
/* .message_d_v {
  width: 50%;
} */
.Signing{
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

.message_d_v>div:nth-child(1) {
  width: 160px;
}

.message_d_v>div:nth-child(2) {
  width: 400px;
}

.message_d_v>div img {
  width: 120px;
  height: 76px;
  display: block;
  margin-right: 5px;
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
    .red{
        font-size: 14px;
        color: red;
        line-height: 28px;
    }
    .list_data_b {
		margin-top: 12px;
		padding-bottom: 10px;
	}
</style>