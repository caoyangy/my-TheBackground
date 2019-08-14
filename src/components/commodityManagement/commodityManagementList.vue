<template>
  <div class="flex side_sdx ivuInput-box">
    <!--头部信息-->
    <div class="H_t flex side_sdx mainAlign_center">
      <div>商品管理</div>
      <div>
        <router-link class="colorCCC blod" to="/commodityManagementList">商品管理</router-link>&nbsp;&nbsp; &nbsp;&nbsp;
        <!-- <router-link class="colorCCC blod" to="/commodityManagementList">商品管理列表</router-link> -->
      </div>
    </div>

    <div class="list">
      <!-- 搜索区域 -->
      <div class="search_box">
        <Form :model="queryData" ref="queryData" label-position="right" inline>
          <FormItem prop="goodsName">
            <Input
              :style="input_width"
              icon="ios-search"
              v-model="queryData.goodsName"
              placeholder="请输入商品名称"
            ></Input>
          </FormItem>

          <FormItem label="状态：" prop="status" :label-width="90">
            <Select placeholder="请选择" v-model="queryData.status" :style="selectStyle">
              <Option :value="item.value" v-for="(item,i) in statusList" :key="i">{{item.label}}</Option>
            </Select>
          </FormItem>
          <FormItem class="clearfix">
            <Button type="primary" @click="clearVal()" class="fr mar_l20">清空</Button>
            <Button type="primary" @click="getList()" class="fr">搜索</Button>
          </FormItem>
        </Form>
        <div>商城商品设置：
          <Button type="primary" @click="add()">添加商品</Button>
        </div>
      </div>

      <!-- 信息列表 -->
      <div v-if="dataList.length==0" class="nolist">暂无数据</div>
		<div class="list_data_h flex main_zdy mainAlign_around">
					<div>序号</div>
					<div>商品名称</div>
					<div>缩略图</div>
					<div>规格参数与价格</div>
					<div>状态</div>
					<div>操作</div>
				</div>
				<div v-if="dataList.length==0" class="nolist">暂无数据</div>
				<div v-else class="list_data_c flex main_zdy mainAlign_around" v-for='(item,index) in dataList' :key='index'> 
					<div>{{item.indexs}}</div>
					<div>{{item.goodsName}} </div>
					<div><img :src="item.goodsThumbnailImg" alt=""></div>
					<div>
            <div class="Color">{{item.goodsSpecVOList[0].specName}}</div>
            <div class="Border"></div>
            <div class="Conten">
                <span>
                    <i v-for='(k,v) in item.goodsSpecVOList[0].specItemVOList' class="myComponent">
                        {{k.specParamName}}          {{k.goodsPrice}}
                  </i><br>
                </span>
                
            </div>
            
          </div>
					<div>
            <span v-if="item.status != 0">上架</span>
            <span v-if="item.status == 0">下架</span></div>
					<div>
                <div class="operation">
                    <span @click="updateStatus(item.id,0)" v-if="item.status !=0" >下架</span>
                    <span @click="updateStatus(item.id,1)" v-else>上架</span><br>
                    <span  @click="See(item.id)">修改</span><br>
                    <span  @click="delt(item.id)">删除</span>
                </div>
                
					</div>
				</div>
      <!-- table表格 -->
      <div class="list_data">
        <!-- <Table stripe :columns="columns" :data="dataList"></Table> -->
        <div class="list_data_b flex main_ydz">
          <Page
            :total="Page.total"
            :page-size="Page.pageSize"
            :current="Page.current"
            @on-change="pageChange"
          ></Page>
        </div>  
      </div>
    </div>
    <!-- 删除模态框 -->
    <Modal
        v-model="delModal"
        title="删除商品"
        @on-cancel="cancelModal"
        @on-ok="del">
        <p>确定要删除该商品吗？</p>
    </Modal>
  </div>
