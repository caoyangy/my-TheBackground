<template>
    <div>
        <!--头部信息-->
		<div class="H_t flex side_sdx mainAlign_center">
            <div>课程管理</div>
			<div>
                首页&nbsp;&nbsp; /&nbsp;&nbsp; 
                <router-link class="colorCCC " to="/YallShopMsg">门店信息</router-link>&nbsp;&nbsp; /&nbsp;&nbsp; 
                <span  class="colorCCC" to="/YshopManagement">课程管理</span>&nbsp;&nbsp; /&nbsp;&nbsp; 
                <router-link v-if="courseId"  class="colorCCC blod" to="/YaddorputCouser">修改课程</router-link>
                <router-link v-else class="colorCCC blod" to="/addorputCouser">添加课程</router-link>
            </div>
			
		</div>

        <div class=" add_couser ">

            <div class=" add_couser_top ">
                添加课程

            </div>

            <div class=" add_couser_content ">
                <Form ref:formValidate :model="formValidate" :rules="ruleValidate" :label-width="120">

                    <FormItem label="课程名称" prop="name">
                        <i-input class="add_couser_content_form_input" disabled v-model="formValidate.name" placeholder="请输入课程名称"></i-input>
                    </FormItem>

                    <div class="dashed"></div>
                    <FormItem label="课程缩略图" prop="picture">

                        <div  class="demo-upload-list" >
                                <img :src="formValidate.thumbnailImage">
                                <!-- <div class="demo-upload-list-cover">
                                    <Icon type="ios-eye-outline" @click.native="handleView(index)"></Icon>
                                    <Icon type="ios-trash-outline" @click.native="handleRemove(index)"></Icon>
                                </div>
                            <template>
                                <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
                            </template> -->
                        </div>
                        <Modal v-model="visible"  >
                            <img :src="imgNames"  v-if="visible"  style="width: 100%">
                        </Modal>
                    </FormItem>

                    <div class="dashed"></div>
                    <FormItem label="课程展示图" prop="picture">

                        <div  class="demo-upload-list" v-for="(item,index) in formValidate.image" :key="index">
                                <img :src="item">
                                <div class="demo-upload-list-cover">
                                    <Icon type="ios-eye-outline" @click.native="handleView(index)"></Icon>
                                    <!-- <Icon type="ios-trash-outline" @click.native="handleRemove(index)"></Icon> -->
                                </div>
                            <template>
                                <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
                            </template>
                        </div>
                        <Modal v-model="visible"  >
                            <img :src="imgNames"  v-if="visible"  style="width: 100%">
                        </Modal>
                    </FormItem>

                    <div class="dashed"></div>

                    <FormItem label="课程简介" prop="productIntro">
                        <i-input class="add_couser_content_form_input" disabled v-model="formValidate.productIntro" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入课程简介"></i-input> 
                    </FormItem>

                    <div class="dashed"></div>
                   
                    <FormItem label="课程原价" prop="oldPrice ">
                        <i-input class="add_couser_content_form_input" disabled v-model="formValidate.oldPrice " type="text" placeholder="请输入课程原价"></i-input>
                        <span class="yuan">元</span>
                    </FormItem>
                    
                    <div class="dashed"></div>

                    <FormItem label="优惠价格" prop="price">
                        <i-input class="add_couser_content_form_input" disabled v-model="formValidate.price" placeholder="请输入课程原价"> </i-input> 
                        <span class="yuan">元</span>
                    </FormItem>
                    <div class="dashed"></div>

                    <FormItem label="课程标签" prop="">
                        <div class="Label" v-for="(time,index) in Label">
                            <i-input class="add_couser_content_form_input" disabled v-model="Label[index]" placeholder="请输入课程标签"> </i-input> 
                            <!-- <span @click="LabelDelete(index)" class="LabelDelete"><Icon type="ios-close" /></span> -->
                        </div>
                        <!-- <div @click="LabelAdd" class="LabelAdd"><Icon type="ios-add" class="iosadd"/></div> -->
                    </FormItem>

                    <div class="dashed"></div>
                    
                    <FormItem label="课程亮点" prop="lightspot">
                        <i-input class="add_couser_content_form_input" disabled v-model="formValidate.lightspot" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入..."></i-input>
                    </FormItem> 

                    <div class="dashed"></div>

                    <FormItem label="课程详情" prop="description">
                        <!-- <i-input class="add_couser_content_form_input marin_40" v-model="formValidate.description" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入..."></i-input> -->
                        <i-input class="add_couser_content_form_input " disabled v-model="formValidate.description" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入..."></i-input>

                        <br>

                        <div v-if="false"  class="demo-upload-list" v-for="(item,index) in uploadListCopy" :key="index">
                            <template v-if="item.status === 'finished'">
                                <img :src="item.response.data.url">
                                <div class="demo-upload-list-cover">
                                    <Icon type="ios-eye-outline" @click.native="handleViewCopy(index)"></Icon>
                                    <Icon type="ios-trash-outline" @click.native="handleRemoveCopy(index)"></Icon>
                                </div>
                            </template>
                            <template v-else>
                                <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
                            </template>
                        </div>

                        <Upload
                            v-if="false" 
                            ref="uploadCopy"
                            :show-upload-list="false"
                            :default-file-list="defaultListes"
                            :on-success="handleSuccessCopy"
                            :format="['jpg','jpeg','png']"
                            :max-size="2048"
                            :on-format-error="handleFormatErrorCopy"
                            :on-exceeded-size="handleMaxSizeCopy"
                            :before-upload="handleBeforeUploadCopy"
                            multiple
                            type="drag"
                            action="https://mgmall.huanyueguoji.com/mall_api/uploadImg"
                            style="display: inline-block;width:58px;">
                            <div style="width: 58px;height:58px;line-height: 58px;">
                                <Icon type="ios-camera" size="20"></Icon>
                            </div>
                        </Upload>
                        <Modal v-if="false"  v-model="visibleCopy"  >
                            <img :src="imgNamesCopy"  v-if="visibleCopy"  style="width: 100%">
                        </Modal>


                    </FormItem>

                    <div class="dashed"></div>

                    <FormItem label="课程状态" prop="flages">
                        <Button @click="changeUpDownState('0')" class="up" :style="{'borderColor':formValidate.upDownState=='0'?'rgba(82,176,149,1)':'rgba(231,234,236,1)'}">上架</Button>
                        <Button @click="changeUpDownState('1')" class="down" :style="{'borderColor':formValidate.upDownState=='1'?'rgba(82,176,149,1)':'rgba(231,234,236,1)'}">下架 </Button>
                    </FormItem>

                    <div class="dashed"></div>

                    <FormItem class="select_position" label="课程类型" prop="courseTypeOne">
                     

                         <el-select v-model="formValidate.courseTypeOne" disabled @change="selectTypeOne(formValidate.courseTypeOne)"  placeholder="一级分类">
                            <el-option
                            v-for="(item,index) in courseTypeOneList"
                            :key="index"
                            :label="item.name"
                            :value="item.id"
                            @click.native="delet()">
                            </el-option>
                            
                        </el-select>
                        <el-select   v-model="formValidate.categoryName"  disabled placeholder="二级分类">
                            <el-option
                            v-for="(item,index) in courseTypeTwoList"
                            :key="index"
                            :label="item.name"
                            :value="index"
                            @click.native="county(item.id,item.name)">
                            </el-option>
                        </el-select>
                    </FormItem>
                    <div class="dashed"></div>
                    <FormItem label="课程有效期至" prop="courseEffectiveTime">
                        <DatePicker type="date" placeholder="请输入课程有效期至" disabled  @on-change="createChange" v-model="formValidate.courseEffectiveTime">
                        </DatePicker>
                    </FormItem>
                    <div class="dashed"></div>

                    <FormItem class="ivu-form-item_sbmit ">
                        <Button class="submit_msg" @click=" submitMsg() ">提交</Button>
                        <!-- <Button  @click="dialogVisible = true" class="delete_msg">删除</Button> -->
                    </FormItem>
                    
                </Form>
            </div>
        </div>
        <el-dialog
            :visible.sync="dialogVisible"
            top="15%"
            width="22.92%"
            center
            >
            <span class="dialog_content">您确定删除吗</span>
            <span slot="footer" class="dialog-footer">
                <el-button class="submit_yse"  @click="deleateMsg()">确 定</el-button>
                <el-button class="submit_no" @click="dialogVisible = false">取 消</el-button>
            </span>
        </el-dialog>
        <div class="hide flex sideAlign_center mainAlign_center" v-show="telshow">
			<div class="hide_d">
				<div class="flex main_ydz"><img src="../../assets/img/shut.png" class="cha" @click="shut"></div>
				<div class="hide_title">请输入上下架原因</div>
				<textarea class="textarea" name="6" rows="4" cols="" placeholder="请填写上下架原因" ref='telcontent'></textarea>
				<div class="flex mainAlign_center">
					<input type="button" name="" id="" value="提交" class="btnsALL" @click="telrecheck" />
					<input type="button" name="" id="" value="取消" class="btnsALL" @click="shut" />
				</div>
			</div>
		</div>
    </div>
