<template>
  <div>
    <!-- 二级路由占位符 -->
    <router-view />
    <!-- tabbar导航栏 -->
    <van-tabbar v-model="active" route>
      <van-tabbar-item to="/index" icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item to="/cate" icon="apps-o">分类</van-tabbar-item>
      <van-tabbar-item to="/cart" icon="cart-o" :badge="cartCount"
        >购物车</van-tabbar-item
      >
      <van-tabbar-item to="/my" icon="user-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations, mapState } from "vuex";
export default {
  created() {
    //初始化登录用户信息
    this.userInfoInit();
    if (this.userInfo.uid) {
      //初始化购物车列表
      this.getCartListAction(this.userInfo.uid);
    }
  },
  data() {
    return {
      active: 0,
    };
  },
  computed: {
    ...mapGetters(["cartCount"]),
    ...mapState(["userInfo"]),
  },
  methods: {
    ...mapActions(["getCartListAction"]),
    ...mapMutations(["userInfoInit"]),
  },
};
</script>

<style>
</style>