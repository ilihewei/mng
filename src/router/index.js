import Vue from 'vue'
import VueRouter from 'vue-router'
// import login from '../views/login/index2'
// import homeTest from '../views/home/homeTest.vue'
import {getToken} from "@/api/baseData";
import api from '../api/api'
import store from '../store';

Vue.use(VueRouter);

let routes = [
  {
    path: '*',
    redirect: '/'
  },
  {
    path: '/',
    redirect: '/index',
  },
  {path: '/index',component: () => import('../views/index'),meta:{tit:'北京神州数码方圆科技有限公司'}},
  /*{
    path: '/login',
    name: 'login',
    component: login, // ******登录********!//
  },*/
  /*{
    path: '/',
    name: 'index',
    component: () => import('../views/index'), // ******主页（主要内容）********!//
    children:[
      {path: '/consume',component: () => import('../views/consume'),meta:{tit:'消费管理'}},
      {path: '/cardMange',component: () => import('../views/cardMange'),meta:{tit:'制卡管理'}},
      {path: '/userCenter',component: () => import('../views/userCenter'),meta:{tit:'客户中心'}},
      {path: '/userDetail',component: () => import('../views/userDetail'),meta:{tit:'客户中心'}},
      {path: '/reportForm',component: () => import('../views/reportForm'),meta:{tit:'报表查询'}},
      {path: '/returnCard',component: () => import('../views/returnCard'),meta:{tit:'退卡审核'}},
      {path: '/personalCenter',component: () => import('../views/personalCenter'),meta:{tit:'用户中心'}},
      {path: '/personWallet',component: () => import('../views/personWallet'),meta:{tit:'用户钱包'}},
      {path: '/',redirect: '/consume'}
    ],
  },*/
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  console.log("to:",to)
  console.log("from:",from)
  let token = getToken()
  let userState = sessionStorage.getItem('loginState');
  console.log("userState:",userState)
  console.log("store:",store)
  document.title = to.meta.tit
  // let timeStr = store.pageTxt.activityDate || true;
  /*api.getConfig({}).then(res=>{
    console.log("res222:",res)
    store.dispatch('setPageTxt',res.data.data)
    // let time = res.data.data.activityDate.split('');

  })*/
  let isOver = false;
  if(isOver && to.path != '/download'){
    next({
      path: '/download'
    });
  }
  /*if ((token != '' && userState == 1) || window.isDebug) { // 如果已经登录的话
    next();
  } else {

    // if (to.path === '/login' || to.path === '/home') { // 如果是登录页面的话，直接next()
    if (to.path === '/home') { // 如果是登录页面的话，直接next()
      next();
    } else { // 否则 跳转到登录页面
      next({
        path: '/home'
      });
    }
  }*/
  next()
})


export default router