</template>

<script>
    import uploadVue from '../../components/upload.vue'
export default {
    components: {
        uploadVue
    },
    data () {
        const validatePass = (rule, value, callback) => {
                if ( typeof value !== 'number' ) {
                    callback(new Error('请输入数字'));
                } if (this.ruleValidate.price !== '') {
                    // 对第二个密码框单独验证
                    this.$refs.ruleValidate.validateField('price');
                }
                callback();
            };
            
        return {
            upAndDownReason:"",
            telshow:false,
            formValidate: {
                name: '',
                picture: '',
                productIntro: '',
                price: '',
                oldPrice : '',//price
                lightspot: '',
                description:'',  
                upDownState:'0', // 上架状态
                courseTypeOne : '', //一级商品id
                courseTypeTwo : '',  // 二级商品id
                image:[],//封面
                descriptionImage:[],
                categoryName:'',
                courseEffectiveTime:"", //课程有效期
                thumbnailImage:"",
            },
            courseTypeOneList:[], // 一级商品列表
            courseTypeTwoList:[], //二级商品列表
            courseId:null, // 商品id
             dialogVisible: false,//模态框状态
            ruleValidate: {
                name: [
                    { required: true, message: '课程名称不能为空', trigger: 'blur' }
                ],
                picture: [
                    { required: true, message: '课程展示图能为空', trigger: 'blur' },
                ],
                productIntro: [
                    { required: true, message: '请输入课程简介', trigger: 'blur' }
                ],
                price: [
                    { required: true, message: '请输入价格', trigger: 'blur' },
                    // { validateField: validatePass, trigger: 'blur' },
                ],
                oldPrice: [
                    { required: true, message: '请输入优惠价格', trigger: 'blur' },
                ],
                lightspot: [
                    {required: true, message: '请输入课程亮点', trigger: 'blur'}
                ],
                description: [
                    {required: true, message: '请输入课程详情', trigger: 'blur'}
                ],
                courseTypeOne:[
                    { required: true, message: '请选择一级分类和二级分类', trigger: 'blur' }
                ],
                Termofvalidity:[
                    { required: true, message: '请输入课程有效期', trigger: 'blur' }
                ],
                Label:[
                    { required: true, message: '课程标签不能为空', trigger: 'blur' }
                ],

            },
            defaultListes: [],
            defaultList: [],
            imgName: '',
            visible: false, // 控制模态框
            uploadList: [], //下载的
            storeImg:"",
            ossUrl:"",
            storeId:'',
            userId:'',
            storagUuserid:'',
            storagToken:'',
            imgNames: '',
            visible: false,
            uploadList: [],
            uploadListCopy:[],
            visibleCopy:false,
            imgNames:'',
            URLS:'',
            categoryName:'',
            Label:[""]
         }
    },
    methods: {
        handleSubmit (name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    this.$Message.success('提交成功!');
                } else {
                    this.$Message.error('表单验证失败!');
                }
            })
        },
        handleReset (name) {
            this.$refs[name].resetFields();
        },
        changeUpDownState( state ){
            this.telshow=true;
            this.formValidate.upDownState = state;
        }, // 上架和下架
        nameVerify : function(rule, value, callback){
            },
               
        selectTypeOne(ele){
            this.$API('post','category/findByEntity',{
					"parentId": ele
				},this.storagUuserid,this.storagToken,(res)=>{
                    this.courseTypeTwoList = res.data.data.list;
                    this.formValidate.courseTypeTwo = this.courseTypeTwoList[0].name
                })
        },
        submitMsg () {
            let formValidate = this.formValidate;
            let index = formValidate.courseTypeTwo;
            let courseTypeTwoList = this.courseTypeTwoList[0];
            console.log(this.storagUuserid,this.storagToken)
                if(this.$route.query.num){
                    var aa=this.Label.join()
                    console.log(aa)
                    var URLS="/productInfo/terraceUpdateCourse"
                    var data={
                        "id":  "585060544315129856",
                        'putAway':this.formValidate.upDownState,
                        'upAndDownReason':this.upAndDownReason,
                    }
                }else{
                    var aa=this.Label.join()
                    var URLS="/productInfo/terraceUpdateCourse"
                    var data={
                        "id":  this.courseId,
                        'putAway':this.formValidate.upDownState,
                        'upAndDownReason':this.upAndDownReason,
                    }
                
                }
                this.$API('post',URLS,data 
				,this.storagUuserid,this.storagToken,(res)=>{
                    this.$router.push({
						path: '/YallShopMsg',
					})
				},(res)=>{
                    this.$message.error(res.data.message);
                })
            // }
        },
        // 提交事件
        deleateMsg () {
            console.log(this.storagUuserid,this.storagToken)
            this.$API('post','productInfo/delete',{
                "id": this.courseId,
            },this.storagUuserid,this.storagToken,(res)=>{
                this.$message.success(res.data.message);
                this.$router.push({
                    path: '/YallShopMsg',
                })
                
            },(res)=>{
                this.$message.error(res.data.message);
            })
            this.dialogVisible = false;
        }, //删除事件

        //上传图片
			handleView (index) {
				this.visible = true;
				this.imgNames = this.formValidate.image[index];
            },
            handleRemove (index) {
                 this.formValidate.image.splice(index,1);
				this.uploadList.splice(index,1);
            },
            handleSuccess (res, file,fileList) {
                this.formValidate.image.push(
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
            },

             //上传课程详情图片
            
			handleViewCopy (index) {
				this.visibleCopy = true;
				this.imgNamesCopy = this.formValidate.descriptionImage[index];
            },
            handleRemoveCopy (index) {
                this.formValidate.descriptionImage.splice(index,1);
				this.uploadList.splice(index,1);
            },
            handleSuccessCopy (res, file,fileList) {
                this.formValidate.descriptionImage.push(
 					res.data.url
                )
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
                const check = this.uploadList.length < 5;
                if (!check) {
                    this.$Notice.warning({
                        title: 'Up to five pictures can be uploaded.'
                    });
                }
                return check;
            },
             county(id,name){
                this.formValidate.categoryId =id
                this.formValidate.categoryName=name
            },
            delet(){
                this.formValidate.categoryName=''
            },
            LabelAdd(){
                this.Label.push("")
            },
            LabelDelete(i){
                this.Label.splice(i,1)
            },
            createChange(daterange) {
                console.log(daterange)
                this.formValidate.courseEffectiveTime = daterange
            },
            shut(){
                this.telshow=false
                this.$refs.telcontent.value=""
            },
            telrecheck(){
                this.telshow=false
                this.upAndDownReason=this.$refs.telcontent.value
            }
    },
    created () {
        this.storagUuserid = localStorage.getItem('userid');
        this.storagToken= localStorage.getItem('token');
        let formValidate = this.formValidate;
        let couserMsg = this.$route.query.couserMsg;
        console.log(couserMsg)
        if( couserMsg ){
            this.selectTypeOne(couserMsg.parentId )
            formValidate.name = couserMsg.name;
            formValidate.productIntro = couserMsg.productIntro;
            formValidate.price = couserMsg.price;
            formValidate.oldPrice = couserMsg.oldPrice;
            formValidate.lightspot = couserMsg.brightSpot;
            formValidate.description = couserMsg.description;
            formValidate.image = couserMsg.regUrl;
            formValidate.courseTypeOne = couserMsg.parentId;
            this.formValidate.categoryId = couserMsg.categoryId;
            this.formValidate.categoryName = couserMsg.categoryName;
            this.formValidate.courseEffectiveTime = couserMsg.courseEffectiveTime;
            this.formValidate.thumbnailImage = couserMsg.thumbnailImage;
            var courseLabel= couserMsg.courseLabel;
            if(courseLabel){
                this.Label=courseLabel.split(",")
            }
            console.log(formValidate)
            // formValidate.image = JSON.parse( couserMsg.coursePictureUrl);
            this.courseId = this.$route.query.couserMsg.id;
        }else{
            this.URLS='productInfo/create'
        }
        if( this.$route.query.couserMsg ){
            this.courseId = this.$route.query.couserMsg.id;
            this.storeId = this.$route.query.couserMsg.storeId;

        }else {
            this.storeId = this.$route.query.id; // 传过来的商品id
            this.userId = this.$route.query.userId;
        }
        // this.$API('post','category/findByEntity',{
		// 			"level": "1"
        // },this.storagUuserid,this.storagToken,(res)=>{
		// 			this.courseTypeOneList = res.data.data.list;
        // }) //获取一级分类列表
        
        this.$API(
            "post",
            "category/findByEntity",
            {
                level: "1"
            },
            this.storagUuserid,
            this.storagToken,
            res => {
                this.courseTypeOneList = res.data.data.list;
                console.log(this.courseTypeOneList);
            }
         );

    },
    mounted () {
            // this.uploadList = this.$refs.upload.fileList;
            // console.log(this.$refs.upload.fileList)
            // this.uploadListCopy = this.$refs.uploadCopy.fileList;
        },
}
</script>


