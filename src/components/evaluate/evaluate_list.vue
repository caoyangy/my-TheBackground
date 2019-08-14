<template>
    <div class="flex side_sdx ivuInput-box">
        <!--头部信息-->
        <div class="H_t flex side_sdx mainAlign_center">
            <div>评价管理</div>
            <div>
                <router-link class="colorCCC" to="/evaluateList">评价管理管理</router-link>&nbsp;&nbsp; /&nbsp;&nbsp;
                <router-link class="colorCCC blod" to="/evaluateList">评价管理管理列表</router-link>
            </div>
        </div>

        <div class="list">
            <!-- 搜素内容 -->
            <div class="search_box">
                <Form :model="searchData" :rules="searchData" ref='searchData' inline>
                    <FormItem prop="comprehensiveQueryField">
                        <Input :style="input_width" icon="ios-search" v-model="searchData.comprehensiveQueryField"
                            placeholder="请输入订单编号、供应商、商品名称"></Input>
                    </FormItem>
                    <FormItem label="评论时间：" :label-width="110" prop="startScoretDateTime">
                        <DatePicker type="date" placeholder="起始时间" :style="selectStyle" @on-change="createChange" v-model="searchData.startScoretDateTime">
                        </DatePicker>
                    </FormItem>
                    <FormItem :label-width="15" label="-" prop="endScoreDateTime">
                        <DatePicker type="date" placeholder="截止时间" :style="selectStyle" @on-change="TransactionChange" v-model="searchData.endScoreDateTime">
                        </DatePicker>
                    </FormItem>
                    <FormItem prop="evaluate" :label-width="30">
                        <Select placeholder="请选择" v-model="searchData.evaluate" :style="selectStyle" @on-change="evaluateIdChange">
                            <Option :value="item.value" v-for="(item,i) in evaluateTypeList" :key="i">{{item.label}}
                            </Option>
                        </Select>
                    </FormItem>
                    <FormItem prop="provider" :label-width="30">
                        <Select placeholder="请选择" v-model="searchData.provider" :style="selectStyle" @on-change="providerIdChange">
                            <Option :value="item.value" v-for="(item,i) in discussTypeList" :key="i">{{item.label}}
                            </Option>
                        </Select>
                    </FormItem>
                    <FormItem prop="Shield" :label-width="30">
                        <Select placeholder="请选择" v-model="searchData.Shield" :style="selectStyle" @on-change="ShieldIdChange">
                            <Option :value="item.value" v-for="(item,i) in ShieldTypeList" :key="i">{{item.label}}
                            </Option>
                        </Select>
                    </FormItem>
                    <div class="search">
                        <Button type="primary" @click="clearVal('searchData')" class="fr mar_l20">清空</Button>
                        <Button type="primary" @click="getList()" class="fr">搜索</Button>
                    </div>
                </Form>
            </div>
            <div class="list_data" >
				<!--列表头部-->
				<div class="list_data_h flex main_zdy mainAlign_around">
					<div>供应商</div>
					<div>评论时间</div>
					<div>商品信息</div>
					<div>评价人</div>
					<div>评价</div>
					<div>评价内容</div>
					<div>评价投诉</div>
					<div>操作</div>
				</div>

				<!--数据列表-->
                <div v-if="dataList.length==0" class="nolist">暂无数据</div>
				<div v-else class="list_data_c flex main_zdy mainAlign_around" v-for='(item,index) in dataList' :key='index'> 
					<div :title="item.shopName">{{item.shopName}}</div>
					<div :title="item.goodsScoreDateTime">{{item.goodsScoreDateTime}}</div>
					<div>
                        <img :src="item.goodsPic" alt="" class="imgtable">
                        <div class="goodsName">{{item.goodsName}}</div>
                        <div class="goodsMoney">￥{{item.goodsMoney}}</div>
                    </div>
					<div>{{item.userName}}</div>
					<div>
                        <Rate disabled v-model="item.goodsScore*1"/>
                    </div>
					<div :title="item.goodsScoreWordsComment">{{item.goodsScoreWordsComment}}</div>
					<div :title="item.goodsScoreComplainWordsComment">{{item.goodsScoreComplainWordsComment}}</div>
					<div>
                        <div class="complaints" v-if="item.isHandlingComplaints" @click="complaints(item)">
                            处理投诉
                        </div>
                        <div class="details" @click="complaints(item)">
                            详情
                        </div>
                        <div v-if="!item.isHandlingComplaints">
                            <div class="Shield" v-if="item.shieldStatus==0" @click="Shield(item.goodsScoreId,index)">
                                屏蔽
                            </div>
                            <div class="Shield" v-if="item.shieldStatus==1">
                                已屏蔽
                            </div>
                        </div>
                        
					</div>
				
				</div>
			</div>
            <!-- table表格 -->
            <div class="list_data">
                <!-- <Table border stripe :columns="columns" :data="dataList"></Table> -->
                <div class="list_data_b flex main_ydz">
                    <Page :total="Page.total" :page-size="Page.pageSize" :current="Page.current" @on-change="pageChange">
                    </Page>
                </div>    
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
                input_width: 'width: 250px',
                selectStyle: "width: 170px",
                userid: "",
                token: "",
                searchData: {
                    comprehensiveQueryField: '',
                    startScoretDateTime: '',
                    endScoreDateTime: '',
                    scoreGrade: "",
                    isHaveContent: "",
                    evaluate:"",
                    provider:"",
                    isShieldStatus:3,
                    Shield:"",
                },
                evaluateTypeList: [
                    {
                        label: '全部评价',
                        value: '全部评价',
                    },
                    {
                        label: '好评',
                        value: '好评',
                    },
                    {
                        label: '中评',
                        value: '中评',
                    },
                    {
                        label: '差评',
                        value: '差评'
                    },
                ],
                discussTypeList: [
                    {
                        label: '全部评论',
                        value: '全部评论'
                    },
                    {
                        label: '有内容评论',
                        value: '有内容评论',
                    },
                    {
                        label: '无内容评论',
                        value: '无内容评论',
                    }
                ],
                ShieldTypeList:[
                    {
                        label: '未屏蔽',
                        value:'未屏蔽'
                    },
                    {
                        label: '已屏蔽',
                        value:'已屏蔽',
                    },
                ],
                // 表单列表
                columns: [
                    {
                        title: '供应商',
                        key: 'shopName',
                        align: "center",
                        width: 200,
                    },
                    {
                        title: '评论时间',
                        // key: 'goodsScoreDateTime',
                        align: "center",
                        width: 160,
                        render: (h, params) => {
                            return h('div', [
                                h('span', moment(params.row.goodsScoreDateTime).format('YYYY-MM-DD HH:mm:ss')),
                            ]);
                        }
                    },
                    {
                        title: '商品信息',
                        key: 'goodsName',
                        width: 240,
                        align: "center",
                        render: (h, params) => {
                            return h('div', 
                                {
                                style: {
                                    height: "90px",
                                    position: "relative",
                                }
                                },
                                [
                                    h("img", {
                                        attrs: {
                                        src: params.row.goodsPic
                                        },
                                        style: {
                                            width: "80px",
                                            height: "80px",
                                            margin: "10px",
                                            position: "relative",
                                            top: "0px",
                                            left: "-80px",
                                        }
                                    }),
                                    h("div", {
                                        style: {
                                            width: "130px",
                                            height: "32px",
                                            overflow:"hidden",
                                            margin: "10px",
                                            textOverflow:"ellipsis",
                                            display: "-webkit-box",
                                            WebkitLineClamp:"2",
                                            WebkitBoxOrient:"vertical",
                                            lineClamp: "2",
                                            position: "relative",
                                            top: "-110px",
                                            left: "60px",
                                        }
                                       },
                                       params.row.goodsName
                                    ),
                                    h("div", {
                                        style: {
                                            width: "130px",
                                            height: "32px",
                                            margin: "10px",
                                            position: "relative",
                                            top: "-90px",
                                            left: "30px",
                                        }
                                       },
                                       "￥"+params.row.goodsMoney
                                    ),
                                ]
                               
                            );
                        }
                    },
                    {
                        title: '评价人',
                        key: 'userName',
                        width: 200,
                        align: "center",
                    },

                    {
                        title: '评价',
                        key: 'evaluate',
                        width: 200,
                        align: "center",
                        render: (h, params) => {
                          return h("div", [
                            h("Rate", {
                                attrs: {
                                    disabled:'',
                                   value: params.row.goodsScore*1
                                },
                                style: {
                                    // width: "100px",
                                    // height: "100px",
                                    // margin: "10px 0px"
                                }
                            })
                         ]);
                        }
                    },
                    {
                        title: '评价内容',
                        key: 'goodsScoreWordsComment',
                        width: 200,
                        align: "center",
                    },
                    {
                        title: '评价投诉',
                        key: 'goodsScoreComplainWordsComment',
                        width: 200,
                        align: "center",
                    },
                    {
                        title: '操作',
                        key: 'name',
                        width: 220,
                        fixed: 'right',
                        align: "center",
                        render: (h, params) => {
                            if(params.row.isHandlingComplaints){
                                return h('div', [
                                    h('div', {
                                        style: {
                                            width:"88px",
                                            height:"30px",
                                            margin:"5px auto",
                                            background:"#EEAF67",
                                            color:"#fff",
                                            fontSize:"14px",
                                            lineHeight:"30px", 
                                            borderRadius:"4px", 
                                            fontFamily: "PingFangSC-Regular",
                                        },
                                        on: {
                                            click: () => {
                                                this.$router.push({ path: '/evaluateDetails', query: {row: params.row} })
                                                sessionStorage.setItem('row', JSON.stringify(params.row));  
                                            }
                                        }
                                    }, '处理投诉'),
                                    h('div', {
                                        style: {
                                            width:"88px",
                                            height:"30px",
                                            margin:"5px auto",
                                            background:"#52B095",
                                            color:"#fff",
                                            fontSize:"14px",
                                            lineHeight:"30px", 
                                            borderRadius:"4px", 
                                            fontFamily: "PingFangSC-Regular",
                                        },
                                        on: {
                                            click: () => {
                                                this.$router.push({ path: '/evaluateDetails', query: {row: params.row} })
                                                sessionStorage.setItem('row', JSON.stringify(params.row));  
                                            }
                                        }
                                    }, '详情'),
                                    
                                ]);
                            }else{
                                return h('div', [
                                    h('div', {
                                        style: {
                                            width:"88px",
                                            height:"30px",
                                            margin:"0 auto",
                                            background:"#52B095",
                                            color:"#fff",
                                            fontSize:"14px",
                                            lineHeight:"30px", 
                                            borderRadius:"4px", 
                                            fontFamily: "PingFangSC-Regular",
                                        },
                                        on: {
                                            click: () => {
                                                this.$router.push({ path: '/evaluateDetails', query: {row: params.row} })
                                                sessionStorage.setItem('row', JSON.stringify(params.row));  
                                            }
                                        }
                                    }, '详情'),
                                    h("br"),
                                    h('a', {
                                        style: {
                                            color: '#D0715B',
                                            fontSize:"14px",
                                            lineHeight:"16px", 
                                            fontFamily: "PingFangSC-Regular",
                                        },
                                        on: {
                                            click: () => {
                                                alert("删除")
                                                // 调用删除接口
                                                this.del(params.row.orderId)
                                            }
                                        }
                                    }, "屏蔽"),
                                ]);
                            }
                            
                            
                        }
                    },
                ],
                dataList: [],//列表数据
                //分页
                Page: {
                    total: 0,
                    pageSize: 5,
                    current: 1
                },
            }
        },
        created() {
            this.userid = localStorage.getItem("userid");
            this.token = localStorage.getItem("token");
            this.getList(this.Page.current)
        },
        methods: {
            // 清空搜索内容
            clearVal(name) {
                // this.$refs[name].resetFields();//有点问题
                this.$refs.searchData.resetFields();
                this.Page.current = 1;
                this.getList();
            },
            // 搜索内容
            // getList() {
            //     console.log(this.searchData)
            // },
            // 开始时间
            createChange(daterange) {
                this.searchData.startScoretDateTime = daterange
            },
            // 结束时间
            TransactionChange(daterange) {
                console.log(daterange)
                this.searchData.endScoreDateTime = daterange
            },
            //获取列表数据
            getList() {
                // delete this.searchData.evaluate;
                // delete this.searchData.provider;
                console.log(this.searchData)
                const params = {
                    ...this.searchData,
                    pageNum: this.Page.current,
                    pageSize: this.Page.pageSize,
                };
                // console.log(params)
                var data = "";
                for (var i in params) {
                    data += encodeURIComponent(i) + "=" + encodeURIComponent(params[i]) + "&";
                }
                data = data.slice(0, -1);
                this.$APIMy(
                    "post",
                    "goodsscoremanager/queryordergoodsscorelist",
                    data,
                    this.userid,
                    this.token,
                    res => {
                        console.log( res);
                        this.dataList = []
                        var	data = res.data.data.list;
                        var aa=''
                        var indexs=''
                        for(var i=0;i<data.length;i++){
                            aa=moment(data[i].goodsScoreDateTime).format('YYYY-MM-DD HH:mm:ss')
                            indexs=	(this.Page.current - 1) * this.Page.pageSize + (i+ 1);
                            // data[i].goodsScoreComplainWordsComment="hahahahahahahha"
                            data[i].goodsScoreDateTime=aa
                            data[i].indexs=indexs
                            this.dataList=data
                        }
                        this.Page.total = res.data.data.total;
                    },
                    res => {
                        this.$Message.warning(res.data.result)
                    },
                    res => {
                        // console.log(res.data)
                        this.$Message.error(res)
                    }
                );
            },
            // 分页操作
            pageChange(e) {
                // console.log(e)
                this.Page.current = e;
                this.getList()
            },
            providerIdChange(val){
                // console.log(val)
                if(val=="全部评论"){
                    this.searchData.isHaveContent=0
                }else if(val=="有内容评论"){
                    this.searchData.isHaveContent=1
                }else{
                    this.searchData.isHaveContent=2
                }
                
            },
            evaluateIdChange(val){
                // console.log(val)
                if(val=="全部评价"){
                    this.searchData.scoreGrade=0
                }else if(val=="好评"){
                    this.searchData.scoreGrade=1
                }else if(val=="中评"){
                    this.searchData.scoreGrade=2
                }else{
                    this.searchData.scoreGrade=3
                }
            },
            complaints(item){
                console.log("详情")
                this.$router.push({ path: '/evaluateDetails', query: {row:item} })
                sessionStorage.setItem('row', JSON.stringify(item)); 
            },
            ShieldIdChange(e){
                if(e=="已屏蔽"){
                    this.searchData.isShieldStatus=1
                }else{
                    this.searchData.isShieldStatus=0
                }
            },
            Shield(id,index){
                this.dataList[index].shieldStatus=1
                console.log(id)
                var  data={
                    goodsScoreId:id
                }
                this.$APIMy(
                    "post",
                    "goodsscoremanager/shieldordergoodsbyid?goodsScoreId="+id,{},
                    this.userid,
                    this.token,
                    res => {
                        this.$Message.success(res.data.message)
                    },
                    res => {
                    },
                    res => {
                    }
                );
            }
        }
    }

