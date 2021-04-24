<template>
  <div class="container">
    <!-- 头部组件 -->
    <van-nav-bar
      title="商品分类"
      left-text="返回"
      left-arrow
      @click-left="$router.back()"
    />
    <div class="content">
      <!-- 侧边导航 -->
      <van-sidebar v-model="activeKey" @change="change">
        <van-sidebar-item
          :title="item.catename"
          v-for="item in cateList"
          :key="item.id"
        />
      </van-sidebar>
      <div class="second-cate">
        <van-grid :border="false" :column-num="3">
          <van-grid-item
            v-for="item in secondCateList"
            :key="item.id"
            @click="$router.push(`/goodslist?id=${item.id}`)"
          >
            <van-image :src="$imgBaseUrl + item.img" />
            <h5>{{ item.catename }}</h5>
          </van-grid-item>
        </van-grid>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeKey: 0,
      //商品分类列表
      cateList: [],
      //二级分类列表
      secondCateList: [],
    };
  },
  created() {
    this.getCateList();
  },
  methods: {
    //获取分类列表
    getCateList() {
      this.$http.get("/getcate").then((data) => {
        if (data.code === 200) {
          // console.log(data);
          this.cateList = data.list;
          //手动调用change回调函数
          this.change(0);
        }
      });
    },
    //监听一级菜单的切换
    change(index) {
      // console.log(index);
      this.secondCateList = this.cateList[index].children;
    },
  },
};
</script>

<style scoped>
.content {
  display: flex;
}
.second-cate {
  flex: 1;
}
</style>