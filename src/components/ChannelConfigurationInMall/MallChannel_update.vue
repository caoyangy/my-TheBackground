<template>
  <div class="flex side_sdx ivuInput-box">
    <!--头部信息-->
    <div class="H_t flex side_sdx mainAlign_center">
      <div>
        <router-link class="colorCCC" to="/MallChannelList">首页 &nbsp;&nbsp; / &nbsp;&nbsp; 商城频道配置</router-link>&nbsp;&nbsp; /&nbsp;&nbsp;
        <router-link class="colorCCC blod" to="/MallChannelList">修改配置</router-link>
      </div>
    </div>
    <!-- 表单区域 -->
    <div class="list">
      <Form :model="supplierAddForm"  ref="supplierAddForm" :rules="supplierAddRules" :label-width="90">
        <Card style="width: 100%">
          <!-- <FormItem label="店铺名称" prop="ShopName">
            <Input :style="inputWid" v-model="supplierAddForm.ShopName" placeholder="店铺名称"></Input>
          </FormItem> -->
          <div class="title">
            频道基本信息
          </div>
           <FormItem label="频道名称：" prop="name">
            <Input :style="inputWid" v-model="supplierAddForm.name" placeholder="频道名称"></Input>
          </FormItem>
          <FormItem label="所在行："  prop="rowNum" style="width:300px;">
            <Select v-model="supplierAddForm.hid" size="small" style="width:300px" >
                <Option v-for="item in cityList" :value="item.id" :key="item.id" @click.native="Municipal(item.id)">{{ item.areaName }}</Option>
            </Select>
          </FormItem>
          <FormItem label="顺序：" prop="columnNum" style="width:300px;">
            <Select v-model="supplierAddForm.Lid" size="small" style="width:300px" >
                <Option v-for="item in region" :value="item.id" :key="item.id" @click.native="county(item.id)">{{ item.areaName }}</Option>
            </Select>
          </FormItem>
          <FormItem label="频道说明：" prop="channelExplain">
            <Input :style="inputWid" v-model="supplierAddForm.channelExplain "  placeholder="频道说明" ></Input>
          </FormItem>
          <FormItem label="展示图：" prop="displayPic">
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
              <div class="litimg">
                <img :src="supplierAddForm.displayPic" alt>
                <Icon class="upload_icon" type="ios-add"></Icon>
              </div>
              </Upload>
              <Input style="width: 0px" v-model="supplierAddForm.displayPic" class="aa"></Input>
               <div class="annotationText">限上传一张</div>
            
          </FormItem>
          <FormItem label="频道类型：" prop="returnAddress ">
               <RadioGroup v-model="supplierAddForm.type" @on-change="Channeltype">
                    <Radio label="0">
                        <Icon type="social-apple"></Icon>
                        <span>门店</span>
                    </Radio>
                    <Radio label="1">
                        <Icon type="social-android"></Icon>
                        <span>自营商品</span>
                    </Radio>
                </RadioGroup>
          </FormItem>
         <!-- <FormItem label="频道内容：" prop="goodsName" style="height:30px">
            <Input :style="inputWid" v-model="supplierAddForm.goodsName" prefix="ios-search" placeholder="搜索"> </Input><br>
          </FormItem> -->
        </Card>
        <div style="height:20px;"></div>
        <Card style="width: 100%">
            <div class="title">
              频道内容
            </div>
            <div class="content ">
                <div class="Moreadd">
                  <Button size="large" type="primary" @click="addMore">添加</Button>
                  <span>共{{selectionList.length}}条</span>
                </div>
                <div class="overflowY">
                    <div class=" Morecontent  flex mainAlign_around" v-for="(item,index) in selectionList">
                      <div>{{index+1}}</div>
                      <div v-if="updataType=='0'">{{item.storeInfo.name}}</div>
                      <div v-if="updataType=='1'">{{item.shopGoodsVO.goodsName}}</div>
                      <div v-if="updataType=='3'">{{item}}</div>
                      <!-- <div v-else>{{item.storeInfo.name}}</div> -->
                      <div ></div>
                      <div class="reout" @click="deleteMore(index)"><Icon type="md-close" /></Icon></div>
                  </div>
                </div>
