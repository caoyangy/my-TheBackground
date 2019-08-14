<template>
	<div class="flex side_sdx wary">
		<!--头部信息-->
		<div class="H_t flex side_sdx mainAlign_center">
			<div>商家资质审核</div>
			<div>首页&nbsp;&nbsp; /&nbsp;&nbsp; 商家资质审核 &nbsp;&nbsp; / &nbsp;&nbsp;<span style="font-weight: bold;">入驻审核详情</span></div>
		</div>
		<!--tab切换-->
		<div class="tab flex main_zdy sideAlign_center">
			<a :href="'#user'+index" v-for="(item,index) in tab" :key="index" :class="tabname == item?'tab_don' :'tab_d'" @click="tabon(item)">
				<div>{{item}}</div>
			</a>
		</div>

		<!--订单资料-->

		<div class="OrderDetails flex main_zdy" id="user0">

			<div class="OrderDetails_l">
				<div class="headline">订单信息</div>
				<div class="user flex main_zdy">
					<img src="https://p0.ssl.qhimg.com/t01fb1a07499c325529.jpg" class="userImg" />
					<div class="flex side_sdx mainAlign_between">
						<!--<div class="userName">微信昵称：大魔王</div> -->
						<div class="userTel">手机号：{{ details.instalmentAdd.userPhone }}</div>
					
					</div>
				</div>
				<div class="message">
					<div class="messageTitle">分期金额（{{details.totalPrice}}元）</div>
					<div>期数：{{instalmentAdd.periods}}期</div>
					<div>服务费：{{instalmentAdd.serviceCharge}}元</div>
					<div>商家：{{instalment.storeName}}</div>
					<div>城市：{{instalment.city}}</div>
				</div>
				<div class="message">
					<div class="messageTitle">销售顾问</div>
					<div>姓名：{{instalment.adviserName}}</div>
					<div>手机号：{{instalment.adviserPhone}}</div>
					<div>备注：{{instalment.adviserRemark}}</div>
				</div>
				<div class="message">
					<div class="messageTitle">课程信息</div>
					<div>课程名称：{{instalment.courseName}}</div>
					<div>课时数：{{instalment.courseHours}}节</div>
					<div>商品总价(元)：{{instalment.coursePrice}}元</div>
				</div>
				<div class="message">
					<div class="messageTitle">学员信息</div>
					<div>学员姓名：{{instalment.studentName}}</div>
					<div>与申请者关系：{{instalment.studentRelation}}</div>
					<div>性别：{{instalment.studentSex}}</div>
					<div>出生年月：{{instalment.studentBirthday}}</div>
				</div>
			</div>

			<div class="OrderDetails_r flex side_sdx">
				<div class="flex main_zdy">
					<div class="plan flex side_sdx">
						<div class="plan_t">资料提交进度</div>
						<div class="plan_d flex sideAlign_center mainAlign_center">
							<div class="flex main_zdy" :class="palnshow == true?'planList' :'planListon'">
								<img src="../../assets/img/userMessageDetails/right.png" class="rightimg" v-if="palnshow == true">
								<img src="../../assets/img/userMessageDetails/one_on.png" class="rightimg" v-if="palnshow != true">
								<div class="planName" v-if="palnshow == true">认证</div>
								<div class="planNames" v-if="palnshow != true">认证</div>
							</div>
							<div class="flex main_zdy" :class="paln[3] == true?'planList' :'planListon'">
								<img src="../../assets/img/userMessageDetails/right.png" class="rightimg" v-if="paln[2] == true">
								<img src="../../assets/img/userMessageDetails/two_on.png" class="rightimg" v-if="paln[2] != true">
								<div class="planName" v-if="paln[2] == true">照片</div>
								<div class="planNames" v-if="paln[2] != true">照片</div>
							</div>
							<div class="flex main_zdy" :class="paln[4] == true?'planList' :'planListon'">
								<img src="../../assets/img/userMessageDetails/right.png" class="rightimg" v-if="paln[3] == true">
								<img src="../../assets/img/userMessageDetails/three_on.png" class="rightimg" v-if="paln[3] != true">
								<div class="planName" v-if="paln[3] == true">首付</div>
								<div class="planNames" v-if="paln[3] != true">首付</div>
							</div>
							<div class="flex main_zdy planList" style="width: 0;">
								<img src="../../assets/img/userMessageDetails/right.png" class="rightimg" v-if="paln[4] == true">
								<img src="../../assets/img/userMessageDetails/four_on.png" class="rightimg" v-if="paln[4] != true">
								<div class="planNameson" v-if="paln[4] == true" style="color: #1DACA9;">详细信息</div>
								<div class="planNameson" v-if="paln[4] != true">详细信息</div>
							</div>
						</div>
					</div>

					<div class="place">
						<div class="plan_t">位置信息</div>
						<div class="place_d flex sideAlign_center mainAlign_center">
							<img src="../../assets/img/userMessageDetails/place.png" class="placeimg" />
							<div class="site flex side_sdx sideAlign_center">
								<img src="../../../build/logo.png">
								<div>申请者</div>
							</div>
							<div class="counselor flex side_sdx sideAlign_center">
								<img src="../../../build/logo.png">
								<div>课程顾问</div>
							</div>
							<div class="shop">门店位置</div>
							<div class="dist">100米</div>
							<div class="disl">60米</div>
							<div class="disr">60米</div>
						</div>
					</div>

					<div class="place">
						<div class="plan_t">首付</div>
						<div class="place_d flex side_sdx sideAlign_center">
							<div class="price">{{instalment.totalPrice}}元</div>
							<div class="prices">首付金额：{{instalment.downPayment}}元</div>
							<div class="prices">服务费：{{instalment.serviceCharge}}元</div>
						</div>
					</div>
				</div>
				<div class="flex main_zdy">
					<div class="tu">
						<div class="headlines">身份信息</div>
						<div class="picture">
							<div class="pictureimg" @click="imgon(Iduprightimg)">
								<img :src="Iduprightimg" :onerror="onerror"/>
								<div>身份证正面</div>
							</div>

							<div class="pictureimg" @click="imgon(Idversaimg)">
								<img :src="Idversaimg" :onerror="onerror"/>
								<div>身份证反面</div>
							</div>

							<div class="pictureimg" @click="imgon(Idhandimg)">
								<img :src="Idhandimg" :onerror="onerror"/>
								<div>手持身份证</div>
							</div>

						</div>

						<div class="headlines flex main_zdy sideAlign_center">
							课程协议服务照片
							<div class="hint">与商家签订的课程/服务协议照片</div>
						</div>
						<div class="picture">
							<div class="pictureimg" v-for='(item, index) in contractimg' :key="index">
								<img :src="item" @click="imgon(item)" :onerror="onerror"/>
								<div>协议照片</div>
							</div>
						</div>

						<div class="headlines flex main_zdy sideAlign_center">
							现场合照
							<div class="hint">申请者与学员在商家现场合照，照片中必须包含机构明显特征，如商家前台、LOGO</div>
						</div>
						<div class="picture">
							<div class="pictureimg" v-for='(item,index) in storeimg' :key="index">
								<img :src="item" @click="imgon(item)" :onerror="onerror"/>
								<div>现场图</div>
							</div>
						</div>
					</div>

					<div class="place">
						<div class="plan_t">用户详细信息</div>
						<div class="message">
							<div>所在区域：{{orderDetail.area}}</div>
							<div>详细地址：{{orderDetail.address}}</div>
							<div>住宅电话：{{orderDetail.homePhone}}</div>
						</div>
						<div class="message">
							<div>单位名称：{{orderDetail.organizationName}}</div>
							<div>单位地址：{{orderDetail.organizationAddress}}</div>
							<div>单位电话：{{orderDetail.organizationPhone}}</div>
						</div>
						<div class="message">
							<div class="messageTitle">联系人消息</div>
							<div>关系：{{orderDetail.relativesName}}</div>
							<div>姓名：{{orderDetail.relativesRel}}</div>
							<div>手机电话：{{orderDetail.relativesPhone}}</div>
						</div>
						<div class="message">
							<div class="messageTitle">其他联系人消息</div>
							<div>关系：{{orderDetail.otherName}}</div>
							<div>姓名：{{orderDetail.otherRel}}</div>
							<div>手机电话：{{orderDetail.otherPhone }}</div>
						</div>
					</div>
				</div>
			</div>

		</div>
		
		
		<!--用户-->
		<div class="three" id="user1">
			<div class="headline flex main_zdy sideAlign_center">存管账户<div class="deposit">已开启</div></div>
			<div class="depositContent flex main_zdy mainAlign_around">
				<div class="depositContent_v">
					<div class="depositContent_v_d">客户信息</div>
					<div class="depositContent_v_dd">客户姓名：宋萌萌</div>
					<div class="depositContent_v_dd">证件类型：身份证</div>
					<div class="depositContent_v_dd">证件号码：1421231122654563116</div>
				</div>
				<div class="depositContent_v">
					<div class="depositContent_v_d">银行账号信息</div>
					<div class="depositContent_v_dd">银行卡号：6222362512368745</div>
					<div class="depositContent_v_dd">银行预留手机号：18611466281</div>
				</div>
				<div class="depositContent_v">
					<div class="depositContent_v_d">业务授权</div>
					<div class="depositContent_v_dd">授权业务：投标授权、缴费授权、还款授权、委托代付授权