</template>
<script>
import myComponent from "./myComponent.vue";
import { relative } from "path";
export default {
  data() {
    return {
      delModal: false,
      goodsId: Number,
      input_width: "width: 250px",
      selectStyle: "width: 170px",
      userid: "",
      token: "",
      queryData: {
        goodsName: "", //商品名称
        status: "" //状态
      },
      statusList: [
        {
          value: 0,
          label: "下架"
        },
        {
          value: 1,
          label: "上架"
        }
      ], // 状态列表 （0：下架 1：在售）
      columns: [
        {
          title: "编号",
          key: "index",
          align: "center",
          fixed: "left",
          width: 80,
          render: (h, params) => {
            let index =
              (this.Page.current - 1) * this.Page.pageSize + (params.index + 1);
            return h("div", [h("p", index)]);
          }
        },

        {
          title: "商品名称",
          key: "goodsName",
          align: "center",
           render: (h, params) => {
             return h("div",{
                style: {
                  width:"45%",
                  margin:"0 auto"
                }
             },
             params.row.goodsName
             )
           }
        },
        {
          title: "缩略图",
          key: "currentNumber",
          width: 200,
          align: "center",
          render: (h, params) => {
            return h("div", [
              h("img", {
                attrs: {
                  src: params.row.goodsThumbnailImg
                },
                style: {
                  width: "100px",
                  height: "100px",
                  margin: "10px 0px"
                }
              })
            ]);
          }
        },
        {
          title: "规格参数与价格",
          key: "borrowerName",
          width: 400,
          align: "center",
          render: (h, params) => {
            return h(
              "div",
              {
                style: {
                  height: "90px",
                  padding: "0px 36px",
                  position: "relative",
                  marginLeft:"50px",
                }
              },
              [
                h(
                  "div",
                  {
                    style: {
                      width: "46px",
                      height: "90px",
                      lineHeight: "90px",
                      position: "absolute",
                      top: "3px",
                      left: "60px"
                    }
                  },
                  params.row.goodsSpecVOList[0].specName
                ),
                h("div", {
                  style: {
                    width: "1px",
                    height: "46px",
                    borderRight: "1px solid #dddee1",
                    position: "absolute",
                    top: "22px",
                    left: "120px"
                  }
                }),
                h(
                  "div",
                  {
                    style: {
                      width: "150px",
                      position: "absolute",
                      top: "0px",
                      left: "136px",
                      lineHeight:" 90px",
                    }
                  },
                  [
                     h(myComponent, {
                      style: {
                        verticalAlign:"middle",
                        lineHeight:"22px",
                      },
                      props: {
                        productList:params.row.goodsSpecVOList[0].specItemVOList
                      }
                    })
                  ]
                ),
              ]
            );
          }
        },
        {
          title: "状态",
          key: "status",
          width: 150,
          align: "center",
          render: (h, params) => {
            if (params.row.status == 0) {
              return h("div", [h("span", "下架")]);
            } else {
              return h("div", [h("span", "上架")]);
            }
          }
        },
        {
          title: "操作",
          key: "action",
          align: "center",
          width: 180,
          render: (h, params) => {
            if (params.row.status == 0) {
              return h("div", [
                h(
                  "a",
                  {
                    style: {
                      display: "inline-block",
                      marginBottom: "4px",
                      color: "red"
                    },
                    on: {
                      click: () => {
                        // 调用下架接口
                        //alert("上架");
                        this.updateStatus(params.row.id, 1);
                      }
                    }
                  },
                  "上架"
                ),
                h("br"),
                h(
                  "a",
                  {
                    style: {
                      display: "inline-block",
                      color: "green"
                    },
                    on: {
                      click: () => {
                        this.$router.push({path: "/commodityManagementUpdate",query: { id: params.row.id }});
                      }
                    }
                  },
                  "修改"
                ),
                h("br"),
                h(
                  "a",
                  {
                    style: {
                      display: "inline-block",
                      marginBottom: "4px",
                      color: "orange"
                    },
                    on: {
                      click: () => {
                        // 调用删除接口
                        this.goodsId = params.row.id
                        this.delModal = true
                      }
                    }
                  },
                  "删除"
                )
              ]);
            } else {
              return h("div", [
                h(
                  "a",
                  {
                    style: {
                      display: "inline-block",
                      marginBottom: "4px",
                      color: "red"
                    },
                    on: {
                      click: () => {
                        // 调用下架接口
                        this.updateStatus(params.row.id, 0);
                      }
                    }
                  },
                  "下架"
                ),
                h("br"),
                h(
                  "a",
                  {
                    style: {
                      display: "inline-block",
                      color: "green",
                      marginBottom: "4px",
                    },
                    on: {
                      click: () => {
                        this.$router.push({
                          path: "/commodityManagementUpdate",
                          query: { id: params.row.id }
                        });
                      }
                    }
                  },
                  "修改"
                ),
                h("br"),
                h(
                  "a",
                  {
                    style: {
                      display: "inline-block",
                      color: "orange"
                    },
                    on: {
                      click: () => {
                        // 调用删除接口
                        this.goodsId = params.row.id
                        this.delModal = true;
                      }
                    }
                  },
                  "删除"
                )
              ]);
            }
          }
        }
      ],
      dataList: [],
      //分页
      Page: {
        total: 0,
        pageSize: 5,
        current: 1
      }
    };
  },
  created() {
    this.userid = localStorage.getItem("userid");
    this.token = localStorage.getItem("token");
    this.getList();
  },
  methods: {
    //获取列表数据
    getList() {
      const params = {
        ...this.queryData,
        // shopId: 1,
        // providerId: "",
        currentPage: this.Page.current,
        pageSize: this.Page.pageSize
      };
      //console.log(params);
      var data = "";
      for (var i in params) {
        data +=
          encodeURIComponent(i) + "=" + encodeURIComponent(params[i]) + "&";
      }
      data = data.slice(0, -1);
      this.$APIMy(
        "post",
        "goods/getVoListWithSpecVo",
        params,
        "",
        "",
        // this.userid,
        // this.token,
        res => {
          console.log(res);
          // console.log("请求");
          var indexs=''
          this.dataList = [];
          var data = res.data.data.goodsList;
          for(var i=0;i<data.length;i++){
						indexs=	(this.Page.current - 1) * this.Page.pageSize + (i+ 1);
						data[i].indexs=indexs
						this.dataList=data
					}
          console.log(this.dataList)
          this.Page.total = res.data.data.count;
        },
        res => {
          this.$Message.warning(res);
        },
        res => {
          this.$Message.error(res);
        }
      );
    },

    // 新增商品
    add() {
      this.$router.push({ path: "/commodityManagementAdd" });
    },
    // 下架
    updateStatus(id, status) {
      var params = {
        goodsId: id,
        status: status
      };
      var data = "";
      for (var i in params) {
        data +=
          encodeURIComponent(i) + "=" + encodeURIComponent(params[i]) + "&";
      }
      data = data.slice(0, -1);
      this.$APIMy(
        "post",
        "goods/updateStatus",
        data,
        this.userid,
        this.token,
        res => {
          this.$Message.success("操作商品成功");
          this.getList()
        },
        res => {
          this.$Message.warning(res.data);
        },
        res => {
          this.$Message.error(res.data);
        }
      );
    },
    
    // 点击删除
    cancelModal(){
      this.cancelModal = false
    },
    del() {
      var params = { goodsId: this.goodsId };
      var data = "";
      for (var i in params) {
        data +=
          encodeURIComponent(i) + "=" + encodeURIComponent(params[i]) + "&";
      }
      data = data.slice(0, -1);
      this.$APIMy(
        "post",
        "goods/delete",
        data,
        this.userid,
        this.token,
        res => {
          this.$Message.success("删除商品成功");
          this.getList()
        },
        res => {
          this.$Message.warning(res.data);
        },
        res => {
          this.$Message.error(res.data);
        }
      );
    },
    // 清空
    clearVal() {
      this.$refs.queryData.resetFields();
      this.Page.current = 1;
      this.getList();
    },
    // 分页操作
    pageChange(e) {
      this.Page.current = e;
      this.getList();
    },
    //编辑
	See(id){
		this.$router.push({ path: "/commodityManagementUpdate", query: { id:id} })
	},
	//查看
	delt(id){
		// 调用删除接口
    this.goodsId =id
    this.delModal = true;
	},
  }
};
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
.list_data {
  padding-top: 20px;
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
.ivuInput-box .ivu-input {
  width: 100% !important;
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
    padding: 0px 20px;
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
	.list_data_h >div:nth-child(1){
			width: 30%;
	}
  .list_data_h >div:nth-child(4){
			width: 140%;
	}
  .list_data_h >div:nth-child(5){
			width: 60%;
	}
	.list_data_h >div:nth-child(2){
			width: 180%;
      padding: 0px 5%;
	}
  .list_data_c{
    border: 1px solid #DDDDDD;
  }
	.list_data_c:nth-child(odd) {
		background: #fff;
		box-sizing: border-box;
	}
	
	.list_data_c:nth-child(even) {
		background: #f9f9f9;
		box-sizing: border-box;
	}
	/* .list_data_c{
    line-height: 120px
  } */
	.list_data_c>div {
		/* width: 100%;
    height: 130px;
		text-align: center;
    padding:0px 20px;
		font-size: 14px;
		font-family: PingFangSC-Regular;
		font-weight: 400;
		color: #686A6C;
    position: relative;
    display: table-cell;
    vertical-align:middle;
    text-align:center;
    border-right: 1px solid #DDDDDD; */
    width: 100%;
		height: 130px;
		text-align: center;
    position: relative;
    padding: 0px 20px;
		line-height: 44px;
		border-right: 1px solid #DDDDDD;
		font-size: 14px;
		font-family: PingFangSC-Medium;
		font-weight: 400;
		color: #686A6C;
    overflow: hidden;
    /* display: table-cell; */
    vertical-align:middle;
	}
	.list_data_c >div:nth-child(1){
			width: 30%;
      line-height: 130px;
      
	}
  .list_data_c >div:nth-child(4){
			width: 140%;
	}
  .list_data_c >div:nth-child(5){
      line-height: 140px;
      width: 60%;
	}
	.list_data_c >div:nth-child(2){
			width: 180%;
      height: 130px;
      padding: 30px 5%;
      line-height: 24px;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 3;
      overflow: hidden;
	}
  .list_data_c>div:nth-child(6){
    line-height: 16px;
  }
  .list_data_c div img{
    width: 100px;
    height: 100px;
    margin: 20px 0px;
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
  .list_data_c>div .operation{
    width:100%;
    height:100%;
    line-height:28px;
    padding-top: 25px;
  }
  .operation span:nth-child(1){
    text-align: center;
    color: red;
    cursor: pointer;
  }
  .operation span:nth-child(2){
    color: red;
    cursor: pointer;
  }
  .operation span:nth-child(3){
    color: green;
    cursor: pointer;
  }
  .operation span:nth-child(5){
    color: orange;
    cursor: pointer;
  }
 .Border{
    width: 1px;
    height: 46px;
    border-right: 1px solid #dddee1;
    position: absolute;
    top: 50px;
    left: 48%;
  }
  .Color{
    width: 48%;
    height: 100%;
    line-height: 150px;
  }
  .Conten{
    width: 45%;
    height:130px;
    text-indent: 6px;
    position: absolute;
    top: 10px;
    left: 49%;
    line-height: 150px;
  }
  .Conten span{
    display:inline-block;
    vertical-align:middle;
    line-height:28px;
    width: 100%;
    overflow: hidden;
  }
  .Conten span i{
    display: block;
    max-height: 110px;
    font-style: normal;
    overflow: hidden;
  }
  .list_data_c:hover{
        background-color: #f5f5f5;
    }
</style>