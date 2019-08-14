<template>
	<div class="flex side_sdx wary">
		<!--头部信息-->
		<div class="H_t flex side_sdx mainAlign_center">

			<div v-if="this.type == '已逾期' ||  this.type == '已还款' || this.type == '未逾期' || this.type == '已结清'" >
				还款管理
			</div>
			<div v-else-if="this.type == '逾期催收管理' " >
				逾期催收管理
			</div>
			<div v-else-if="this.type == '提前还款审核中' ||  this.type == '提前还款失败' " >
				提前还款管理
			</div>

			<div v-else-if="this.type == '今日还款列表' ||  this.type == '已逾期列表' || '代付明细' ||  this.type == '收款明细' " >
				代付管理
			</div>

			<div>
				首页
				&nbsp;&nbsp; /&nbsp;&nbsp; 

				<span v-if=" this.type == '已逾期' ||  this.type == '已还款' || this.type == '未逾期' || this.type == '已结清' ">还款管理 &nbsp;&nbsp; / &nbsp;&nbsp;</span> 
				<span v-else-if=" this.type == '今日还款列表' ||  this.type == '已逾期列表' || this.type == '代付明细' || this.type == '收款明细' ">还款管理 &nbsp;&nbsp; / &nbsp;&nbsp;</span> 
				<span v-else-if=" this.type == '提前还款审核中' ||  this.type == '提前还款失败' ">提前还款管理 &nbsp;&nbsp; / &nbsp;&nbsp;</span> 
				<span v-else-if="this.type == '今日还款列表' ||  this.type == '已逾期列表' ||  this.type == '代付明细' ||  this.type == '收款明细' " > 代付管理 &nbsp;&nbsp; / &nbsp;&nbsp; </span>
				<span> {{ type }} </span>

				&nbsp;&nbsp; / &nbsp;&nbsp;	

				<span style="font-weight: bold;">  详情  </span>
			</div>
		</div>

		<!-- search 搜索 -->
		<div class=" search_box ">
			<div>
				<input type="text" placeholder=" 请输入关键字，包括订单编号，借款人 ">
			</div>
		</div>

		<!--tab切换-->
		<div class="tab flex main_zdy sideAlign_center">
			<a v-for="(item,index) in tab" :key="index" :class="tabname == item?'tab_don' :'tab_d'" @click="tabon(item,'#user'+index)">
				<div>{{item}}</div>
			</a>
		</div>

		<!--订单资料-->

		<div class="OrderDetails flex main_zdy" id="user0">

			<div class="OrderDetails_l">
				<div class="headline">文本信息</div>
				<div class="user flex main_zdy">
					<img src="https://p0.ssl.qhimg.com/t01fb1a07499c325529.jpg" class="userImg" />
					<div class="flex side_sdx mainAlign_between">
						<!--<div class="userName">微信昵称：大魔王</div> -->
						<!-- <div v-if=" details.instalmentAdd.userPhone != null " class="userTel">手机号：{{ details.instalmentAdd.userPhone }}</div>
						<div v-else-if ="  details.userPhone != null " class="userTel"> {{  details.userPhone }} </div>
						<div v-else> 暂无字段 </div> -->
						<div>
							暂无字段
						</div>
					</div>
				</div>
				<div class="message message_left">
					<div class="messageTitle">分期金额（{{details.totalPrice}}元）</div>
					<div>期数：{{instalmentAdd.periods}}期</div>
					<div>服务费：{{instalmentAdd.serviceCharge}}元</div>
					<div>商家：{{instalment.storeName}}</div>
					<div>城市：{{instalment.city}}</div>
				</div>
				<div class="message  message_left">
					<div class="messageTitle">销售顾问</div>
					<div>姓名：{{instalment.adviserName}}</div>
					<div>手机号：{{instalment.adviserPhone}}</div>
					<div>备注：{{instalment.adviserRemark}}</div>
				</div>
				<div class="message  message_left">
					<div class="messageTitle">课程信息</div>
					<div>课程名称：{{instalment.courseName}}</div>
					<div>课时数：{{instalment.courseHours}}节</div>
					<div>商品总价(元)：{{instalment.coursePrice}}元</div>
				</div>
				<div class="message  message_left">
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
							<div v-if=" instalment.downPayment " class="prices">首付金额：{{instalment.downPayment}}元</div>
							<div v-else class="prices">首付金额：0元</div>
							<div v-if=" instalment.serviceCharge " class="prices">服务费：{{instalment.serviceCharge}}元</div>
							<div v-else class="prices">服务费：0 元</div>
						</div>
					</div>
				</div>
				<div class="flex main_zdy">
					<div class="tu">
						<div class="headlines">身份信息及征信报告</div>
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
							<span class="hints">
								现场合照
							</span>
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
							<div class="messageTitle">个人信息</div>
							<div>户口类型: {{details.accountType}}</div>
							<div>婚姻状况: {{details.matrimonyType}}</div>
							<div>月收入: {{details.personalIncome}}</div>
						</div>
						<div class="message">
							<div class="messageTitle">家庭住址</div>
							<div>居住类型：{{details.accountType}}</div>
							<div>所在区域：{{orderDetail.area}}</div>
							<div>详细地址：{{orderDetail.address}}</div>
							<div>住宅电话：{{orderDetail.homePhone}}</div>
						</div>
						<div class="message">
							<div class="messageTitle">单位信息</div>
							<div>所属行业：{{details.industryInvolved}}</div>
							<div>单位名称：{{orderDetail.organizationName}}</div>
							<div>单位地址：{{orderDetail.organizationAddress}}</div>
							<div>单位电话：{{orderDetail.organizationPhone}}</div>
						</div>
						<div class="message">
							<div class="messageTitle">联系人消息</div>
							<div>姓名：{{orderDetail.relativesName}}</div>
							<div>关系：{{orderDetail.relativesRel }}</div>
							<div>手机电话：{{orderDetail.relativesPhone}}</div>
						</div>
						<div class="message">
							<div class="messageTitle">其他联系人消息</div>
							<div>姓名：{{orderDetail.otherName}}</div>
							<div>关系：{{orderDetail.otherRel}}</div>
							<div>手机电话：{{orderDetail.otherPhone }}</div>
						</div>
					</div>
				</div>
			</div>
		</div>		
		
		<!--用户-->
		<div style=" padding-bottom: 0 ; margin: 0 20px" class="three"  id="user1">
			<div class="headline flex main_zdy sideAlign_center">存管账户<div class="deposit">已开启</div></div>
			<!-- <div class="depositContent flex main_zdy mainAlign_around">
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
			</div> -->
		</div>

        <!-- 分期还款 -->
        <div style=" margin-bottom:0 " class="three" id="user2">
			<div class="headline flex main_zdy sideAlign_center">分期明细</div>
			<div class="depositContent  main_zdy mainAlign_around fenqi_flex">
				<div>
                    <h5>分期明细</h5>
                    <ul>
                        <li>分期明细 : <span></span></li>
                        <li>优惠券 : <span></span></li>
                        <li>期数 : <span></span></li>
                        <li>协议及合同 : <span @click=" openDepositoryAccount " class="fenqi_flex_last_span"> 查看 </span></li>
                    </ul>
                    <i class="line"></i>
                </div>
                
                <div class="padding_left_20px">
					<h5 >还款明细</h5>
					<div>
                        <ul>
                            <li>未还本金 : <span></span></li>
                            <li>还款计划 : <span @click="openRepaymentSchedule"  class="fenqi_flex_last_span">查看</span></li>
                        </ul>
                        <ul>
                            <li>已还本金 : <span></span></li>
                            <li>还款及记录 : <span  @click="openRepaymentHistory" class="fenqi_flex_last_span">查看</span></li>
                        </ul>
                        <ul>
                            <li>逾期金额 : <span></span></li>
                            <li>代付金额 : <span></span></li>
                            <li>垫付记录 : <span @click="openPaymentRecord"  class="fenqi_flex_last_span">查看</span></li>
                        </ul>
                        <ul>
                            <li>逾期减免总额 : <span></span></li>
                            <li>逾期减免记录 : <span  @click="openCreditRecord" class="fenqi_flex_last_span">查看</span></li>
                        </ul>
                    </div>
                    
                </div>

			</div>
		</div>

		<!--第三方-->
		<div class="three" id="user3">
			<div class="headline">第三方</div>
			<div class="textarea_c">
				<textarea name="" rows="6" cols="" placeholder="内容" @blur.prevent="changeCount(threeinput)" v-model="threeinput"></textarea>
			</div>
			<div class="textarea_c">
				<uploadVue></uploadVue>
			</div>
		</div>

		<!--电核-->
		<div class="tel" id="user4">
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
		<div class="log"  id="user5" >
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
					<div> {{ item.createBy }} </div>
					<!-- <div> {{item.type}} </div> -->
					<div> {{ item.type }} </div>
					<div>{{item.creditLine}}</div>
					<div>{{item.note}}</div>
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

        <!--  协议及合同model  -->
        <div class="hide flex sideAlign_center mainAlign_center" v-if="depositoryAccountModel">
			<div class="hide_d cunguan_model_content">
				<h3>协议及合同</h3>
				<ul class="li_border_none">
					<li>
						<router-link tag="a" target="_blank" to="creditAuthorizationAgreement">《征信授权协议》</router-link>
					</li>

                    <li @click="getDepositoryAccount( '个人借款协议' )" > 《个人借款协议》 </li>

					<li>
						<router-link tag="a" target="_blank" to="confirmationElectronic">《授权电子合同确认书》</router-link>
					</li>
					
					<li>
						<router-link tag="a" target="_blank" to="powerAttorney">《授权委托书》</router-link>
					</li>
					
				</ul>
				<div  @click="closeModel" class="close">
					<Icon size="22" type="md-close" color="#ccc" />
				</div>
			</div>
		</div>

        <!--  还款计划model  -->
        <div class="hide flex sideAlign_center mainAlign_center" v-if="repaymentScheduleModel">
			<div class="hide_d huankuan_model_content_jihua" >
				<h3>还款计划</h3>
				<div class=" scroll ">
                    <ul  v-for=" (item , index) in repaymentScheduleModelList " :key=" index ">
                        <li class="top_li">
							{{ item.phase }} 期
							<i v-if="item.overdueStatus == '1'">逾期</i> 
							<i class="backcolor_yellow" v-else-if="item.overdueStatus == '2' ">本期</i> 
							<span v-else></span>
							<span> {{ (item.principal).toFixed(2) }} </span> 
						</li>
                        <li class="bottom_li">
							{{ item.planDate }}
							<span> {{ (item.principal + item.interest).toFixed(2) }} </span> 
						</li>
                    </ul>
                </div>
				<div  @click="closeModel" class="close">
					<Icon size="22" type="md-close" color="#ccc" />
				</div>
			</div>
		</div>

		 <!--  还款记录model  -->
        <div class="hide flex sideAlign_center mainAlign_center" v-if="repaymentHistoryModel">
			<div class="hide_d huankuan_model_content">
				<h3>还款记录</h3>
				<div class=" scroll height_543">
					<div class="repayment_history" v-for=" ( item,index ) in repaymentHistoryModelList" :key=" index ">
						<div class="repayment_history_top">
							<b style=" font-weight:normal " v-if=" item.finishTime  "> {{ item.finishTime }} </b>
							<b style=" font-weight:normal "  v-else> {{ item.createTime }} </b>
							<i v-if=" item.tradingStatus == '100' "> 处理中 </i>
							<i v-else-if=" item.tradingStatus == '200' "> 还款成功 </i>
							<i v-else-if=" item.tradingStatus == '300' "> 还款失败 </i>
							<span> {{ item.principal }} </span>
						</div>
						<div class="clear"></div>
						<div class="repayment_history_content">
							<ul>
								<li>
									本金
									<span> {{ item.principal }} </span> 
								</li>
								<li>
									利息
									<span> {{ item.interest }} </span> 
								</li>
								<li>
									优惠减免
									<span> {{ item.interest }} </span> 
								</li>
								<li v-if=" item.sheadRepaymentManagementCost ">
									提前还款管理费
									<span> {{ item.sheadRepaymentManagementCost }} </span> 
								</li>
								<li v-if=" item.sheadRepaymentDedit ">
									提前减免违约金
									<span> {{ item.sheadRepaymentDedit }} </span> 
								</li>
							</ul>
						</div>
					</div>
				</div>
				<div  @click="closeModel" class="close">
					<Icon size="22" type="md-close" color="#ccc" />
				</div>
			</div>
		</div>

		<!--  垫付记录model  -->
        <div class="hide flex sideAlign_center mainAlign_center" v-if="paymentRecordModel">
			<div class="hide_d_d huankuan_model_content">
				<h3>垫付记录</h3>
				<div class="list">
					<div class="list_data">
						<div class="list_data_h flex main_zdy mainAlign_around">
							<div>垫付申请时间</div>
							<div>期数</div>
							<div>应还本息</div>
							<div>垫付金额</div>
							<!-- <div>操作人</div> -->
							<div>垫付状态</div>
						</div>
						<div v-for="( item , index) in paymentRecordModelList" :key=" index " class="list_data_c flex main_zdy mainAlign_around" >
							<div :title=" item.createTime "> {{ item.createTime }} </div>
							<div> {{ item.currentPeriod }} </div>
							<div> {{ (item.principal + item.interest).toFixed(2) }} </div>
							<div> {{ item.dealAmount }} </div>
							<div v-if=" item.tradingStatus == '100' "> 垫付中 </div>
							<div v-if=" item.tradingStatus == '200' "> 垫付成功 </div>
							<div v-if=" item.tradingStatus == '300' "> 垫付失败 </div>
						</div>
					</div>
                </div>
				<div  @click="closeModel" class="close">
					<Icon size="22" type="md-close" color="#ccc" />
				</div>
			</div>
		</div>

		<!--  减免记录model  -->
        <div class="hide flex sideAlign_center mainAlign_center"  v-if="creditRecordModel">
			<div class="hide_d_d_d huankuan_model_content">
				<h3>减免记录</h3>
				<div class="list">
					<div class="list_data">
						<div  class="list_data_h flex main_zdy mainAlign_around">
							<div>减免申请时间</div>
							<div>期数</div>
							<div>还款日</div>
							<div>逾期违约金</div>
							<div>逾期罚息</div>
							<div>减免金额</div>
							<!-- <div>操作人</div> -->
						</div>
						<div  v-for="( item , index) in creditRecordModelList" :key=" index " class="list_data_c flex main_zdy mainAlign_around" >
							<div :title=" item.overdueApplyTime "> {{ item.overdueApplyTime }} </div>
							<div> {{ item.phase }} </div>
							<div> {{ item.planDate }}</div>
							<div> {{ item.overdueDedit  }} </div>
							<div> {{ item.lateCharge }} </div>
							<div> {{ item.overdueRelief }} </div>
							<!-- <div>操作人</div> -->	
						</div>
					</div>
                </div>
				<div  @click="closeModel" class="close">
					<Icon size="22" type="md-close" color="#ccc" />
				</div>
			</div>
		</div>

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
				tab: ['订单资料','存管账户','分期明细', '第三方', '电核', '订单日志'],
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
				nowDate:'', // 现在的时间
				depositoryAccountModel:false, // 协议及合同model
				repaymentScheduleModel:false, // 还款计划model
				repaymentScheduleModelList:[],// 还款计划model列表
				repaymentHistoryModel:false, // 还款记录model
				repaymentHistoryModelList:[], // 还款记录列表
				paymentRecordModel:false, // 垫付记录model
				paymentRecordModelList:[], // 垫付记录列表
				creditRecordModel:false, // 减免记录model
				creditRecordModelList:[],//减免记录列表
			}
		},
		created () {
			
		},

		mounted() {
			// this.getDate();
			this.href = window.location.href;
			localStorage.setItem('href',this.href);
			this.id = this.$route.query.id;
			var instalmentId = this.$route.query.instalmentId;
			var instalmentAddId = this.$route.query.instalmentAddId;
			this.type = unescape(this.$route.query.type);
			console.log( this.type )
			this.userid = localStorage.getItem('userid');
			this.token = localStorage.getItem('token');

	

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
				this.details = data;
				console.log( this.details )
				this.instalmentAdd = data.instalmentAdd;
				this.instalment = data.instalment;
				console.log( this.instalment   )
				this.orderDetail = data.orderDetail;
				this.IduprightImg(data.idcardFrontUrl); //门头图图片
				this.IdversaImg(data.idcardBackUrl); //门头图图片
				this.IdhandImg(data.idcardHandUrl); //门头图图片
				this.contractImg(JSON.parse(data.contractUrl))
				this.storeImg(JSON.parse(data.storeUrl))
				//进度
				this.$API('post','queryInstalmentAddOrderAuth',{
				"orderId": this.id,
				},this.userid,this.token,(res)=>{
					this.storeId = res.data.data.list[0].storeId;
					this.$API('post','order/eachCheck?addId=' + instalmentAddId + '&storeId=' + this.storeId,{},this.userid,this.token,(res)=>{
						// debugger
						this.paln = res.data.data;
						console.log( 'paln' , this.paln )
						if(res.data.data[0] == true && res.data.data[1] == true) {
							this.palnshow = true
						} else {
							this.palnshow = false
						}
					})
						// debugger
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
				console.log('111', this.logList )
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
			//获取当前时间 
			getDate : function () {
				var date = new Date();
				var year = date.getFullYear();
				var mounth = date.getMonth()+1;
				var data = date.getDate();
				var houers = date.getHours();
				var min = date.getMinutes();
				var s  = date.getMinutes();
				
				this.nowDate = year + '-' + mounth + '-' + data + ' ' + houers + ':' + min + ':' + s; 
				console.log( new Date(this.nowDate ).getTime() )
			},
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
			// 协议及合同model
			openDepositoryAccount : function () {
				this.depositoryAccountModel = true;
			},
			// 获取协议合同
			getDepositoryAccount : function ( name ) {
				if( name == '个人借款协议' ){
					this.$APIS('post','getborrowapplycontractlist',{
						id:this.id,
					},this.userid,this.token,(res)=>{
						window.open(res.data.data,'_blank'); 
					},(res)=>{
						console.log(res)
					})
				}
				
			},
			// 还款计划model
			openRepaymentSchedule : function () {
				this.repaymentScheduleModel = true;
				this.$API('post','repaymentPlan/selectOrderList',{
						userId:this.userId,
						orderId:this.id,
						repayStatus:100
				},this.userid,this.token,(res)=>{
					let arr = res.data.data;
					let newArr = [];
					let index = -1;
					arr.forEach(
						(item,index)=>{
							newArr.push(
								item.overdueStatus
							)
						}
					);
					if( newArr.indexOf(1) == -1 ){
						index = 0;
					}else {
						index = arr[newArr.lastIndexOf(1)+1]
					};
					arr[index].overdueStatus = 2;
					this.repaymentScheduleModelList = arr;
				},(res)=>{
					console.log(res)
				})
				
			},
			// 还款记录model
			openRepaymentHistory : function () {
				this.repaymentHistoryModel = true;
				this.$API('post','queryTransactionRecordOrderAuth',{
					orderId:this.id,
					dealTypeQuery:'3,5',
				},this.userid,this.token,(res)=>{
					// console.log( res.data.data.list )
					this.repaymentHistoryModelList = res.data.data.list;
				},(res)=>{
					console.log(res)
				})

			},
			// 垫付记录model
			openPaymentRecord : function () {
				this.paymentRecordModel = true;
				this.$API('post','queryTransactionRecordOrderAuth',{
					orderId:this.id,
					dealType:4,
				},this.userid,this.token,(res)=>{
					// console.log( res.data.data.list )
					this.paymentRecordModelList = res.data.data.list;
				},(res)=>{
					console.log(res)
				})
			},
			// 逾期减免记录model
			openCreditRecord : function () {
				this.creditRecordModel = true;
				this.$API('post','repaymentPlan/queryReduceRecourd',{
					orderId:this.id,
				},this.userid,this.token,(res)=>{
					// console.log( res.data.data.list )
					this.creditRecordModelList = res.data.data;
				},(res)=>{
					console.log(res)
				})
			},
			// 关闭模态框
			closeModel : function (state) {
				this.depositoryAccountModel = false;
				this.repaymentScheduleModel = false;
				this.repaymentHistoryModel = false;
				this.paymentRecordModel = false;
				this.creditRecordModel = false;

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
	.hints{
		display: inline-block;
		width: 85px;
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
		border-top : 1px dashed #F3F3F4;
	}

	.message_left {
		padding: 25px 20px ;
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
        position: relative;
	}

	.hide_d_d {
		width: 55.5%;
		background: #fff;
		border-radius: 10px;
		padding: 0 20px 20px 20px;
		box-sizing: border-box;
        position: relative;
	}

	.hide_d_d_d {
		width: 60.95%;
		background: #fff;
		border-radius: 10px;
		padding: 0 20px 20px 20px;
		box-sizing: border-box;
        position: relative;
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
	
	.list {
		background: #fff;
	}
	
	.list_h {
		height: 42px;
		background: #F3F3F4;
		margin: 0 -20px;
		border-bottom: 1px solid #E7EAEC;
	}
	
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
		background: #F3F3F4;
		border: none;
	}
	
	.list_h_btnon {
		width: 120px;
		height: 42px;
		text-align: center;
		line-height: 40px;
		color: #51B095;
		font-size: 16px;
		font-family: PingFangSC-Medium;
		font-weight: bold;
		border: none;
		outline: none;
		background: #fff;
		border-top: 1px solid #E7EAEC;
		/*border-left: 1px solid #E7EAEC;*/
		border-right: 1px solid #E7EAEC;
		border-bottom: 1px solid #fff;
		border-radius:4px 4px 0 0 ;
	}
	
	.list_data {
		padding-top: 20px;
	}
	
	.list_data_h {
		background: #F3F3F4;
		box-sizing: border-box;
	}
	
	.list_data_h div {
		width: 100%;
		height: 44px;
		text-align: center;
		line-height: 44px;
		border: 1px solid #DDDDDD;
		font-size: 14px;
		font-family: PingFangSC-Medium;
		font-weight: bold;
		color: #686A6C;
	}
	
	.list_data_c:nth-child(odd) {
		background: #f9f9f9;
		box-sizing: border-box;
	}
	
	.list_data_c:nth-child(even) {
		background: #fff;
		box-sizing: border-box;
	}
	
	.list_data_c div {
		width: 100%;
		height: 44px;
		text-align: center;
		line-height: 44px;
		border: 1px solid #E7EAEC;
		font-size: 14px;
		font-family: PingFangSC-Regular;
		font-weight: 400;
		color: #686A6C;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	
	.list_data_c div button {
		width: 54px;
		height: 24px;
		line-height: 24px;
		color: #fff;
		font-size: 14px;
		font-family: PingFangSC-Regular;
		font-weight: 400;
		border-radius: 4px;
		background: #EEAF68;
		border: none;
		outline: none;
		cursor: pointer;
	}
	
	.list_data_b {
		margin-top: 12px;
		padding-bottom: 10px;
	}

	.colorCCC {
		color: #686A6C;
    }

    .blod {
        font-weight: bold;
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

    .fenqi_flex div h5 {
        font-size:14px;
        font-family:PingFangSC-Medium;
        font-weight: bolder;
        color:rgba(64,64,64,1);
    }

     .fenqi_flex div ul {
         float: left;
         margin-left: 100px;
     }

     .fenqi_flex div ul li {
        height: 14px;
        margin-top: 14px;
        font-size:14px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(87,87,87,1);
     }

    .fenqi_flex div:first-child {
        width: 236px;
        position: relative;
        float: left;
        height: 189px;
    }

    .fenqi_flex div:first-child ul {
        margin-left: 0;
    }

    .fenqi_flex div:last-child div ul:first-child {
        margin-left: 0;
    }

    .fenqi_flex  div:last-child {
        float: left;
        height: 189px;
    }

    .padding_left_20px {
        padding-left: 100px;
    }

    .line {
        width:1px;
        height:140px;
        background:rgba(239,240,244,1);
        position: absolute;
        right: 0;
        top:0;
    }
    .fenqi_flex_last_span {
        color:#EEAF68 !important;
        cursor: pointer;
     }
     
    .close {
		position: absolute;
		right: 12px;
		top: 10px;
		cursor: pointer;
	}

    .cunguan_model_content h3,.huankuan_model_content h3,.huankuan_model_content_jihua h3 {
        font-size:24px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(87,87,87,1);
        text-align: center;
        margin: 34px 0 26px;
    }


    .cunguan_model_content ul li {
        width: 274px;
        height: 48px;
        line-height: 48px;
        text-align: center;
        border-bottom: 1px solid rgba(239,240,244,1);
        margin: 0 auto;
        font-size:16px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(87,87,87,1);
		cursor: pointer;
	}
	
	.cunguan_model_content ul li a {
        color:rgba(87,87,87,1);
	}

    .cunguan_model_content ul li:last-child {
        border-bottom: none;
    }

	.scroll {
		height: 365px;
		overflow: hidden;
		overflow-y: auto;
	}

	.huankuan_model_content_jihua li i {
        font-style: normal;
    }

    .huankuan_model_content_jihua li {
        position: relative;
        height: 13px;
        margin-bottom: 12px;
    }

    .huankuan_model_content_jihua li span {
        float: right;
    }

	.huankuan_model_content_jihua div ul {
		margin-top: 14px;
		border-bottom: 1px solid rgba(239,240,244,1);
	}

	.huankuan_model_content_jihua div ul:last-child {
		border: none;
	}

    .huankuan_model_content_jihua .bottom_li span{
        text-decoration: line-through;
        color:rgba(102,102,102,1);
    }

     .huankuan_model_content_jihua .bottom_li i {
        color:rgba(102,102,102,1);
     }

    .huankuan_model_content_jihua .top_li {
        font-size:14px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(37,37,37,1);
    }

    .huankuan_model_content_jihua .top_li i {
        width:32px;
        height:16px;
        background:rgba(217,74,82,1);
        border-radius:4px;
        display: inline-block;
        color: #fff;
        font-size:10px;
        line-height: 16px;
        text-align: center;
        position: absolute;
        left: 30px;
        top: 3px;
    }



    .huankuan_model_content li i {
        font-style: normal;
    }

    .huankuan_model_content li {
        position: relative;
        height: 13px;
        margin-bottom: 12px;
    }

    .huankuan_model_content li span {
        float: right;
    }

    .huankuan_model_content .bottom_li span{
        text-decoration: line-through;
        color:rgba(102,102,102,1);
    }

     .huankuan_model_content .bottom_li i {
        color:rgba(102,102,102,1);
     }

    .huankuan_model_content .top_li {
        font-size:14px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(37,37,37,1);
    }

    .huankuan_model_content .top_li i {
        width:32px;
        height:16px;
        background:rgba(217,74,82,1);
        border-radius:4px;
        display: inline-block;
        color: #fff;
        font-size:10px;
        line-height: 16px;
        text-align: center;
        position: absolute;
        left: 30px;
        top: 3px;
    }

    .backcolor_yellow{
        background-color: #EBA052 !important;
    }

	.repayment_history {
		margin-bottom: 14px;
		background-color: #FAFAFA;
	}

	.repayment_history_top {
		border:1px solid rgba(239,240,244,1);
		border-radius:10px 10px 0 0;
		height: 40px;
		line-height: 40px;
		padding: 0 21px 0;
		color:rgba(102,102,102,1);
	}

	.repayment_history_top span {
		float:right;
		font-size:16px;
		font-family:PingFangSC-Medium;
		font-weight:500;
		color:rgba(37,37,37,1);
	}

	.repayment_history_top i {
		font-style: normal;
		/* width:32px; */
		padding:  0 3px;
        height:16px;
        background:rgba(217,74,82,1);
        border-radius:4px;
        display: inline-block;
        color: #fff;
        font-size:10px;
        line-height: 18px;
        text-align: center;
		margin-left: 3px;
	}

	.repayment_history_content {
		border:1px solid rgba(239,240,244,1);
		border-top: none;
		padding: 3px 20px 0;
		border-radius:0 0 10px 10px ;
	}

	.repayment_history_content ul li {
		font-size:12px;
		font-family:PingFangSC-Regular;
		font-weight:400;
		color:rgba(102,102,102,1);
	}

	.repayment_history_content ul li span {
		font-size:16px;
		font-family:PingFangSC-Medium;
		font-weight:500;
		color:rgba(37,37,37,1);
	}
	.clear {
		clear: both;
	}

	.height_543 {
		height: 543px !important;
	}
</style>