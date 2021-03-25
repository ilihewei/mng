import api from "../api/api";
import Axios from 'axios';
import {Message} from "element-ui";

const setProjectId = function({commit},obj){
    // console.log("setProjectId:",obj)
    commit('setProjectId',obj);
};

const setGeo = function({commit},obj){
    // console.log("setGeo:",obj)
    commit('setGeo',obj);
};


const setDevInfo = function({commit},obj){
    // console.log("setGeo:",obj)
    commit('setDevInfo',obj);
};

const setPageTxt = function({commit},obj){
    // console.log("setPageTxt:",obj)
    commit('setPageTxt',obj);
};

const setPageTit = function({commit},obj){
    // console.log("setPageTit:",obj)
    commit('setPageTit',obj);
};

const setChangeMenu = function({commit},obj){
    // console.log("setPageTit:",obj)
    commit('setChangeMenu',obj);
};


export{
    setProjectId,
    setGeo,
    setDevInfo,
    setPageTxt,
    setPageTit,
    setChangeMenu
};