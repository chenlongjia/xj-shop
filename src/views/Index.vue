<template>
  <div>
    <!-- 头部组件 -->
    <van-nav-bar title="商城首页" />
    <!-- 轮播图 -->
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="item in banners" :key="item.id">
        <img :src="$imgBaseUrl + item.img" alt="" />
      </van-swipe-item>
    </van-swipe>
    <!-- tabs标签页 -->
    <van-tabs v-model="active">
      <van-tab title="热门推荐">
        <van-card
          v-for="item in recommendList[0].content"
          :key="item.id"
          :price="item.price"
          :title="item.goodsname"
          :thumb="$imgBaseUrl + item.img"
        >
          <template slot="footer">
            <van-button
              @click="addCart(item.id)"
              size="small"
              type="primary"
              icon="cart-o"
            ></van-button>
          </template>
        </van-card>
      </van-tab>
      <van-tab title="发现新品">
        <van-card
          v-for="item in recommendList[1].content"
          :key="item.id"
          :price="item.price"
          :title="item.goodsname"
          :thumb="$imgBaseUrl + item.img"
        >
          <template slot="footer">
            <van-button
              @click="addCart(item.id)"
              size="small"
              type="primary"
              icon="cart-o"
            ></van-button>
          </template>
        </van-card>
      </van-tab>
      <van-tab title="全部商品">
        <van-card
          v-for="item in recommendList[2].content"
          :key="item.id"
          :price="item.price"
          :title="item.goodsname"
          :thumb="$imgBaseUrl + item.img"
        >
          <template slot="footer">
            <van-button
              @click="addCart(item.id)"
              size="small"
              type="primary"
              icon="cart-o"
            ></van-button>
          </template>
        </van-card>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { mapActions, mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      active: 0,
      //轮播图
      banners: [],
      //商品推荐列表
      recommendList: [{ content: [] }, { content: [] }, { content: [] }],
    };
  },
  computed: {
    ...mapState(["userInfo"]),
  },
  created() {
    this.getBanner();
    this.getRecommendList();
    this.userInfoInit();
  },

  methods: {
    ...mapActions(["addCartAction"]),
    //初始化登录用户信息
    ...mapMutations(["userInfoInit"]),
    //获取首页轮播图
    getBanner() {
      this.$http.get("/getbanner").then((data) => {
        if (data.code === 200) {
          // console.log(data.list);
          this.banners = data.list;
        }
      });
    },
    //获取商品推荐列表
    getRecommendList() {
      this.$http.get("/getindexgoods").then((data) => {
        if (data.code === 200) {
          // console.log(data);
          this.recommendList = data.list;
        }
      });
    },
    //购物车添加
    addCart(goodsid) {
      if(!this.userInfo.uid) {
        return this.$toast("请登录后再操作");
      }
      //构造购物车对象模型
      const obj = {
        goodsid,
        uid: this.userInfo.uid,
        num: 1,
      };
      this.addCartAction(obj);
    },
  },
};
</script>

<style scoped>
.van-swipe img {
  width: 100%;
  height: 220px;
}
.van-tabs {
  margin-bottom: 60px;
}
</style>