</div>
					<div class="depositContent_v_dd">授权金额：1000000.00元</div>
					<div class="depositContent_v_dd">授权期限：2018年12月12日</div>
				</div>
			</div>
		</div>

		<!--第三方-->
		<div class="three" id="user1">
			<div class="headline">第三方</div>
			<div class="textarea_c">
				<textarea name="" rows="6" cols="" placeholder="内容" @blur.prevent="changeCount(threeinput)" v-model="threeinput"></textarea>
			</div>
			<div class="textarea_c">
				<uploadVue></uploadVue>
			</div>
		</div>

		<!--电核-->
		<div class="tel" id="user2">
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
		<!--<div v-if="!type" class="log" >-->
		<div class="log" >
			<div class="headline">订单日志</div>
			<div class="log_V">
				<div class="log_d flex main_zdy sideAlign_center">
					<div>时间</div>
					<div>操作人</div>
					<div>操作类型</div>
					<div>建议额度</div>
					<div>备注</div>
				</div>
				<div class="log_dd flex main_zdy sideAlign_center" v-for='(item,index) in logList' :key="index" >
					<div>{{item.createDate}}</div>
					<div>{{item.currentPage}}</div>
					<div>{{item.type}}</div>
					<!-- <div>{{item.price}}</div> -->
					<div> 缺少字段 </div>
					<div>{{item.note}}</div>
				</div>
			</div>
		</div>

		<!--初审-->
		<div class="hide flex sideAlign_center mainAlign_center" v-show="firstshow">
			<div class="hide_d">
				<div class="flex main_ydz"><img src="../../assets/img/shut.png" class="cha" @click="shut"></div>
				<div class="hide_title">{{first}}</div>
				<input type="text" placeholder="建议额度" class="limit" v-if='first == "初审通过"' ref='firstlimit' onkeyup="value=value.replace(/[^\d]/g,'') " ng-pattern="/[^a-zA-Z]/" />
				<textarea name="6" rows="4" cols="" placeholder="请填写原因" ref='firstcause'></textarea>
				<div class="flex mainAlign_center">
					<input type="button" name="" id="" value="提交" class="btns" @click="firstpresent" />
					<input type="button" name="" id="" value="取消" class="btns" @click="shut" />
				</div>
			</div>
		</div>

		<!--复审-->
		<div class="hide flex sideAlign_center mainAlign_center" v-show="againshow">
			<div class="hide_d">
				<div class="flex main_ydz"><img src="../../assets/img/shut.png" class="cha" @click="shut"></div>
				<div class="hide_title">{{again}}</div>
				<input type="text" placeholder="建议额度" class="limit" v-if='again == "复审通过"' ref='againlimit' onkeyup="value=value.replace(/[^\d]/g,'') " ng-pattern="/[^a-zA-Z]/" />
				<textarea name="6" rows="4" cols="" placeholder="请填写原因" ref='againcause'></textarea>
				<div class="flex mainAlign_center">
					<input type="button" name="" id="" value="提交" class="btns" @click="recheck" />
					<input type="button" name="" id="" value="取消" class="btns" @click="shut" />
				</div>
			</div>
		</div>

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
			<img :src="imgurl" alt="" class="imgurl"/>
		</div>

		<!--初审建议-->
		<div class="suggest" v-if="type == '待初审'" id="user3">
			<div class="headline"></div>
			<div class="suggest_d flex sideAlign_center mainAlign_center">
				<div @click="pass">通过</div>
				<div @click="reject">驳回</div>
				<div @click="refuse">拒绝</div>
				<div @click="impeach">存疑</div>
			</div>
		</div>

		<!--复审建议-->
		<div class="suggest" v-if="type == '待复审'" id="user3">
			<div class="headline">复审建议</div>
			<div class="suggest_d flex sideAlign_center mainAlign_center">
				<div @click="pass">通过</div>
				<div @click="reject">驳回</div>
				<div @click="refuse">拒绝</div>
				<div @click="impeach">存疑</div>
			</div>
		</div>
		<Button @click="infos(false)" v-show="false" class="btn"></Button>
	</div>
