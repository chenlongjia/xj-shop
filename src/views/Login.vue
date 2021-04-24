<template>
  <div>
    <!-- 头部组件 -->
    <van-nav-bar
      title="会员登录"
      left-text="返回"
      right-text="注册"
      left-arrow
      @click-left="$router.back()"
      @click-right="$router.push('/register')"
    />
    <!-- 注册表单 -->
    <van-form @submit="onSubmit">
      <van-field
        v-model="formData.phone"
        name="手机号"
        label="手机号"
        placeholder="手机号"
        :rules="[{ required: true, message: '请填写手机号' }]"
      />
      <van-field
        v-model="formData.password"
        type="password"
        name="密码"
        label="密码"
        placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <div style="margin: 16px">
        <van-button round block type="info" native-type="submit"
          >登录</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {
      formData: {
        phone: "",
        password: "",
      },
    };
  },
  computed: {
    ...mapState(["userInfo"]),
  },
  methods: {
    ...mapActions(["getCartListAction"]),
    onSubmit(values) {
      // console.log(values);
      this.$http.post("/login", this.formData).then((data) => {
        this.$toast(data.msg);
        if (data.code === 200) {
          // console.log(data);
          //初始化购物车数据
          this.getCartListAction(this.userInfo.uid);
          //将用户信息存入localstorage中
          localStorage.setItem("userInfo", JSON.stringify(data.list));
          //页面重定向
          this.$router.push("/my");
        }
      });
    },
  },
};
</script>

<style>
</style>