<template>
  <!-- 商品管理列表页 table 规格参数与价格 列 -->
  <div class="productList">
    <div class="productItem" v-for="(item,i) in productList" :key="i">
            <span>{{item.specParamName}}</span>&nbsp;&nbsp;
            <span>￥{{item.goodsPrice}}</span>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  props: {
    productList: Array
  }
};
</script>
<style scoped>
.productList {
  display: inline-block;
}
.productItem {
  text-align: left;
}
</style>
