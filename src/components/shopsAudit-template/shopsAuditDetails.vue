<template>
	<div class="flex side_sdx wary">
		
		<!--头部信息-->
		<div class="H_t flex side_sdx mainAlign_center">
			<div>详情</div>
			<div>
                <router-link class="colorCCC " to="/shopsAudit">入驻中心</router-link>
                &nbsp;&nbsp; /&nbsp;&nbsp; 
                <router-link class="colorCCC " to="/shopsAudit">商家资质审核</router-link> 
				&nbsp;&nbsp; /&nbsp;&nbsp; 
                <router-link class="colorCCC blod" to="/shopsAudit">详情</router-link>
            </div>
		</div>
		<!--tab切换-->
		<div class="tab flex main_zdy sideAlign_center">
			<a v-for="(item,index) in tab" :key="index" :class="tabname == item?'tab_don' :'tab_d'" @click="tabon(item,'#shopAudit'+index)">
				<div>{{item}}</div>
			</a>
		</div>
		<!--订单资料-->
		<div class="OrderDetails flex main_zdy" id="shopAudit0">
			<div class="OrderDetails_l flex side_sdx">
				<div class="headline">文本信息</div>
				<div class="flex side_sdx mainAlign_between" style="height: 100%;padding-top: -45px;">
					<div style="border-top:none" class="message">
						<div > 申请人手机号：<span class=" font_blod "> 12321321312 </span>  </div>
						<div>门店名称：{{storeInfo.name}}</div>
						<div>所在城市：{{storeInfo.province}}</div>
						<div>门店地址：{{storeInfo.address}}</div>
						<div>实际定位地址：</div>
						<div>门店电话：{{storeInfo.tel}}</div>
						<div>经营品类：{{storeInfo.categoryName}}</div>
						<div>课程价格：{{storeInfo.priceRange}}</div>
					</div>
					<div class="message">
						<div>法人姓名：{{details.operator}}</div>
						<div>身份证号：{{details.idcard}}</div>
						<div>法人手机号：{{details.phone}}</div>
					</div>
					<div class="message">
						<div>营业执照注册号：{{details.regNo}} </div>
						<div>执照名称：{{details.businessLicenseName}}</div>
						<div>法人姓名：{{details.corporation}}</div>
						<div v-if='details.businessLicenseDate == "1111-11-11"'>有效期限：长期有效 </div>
						<div v-if='details.businessLicenseDate != "1111-11-11"'>有效期限：{{details.businessLicenseDate}} </div>
					</div>
					<!--<div class="message">
					<div>开户许可证：111111111111</div>
					<div>机构信用代码：11111111111</div>
				</div>-->
					<div class="message">
						<div>经营用地：{{details.placeType}}</div>
						<div>品牌：{{details.brandType}}</div>
					</div>
					<div class="message">
						<div>业务负责人：{{details.charger}}</div>
						<div>手机号：{{details.chargerPhone}}</div>
						<div>推荐人：{{details.referee}}</div>
						<div>手机号：{{details.refereePhone}}</div>
					</div>
				</div>
			</div>
			<div class="OrderDetails_r">
				<div class="headlines">门店展示</div>
				<div class="picture flex main_zdy">
					<div class="pictureimg" @click="imgon(storeInfo.headImageUrl)">
						<img :src="storeInfo.headImageUrl" alt="" :onerror="onerror" />
						<div>门头图</div>
					</div>

					<div class="pictureimg" @click="imgon(storeInfo.cashierUrl)">
						<img :src="storeInfo.cashierUrl" :onerror="onerror"/>
						<div>收银台</div>
					</div>

					<div class="pictureimg" @click="imgon(storeInfo.productUrl)">
						<img :src="storeInfo.productUrl" :onerror="onerror"/>
						<div>教育产品</div>
					</div>

					<div class="pictureimg" @click="imgon(storeInfo.officeUrl)">
						<img :src="storeInfo.officeUrl" :onerror="onerror"/>
						<div>办公照片</div>
					</div>
				</div>

				<div class="headlines">身份证信息</div>
				<div class="picture flex main_zdy">
					<div class="pictureimg" @click="imgon(details.idcardFrontUrl)">
						<img :src="details.idcardFrontUrl" :onerror="onerror"/>
						<div>身份证正面</div>
					</div>

					<div class="pictureimg" @click="imgon(details.idcardBackUrl)">
						<img :src="details.idcardBackUrl" :onerror="onerror"/>
						<div>身份证反面</div>
					</div>

				</div>

				<div class="headlines">营业相关</div>
				<div class="picture flex main_zdy">
					<div class="pictureimg" @click="imgon(details.businessLicenseUrl)">
						<img :src="details.businessLicenseUrl" :onerror="onerror"/>
						<div>营业执照</div>
					</div>

					<div class="pictureimg" @click="imgon(details.institutionalCreditCodeCertificate)">
						<img :src="details.institutionalCreditCodeCertificate" :onerror="onerror"/>
						<div>机构信用代码证</div>
					</div>

					<div class="pictureimg" @click="imgon(details.accountLicenseUrl)">
						<img :src="details.accountLicenseUrl" :onerror="onerror"/>
						<div>开户许可证</div>
					</div>

				</div>

				<div class="headlines">经营用地相关</div>
				<div class="picture flex main_zdy">

					<div  v-if="details.placeType == '自有'" class=" flex main_zdy">
						<div class="pictureimg" v-for='(item,index) in placeimg' :key="index">
							<img :src="item" @click="imgon(item)" :onerror="onerror"/>
							<div>房产证</div>
						</div>
					</div>

					<div  v-if="details.placeType == '租赁'" class=" flex main_zdy">
						<div class="pictureimg" v-for='(item,index) in placeimg' :key="index">
							<img :src="item" @click="imgon(item)" :onerror="onerror"/>
							<div>租赁合同</div>
						</div>
					</div>

				</div>

				<div class="headlines">品牌相关</div>
				<div class="picture flex main_zdy">
					<div class="pictureimg" @click="imgon(details.brandLogoUrl)">
						<img :src="details.brandLogoUrl" :onerror="onerror"/>
						<div>品牌商标</div>
					</div>

					<div class="pictureimg" v-for="(item,index) in brandimg" :key="index">
						<img :src="item" @click="imgon(item)" :onerror="onerror"/>
						<div>加盟合同</div>
					</div>

				</div>
			</div>
		</div>

		<!-- 存管账户 -->

		<!--<div class="three">
			<div class="headline  flex main_zdy sideAlign_center">
				存管账户
				<div class="phone">开户处理中</div>
			</div>
			<div class="cg_account textarea_c">

				<div>
					<h5>企业信息</h5>
					<ul>
						<li>企业名称：<span></span></li>
						<li>角色身份：<span></span></li>
						<li>法人代表姓名：<span></span></li>
						<li>证件类型：<span></span></li>
						<li>法人代表证件号：<span></span></li>
						<li>企业联系人姓名：<span></span></li>
						<li>企业联系人手机号： <span></span></li>
					</ul>
				</div>

				<div>
					<h5>银行账号信息</h5>
					<ul>
						<li>银行卡号：<span></span></li>
						<li>银行开户城市：<span></span></li>
						<li>支行信息：<span></span></li>
						<li>证件类型：<span></span></li>
						<li>联系人手机号： <span></span></li>
					</ul>
				</div>

				<div>
					<h5>业务授权</h5>
					<ul>
						<li>业务授权：<span></span></li>
						<li>授权金额：<span></span></li>
						<li>授权期限：<span></span></li>
					</ul>
				</div>
			</div>
			
		</div>-->

		<!--第三方-->
		
		<div class="three" id="shopAudit1">
			<div class="headline">第三方</div>
			<div class="textarea_c">
				<textarea name="" rows="6" cols="" placeholder="内容" @blur.prevent="changeCount(threeinput)" v-model="threeinput"></textarea>
			</div>
			<div class="textarea_c">
				<!-- <Upload 
					class="width_25"
					:on-success="uploadImages"
					action="https://mgmall.huanyueguoji.com/mall_api/uploadImg"
					:format="['jpg','jpeg','png']"
				>
					<Button class="upload_btn"  type="default" >上传图片</Button>
				</Upload> -->

				<div v-if="uploadStatus">
					<div  class="demo-upload-list" v-for="(item,index) in uploadList" :key="index">
						<template v-if="item.status === 'finished'">
							<img :src="item.response.data.url">
							<div class="demo-upload-list-cover">
								<Icon type="ios-eye-outline" @click.native="handleView(index)"></Icon>
								<Icon type="ios-trash-outline" @click.native="handleRemove(index)"></Icon>
							</div>
						</template>
						<template v-else>
							<Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
						</template>
					</div>

					<Upload
						v-show="uploadStatus"
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
						action="https://mgmall.huanyueguoji.com/mall_api/uploadImg"
						style="display: inline-block;width:58px;">
						<div style="width: 58px;height:58px;line-height: 58px;">
							<Icon type="ios-camera" size="20"></Icon>
						</div>
					</Upload>

				</div>

				<div v-else>
					 <div  class="demo-upload-list" v-for="(item,index) in otherAuthUrl" :key="index">
							<img :src="item">
							<div class="demo-upload-list-cover">
								<Icon type="ios-eye-outline" @click.native="handleView(index)"></Icon>
							</div>
						<template>
							<Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
						</template>
					</div>

					<Upload
						v-show="uploadStatus"
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
						action="https://mgmall.huanyueguoji.com/mall_api/uploadImg"
						style="display: inline-block;width:58px;">
						<div style="width: 58px;height:58px;line-height: 58px;">
							<Icon type="ios-camera" size="20"></Icon>
						</div>
					</Upload>

				</div>
				
				
					<Modal v-model="visible"  >
						<img :src="imgName"  v-if="visible"  style="width: 100%">
					</Modal>
			</div>
		</div>	
		<!-- https://mangomall-1.oss-cn-beijing.aliyuncs.com/image/3041dbcb69af44e5b5f93744b11599a1.jpg -->

		<!--电核-->
		<div class="tel" id="shopAudit2">
			<div class="headline flex main_zdy sideAlign_center">
				电话核实
				<div class="phone" @click="telon">拨打电话</div>
			</div>
			<div class="tel_d">
				<div class="tel_t flex main_zdy sideAlign_center">
					<div>时间</div>
					<div>操作人</div>
					<div>内容</div>
				</div>
				<div class="tel_l flex main_zdy sideAlign_center" v-for='(item,index) in telList' :key="index">
					<div>{{item.createDate}}</div>
					<div>{{item.createBy}}</div>
					<div>{{item.remark}}</div>
				</div>
			</div>
		</div>

		<!--订单日志-->
		<div id="shopAudit3" class="log">
			<div class="headline">订单日志</div>
			<div class="log_V">
				<div class="log_d flex main_zdy sideAlign_center">
					<div>时间</div>
					<div>操作人</div>
					<div>操作类型</div>
					<div>建议额度</div>
					<div>备注</div>
				</div>
				<div class="log_dd flex main_zdy sideAlign_center" v-for='(item,index) in logList' :key="index">
					<div>{{item.createDate}}</div>
					<div> {{ item.createBy }} </div>
					<div> {{item.type}} </div>
					<div>{{item.creditLine}}</div>
					<div>{{item.note}}</div>
				</div>
			</div>
		</div>
		<!--初审-->
		<div id="shopAudit4"  class="hide flex sideAlign_center mainAlign_center" v-if="firstshow">
			<div class="hide_d">
				<div class="flex main_ydz"><img src="../../assets/img/shut.png" class="cha" @click="shut"></div>
				<div v-if="first == '1003' " class="hide_title">初审通过</div>
				<div v-if="first == '1007' " class="hide_title">初审拒绝</div>
				<div v-if="first == '1006' " class="hide_title">初审驳回</div>
				<div v-if="first == '1004' " class="hide_title">初审存疑</div>
				<input type="text" placeholder="建议额度" class="limit" v-if='first == "1003"' ref='firstlimit' onkeyup="value=value.replace(/[^\d]/g,'') " ng-pattern="/[^a-zA-Z]/" />
				<textarea name="6" rows="4" cols="" placeholder="请填写原因" ref='firstcause'></textarea>
				<div class="flex mainAlign_center">
					<input type="button" name="" id="" value="提交" class="btns" @click="firstpresent" onkeyup="value=value.replace(/[^\d]/g,'') " ng-pattern="/[^a-zA-Z]/" />
					<input type="button" name="" id="" value="取消" class="btns" @click="shut" />
				</div>
			</div>
		</div>

		<!--复审-->
		<div class="hide flex sideAlign_center mainAlign_center" v-if="againshow">
			<div class="hide_d">
				<div class="flex main_ydz"><img src="../../assets/img/shut.png" class="cha" @click="shut"></div>
				<div v-if="again == '1010' " class="hide_title">复审通过</div>
				<div v-if="again == '1008' " class="hide_title">复审驳回</div>
				<div v-if="again == '1005' " class="hide_title">复审打回</div>
				<div v-if="again == '1009' " class="hide_title">复审拒绝</div>
				<div class="limit_parent" v-if="flage">
					<input type="text" placeholder="建议额度" class="limit" v-if='again == "1010"' ref='againlimit' /> <span>元</span>
				</div>
				<div  class="limit_parent" v-if="flage">
					<input type="text" placeholder="商家承担月利率" class="limit margin_b_none " v-if='again == "1010"' @blur="PercentBlur" ref='againPercent' /><span>%</span>
				</div>
				<div class="clear" v-if="flage"></div>
				<div class="percent_msg" v-if="flage">每笔课程款中商家支出的服务费和补贴占总金额的比例</div>
				<div v-if="flage" class="select_brank">
					<div>选择存管银行</div>
					<div> <Icon class="icon_yes" type="md-checkmark-circle" size="20" color="#52B095"  /> </div>
					<div> <img src="../../assets/img/shopManagement/zhongbanglogo.png" alt=""> </div>
					<div>众邦银行</div>
				</div>
				<textarea name="6" rows="4" cols="" placeholder="请填写原因" ref='againcause'></textarea>
				<!-- <div class="select-caifu">

					<p>请选择资金平台(必选) ： </p>

					<label for="huanYueGuoJi">
						 寰玥国际
                        <input type="radio" id="huanYueGuoJi" name="selectCaiFu" value="1" v-model="selectCaiFu">
					</label>
					
					<label for="huanYueCaiFu">
						 寰玥财富
                        <input type="radio" id="huanYueCaiFu" name="selectCaiFu" value="2" v-model="selectCaiFu">
					</label>
	
				</div> -->
				<div class="flex mainAlign_center">
					<input type="button" name="" id="" value="提交" class="btns" @click="recheck" />
					<input type="button" name="" id="" value="取消" class="btns" @click="shut" />
				</div>
			</div>
		</div>

		<!--打电话-->
		<div class="hide flex sideAlign_center mainAlign_center" v-show="telshow">
			<div class="hide_d">
				<div class="flex main_ydz"><img src="../../assets/img/shut.png" class="cha" @click="shut"></div>
				<div class="hide_title">请输入通话内容</div>
				<textarea name="6" rows="4" cols="" placeholder="填写拨打电话原因" ref='telcontent'></textarea>
				<div class="flex mainAlign_center">
					<input type="button" name="" id="" value="提交" class="btns" @click="telrecheck" />
					<input type="button" name="" id="" value="取消" class="btns" @click="shut" />
				</div>
			</div>
		</div>

		<!--图片-->
		<div class="hide flex side_sdx sideAlign_center mainAlign_center" v-show="imgshow">
			<div class="flex main_ydz" style="width: 50%;margin-bottom: 10px;"><img src="../../assets/img/shut.png" class="cha" @click="shut"></div>
			<img :src="imgurl" alt="" class="imgurl" />
		</div>

		<!--初审建议-->
		<div class="suggest" v-if="type == '待初审'" id="shops3">
			<div class="headline"> 初审建议 </div>
			<div class="suggest_d flex sideAlign_center mainAlign_center">
				<div @click="pass">通过</div>
				<div @click="reject">驳回</div>
				<div @click="refuse">拒绝</div>
				<div @click="impeach">存疑</div>
			</div>
		</div>

		<!--复审建议-->
		<div class="suggest" v-if="type == '待复审'" id="shops3">
			<div class="headline">复审建议</div>
			<div class="suggest_d flex sideAlign_center mainAlign_center">
				<div @click="pass(true)">通过</div>
				<div @click="reject">驳回</div>
				<div @click="refuse">拒绝</div>
				<div @click="impeach">打回</div>
			</div>
		</div>
		<Button @click="infos(false)" v-show="false"></Button>
	</div>
