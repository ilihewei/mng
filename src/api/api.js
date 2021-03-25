import axios from 'axios'
import {getFn, postFn, deleteFn, putFn, patchFn, deleteDataFn, getDataFn, putDataFn, uploadFileRequest, getParkList,downloadFn} from './baseApi'

let baseUrl = window.context;

let getFileUrl2 = (params) => {
    return (`${baseUrl}download?mobileNo=${params.mobileNo}&code=${params.code}`)
}
let getToken = () => {
    return (sessionStorage.getItem('token') || '')
    // return (localStorage.getItem('Authorization') || '')
}

let getSession = (name) => {
    return (sessionStorage.getItem(name) || '')
}
let getImporturl = () => {
    return (`${baseUrl}back/merchants/image`)
}
let jumpToLogin = () => {
    window.location.href = `http://${window.location.host}/login`
}
export default {
    getSession,
    getImporturl,
    jumpToLogin,
    getToken,
    // distUser:`${baseUrl}/process/taskAllot`,
    getFileUrl2,
    login: params => getFn(`${baseUrl}back/merchants/login`, params), // 内容(动态)新增
    getShopInfo: params => getFn(`${baseUrl}back/merchants/${params.name}`, ''), // 商户详情
/*    changeShopInfo: params => postFn(`${baseUrl}back/merchants`, params), // 内容(动态)新增
    getUserList: params => getFn(`${baseUrl}back/userBindMerchantCards/getRemainingBalanceByMerchantId/${params.shopId}`, params), // 内容(动态)新增
    userCards: params => postFn(`${baseUrl}back/userBindMerchantCards/getRemainingBalanceByUserId/`, params), // 内容(动态)新增
    userCardDetail: params => postFn(`${baseUrl}back/reccharge/`, params), // 充值/消费记录
    merCards: params => getFn(`${baseUrl}back/cards/${params.merchantId}`,''),// 商户已发卡
    addCards: params => postFn(`${baseUrl}back/cards`,params),// 商户发卡
    editCards: params => putFn(`${baseUrl}back/cards/card`,params),// 编辑卡
    delCards: params => deleteFn(`${baseUrl}back/cards/card/${params.id}`,''),// 删除卡
    consume: params => postFn(`${baseUrl}back/personalConsume`,params),// 删除卡
    turnState: params => getFn(`${baseUrl}back/cards/card/upOrDown/${params.id}`,''),// 上架/下架
    cancelStep: params => postFn(`${baseUrl}/back/revokeConsume`,params),// 消费记录/撤销
    schedulreccharge: params => postFn(`${baseUrl}/back/schedulreccharge`,params),// 报表
    changePwd: params => postFn(`${baseUrl}back/merchants/changePassword`,params),// 修改密码
    returnCardList: params => postFn(`${baseUrl}back/userBindMerchantCards/queryWaitingRefundCards`,params),// 个人退卡管理端操作 usercardid": 5,
    returnCardConfirm: params => postFn(`${baseUrl}back/personalRefundCard`,params),// 个人退卡管理端操作 usercardid": 5,
    returnCard: params => postFn(`${baseUrl}/back/`,params),// 个人退卡管理端操作 usercardid": 5,
    addOperator: params => postFn(`${baseUrl}back/merchants/addOperator`,params),// 个人退卡管理端操作 usercardid": 5,
    operatorList: params => postFn(`${baseUrl}back/merchants/quryOperator`,params),// 个人退卡管理端操作 usercardid": 5,
    delOperator: params => postFn(`${baseUrl}back/merchants/deleteOperator`,params),// 个人退卡管理端操作 usercardid": 5,
    getExportUrl: params => downloadFn(`${baseUrl}back/exportExcel`, params),
    quryMerchantWallet: params => postFn(`${baseUrl}/back/merchants/quryMerchantWallet`, params),//商户钱包查询
    quryBank: params => getFn(`${baseUrl}/back/merchants/quryBank`, params),//银行列表
    updateMerchantWallet: params => postFn(`${baseUrl}/back/merchants/updateMerchantWallet`, params),//设置或新增商户钱包
    delMerchantWallet: params => postFn(`${baseUrl}/back/merchants/delMerchantWallet`, params),//删除商户钱包
    merchanttype: params => postFn(`${baseUrl}back/merchants/merchanttype`),//获取所有商户类型*/
}