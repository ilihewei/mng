import axios from 'axios'
import {Message,Loading} from 'element-ui'
import api from "@/api/api";
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
NProgress.configure({showSpinner:false})
let timeRange = [0,];

let loadingInstance = null;
let loadingNum = 0;
let openLoading = (showLoading)=>{
    console.log("dakai")
    if(loadingNum === 0 && showLoading){
        let option = {
            fullscreen:true,
            text:'正在加载，请稍候...',
            background:'rgba(0,0,0,.2)'
        }
        loadingInstance = Loading.service(option)
        NProgress.start()
    }
    loadingNum +=1;
}

let closeLoading = ()=>{
    loadingNum = loadingNum -1;
    if(loadingNum <= 0){
        loadingInstance.close();
        NProgress.done();
        loadingNum = 0;
    }
}
axios.defaults.baseURL = '';
//axios.defaults.timeout = 30000;
// axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf8';
axios.defaults.crossDomain = false;
axios.defaults.withCredentials = false; // 设置crose， 访问权限，允许携带cookie
// axios.defaults.headers.common['access_token'] = getToken;// 设置请求头为Authorization

axios.interceptors.request.use(
    config => {
        console.log("config.showLoading:",config)
        if( config.showLoading == false){
            // console.log("不打开模态框")
            // openLoading(config.showLoading)
        }else{
            openLoading(true)
        }

        const token = api.getToken()
        // console.log("Authorization:",getToken())
        if(token != ''){
            config.headers.token = api.getToken();
            // config.headers.AccessToken = 'bearer '+getToken;
        }

        // res.header("Access-Control-Allow-Origin", "*");
        // res.header("Access-Control-Allow-Headers", "X-Requested-With,Content-Type");
        // res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");

        // config.headers['Access-Control-Allow-Origin'] = '*';
        // config.headers['Origin'] = '*';
        // config.headers['Content-Type'] = 'application/json';
        // config.headers['Access-Control-Allow-Headers'] = 'X-Requested-With,Content-Type';
        // config.headers['Access-Control-Allow-Methods'] = 'PUT,POST,GET,DELETE,OPTIONS';
        return config;
    },error => {
        closeLoading();
        Message.error({message:'请求超时！'})
        return Promise.error(error)
    }
);

axios.interceptors.response.use(
    response => {
        console.log("response22222:",response)
        if(response.data.returnCode=='000401'){
                Message.error({
                    message:'登录已过期，请重新登录！',
                    customClass:'fixedMessage',
                })
                setTimeout(()=>{
                    api.jumpToLogin();
                },1000)
                console.log("页面地址：",window.location.href)

        }
        console.log("response:",response)
        closeLoading();
        // 根据返回码判断响应结果 200 成功，否则抛出错误
        if(response.status === 200){
            return Promise.resolve(response)
        }else{
            return Promise.reject(response)
        }
    },
    error => {
        closeLoading();
        console.log("error:",error)
        if(!error.response){
            Message.error({
                message:'服务器错误！',
                customClass:'fixedMessage',
            })
        }
       if(error.response.status){
           switch (error.response.status) {
               case 400:{
                   console.log("请求参数错误！")
                   break;
               }
               case 401:{
                   // alert(401)
                   break;
               }
               case 403:{
                   console.log("登录过期！")
                   break;
               }
               case 404:{
                   // alert(404)
                   break;
               }
               case 500:{
                   Message.error({message:'服务器错误！'})
                   break;
               }
               default: {
                   console.log("error:",error.response.data.message)
               }
           }
           return Promise.reject(error.response)
       }

    }
);