import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  mode: "history",
  routes: [
    {
      path: '/',
      redirect: "/index",
      component: () => import("../views/Layout"),
      children: [
        {
          path: "/index",
          component: () => import("../views/Index"),
          meta: {
            title: "商城首页"
          }
        },
        {
          path: "/cate",
          component: () => import("../views/Cate"),
          meta: {
            title: "分类商品"
          }
        },
        {
          path: "/goodslist",
          component: () => import("../views/GoodsList"),
          meta: {
            title: "商品列表"
          }
        },
        {
          path: "/register",
          component: () => import("../views/Register"),
          meta: {
            title: "会员注册"
          }
        },
        {
          path: "/login",
          component: () => import("../views/Login"),
          meta: {
            title: "会员登录"
          }
        },
        {
          path: "/cart",
          component: () => import("../views/Cart"),
          meta: {
            title: "购物车"
          }
        },
        {
          path: "/my",
          component: () => import("../views/My"),
          meta: {
            title: "会员中心"
          }
        }
      ]
    }
  ]
})

//路由导航守卫
router.beforeEach((to, form, next) => {
  //如果访问的是会员中心
  if (to.path == "/my") {
    //读取本地存储
    const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");
    if (!userInfo.token) {
      //路由重定向
      return next("/login");
    }
  }
  next();
  //设置页面标题
  document.title = to.meta.title;
})

export default router