</template>

<script>
	import { BaseUrl,API } from '../../Baseurl/common.js';
	import uploadVue from '../upload.vue';
	export default {
		components: {
			uploadVue
		},
		data() {
			return {
				onerror:'this.src="' + require('../../assets/img/img.png') + '"',
				tab: ['订单资料', '第三方', '电核', ''],
				tabname: '订单资料',
				show: true,
				id: '',
				details: [], //列表数据
				storeInfo:[],
				token: '',
				userid: '',
				content: '', //提示内容
				telList: [], //电话列表
				logList: [], //日志查询
				type: '', //状态
				Idjustimg: '', //身份证正img
				Idversaimg: '', //身份证反img
				charterimg: '', //营业执照
				institutionimg: '', //机构
				Openimg: '', //开户
				brandimg: [], //品牌合同
				placeimg: [], //经营场所
				firstshow: false, //初审
				first: '', //初审
				againshow: false, //复审
				again: '', //复审
				telshow: false, //电话show
				imgshow: false, //图片的show
				imgurl: '',
				threeinput: '',
				otherAuthUrl: [],
				storeId : '',
				selectCaiFu : 1, //寰玥财富和国际选择
				flage:false ,// 判断银行是否显示
				PercentNum:0 ,// 百分比值

				defaultList: [],
                imgName: '',
                visible: false,
				uploadList: [],
				uploadStatus:false,
			}
		},
		created() {
			var href = window.location.href;
			localStorage.setItem('href',href);
			this.id = this.$route.query.id;
			this.type = unescape(this.$route.query.type);
			this.token = localStorage.getItem('token');
			this.userid = localStorage.getItem('userid');
			
			if(this.type == '待初审') {
				this.tab[3] = '初审'
			} else if(this.type == '待复审') {
				this.tab[3] = '复审'
			}

			//获取数据列表
			API('post','examine/findByEntity',{
				id: this.id
			},this.userid,this.token,(res)=>{
				console.log(res)
				var resData = res.data.data.list[0];
				console.log( '图片列表2' , resData )
				this.details = res.data.data.list[0];
				this.storeId = resData.storeId;
				this.storeInfo = resData.storeInfo;
				if(resData.brandUrl != ''){
					this.brandimg=resData.brandUrl.split(',')
				}else{
					this.brandimg=[]
				}
				if(resData.placeUrl != ''){
					this.placeimg=resData.placeUrl.split(',')
				}else{
					this.placeimg=[]
				}
			})

			//电话的核实
			API('post','phoneLog/findByEntity',{
				examineId: this.id
			},this.userid,this.token,(res)=>{
				this.telList = res.data.data.list;
			})

			//订单日志
			API('post','examineLog/findByEntity',{
				examineId: this.id
			},this.userid,this.token,(res)=>{
				this.logList = res.data.data.list;
				console.log( this.logList )
			})

			//第三方img
			API('post','examine/findByEntity',{
				examine : this.id,
				id:this.id
			},this.userid,this.token,(res)=>{
				this.otherAuth = res.data.data.list[0].otherAuth;
				if(res.data.data.list[0].otherAuthUrl){
					this.otherAuthUrl = JSON.parse(res.data.data.list[0].otherAuthUrl)
					this.uploadStatus = false
				}else {
					this.uploadStatus = true
				}
			})
		},
		mounted () {
            this.uploadList = this.$refs.upload.fileList;
        },
		beforeDestroy(){
			localStorage.setItem('imgurl','')
		},
		methods: {
			//第三方
			changeCount: function(e) {
				this.threeinput = e;
			},
			//tab
			tabon: function(e,ele) {
				this.tabname = e;
				document.querySelector(ele).scrollIntoView(true); 
			},
			infos(nodesc) {
				this.$Notice.info({
					desc: nodesc ? '' : this.content
				});
			},
			//图片
			imgon: function(e) {
				this.imgshow = !this.imgshow;
				this.imgurl = e;
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

			//上传图片
			uploadImages : function (res, file) {
				this.otherAuthUrl.push(res.data.regUrl)
			},

			//通过
			pass: function(flage) {
				if(this.type == '待初审') {
					this.first = '1003';
					this.firstshow = true;
				} else if(this.type == '待复审' && flage) {
					this.again = '1010';
					this.againshow = true;
					this.flage = true;
				}

			},
			//驳回
			reject: function() {
				if(this.type == '待初审') {
					this.first = '1006';
					this.firstshow = true;
				} else if(this.type == '待复审') {
					this.again = '1008';
					this.againshow = true;
					this.flage = false;
				}
			},
			//拒绝
			refuse: function() {
				if(this.type == '待初审') {
					this.first = '1007';
					this.firstshow = true;
				} else if(this.type == '待复审') {
					this.again = '1009';
					this.againshow = true;
					this.flage = false;
				}
			},
			//存疑
			impeach: function() {
				if(this.type == '待初审') {
					this.first = '1004';
					this.firstshow = true;
				} else if(this.type == '待复审') {
					this.again = '1005';
					this.againshow = true;
					this.flage = false;
				}
			},
			//关闭提示框
			shut: function() {
				this.firstshow = false;
				this.againshow = false;
				this.telshow = false;
				this.imgshow = false;
			},
			//提交数据
			//初审

			firstpresent: function() {
				if(this.first == '1003') {
					var limit = this.$refs.firstlimit.value;
				}
				var cause = this.$refs.firstcause.value;
				if(cause != '') {
					//状态提交
						API('post','examineLog/create',{
							examine: {
								id: this.id,
								otherAuth: this.threeinput,
								otherAuthUrl:this.otherAuthUrl,
								status: this.first,
								storeId : this.storeId ,
							},
							examineId: this.id,
							note: cause,
							creditLine: limit,
							sign: this.first,
							type: this.first,
							// rate : "",
							createBy: this.userid
						},this.userid,this.token,(res)=>{
							this.content = res.data.message;
							this.infos();
							this.firstshow = false;
							this.$router.push({
								path: '/shopsAudit',
							})
						},(res)=>{
							this.content = res.data.message;
					        this.infos();
						})

				} else {
					this.content = "电话内容不能为空"
					this.infos();
				}
			},
			// 百分比值判断
			PercentBlur: function () {
				var Percent = this.$refs.againPercent.value*1; // 扣费占比
				if( Percent >0 && Percent <= 100 ){
					 this.PercentNum = Percent;
				}else{
					this.content = "输入的值为 0-100"
					this.infos();
					this.$refs.againPercent.value = ''
				}
			},
			//复审
			recheck: function() {
				if(this.again == '1010') {
					var limit = this.$refs.againlimit.value; // 授信额度
				}
				
				var cause = this.$refs.againcause.value;
				if(cause != '' || this.selectCaiFu != 1) {
					//状态提交
						API('post','examineLog/create',{
							examine: {
								id: this.id, // orderId
								otherAuth: this.threeinput, //第三方内容
								otherAuthUrl: this.otherAuthUrl, //图片路径
								status: this.again, // 状态 1010
								storeId : this.storeId ,
							},
							examineId: this.id, // orderid
							note: cause, // 复审原因
							sign: this.again,
							type: this.again, // 状态1010
							createBy: this.userid,//userid
							p2pPlatformId : this.selectCaiFu, // 选择银行
							rate : 	this.PercentNum/100, //建议额度
							creditLine : limit, //授信额度
						},this.userid,this.token,(res)=>{
							this.content = res.data.message;
							this.infos();
							this.againshow = false;
							this.$router.push({
								path: '/shopsAudit',
							})

						},(res)=>{
							this.content = res.data.message;
					        this.infos();
						})

				} else {
					this.content = "内容或单选不能为空"
					this.infos();
				}
			},
			//打电话接口
			telon: function() {
				this.telshow = true
			},
			//添加电话记录
			telrecheck: function() {
				var telcontent = this.$refs.telcontent.value;
				var telUrl = BaseUrl + 'phoneLog/create?userId=' + this.userid + '&token=' + this.token 
				if(telcontent != '') {
					API('post','phoneLog/create',{
						examineId: this.id,
						createBy: this.userid,
						remark: telcontent
					},this.userid,this.token,(res)=>{
						location.reload();
					})
				} else {
					this.content = "电话内容不能为空"
					this.infos();
				}
			},

			//上传图片
			handleView (index) {
				this.visible = true;
				this.imgName = this.otherAuthUrl[index];
            },
            handleRemove (index) {
				console.log(index)
				this.uploadList.splice(index,1)
				this.otherAuthUrl.slice(index,1);
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
                const check = this.uploadList.length < 5;
                if (!check) {
                    this.$Notice.warning({
                        title: 'Up to five pictures can be uploaded.'
                    });
                }
                return check;
            }
		}
	}
</script>

<style scoped="scoped">
	.wary {
		overflow-y: auto;
		background: #F3F3F4;
	}
	
	.H_t {
		height: 70px;
		background: #fff;
		padding-left: 20px;
		border-bottom: 2px solid #E7EAEC;
	}
	
	.H_t div:nth-child(1) {
		height: 16px;
		font-size: 16px;
		font-family: PingFangSC-Regular;
		font-weight: 400;
		color: #686A6C;
		line-height: 16px;
	}
	
	.H_t div:nth-child(2) {
		height: 14px;
		font-size: 14px;
		line-height: 14px;
		font-family: PingFangSC-Regular;
		font-weight: 400;
		color: #686A6C;
		margin-top: 10px;
	}
	
	.H_t div:nth-child(2) span {
		color: #686A6C;
	}
	/*切换*/
	
	.tab {
		height: 66px;
		padding-left: 40px;
		background: #F3F3F4;
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
		color: #52B095;
		text-align: center;
		padding-bottom: 7px;
		border-bottom: 3px solid #51B095;
		box-sizing: border-box;
		cursor: pointer;
	}
	/*订单资质*/
	
	.OrderDetails {
		padding: 0 20px;
	}
	
	.OrderDetails_l {
		width: 370px;
		margin-right: 20px;
		border-top: 6px solid #E7EAEC;
		background: #fff;
	}
	
	.headline {
		height: 45px;
		padding-left: 20px;
		line-height: 45px;
		font-size: 16px;
		border-bottom: 1px solid #E7EAEC;
	}
	
	.message {
		padding-top: 20px;
		margin-left: 20px;
		margin-right: 20px;
		padding-bottom: 12px;
		border-top: 2px dashed #f3f3f4;
	}	
	.message:last-child {
		padding-bottom: 20px;
	}
	
	.message div {
		height: 14px;
		font-size: 14px;
		font-family: PingFangSC-Regular;
		font-weight: 400;
		line-height: 14px;
		color: #575757;
		margin-bottom: 14px;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	
	.message div:last-child {
		margin-bottom: 0;
	}
	
	.OrderDetails_r {
		width: 1270px;
		background: #fff;
	}
	
	.headlines {
		height: 51px;
		padding-left: 20px;
		line-height: 45px;
		font-size: 16px;
		border-bottom: 1px solid #E7EAEC;
		border-top: 6px solid #E7EAEC;
	}
	
	.picture {
		padding: 9px 0 7px 20px;
		margin-bottom: 20px;
	}
	
	.pictureimg {
		width: 120px;
		height: 76px;
		margin-right: 20px;
		position: relative;
		overflow: hidden;
	}
	
	.pictureimg img {
		width: 120px;
		height: 76px;
		display: block;
	}
	
	.pictureimg div {
		width: 100%;
		height: 22px;
		background: rgba(0, 0, 0, 0.6);
		font-size: 12px;
		font-family: PingFangSC-Regular;
		font-weight: 400;
		text-align: center;
		color: #fff;
		line-height: 22px;
		position: absolute;
		left: 0;
		bottom: 0;
	}
	/*第三方*/
	
	.three {
		border-top: 6px solid #E7EAEC;
		margin:  20px;
		background: #fff;
		padding-bottom: 20px;
	}
	
	.textarea_c {
		padding: 10px 20px 0 20px;
	}
	/*电核*/
	
	.tel {
		border-top: 6px solid #E7EAEC;
		margin: 0 20px 20px 20px;
		background: #fff;
	}
	
	.phone {
		width: 78px;
		height: 22px;
		line-height: 22px;
		font-size: 12px;
		font-family: PingFangSC-Regular;
		font-weight: 400;
		background: #52B095;
		border-radius: 4px;
		margin-left: 10px;
		color: #fff;
		text-align: center;
		cursor: pointer;
	}
	
	.tel_d {
		margin-bottom: 20px;
		margin-top: 20px;
	}
	
	.tel_t {
		height: 44px;
		margin: 0 20px;
		background: #F5F5F6;
	}
	
	.tel_t div {
		height: 44px;
		line-height: 44px;
		width: 33.333%;
		text-align: center;
		border: 1px solid #ddd;
		font-size: 14px;
		font-family: PingFangSC-Medium;
		font-weight: 500;
		color: #686A6C;
	}
	
	.tel_l {
		height: 40px;
		padding: 0 20px;
		background: #fff;
	}
	
	.tel_l div {
		height: 40px;
		line-height: 40px;
		width: 33.333%;
		text-align: center;
		border: 1px solid #E7EAEC;
		font-size: 14px;
		font-family: PingFangSC-Regular;
		font-weight: 400;
		color: #686A6C;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	/*订单日志*/
	
	.log {
		border-top: 6px solid #E7EAEC;
		margin: 0 20px 20px 20px;
		background: #fff;
	}
	
	.log_V {
		margin: 20px 0;
	}
	
	.log_d {
		height: 44px;
		margin: 0 20px;
		background: #F5F5F6;
	}
	
	.log_d div {
		height: 44px;
		line-height: 44px;
		width: 20%;
		text-align: center;
		border: 1px solid #ddd;
		font-size: 14px;
		font-family: PingFangSC-Medium;
		font-weight: 500;
		color: #686A6C;
	}
	
	.log_dd {
		height: 40px;
		padding: 0 20px;
		background: #fff;
	}
	
	.log_dd div {
		height: 40px;
		line-height: 40px;
		width: 20%;
		text-align: center;
		border: 1px solid #E7EAEC;
		font-size: 14px;
		font-family: PingFangSC-Regular;
		font-weight: 400;
		color: #686A6C;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	/*建议*/
	
	.suggest {
		border-top: 6px solid #E7EAEC;
		margin: 0 20px 20px 20px;
		background: #fff;
	}
	
	.suggest_d {
		height: 80px;
	}
	
	.suggest_d div {
		width: 90px;
		height: 38px;
		background: rgba(82, 176, 149, 1);
		border-radius: 4px;
		margin: 0 30px;
		text-align: center;
		line-height: 38px;
		font-size: 14px;
		font-family: PingFangSC-Regular;
		font-weight: 400;
		color: #fff;
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
		font-size: 24px;
		font-family: PingFangSC-Regular;
		font-weight: 400;
		line-height: 24px;
		text-align: center;
		color: #575757;
		margin-bottom: 33px;
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
		border: 1px solid #CCCCCC;
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
		background: #52B095;
		color: #fff;
	}
	
	.btns:nth-child(2) {
		background: #C7C7C7;
		color: #fff;
	}

	.select-caifu {
		margin: 0 0 30px 0;
		font-size: 15px;
	}

	.select-caifu p {
		font-size: 16px;
		margin-bottom: 15px;
	}

	.select-caifu label {
		display: inline-block;
		width: 48%;
		text-align: center;
		font-size: 15px;
		cursor: pointer;
	}

	.margin_b_none {
		margin-bottom: 0;
	}

	.percent_msg {
		margin: 3px 0;
		text-indent: 11px;
		font-size:12px;
		font-family:PingFangSC-Regular;
		font-weight:400;
		color:rgba(153,153,153,1);
	}

	.select_brank {
		display: flex;
		height: 55px;
		line-height: 55px;
	}

	.select_brank div:nth-child(1) {
		flex: 3;
		text-indent: 11px;
		font-size:12px;
		font-family:PingFangSC-Regular;
		font-weight:400;
		color:rgba(87,87,87,1)
	}

	.select_brank div:nth-child(2) {
		flex: 1;
	}

	.select_brank div:nth-child(3) {
		flex: 1;
	}

	.select_brank div:nth-child(3) img {
		margin-top: 15px;
	}

	.select_brank div:nth-child(4) {
		flex: 7;
		font-size:14px;
		font-family:PingFangSC-Medium;
		font-weight:500;
		color:rgba(104,106,108,1);
	}

	.cg_account {
		display: flex;
		padding: 20px;
	}

	.cg_account div {
		flex: 1;
	}

	.cg_account div h5 {
		font-size:14px;
		font-family:PingFangSC-Medium;
		color:rgba(64,64,64,1);
		font-weight: bold;
		margin-bottom: 15px;
	}
	
	.cg_account div ul li {
		height:14px;
		font-size:14px;
		font-family:PingFangSC-Regular;
		font-weight:400;
		color:rgba(87,87,87,1);
		margin-bottom: 14px;
	}

	.colorCCC {
		color: #686A6C;
    }

    .blod {
        font-weight: bold;
    }

	.unit {
		float: right;
	}

	.limit_parent input {
		float: left;
		width: 94% !important;
	}

	.limit_parent span {
		float: right;
		width:14px;
		height:14px;
		font-size:14px;
		font-family:PingFangSC-Medium;
		font-weight:500;
		color:rgba(104,106,108,1);
		margin-top: 4px;
	}

	.clear {
		clear: both;
	}

	.font_blod {
		font-weight: bold !important;
	}
	
	.upload_btn {
		background-color: rgba(82, 176, 149, 1);
		color: #fff;
		border: none
	}

	.width_25 {
		width: 25%;
	}
	/* 上传 */
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
		/* 上传 */
</style>