</template>

<script>
	import uploadVue from '../upload.vue';
	import { BaseUrl,API } from '../../Baseurl/common.js';
	export default {
		components: {
			uploadVue
		},
		data() {
			return {
				onerror:'this.src="' + require('../../assets/img/img.png') + '"',
				href: '',
				tab: ['订单资料', '第三方', '电核', ''],
				tabname: '订单资料',
				id: '',
				storeId:'',
				type: '',
				userid: '',
				token: '',
				content: '',
				details: [], //用户详情数据
				instalmentAdd:[],
				instalment:[],
				orderDetail:[],
				telList: [], //电话列表
				logList: [], //订单日志
				firstshow: false, //初审
				first: '', //初审
				againshow: false, //复审
				again: '', //复审
				Iduprightimg: '', //身份证正img
				Idversaimg: '', //身份证反img
				Idhandimg: '', //手持身份证img
				contractimg: [],
				storeimg: [],
				paln: [], //进度
				palnshow: '',
				telshow: false,
				imgshow: false, //图片的show
				imgurl: '',
				threeinput: '',
				otherAuthUrl:'',
			}
		},
		created() {
			this.href = window.location.href;
			localStorage.setItem('href',this.href);
			this.id = this.$route.query.id;
			var instalmentId = this.$route.query.instalmentId;
			var instalmentAddId = this.$route.query.instalmentAddId;
			this.type = unescape(this.$route.query.type);
			this.userid = localStorage.getItem('userid');
			this.token = localStorage.getItem('token');
			this.storeId = this.$route.query.storeId;
			var otherAuthUrl = localStorage.getItem('imgurl');
			if(otherAuthUrl == null){
				this.otherAuthUrl = '';
			}else{
				this.otherAuthUrl = '';
			}
			if(this.type == '待初审') {
				this.tab[3] = '初审'
			} else if(this.type == '待复审') {
				this.tab[3] = '复审'
			}
//			if(this.$route.query.storeId){
//				this.storeId = this.$route.query.storeId;
//			}

			//获取详情数据
			var detailsUrl = BaseUrl + 'order/examineDetail?id=' + this.id + "&instalmentId=" + instalmentId + '&instalmentAddId=' + instalmentAddId + '&storeId=' + this.storeId + '&userId=' + this.userid + '&token=' + this.token;
			this.$http.post(detailsUrl).then((res) => {
				var data = JSON.parse(res.data);
				console.log( data )
				this.details = data;
				this.instalmentAdd = data.instalmentAdd;
				this.instalment = data.instalment;
				this.orderDetail = data.orderDetail;
				this.IduprightImg(data.idcardFrontUrl); //门头图图片
				this.IdversaImg(data.idcardBackUrl); //门头图图片
				this.IdhandImg(data.idcardHandUrl); //门头图图片
				this.contractImg(JSON.parse(data.contractUrl))
				this.storeImg(JSON.parse(data.storeUrl))
				//进度
			
				this.$API('post','order/eachCheck?addId=' + instalmentAddId + '&storeId=' + this.storeId,{},this.userid,this.token,(res)=>{
					console.log( res )
						this.paln = res.data.data;
						if(res.data.data[0] == true && res.data.data[1] == true) {
							this.palnshow = true
						} else {
							this.palnshow = false
						}
				})
			}).catch((error) => {
				console.log(error)
			})

			

			//电话的核实
			this.$API('post','phoneLog/findByEntity',{
				examineId: this.id
			},this.userid,this.token,(res)=>{
				this.telList = res.data.data.list;
			})

			//订单日志
			this.$API('post','examineLog/findByEntity',{
				examineId: this.id
			},this.userid,this.token,(res)=>{
				this.logList = res.data.data.list;
			})

		},
		//过滤器
		filters: {
			cAPItalize: function(value) {
				if(value == 'null') {
					value = ''
				} else {
					return value
				}
			}
		},
		methods: {
			//第三方
			changeCount: function(e) {
				this.threeinput = e;
			},
			//tab
			tabon: function(e) {
				this.tabname = e;
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
			//通过
			pass: function() {
				if(this.type == '待初审') {
					this.first = '初审通过';
					this.firstshow = true;
				} else if(this.type == '待复审') {
					this.again = '复审通过';
					this.againshow = true;
				}
			},
			//驳回
			reject: function() {
				if(this.type == '待初审') {
					this.first = '初审驳回';
					this.firstshow = true;
				} else if(this.type == '待复审') {
					this.again = '复审驳回';
					this.againshow = true;
				}
			},
			//拒绝
			refuse: function() {
				if(this.type == '待初审') {
					this.first = '初审拒绝';
					this.firstshow = true;
				} else if(this.type == '待复审') {
					this.again = '复审拒绝';
					this.againshow = true;
				}
			},
			//存疑
			impeach: function() {
				if(this.type == '待初审') {
					this.first = '初审存疑';
					this.firstshow = true;
				} else if(this.type == '待复审') {
					this.again = '复审打回';
					this.againshow = true;
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
				if(this.first == '初审通过') {
					var limit = this.$refs.firstlimit.value;
				}
				var cause = this.$refs.firstcause.value;
				if(cause != '') {

					//状态提交
						this.$API('post','order/examine',{
							examineLog: {
								note: cause,
								price: limit,
								sign: this.first,
								type: this.first,
								createBy: this.userid,
							},
							id: this.id,
							otherAuth: this.threeinput,
							otherAuthUrl: this.otherAuthUrl,
							status: this.first,
							userId:this.details.userId
						},this.userid,this.token,(res)=>{
							this.firstshow = false;
							this.$router.push({
								path: '/userAudit',
							})
						})

				} else {
					this.content = "内容不能为空"
					this.infos();
				}
			},
			//复审
			recheck: function() {
				if(this.again == '复审通过') {
					var limit = this.$refs.againlimit.value;
				}
				var cause = this.$refs.againcause.value;
				if(cause != '') {

					//状态提交
						this.$API('post','order/examine',{
							examineLog: {
								note: cause,
								price: limit,
								sign: this.again,
								type: this.again,
								createBy: this.userid,
							},
							id: this.id,
							otherAuth: this.threeinput,
							otherAuthUrl: this.otherAuthUrl,
							status: this.again,
							storeId:this.storeId,
							userId:this.details.userId
						},this.userid,this.token,(res)=>{
							this.againshow = false;
							this.$router.push({
								path: '/userAudit',
							})
						},(res)=>{
							this.content = res.data.message;
							this.infos();
						})
						
				} else {
					this.content = "内容不能为空"
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
					this.$API('post','phoneLog/create',{
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
			//身份证正img
			IduprightImg(url) {
				this.$API('get','queryTempUrl?userId=' + this.userid + '&key=' + url.substr(url.indexOf('com/') + 4) + '&bucket=mango1' + '&xOssProcess=image/resize,m_lfit,h_630,w_950' + '&token=' + this.token,{},this.userid,this.token,(res)=>{
					this.Iduprightimg = res.data.data;
				})
			},
			//身份证反img
			IdversaImg(url) {
				this.$API('get','queryTempUrl?userId=' + this.userid + '&key=' + url.substr(url.indexOf('com/') + 4) + '&bucket=mango1' + '&xOssProcess=image/resize,m_lfit,h_630,w_950' + '&token=' + this.token,{},this.userid,this.token,(res)=>{
					this.Idversaimg = res.data.data;
				})
			},
			//手持身份证img
			IdhandImg(url) {
				this.$API('get','queryTempUrl?userId=' + this.userid + '&key=' + url.substr(url.indexOf('com/') + 4) + '&bucket=mango1' + '&xOssProcess=image/resize,m_lfit,h_630,w_950' + '&token=' + this.token,{},this.userid,this.token,(res)=>{
					this.Idhandimg = res.data.data;
				})
			},
			contractImg(url) {
				for(let i in url) {
					this.$API('get','queryTempUrl?userId=' + this.userid + '&key=' + url[i].substr(url[i].indexOf('com/') + 4).split('"')[0] + '&bucket=mango1' + '&xOssProcess=image/resize,m_lfit,h_630,w_950' +  '&token=' + this.token,{},this.userid,this.token,(res)=>{
						this.contractimg.push(res.data.data);
					})
				}
			},
			storeImg(url) {
				for(let i in url) {
					this.$API('get','queryTempUrl?userId=' + this.userid + '&key=' + url[i].substr(url[i].indexOf('com/') + 4).split('"')[0] + '&bucket=mango1' + '&xOssProcess=image/resize,m_lfit,h_630,w_950' + '&token=' + this.token,{},this.userid,this.token,(res)=>{
						this.storeimg.push(res.data.data);
					})
				}
			}
		}
	}
</script>

<style scoped="scoped">
	.wary {
		overflow-y: auto;
		background: #F3F3F4;
	}
	
	/*.btn{
		z-index: 999!important;
		background: red!important;
	}*/
	
	.H_t {
		height: 80px;
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
	}
	/*订单资质*/
	
	.OrderDetails {
		padding: 0 20px;
	}
	
	.OrderDetails_l {
		/*width: 370px;*/
		width: 20%;
		margin-right: 20px;
		border-top: 6px solid #E7EAEC;
		background: #fff;
		margin-bottom: 20px;
	}
	
	.headline {
		height: 45px;
		padding-left: 20px;
		line-height: 45px;
		border-bottom: 1px solid #E7EAEC;
		font-size: 16px;
	}
	
	.headlines {
		height: 51px;
		padding-left: 20px;
		line-height: 45px;
		font-size: 16px;
		border-bottom: 1px solid #E7EAEC;
		border-top: 6px solid #E7EAEC;
	}
	
	.hint {
		line-height: 14px;
		height: 14px;
		font-size: 14px;
		font-family: PingFangSC-Regular;
		font-weight: 400;
		color: #C8CACC;
		margin-left: 10px;
	}
	
	.user {
		margin-left: 20px;
		padding: 20px 0 16px 0;
	}
	
	.userImg {
		width: 50px;
		height: 50px;
		display: block;
		margin-right: 10px;
		border-radius: 50%;
	}
	
	.userName {
		font-size: 14px;
		font-family: PingFangSC-Regular;
		font-weight: 400;
		color: #575757;
	}
	
	.userTel {
		margin-top:20px;
		font-size: 14px;
		font-family: PingFangSC-Regular;
		font-weight: 400;
		color: #575757;
	}
	
	.message {
		padding-top: 12px;
		padding-left: 20px;
	}
	
	.message div {
		line-height: 14px;
		line-height: 14px;
		margin-bottom: 12px;
		font-size: 14px;
		font-family: PingFangSC-Regular;
		font-weight: 400;
		color: #575757;
	}
	
	.messageTitle {
		font-size: 14px!important;
		font-family: PingFangSC-Medium!important;
		font-weight: bold !important;
		color: #404040!important;
		margin-bottom: 12px!important;
	}
	
	.OrderDetails_r {
		/*width: 1270px;*/
		width: 80%;
	}
	
	.OrderDetails_r_t {
		padding-bottom: 20px;
	}
	/*资料进度*/
	
	.plan {
		/*width: 490px;*/
		width: 40%;
		border-top: 6px solid #E7EAEC;
		margin-bottom: 20px;
		background: #fff;
	}
	
	.plan_t {
		height: 45px;
		line-height: 45px;
		border-bottom: 1px solid #E7EAEC;
		font-size: 16px;
		font-family: PingFangSC-Medium;
		font-weight: 500;
		color: #686B6D;
		padding-left: 20px;
	}
	
	.plan_d {
		height: 106px;
	}
	
	.planList {
		width: 120px;
		height: 4px;
		background: #1DACA9;
		position: relative;
	}
	
	.planListon {
		width: 120px;
		height: 4px;
		background: #E7E7E7;
		position: relative;
	}
	
	.rightimg {
		width: 30px;
		height: 30px;
		border-radius: 50%;
		display: block;
		position: absolute;
		top: -15px;
		left: -15px;
	}
	
	.planName {
		height: 16px;
		line-height: 16px;
		font-size: 16px;
		font-family: PingFangSC-Medium;
		font-weight: 500;
		color: #1DACA9;
		position: absolute;
		top: 25px;
		left: -15px;
	}
	
	.planNames {
		height: 16px;
		line-height: 16px;
		font-size: 16px;
		font-family: PingFangSC-Medium;
		font-weight: 500;
		color: #E7E7E7;
		position: absolute;
		top: 25px;
		left: -15px;
	}
	
	.planNameson {
		width: 65px;
		height: 16px;
		line-height: 16px;
		font-size: 16px;
		font-family: PingFangSC-Medium;
		font-weight: 500;
		color: #E7E7E7;
		position: absolute;
		top: 25px;
		left: -33px;
	}
	
	.seelected {
		width: 42px;
		height: 42px;
		display: block;
		border-radius: 50%;
		position: absolute;
		top: -20px;
		left: -20px;
	}
	/*位置*/
	
	.place {
		/*width: 370px;*/
		width: 28.5%;
		border-top: 6px solid #E7EAEC;
		background: #fff;
		margin: 0 0 20px 20px;
	}
	
	.place_d {
		height: 106px;
		position: relative;
	}
	
	.placeimg {
		width: 262px;
		height: 61px;
		display: block;
	}
	
	.site {
		position: absolute;
		top: 15px;
		left: 35px;
	}
	
	.site img {
		width: 30px;
		height: 30px;
		border-radius: 50%;
		display: block;
		margin-bottom: 2px;
	}
	
	.site div {
		height: 14px;
		line-height: 14px;
		font-size: 14px;
		font-family: PingFangSC-Medium;
		font-weight: 500;
		color: #B0B2B3;
	}
	
	.counselor {
		position: absolute;
		top: 15px;
		right: 30px;
	}
	
	.counselor img {
		width: 30px;
		height: 30px;
		border-radius: 50%;
		display: block;
		margin-bottom: 2px;
	}
	
	.counselor div {
		height: 14px;
		line-height: 14px;
		font-size: 14px;
		font-family: PingFangSC-Medium;
		font-weight: 500;
		color: #B0B2B3;
	}
	
	.shop {
		height: 14px;
		line-height: 14px;
		font-size: 14px;
		font-family: PingFangSC-Medium;
		font-weight: 500;
		color: #B0B2B3;
		position: absolute;
		margin-top: 43px;
	}
	
	.dist {
		line-height: 14px;
		height: 14px;
		font-size: 14px;
		font-family: PingFangSC-Medium;
		font-weight: 500;
		color: #1DACA9;
		position: absolute;
		margin-top: -40px;
	}
	
	.disl {
		line-height: 14px;
		height: 14px;
		font-size: 14px;
		font-family: PingFangSC-Medium;
		font-weight: 500;
		color: #1DACA9;
		position: absolute;
		margin-left: -70px;
		margin-top: 30px;
		transform: rotate(9deg);
	}
	
	.disr {
		line-height: 14px;
		height: 14px;
		font-size: 14px;
		font-family: PingFangSC-Medium;
		font-weight: 500;
		color: #1DACA9;
		position: absolute;
		margin-left: 70px;
		margin-top: 30px;
		transform: rotate(-9deg);
	}
	/*首付*/
	
	.price {
		line-height: 25px;
		height: 25px;
		font-size: 28px;
		font-family: PingFangSC-Regular;
		font-weight: 400;
		color: #52B095;
		margin: 12px 0;
	}
	
	.prices {
		line-height: 14px;
		height: 14px;
		font-size: 14px;
		font-family: PingFangSC-Regular;
		font-weight: 400;
		color: #575757;
		margin-bottom: 13px;
	}
	/*图片*/
	
	.tu {
		/*width: 880px;*/
		width: 70.5%;
		background: #fff;
		margin-bottom: 20px;
	}
	
	.picture {
		padding: 9px 0 7px 20px;
		margin-bottom: 20px;
		overflow: hidden;
	}
	
	.pictureimg {
		width: 120px;
		height: 76px;
		margin-right: 20px;
		float: left;
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
	
	.userData {
		margin-bottom: 20px;
	}
	
	/*存款用户*/
	.deposit{
		width: 78px;
		height: 22px;
		background: #52B095;
		border-radius:4px;
		font-size:12px;
		font-family:PingFangSC-Regular;
		color: #fff;
		line-height: 22px;
		text-align: center;
		margin-left: 10px;
	}
	
	.depositContent{
		padding: 20px;
	}
	
	.depositContent_v{
		width: 33.33%;
	}
	
	.depositContent_v_d{
		font-size:14px;
		font-family:PingFangSC-Medium;
		font-weight:bold;
		color: #404040;
		margin-bottom: 10px;
	}
	
	.depositContent_v_dd{
		font-size:14px;
		font-family:PingFangSC-Regular;
		color: #575757;
		margin-bottom: 7px;
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
		width: 440px;
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
</style>