<!--                 
                  <div class="More" @click="SeeMore">
                    查看更多
                  </div> -->
            </div>
        </Card>
        <div style="height:20px;"></div>
        <Card style="width: 100%">
            <div class="title">
              发布设置
            </div>
            <div class="Enable">
                <FormItem label="发布设置：" prop="returnAddress ">
                  <RadioGroup v-model="verticals" @on-change="Channeltime">
                        <Radio label="立即启用">
                            <Icon type="social-apple"></Icon>
                            <span>立即启用</span>
                        </Radio>
                        <Radio label="定时启用">
                            <Icon type="social-android"></Icon>
                            <span>定时启用</span>
                        </Radio>
                    </RadioGroup>
                    <DatePicker type="datetime" placeholder="请选择生效时间" v-model="supplierAddForm.openTime" style="width: 200px" @on-change="onOpenTime(supplierAddForm.openTime)"></DatePicker>
              </FormItem>
            </div>
              
         </Card> 
      </Form>
    </div>
    <div class="footer">
      <Button class="submission"   @click="add">提交</Button>
      <Button class="mar_l20 cancel"  @click="cancel">取消</Button>
    </div>
    <div class="hide flex sideAlign_center mainAlign_center" v-show="telshow">
			<div class="hide_d">
				<div class="flex main_ydz"><img src="../../assets/img/shut.png" class="cha" @click="shut"></div>
				<div class="hide_title">添加频道内容</div>
        <div class="allcont">
          <!-- <input type="text" v-model="searchIpt " placeholder="搜索门店/商品名称"> -->
          <Input placeholder="搜索门店/商品名称" style="width: auto" v-model="search">
            <Icon type="ios-search" slot="prefix" />
          </Input>
          <Button @click=" searchList "> 搜索 </Button>
          <div style="margin-top:20px">
            <!-- <CheckboxGroup v-model="checkAllGroup" v-if="supplierAddForm.type=='0'">
              <div v-for="(item,index) in listOrder" >
                <Checkbox :label="item.id" class="listOrder"  :title="item.name">{{item.name}}</Checkbox>
              </div>
            </CheckboxGroup>
            <CheckboxGroup v-model="checkAllGroup" @on-change="checkAllGroupChange(checkAllGroup)" v-else>
              <div v-for="(item,index) in listcommodity" >
                <Checkbox :label="item.id" class="listOrder" :title="item.goodsName">{{item.goodsName}}</Checkbox>
              </div>
            </CheckboxGroup> -->
            <div v-if="supplierAddForm.type=='0'">
              <div v-for="(item,index) in listOrder" >
                <div class="listOrder" :title="item.name" @click="checkAllGroupChange(item.id,item.name,index)">
                  <img class="imgOn" src="../../assets/img/deposit/select.png" v-if="item.isShow">
                  <img class="imgOn" src="../../assets/img/deposit/select_on.png" v-else>{{item.name}}</div>
              </div>
            </div>
            <div v-else>
              <div v-for="(item,index) in listcommodity" >
                <div class="listOrder" :title="item.name" @click="checkAllGroupChange(item.id,item.name,index)">
                  <img class="imgOn" src="../../assets/img/deposit/select.png" v-if="item.isShow">
                  <img class="imgOn" src="../../assets/img/deposit/select_on.png" v-else>{{item.name}}</div>
              </div>
            </div>
          </div>
        </div>
          <div class="list_data">
            <div class="list_data_b flex main_ydz">
              <!-- <Page :total="Page.total" :page-size="Page.pageSize" :current="Page.current"  @on-change="pageChange"></Page> -->
              <div  @click="pageChange" v-if="isshow">加载更多</div>
            </div>	
          </div>
				<div class="flex mainAlign_center">
					<input type="button" name="" id="" value="确定" class="btnsALL" @click="telrecheck" />
					<input type="button" name="" id="" value="取消" class="btnsALL" @click="shut" />
				</div>
			</div>
		</div>
  </div>
