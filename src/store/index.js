import Vue from "vue";
import Vuex from "vuex";
import axios from "../utils/http";
//注册
Vue.use(Vuex);
//创建数据存储对象
const store = new Vuex.Store({
    //数据状态
    state: {
        userInfo: {},  //登录用户的信息
        cartList: [], // 购物车商品列表
    },
    //操作state数据的同步方法
    mutations: {
        //初始化登录用户信息
        userInfoInit(state) {
            //读取本地存储
            const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");
            state.userInfo = userInfo;
        },
        //初始化购物车商品列表
        cartListInit(state, list) {
            state.cartList = list;
        },
        //删除购物车
        cartDel(state, id) {
            //根据id查找索引
            const index = state.cartList.findIndex(item => item.id == id);
            //根据索引删除数组元素
            state.cartList.splice(index, 1);
        }
        //更新购物车
        // row={id:"购物车id",type:"操作类型"}  1 减少 2 增加
        // cartUpdate(state, row) {
        //     //根据id查找索引
        //     const index = state.cartList.findIndex(item => row.id == item.id);
        // }
    },
    //操作数据请求的异步方法
    actions: {
        //获取购物车商品列表
        getCartListAction({ commit }, uid) {
            axios.get("/cartlist", {
                params: {
                    uid
                }
            }).then(data => {
                if (data.code === 200) {
                    //通过commit调用同步方法cartListInit
                    commit("cartListInit", data.list);
                }
            })
        },
        //更新购物车
        // row={id:"购物车id",type:"操作类型"}  1 减少 2 增加
        updateCartAction({ commit }, row) {
            axios.post("/cartedit", row).then(data => {
                if (data.code === 200) {
                }
            })
        },
        //删除购物车商品 id:购物车id
        delCartAction({ commit }, id) {
            axios.post("/cartdelete", { id }).then(data => {
                if (data.code === 200) {
                    //通过commit调用cartDel
                    commit("cartDel", id);
                }
            })
        },
        //添加购物车商品
        // row={goodsid:"商品id",uid:"登录用户的id",num:"商品数量"}
        addCartAction({ dispatch, state }, row) {
            axios.post("/cartadd", row).then(data => {
                if (data.code === 200) {
                    // console.log(data);
                    // action交叉调用,更新购物车列表
                    dispatch("getCartListAction", state.userInfo.uid);
                }
            })
        }
    },
    //计算属性
    getters: {
        //购物车商品总价
        cartTotalPrice(state) {
            var totalPrice = 0;
            state.cartList.forEach(item => {
                totalPrice += item.price * item.num;
            })
            return totalPrice * 100
        },
        //购物车商品总数
        cartCount(state) {
            var num = 0;
            state.cartList.forEach(item => {
                num += item.num;
            })
            return num
        }
    },
    //注册子模块
    modules: {

    }
});

export default store;