<style scoped>
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
    
    .add_couser {
        background: #fff;
        /* height: 928px; */
        margin: 20px;
        border-top: 6px solid rgba(231,234,236,1);
    }

    .add_couser_top {
        height: 45px;
        line-height: 45px;
        color:rgba(104,107,109,1);
        text-indent: 19px;
        border-bottom: 1px solid rgba(231,234,236,1);
        font-size:16px;
        font-family:PingFangSC-Medium;
        font-weight:500;
        color:rgba(104,107,109,1);
    }
    
    .add_couser_content {
        padding-top: 20px;
        padding-bottom: 20px;
    }

    .ivu-input {
        width: 354px !important;
    }

    .add_couser_content_form_input {
        width: 354px !important;
    }

    .dashed {
        border-bottom: 1px dashed #E7EAEC;
        margin-bottom: 20px;
        width: 99%;
        margin-left: 1%;
    }

    .ivu-form-item-content {
        position: relative;
    }

    .ivu-form-item-content .yuan {
        position: absolute;
        left: 365px;
        top: 5px;
        font-size:14px;
        font-family:PingFangSC-Medium;
        font-weight:500;
        color:rgba(104,106,108,1);
    }

    .ivu-form-item-content .up,.ivu-form-item-content .down {
        background: #fff;
        width:64px;
        height:34px;
        border:1px solid rgba(231,234,236,1);
        border-radius:4px;
        margin-right: 20px;
        cursor: pointer;
        outline: none;
    }
    .submit_msg {
        width:124px;
        height:38px;
        background:rgba(82,176,149,1);
        border-radius:4px;
        font-size:14px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(255,255,255,1);
        /* outline: none; */
        border: none;
        cursor: pointer;
        margin-right: 40px;
        margin-top: 10px;
    }
    .delete_msg {
        width:124px;
        height:38px;
        background:rgba(221,97,106,1);
        border-radius:4px;
        font-size:14px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(255,255,255,1);
        /* outline: none; */
        border: none;
        margin-top: 10px;
        cursor: pointer;
    }
    .select_position {
        position: relative;
    }

    .select_position .ivu-select-single {
        width: 10%;
        margin-right: 1%;
    }

    .demo-upload-list {
        float: left;
        width: 3.6%;
        height: 3.6%;
    }

    .demo-upload-list img {
        width: 100%;
    }
    
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
    .el-select .el-input__inner {
        width: 200px;
        height: 35px;
    }

    .el-select  {
        margin-right: 20px;
    }

    .colorCCC {
		color: #686A6C;
    }

    .blod {
        font-weight: bold;
    }

    .el-dialog {
        border-radius: 15px;
    }

    .dialog_content {
        display: inline-block;
        width: 100%;
        text-align: center;
        font-size: 22px;
        font-weight: bold;
        color: #575757;
    }

    .submit_yse {
        background: #52B095;
        color: #fff;
        border-radius: 8px;
    }

    .submit_no {
        background: #C7C7C7;
        color: #fff;
        border-radius: 8px;
    }

    .ivu-form-item_sbmit button{
        padding-bottom: 20px;
    }

    .again_upload {
        cursor: pointer;
        color: blue;
    }

    .marin_40 {
        margin: 30px 0;
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
    .flexw{
        display: flex;
    }
    .Label{
        position: relative;
        display: inline;
    }
    .LabelDelete{
        position: relative;
        top: -10px;
        left: -10px;
        text-align: center;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        line-height: 20px;
        font-size: 16px;
        background-color: #fff;
        cursor:pointer;
    }
    .LabelAdd{
        display: inline-block;
        width: 25px;
        height: 25px;
        border: 1px solid #ccc;
        border-radius: 4px;
        font-size: 20px;
        text-align: center;
        line-height: 20px;
        cursor:pointer;
    }
    .iosadd{
        line-height: 20px;
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
</style>