</template>
<script>
import moment from 'moment'
export default {
  data() {
    return {
      Total:"",//显示总条数
      openTime:"",
      isshow:false,
      checkAllGroup:[],//选中的id  list集合
      searchIpt:"",
      telshow:false,
      verticals: '立即启用',
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
          name:"",   //频道名称
          displayPic:'',//图片
          Channeltype: 0, //频道类型
          channelExplain: "", //频道说明
          rowNum: 0,  //所在行
          columnNum: 0,  //顺序
          type:"0",    //频道类型(0:教育 1:自营商品)
          itemIds:"",    //“频道内容”项的内容id集合（示例：[“56289455613213","56289455613213”]）
          openTime:"",//生效时间(选“立即启用”时传“0000-00-00 00:00:00”)
      }, 
      supplierAddRules: {
        name: [{ required: true, message: '1-16位数字、字母或汉字', trigger: 'blur' }],
        columnNum: [{ required: true, message: '省级区域不能为空', trigger: 'blur' }], 
        rowNum: [{ required: true, message: '市级区域不能为空', trigger: 'blur' }],
        channelExplain: [{ required: true, message: '选填，1-16位数字、字母或汉字', trigger: 'blur' }],  
        goodsName: [{ required: true, message: '搜索后点击添加，数量范围1-99', trigger: 'blur' }],
        displayPic:[{ required: true, message: '展示图不能为空', trigger: 'blur' }],
      },
       cityList:[
         {
           "areaName":"第一行",
           id:1
         },
         {
           "areaName":"第二行",
           id:2
         },
         {
           "areaName":"第三行",
           id:3
         },
         {
           "areaName":"第四行",
           id:4
         }
        ],//所在行数列表
        region:[
         {
           "areaName":"1",
           id:1
         },
         {
           "areaName":"2",
           id:2
         },
         {
           "areaName":"3",
           id:3
         },
         {
           "areaName":"4",
           id:4
         }
        ],//顺序列表
       Countytown:[],  //区列表
       vertical: '1',
       queryData: {
          address: "", //地址
          productName: "", //课程名称
          name: "", //店铺名称
          firstCategoryId: "" //经营品类
        },
        //分页
        Page: {
          total: 0,
          pageSize: 5,
          current: 1
        },
        listOrder:[], //门店列表
        listcommodity:[],//商品列表
        channelId:"",// 频道id
        selectionList:[], //选中商品列表
        updataType:"",
        checkAll:[],
        checkAllname:[],
        myUrl:"",
        search:"",
    };
  },
  created(){
    this.myUrl=this.$myUrl+"/uploadImg"
    this.userid = localStorage.getItem("userid");
    this.token = localStorage.getItem("token");
    this.channelId=this.$route.query.id
    this.allList(this.$route.query.id)
    // this.storeList()
  },
  methods: {
    //时间戳转换时间格式
  add0(m){return m<10?'0'+m:m },
   formatTime(shijianchuo){
      //shijianchuo是整数，否则要parseInt转换
      var time = new Date(shijianchuo);
      var y = time.getFullYear();
      var m = time.getMonth()+1;
      var d = time.getDate();
      var h = time.getHours();
      var mm = time.getMinutes();
      var s = time.getSeconds();
      return y+'-'+add0(m)+'-'+add0(d)+' '+add0(h)+':'+add0(mm)+':'+add0(s);
    },
    //获取返回数据信息
    allList(id){ 
      this.$API(
        "post",
        "channel/queryDetail?channelId="+id,
        {},
        this.userid,
        this.token,
        res => {
          var timestamp = Date.parse(new Date());
          var data= res.data.data;
          console.log(data)
          console.log(timestamp,data.openTime)
          if(timestamp>=data.openTime){
              this.verticals="立即启用"
              this.supplierAddForm.openTime=""
              console.log(this.supplierAddForm.openTime)
          }else{
            this.verticals="定时启用"
            this.supplierAddForm.openTime= moment(data.openTime).format('YYYY-MM-DD HH:mm:ss')
            console.log(this.supplierAddForm.openTime)
          }
          this.supplierAddForm.name=data.name
          this.supplierAddForm.displayPic=data.displayPic
          this.supplierAddForm.channelExplain=data.channelExplain
          this.supplierAddForm.rowNum=data.rowNum
          this.supplierAddForm.columnNum=data.columnNum
          console.log(data)
          if(data.type){
            this.supplierAddForm.type="1"
          }else{
            this.supplierAddForm.type="0"
          }
          
          this.supplierAddForm.hid=data.rowNum
          this.supplierAddForm.Lid=data.columnNum
          this.selectionList=data.channelGoodsVOs
          console.log(data.channelGoodsVOs)
          this.Total=data.channelGoodsVOs.length
          this.updataType=data.type
          console.log(data.type)
          if(data.type){
            console.log()
            for(var i=0;i<data.channelGoodsVOs.length;i++){
              this.checkAllGroup.push(data.channelGoodsVOs[i].goodsId)
              console.log(this.checkAllGroup)

            }
          }else{
            for(var i=0;i<data.channelGoodsVOs.length;i++){
              this.checkAllGroup.push(data.channelGoodsVOs[i].shopId)
              console.log(this.checkAllGroup)
            }
          }
          
          this.telrecheck()
          this.Page.total = res.data.data.count;
          if(this.Page.total/5 >= this.Page.current){
            this.isshow=true
          }else{
            this.isshow=false
          }
        }
      );
    },
    //门店列表
    storeList(){
        const params = {
        name:this.search,
        currentPage: this.Page.current,
        pageSize: this.Page.pageSize
      };
      //获取列表
      this.$API(
        "post",
        "productInfo/backgroundFindAllStores",
        params,
        this.userid,
        this.token,
        res => {
          var data= res.data.data.list;
          console.log(data)
          for(var i=0;i<data.length;i++){
            data[i].isShow=false
            this.listOrder.push(data[i])
            for(var y=0;y<this.checkAllGroup.length;y++){
                if(this.checkAllGroup[y]==this.listOrder[i].id){
                  this.listOrder[i].isShow=true
                }
            }   
          }
          for(var i=0;i<this.listOrder.length;i++){
            for(var y=0;y<this.checkAllGroup.length;y++){
                if(this.checkAllGroup[y]==this.listOrder[i].id){
                  this.listOrder[i].isShow=true
                }
            }   
          }
          console.log(this.listOrder)
          this.Page.total = res.data.data.count;
          if(this.Page.total/5 >= this.Page.current){
            this.isshow=true
          }else{
            this.isshow=false
          }
        }
      );
    },
    //自营商品名称列表
    commodityList() {
      if( this.verticals=="立即启用"){
          this.supplierAddForm.openTime="0000-00-00 00:00:00"
      }        
      const params = {
        goodsName:this.search,
        currentPage: this.Page.current,
        pageSize: this.Page.pageSize
      };
      this.$APIMy(
        "post",
        "goods/getVoListWithSpecVo",
        params,
        "",
        "",
        // this.userid,
        // this.token,
        res => {
          var data = res.data.data.goodsList;
          console.log(data)
          for(var i=0;i<data.length;i++){
            data[i].isShow=false
            data[i].name=res.data.data.goodsList[i].goodsName
            this.listcommodity.push(data[i])
          }
           for(var i=0;i<this.listcommodity.length;i++){
            for(var y=0;y<this.checkAllGroup.length;y++){
                if(this.checkAllGroup[y]==this.listcommodity[i].id){
                  this.listcommodity[i].isShow=true
                }
            } 
          }
          console.log(this.listcommodity)
          this.Page.total = res.data.data.count;
          if(this.Page.total/5 >= this.Page.current){
            this.isshow=true
          }else{
            this.isshow=false
          }
        },
        res => {
          this.$Message.warning(res);
        },
        res => {
          this.$Message.error(res);
        }
      );
    },
    // 转化发送数据
    changeFormDate() {
      // this.shopid()
      const formdatas = { ...this.supplierAddForm };
      delete formdatas.createTime;
      delete formdatas.updateTime;
      delete formdatas.addressCityName;
      delete formdatas.addressProvinceName;
      delete formdatas.addressRegionName;
      delete formdatas.id;
      delete formdatas.nature;
      delete formdatas.status;
      return formdatas;
    },
    add(){
      if( this.verticals=="立即启用"){
          this.supplierAddForm.openTime="0000-00-00 00:00:00"
      } else{
        this.supplierAddForm.openTime=moment(this.supplierAddForm.openTime).format('YYYY-MM-DD HH:mm:ss')
      }
            const params = {
              ...this.supplierAddForm,
            };
            console.log( this.supplierAddForm.itemIds)
            var data = "";
            for (var i in params) {
              data +=
                encodeURIComponent(i) + "=" + encodeURIComponent(params[i]) + "&";
            }
            data = data.slice(0, -1);
            console.log(params)
            console.log(data)
            console.log( data)
            this.$API( 
              "post",
              "channel/update?id="+this.channelId+"&"+data,
              {},
              this.userid,
              this.token,
              res => {
                this.$router.push({ path: "/MallChannelList" });
              },
              res =>{
                this.$Message.warning(res.data.message)
              },
              res =>{
                this.$Message.error(res.data.message)
              }
          );
          
      
    },
    record(i) {
      this.i = i;
    },
    // 参数缩略图上传成功
    specGoodsImgSuccess(res, file) {
      console.log(res.data);
      let i = this.i;
      this.supplierAddForm.attributeList[i].displayPic =
        res.data.url;
    },
    // 商品缩略图上传成功
    goodsImgSuccess(res) {
      console.log(res.data);
      this.supplierAddForm.displayPic = res.data.url;
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
    //省级点击
    Municipal(id){
      // this.siteLIst(id,num)
      console.log(id)
      this.supplierAddForm.rowNum=id
    } ,
    //市级点击
    county(id){
      // this.siteLIst(id,num)
      this.supplierAddForm.columnNum=id
    } ,
    // 取消
    cancel(){
        this.$refs.supplierAddForm.resetFields();
        this.$router.push({ path: '/MallChannelList' })
    },
    
    Channeltype(e){
      this.checkAllGroup=[]
        console.log(e)
        if(e=="0"){
            this.supplierAddForm.type=0
            console.log(this.supplierAddForm.Channeltype)
        }else{
           this.supplierAddForm.type=1
           console.log(this.supplierAddForm.Channeltype)
        }
    },
    //删除内容
    deleteMore(e){
      this.selectionList.splice(e,1)
      this.checkAllGroup.splice(e,1)
    },
    //添加内容
    addMore(){
      this.listOrder=[]
      this.listcommodity=[]
      this.Page.current=1
      this.telshow=true
      if(this.supplierAddForm.type=="0"){
        this.storeList()
      }else{
        this.commodityList()
      }
    },
     //查看更多
    SeeMore(){

    },
    //关闭模态框
    shut(){
      this.Page.current=1
      this.search=""
      this.telshow=false
      this.listOrder=[];
      this.listcommodity=[];
    },
    //搜索频道内容
    searchList(){
        if(this.supplierAddForm.type=="0"){
        this.listOrder=[]
        this.storeList()
      }else{
        this.listcommodity=[]
        this.commodityList()
      }
    },
    //提交搜索内容
    telrecheck(){ 
      this.search=""
      if(this.checkAll.length != 0){
        this.checkAllGroup=this.checkAll
        this.updataType='3'
        this.selectionList=this.checkAllname
      }
      console.log(this.selectionList)
      var aa = new String();
      for(var i = 0; i < this.checkAllGroup.length; i++) {
        aa += '"' + this.checkAllGroup[i] + '"'
        if (i < this.checkAllGroup.length - 1) {
          aa += ',';
        }
      }
      this.supplierAddForm.itemIds="[" +aa+"]"
      console.log(this.supplierAddForm.itemIds)
      // this.checkAllGroup=[]
      this.telshow=false
      this.checkAllname=[]
    },
    //选择项
    checkAllGroupChange(id,item,index){
      if(this.supplierAddForm.type=='0'){
          this.listOrder[index].isShow=!this.listOrder[index].isShow
        }else{
          this.listcommodity[index].isShow=!this.listcommodity[index].isShow
        }
         this.checkAllname=[]
         this.checkAll=[]
          var item
          if(this.supplierAddForm.type=='0'){
            // this.checkAllname.push(this.listOrder[index].name)
              for(var i=0;i<this.listOrder.length;i++){
                if(this.listOrder[i].isShow==true){
                  this.checkAll.push(this.listOrder[i].id)
                  // this.checkAllname.push(this.listOrder[index].name)
                  this.checkAllname.push(this.listOrder[i].name)
                }
              }
          }else{
            // this.checkAllname.push(this.listcommodity[index].name)
            for(var i=0;i<this.listcommodity.length;i++){
                if(this.listcommodity[i].isShow==true){
                  this.checkAll.push(this.listcommodity[i].id)
                  this.checkAllname.push(this.listcommodity[i].name)
                }
              }
          }
    },
    // 分页操作
    pageChange() {
      var num=this.Page.current
      num++;
      this.Page.current= num;
      if(this.supplierAddForm.type=="0"){
          this.storeList()
        }else{
          this.commodityList()
        }
    },
    Channeltime(e){
      console.log(e)
      if(e=="立即启用"){
        this.supplierAddForm.openTime=""
      }else{
        this.supplierAddForm.openTime=moment(this.openTime).format('YYYY-MM-DD HH:mm:ss')
      }
      console.log(this.supplierAddForm.openTime)
    },
    //日期格式
    onOpenTime(e){
      this.supplierAddForm.openTime=moment(e).format('YYYY-MM-DD HH:mm:ss')
      console.log(this.supplierAddForm.openTime)
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
  margin-bottom: 20px
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
.litimg {
  width: 60px;
  height: 60px;
  border: 1px solid #e9eaec;
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
.aa{
    width: 0px;
    margin: 0;
    padding: 0;
    height: 0;
    display: none;
}
.title{
  background-color: #ccc;
  height: 40px;
  line-height: 40px;
  font-size: 14px;
}
.content{
  margin: 10px;
}
.Moreadd{
  border-bottom: 1px solid #333;
  padding: 10px 5px;
}
.Morecontent{
  height: 50px;
  line-height: 50px;
  border-bottom: 1px solid #333;
}
.Morecontent div:nth-child(1){
 float: left;
 width: 50px;
}
.Morecontent div:nth-child(2){
  width: 100%;
}
.Morecontent div:nth-child(3){
  width: 50px;
  float: right;
}
.More{
  text-align: center;
  height: 50px;
  line-height: 50px;
  }
  .reout{
    font-size: 30px
  }
  .Enable{
    padding: 20px 0px ;
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
		width: 600px;
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
		font-size: 14px;
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
    .textarea{
        width: 400px;
        height: 80px;
    }
    .allcont{
      height: 200px;
      padding:20px;
      border-top: 1px solid #333;
      border-bottom: 1px solid #333;
      margin: 10px 0px;
      overflow-y: scroll;
    }
    .listOrder{
      width: 100%;
      height: 20px;
      overflow: hidden;
    }
    .overflowY{
      max-height: 500px;
      overflow-y:scroll;
    }
     .listOrder{
      width: 100%;
      height: 20px;
      overflow: hidden;
    }
    .overflowY{
      max-height: 500px;
      overflow-y:scroll;
    }
    .imgOn{
      width: 13px;
      height: 13px;
      display: inline;
      margin-right: 5px;
    }
</style>


