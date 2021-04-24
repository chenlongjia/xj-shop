<template>
  <div>
    <!-- 头部组件 -->
    <van-nav-bar
      title="会员注册"
      left-text="返回"
      right-text="登录"
      left-arrow
      @click-left="$router.back()"
      @click-right="$router.push('/login')"
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
        v-model="formData.nickname"
        name="昵称"
        label="昵称"
        placeholder="昵称"
        :rules="[{ required: true, message: '请填写昵称' }]"
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
          >注册</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        phone: "",
        nickname: "",
        password: "",
      },
    };
  },
  methods: {
    onSubmit(values) {
      console.log(values);
      this.$http.post("/register", this.formData).then((data) => {
        //提示
        this.$toast(data.msg);
        if (data.code === 200) {
          //跳转到登录页面
          this.$router.push("/login");
        }
      });
    },
  },
};
</script>

<style>
</style>