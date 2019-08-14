<script>
  import Vue from 'vue'
  export default Vue.component('UploadKeke', {
    props: ['uploadKekeType'],
    template: `
<div class="uploadKeke">
     <div class="uploadKekeBox">
        <div class="uploadTop">提示{{uploadKekeType}}</div>

        <div v-if="uploadKekeType==1" class="uploadContent">
            <div><br>您已成功参与本次科科</div>
            <div>____</div>
            <div>查看更多科科，请登陆科科档期APP</div>
            <div class="logo"><img src="../../../static/images/logo_black.png" alt=""></div>
            <div class="line"></div>
            <div class="wordOne">认识新朋友，是一件美好的事！</div>
            <div class="wordTwo">我有空，你有档期吗？</div>
         </div>

         <div v-if="uploadKekeType==2" class="uploadContent">
            <div><br>已发送申请</div>
            <div>____</div>
            <div>想及时收到申请结果，请登陆科科档期APP</div>
            <div class="logo"><img src="../../../static/images/logo_black.png" alt=""></div>
            <div class="line"></div>
            <div class="wordOne">认识新朋友，是一件美好的事！</div>
            <div class="wordTwo">我有空，你有档期吗？</div>
         </div>

         <div v-if="uploadKekeType==3" class="uploadContent">
            <div>该科科需要发起人审核 <br> 已发送申请</div>
            <div>____</div>
            <div>想及时收到申请结果，请登陆科科档期APP</div>
            <div class="logo"><img src="../../../static/images/logo_black.png" alt=""></div>
            <div class="line"></div>
            <div class="wordOne">认识新朋友，是一件美好的事！</div>
            <div class="wordTwo">我有空，你有档期吗？</div>
         </div>

         <div v-if="uploadKekeType==4" class="uploadContent">
         <div></div>
            <div>查看他人信息 <br> 感受前所未有的线上&线下社交体验 <br>请立即下载科科档期APP </div>
            <div></div>
            <div class="logo"><img src="../../../static/images/logo_black.png" alt=""></div>
            <div class="line"></div>
            <div class="wordOne">认识新朋友，是一件美好的事！</div>
            <div class="wordTwo">我有空，你有档期吗？</div>
         </div>


        <div class="uploadBottom" @click="sureClick">确认</div>
    </div>
</div>`,
    data () {
      return {

      }
    },

    methods: {
      sureClick:function () {
        this.$emit('sureClick','aaa')
      }
    }
  })

</script>

<style  scoped>
  .uploadKeke{
    position: fixed;
    left:0;
    right:0;
    top:0;
    bottom: 0;
    background-color: rgba(0,0,0,.2);
    text-align: center;
    z-index: 99999;
  }
  .uploadKeke>.uploadKekeBox{
    width: 18.75rem;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate3d(-50%,-50%,0);
  }
  .uploadKeke>.uploadKekeBox>.uploadTop{
    width: 100%;
    height: 3.75rem;
    line-height: 3.75rem;
    color: white;
    background-color: #FE2851;
    font-size: 1.31rem;
  }
  .uploadKeke>.uploadKekeBox>.uploadContent{
    padding: 4.25rem 0rem 1.88rem 0rem;
    background-color: white;
    color: #030303;
  }
  .uploadKeke>.uploadKekeBox>.uploadContent>div:nth-child(1){
    font-size: 0.88rem;
  }
  .uploadKeke>.uploadKekeBox>.uploadContent>div:nth-child(2){
    font-size: 0.88rem;
    margin-bottom: 1rem;
    line-height: 1.31rem;
  }
  .uploadKeke>.uploadKekeBox>.uploadContent>div:nth-child(3){
    font-size: 0.75rem;
    margin-bottom: 4.63rem;
  }
  .uploadKeke>.uploadKekeBox>.uploadContent>div:nth-child(4){
    width: 4rem;
    height: 5.56em;
    margin: 0 auto;
  }
  .uploadKeke>.uploadKekeBox>.uploadContent>.logo>img{
    width: 100%;
    height: 100%;
  }
  .uploadKeke>.uploadKekeBox>.uploadContent>.line{
    width: 15.25rem;
    height: 0.1rem;
    background-color: #1B1C1F;
    margin: 0.5rem auto 0.5rem;
  }
  .uploadKeke>.uploadKekeBox>.uploadContent>.wordOne{
    font-size: 0.75rem;
    letter-spacing: 0.32em;
  }
  .uploadKeke>.uploadKekeBox>.uploadContent>.wordTwo{
    font-size: 0.63rem;
    margin-top: 0.3rem;
  }
  .uploadKeke>.uploadKekeBox>.uploadBottom{
    width: 100%;
    height: 2.56rem;
    line-height: 2.56rem;
    color: white;
    background-color: #FE2851;
    font-size: 1rem;
  }
</style>
