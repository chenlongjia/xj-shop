<template>
  <div>
    <!-- 头部组件 -->
    <van-nav-bar
      title="会员中心"
      left-text="返回"
      left-arrow
      @click-left="$router.back()"
    />
    <div class="header">
      <van-image
        round
        width="10rem"
        height="10rem"
        src="https://img01.yzcdn.cn/vant/cat.jpeg"
      />
      <h5>{{ userInfo.nickname }}</h5>
    </div>
    <van-button type="danger" @click="logout" block>安全退出</van-button>
    <div class="section">
      <van-cell title="我的收藏" is-link />
      <van-cell title="我的评论" is-link />
      <van-cell title="我的订单" is-link />
    </div>
  </div>
</template>

<script>
//导入vuex辅助方法
import { mapState, mapMutations } from "vuex";
export default {
  computed: {
    ...mapState(["userInfo"]),
  },
  created() {
    this.userInfoInit();
  },
  methods: {
    //初始化用户登录信息
    ...mapMutations(["userInfoInit", "cartListInit"]),
    //安全退出
    logout() {
      //清除本地存储中的用户信息
      localStorage.removeItem("userInfo");
      //成功退出提示
      this.$toast("退出成功");
      //重置购物车列表
      this.cartListInit([]);
      //跳转到登录页面
      this.$router.push("/login");
    },
  },
};
</script>

<style scoped>
.header {
  height: 220px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>