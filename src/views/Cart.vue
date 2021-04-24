<template>
  <div class="container">
    <!-- 头部组件 -->
    <van-nav-bar
      title="购物车"
      left-text="返回"
      left-arrow
      @click-left="$router.back()"
    />
    <!-- 购物车商品列表 -->
    <van-card
      v-for="(item, index) in cartList"
      :key="item.id"
      :price="item.price"
      :title="item.goodsname"
      :thumb="$imgBaseUrl + item.img"
    >
      <template #footer>
        <van-stepper
          v-model="cartList[index].num"
          theme="round"
          button-size="22"
          @plus="cartNumUpdate(item.id, 2)"
          @minus="cartNumUpdate(item.id, 1)"
          disable-input
        />
        <van-button @click="del(item.id)" type="danger" size="mini">删除</van-button>
      </template>
    </van-card>
    <!-- 购物车商品总计价 -->
    <van-submit-bar :price="cartTotalPrice" button-text="提交订单" />
  </div>
</template>

<script>
//导入辅助方法
import { mapState, mapActions, mapMutations, mapGetters } from "vuex";
export default {
  created() {
    //初始化登录用户信息
    this.userInfoInit();
    //初始化购物车列表
    this.getCartListAction(this.userInfo.uid);
  },
  computed: {
    ...mapState(["cartList", "userInfo"]),
    ...mapGetters(["cartTotalPrice", "cartCount"]),
  },
  methods: {
    ...mapActions(["getCartListAction", "updateCartAction", "delCartAction"]),
    ...mapMutations(["userInfoInit"]),
    //监听购物车数量更新
    cartNumUpdate(id, type) {
      this.updateCartAction({
        id,
        type,
      });
    },
    //删除购物车商品
    del(id) {
      console.log(id);
      this.delCartAction(id);
    }
  },
};
</script>

<style>
.container {
  margin-bottom: 120px;
}
.van-button--danger {
  margin-top: 10px;
}
.van-submit-bar {
  bottom: 50px !important;
}
</style>