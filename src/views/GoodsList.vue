<template>
  <div class="container">
    <!-- 头部组件 -->
    <van-nav-bar
      title="商品列表"
      left-text="返回"
      left-arrow
      @click-left="$router.back()"
    />
    <!-- 商品列表 -->
    <van-card
      v-for="item in goodslist"
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
    <van-button v-if="hasMore" type="primary" block plain @click="loadMore"
      >加载更多</van-button
    >
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
export default {
  created() {
    this.getGoodsList();
    this.userInfoInit();
  },
  computed: {
    ...mapState(["userInfo"]),
  },
  data() {
    return {
      hasMore: true,
      goodslist: [], //商品列表
      sid: this.$route.query.id, //二级列表商品id
      page: 1, //页码
      size: 4, //每页显示的数据条数
      total: 0, //数据总条数
    };
  },
  methods: {
    ...mapMutations(["userInfoInit"]),
    ...mapActions(["addCartAction"]),
    //获取商品列表
    getGoodsList() {
      this.$http
        .get("/getcategoods", {
          params: {
            sid: this.sid,
            page: this.page,
            size: this.size,
          },
        })
        .then((data) => {
          if (data.code === 200) {
            this.goodslist = this.goodslist.concat(data.list.list);
            this.total = data.list.total;
            if (this.total === this.goodslist.length) {
              //隐藏加载更多按钮
              this.hasMore = false;
            }
          }
        });
    },
    //加载更多
    loadMore() {
      //更新页码
      this.page++;
      //根据页码重新请求商品列表
      this.getGoodsList();
    },
    //添加购物车
    addCart(goodsid) {
      if (!this.userInfo.uid) {
        return this.$toast("请登录后再操作");
      }
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
.container {
  margin-bottom: 60px;
}
</style>