</script>

<style scoped="scoped">
    .H_t {
        height: 70px;
        background: #fff;
        padding-left: 20px;
        border-bottom: 2px solid #e7eaec;
    }
.list_data_b {
		margin-top: 12px;
		padding-bottom: 10px;
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
        margin: 20px 20px 0 20px;
        padding: 0 20px;
    }

    .colorCCC {
        color: #686a6c;
    }

    .blod {
        font-weight: bold;
    }

    .search_box {
        margin: 30px 0 10px 0;
    }

    .search {
        display: inline-block;
        margin-left: 20px;
        /* float: right; */
    }

    .list_data {
        padding-top: 20px;
    }
    /* 修改 */
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
	
.list_data_h>div {
		width: 100%;
		height: 44px;
		text-align: center;
		line-height: 44px;
		border: 1px solid #DDDDDD;
		font-size: 14px;
		font-family: PingFangSC-Medium;
		font-weight: bold;
		color: #686A6C;
        overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.list_data_h div:nth-child(1){
			width: 70%;
	}
	.list_data_h div:nth-child(3){
			width: 130%;
	}
	.list_data_c:nth-child(odd) {
		background: #f9f9f9;
		box-sizing: border-box;
	}
	
	.list_data_c:nth-child(even) {
		background: #fff;
		box-sizing: border-box;
	}
	
	.list_data_c>div {
		width: 100%;
		height: 100px;
		text-align: center;
		line-height: 100px;
		border: 1px solid #E7EAEC;
		font-size: 12px;
		font-family: PingFangSC-Regular;
		font-weight: 400;
		color: #686A6C;
        position: relative;
        left: 0px;
        top: 0px;
        overflow: hidden;
	}
	.list_data_c>div:nth-child(1){
			width: 70%;
	}
	.list_data_c>div:nth-child(3){
			width: 130%;
	}
    .list_data_c>div:nth-child(8){
			padding-top: 15px;
	}
	/* .list_data_c:hover{
		background-color: #000;
	} */
	.list_data_b {
		margin-top: 12px;
		padding-bottom: 10px;
	}
	.nolist{
		width: 100%;
		height: 50px;
		text-align: center;
		line-height: 50px;
		font-size: 16px;
	}
    .imgtable{
        width: 30%;
        height: auto;
        margin: 10px;
        float: left;
    }
    .goodsName{
        width: 45%;
        height: 36px;
        margin: 10px 0px;
        line-height: 18px;
         overflow: hidden;
        text-overflow:ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        line-clamp: 2;
        -webkit-box-orient: vertical;
        position: absolute;
        left: 100px;
        top: 0px;
        float: left;
    }
    .goodsMoney{
        width: 130px;
        height: 40px;
        margin: 10px 0px;
        line-height: 18px;
        position: absolute;
        left: 100px;
        top: 55px;
        float: left;
        text-align: left;
    }
    .complaints{
        width: 88px;
        height: 30px;
        margin: 5px auto;
        background-color: #EEAF67;
        color: #fff;
        font-size: 14px;
        line-height: 30px;
        border-radius: 4px;
        font-family: PingFangSC-Regular;
        cursor:pointer;
    }
    .details{
        width: 88px;
        height: 30px;
        margin: 5px auto;
        background-color: #52B095;
        color: #fff;
        font-size: 14px;
        line-height: 30px;
        border-radius: 4px;
        font-family: PingFangSC-Regular;
        cursor:pointer;
    }
    .Shield{
        color: #D0715B;
        font-family: PingFangSC-Regular;
        font-size: 14px;
        line-height: 30px;
        cursor:pointer;
    }
    .list_data_c:hover{
        background-color: #f5f5f5;
    }
</style>