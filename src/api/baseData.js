import axios from 'axios'
import store from '../store'
import {location} from "./locationFn";

let getCookie = (name) => {
    let arr, reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)')

    if (arr = document.cookie.match(reg)) {
        return unescape(arr[2])
    } else {
        return null
    }
}

let setCookie = (name, value, expire) => {
    let exp = new Date()
    exp.setTime(exp.getTime() + expire * 1000)
    document.cookie = name + '=' + escape(value) + ';expires=' + exp.toGMTString() + ';path=/'
}

let delCookie = (name) => {
    let exp = new Date()
    exp.setTime(exp.getTime() - 60 * 60 * 1000)
    let cval = getCookie(name)
    if (cval != null) document.cookie = name + '=' + cval + ';expires=' + exp.toGMTString() + ';path=/'
}


let getToken = () => {
    let token = getCookie('access_token') || localStorage.getItem('access_token') || ''
    let token_type = getCookie('token_type') || localStorage.getItem('token_type') || 'bearer'
    return token_type + ' ' + token;

};

let getRefreshToken = () => {
    let token = getCookie('refresh_token') || localStorage.getItem('refresh_token') || ''
    return token;
};

let getTokenTime = () => {
    let time = getCookie('expires_in') || localStorage.getItem('expires_in') || 7200
    return time;

};
let getUserInfo = (key) => {
    let info = JSON.parse(localStorage.getItem('userInfo')) || {}
    if (key) {
        return info[key];
    }
    return info;
};

let dateFormat = (fmt, date) => {
    let ret;
    const opt = {
        "Y+": date.getFullYear().toString(),        // 年
        "m+": (date.getMonth() + 1).toString(),     // 月
        "d+": date.getDate().toString(),            // 日
        "H+": date.getHours().toString(),           // 时
        "M+": date.getMinutes().toString(),         // 分
        "S+": date.getSeconds().toString()          // 秒
        // 有其他格式化字符需求可以继续添加，必须转化成字符串
    };
    for (let k in opt) {
        ret = new RegExp("(" + k + ")").exec(fmt);
        if (ret) {
            fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
        };
    };
    return fmt;
}

let listToTreeList = (list) => {
    if (!list || !list.length) {
        return [];
    }
    let treeListMap = {};
    for (let item of list) {
        treeListMap[item.id] = item;
    }
    for (let i = 0; i < list.length; i++) {
        if (!treeListMap[list[i]._parentId].children) {
            treeListMap[list[i]._parentId].children = [];
        }
        treeListMap[list[i].parentId].children.push(list[i]);
        list.splice(i, 1);
        i--
    }
    return list
}

let objToUrlOption = (obj) => {
    let str = [];
    for (let key in obj) {
        str.push(`${key}=${obj[key]}`)
    }
    return str.join('&');
};

let checkTel = (tel) => {
    // alert(tel)
    let telObj = {};
    if (/^1(3|4|5|7|8)\d{9}$/.test(tel)) {
        telObj.type = '移动电话';
        telObj.typeNumber = 1;
        telObj.isPass = true;
    } else if (/^0\d{2,3}-?\d{7,8}$/.test(tel)) {
        telObj.type = '固定电话';
        telObj.typeNumber = 2;
        telObj.isPass = true;
    } else {
        telObj.type = '不是有效的电话号码';
        telObj.typeNumber = 0;
        telObj.isPass = false;
    }
    return telObj;
};

let checkPass = (pass) => {
    //必须包含数字和字母可以有特殊字符`~!@#$%^&*()_+=\-*.\、
    return (/^(?![0-9`~!@#$%^&*()_+=\-*.|、\\]+$)(?![a-zA-Z`~!@#$%^&*()_+=\-*.|、\\]+$)[0-9A-Za-z`~!@#$%^&*()_+=\-*.|、\\]{8}$/.test(pass))
    // return (/^(?=.*?[0-9])(?=.*?[a-z])[0-9a-z]{8}$/.test(pass))
    // return (/^(?!(?:\d+|[a-zA-Z]+)$)[\da-zA-Z]{8}$/.test(pass))
    // return (/^(?!(?:[^a-zA-Z]+|\D+|[a-zA-Z0-9]+)$).{8,}$/.test(pass))
    // return (/^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$]).{8}$/.test(pass))
    // return (/^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*()])[\da-zA-Z!@#$%^&*()]{8}$/.test(pass))
};

let checkEmail = (obj) => {
    // alert(obj)
    return (/^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,5}$/.test(obj))
};

let downloadFile = (data, type, fileName) => {
    let blob = new Blob([data], {
        type: `application/${type};charset=UTF-8`,      //将会被放入到blob中的数组内容的MIME类型
        // type:`text/plain;charset=UTF-8`,      //将会被放入到blob中的数组内容的MIME类型
    });
    console.log("blob:", blob)
    // let objectUrl = URL.createObjectURL(blob);  //生成一个url
    // window.location.href = objectUrl;
    // return;
    const a = document.createElement("a")
    a.href = URL.createObjectURL(blob)
    a.download = fileName // 这里填保存成的文件名
    a.click()
    URL.revokeObjectURL(a.href)
}

let base64ToFile = (base, name) => {
    console.log("base:", base)
    const arr = base.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    if (window.navigator.msSaveBlob) {
        // for ie 10 and later
        try {
            const blobObject = new Blob([u8arr], {type: mime});
            window.navigator.msSaveBlob(blobObject, name);
        } catch (e) {
            console.log(e);
        }
    } else {
        const url = window.URL.createObjectURL(new Blob([u8arr], {type: mime}));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', name);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link); // 下载完成移除元素
        window.URL.revokeObjectURL(url); // 释放掉blob对象
    }
}

let buttonIsShow = (name) => {
    if(window.isDebug){
        return true;
    }
    // return true; // todo 接口加上后去掉
    // console.log("store:",store.state.myButtonData)
    // let arr = store.state.myButtonData || [];
    let inclueds = false;
    name = name.replace(/(^\s*)|(\s*$)/g, "");
    store.state.myButtonData.map(item => {
        item = item.replace(/(^\s*)|(\s*$)/g, "");
        if (item == name) {
            inclueds = true;
        }
    })
    return inclueds;
}
let _mime = (option, value) => {
    var mimeTypes = navigator.mimeTypes
    for (var mt in mimeTypes) {
        if (mimeTypes[mt][option] === value) {
            return true
        }
    }
    return false
}

let getBrowser = () => {
    let ua = navigator.userAgent.toLocaleLowerCase()
    let browserType = null
    if (ua.match(/msie/) != null || ua.match(/trident/) != null) {
        browserType = 'IE'
    } else if (ua.match(/firefox/) != null) {
        browserType = 'firefox'
    } else if (ua.match(/ucbrowser/) != null) {
        browserType = 'UC'
    } else if (ua.match(/opera/) != null || ua.match(/opr/) != null) {
        browserType = 'opera'
    } else if (ua.match(/bidubrowser/) != null) {
        browserType = 'baidu'
    } else if (ua.match(/metasr/) != null) {
        browserType = 'sougou'
    } else if (ua.match(/tencenttraveler/) != null || ua.match(/qqbrowse/) != null) {
        browserType = 'QQ'
    } else if (ua.match(/maxthon/) != null) {
        browserType = 'maxthon'
    } else if (ua.match(/chrome/) != null) {
        var is360 = _mime('type', 'application/vnd.chromium.remoting-viewer')
        if (is360) {
            browserType = '360'
        } else {
            browserType = 'chrome'
        }
    } else if (ua.match(/safari/) != null) {
        browserType = 'Safari'
    } else {
        browserType = 'others'
    }
    return browserType
}


let getLocation = () => {
    console.log("获取位置开始：", 111)
    let _that = this;
    let geolocation = location.initMap("map-container"); //定位
    AMap.event.addListener(geolocation, "complete", result => {
        _that.lat = result.position.lat;
        _that.lng = result.position.lng;
        _that.province = result.addressComponent.province;
        _that.city = result.addressComponent.city;
        _that.district = result.addressComponent.district;
        // console.log("_that:",_that)
        this.info = result
    });
    AMap.event.addListener(geolocation, "error", err => {
        console.log("定位失败：",err)
    });
}


// get os
let getOs = () =>{
    let sUserAgent = navigator.userAgent.toLocaleLowerCase()
    console.log("navigator.platform:",navigator.platform)
    let isWin = (navigator.platform === 'win32') || (navigator.platform === 'windows')
    let isMac = (navigator.platform === 'Mac68k') || (navigator.platform === 'Macppc') || (navigator.platform === 'Macintosh') || (navigator.platform === 'MacIntel')
    if (isMac) return 'Mac'
    var isUnix = (navigator.platform === 'x11') && !isWin && !isMac
    if (isUnix) return 'Unix'
    var isLinux = (String(navigator.platform).indexOf('linux') > -1)
    if (isLinux) return 'Linux'
    if (isWin) {
        var isWin2K = sUserAgent.indexOf('windows nt 5.0') > -1 || sUserAgent.indexOf('windows 2000') > -1
        if (isWin2K) return 'Win2000'
        var isWinXP = sUserAgent.indexOf('windows nt 5.1') > -1 || sUserAgent.indexOf('windows xp') > -1
        if (isWinXP) return 'WinXP'
        var isWin2003 = sUserAgent.indexOf('windows nt 5.2') > -1 || sUserAgent.indexOf('windows 2003') > -1
        if (isWin2003) return 'Win2003'
        var isWinVista = sUserAgent.indexOf('windows nt 6.0') > -1 || sUserAgent.indexOf('windows vista') > -1
        if (isWinVista) return 'WinVista'
        var isWin7 = sUserAgent.indexOf('windows nt 6.1') > -1 || sUserAgent.indexOf('windows 7') > -1
        if (isWin7) return 'Win7'
    }
    if (sUserAgent.indexOf('android') > -1) return 'Android'
    if (sUserAgent.indexOf('iphone') > -1) return 'iPhone'
    if (sUserAgent.indexOf('symbianos') > -1) return 'SymbianOS'
    if (sUserAgent.indexOf('windows phone') > -1) return 'Windows Phone'
    if (sUserAgent.indexOf('ipad') > -1) return 'iPad'
    if (sUserAgent.indexOf('ipod') > -1) return 'iPod'
    return 'others'
}

let IdentityCodeValid = (value) => {
    let city = {
        11: '北京',
        12: '天津',
        13: '河北',
        14: '山西',
        15: '内蒙古',
        21: '辽宁',
        22: '吉林',
        23: '黑龙江',
        31: '上海',
        32: '江苏',
        33: '浙江',
        34: '安徽',
        35: '福建',
        36: '江西',
        37: '山东',
        41: '河南',
        42: '湖北',
        43: '湖南',
        44: '广东',
        45: '广西',
        46: '海南',
        50: '重庆',
        51: '四川',
        52: '贵州',
        53: '云南',
        54: '西藏 ',
        61: '陕西',
        62: '甘肃',
        63: '青海',
        64: '宁夏',
        65: '新疆',
        71: '台湾',
        81: '香港',
        82: '澳门',
        91: '国外'
    }
    let tip = ''
    let pass = true
    // let year=Number(value.substr(6,4));
    // let now=new Date();
    // let thisYear=now.getFullYear();
    if (value.length !== 18) {
        tip = '请输入18位身份证号码！'
        pass = false
    } else if (!value || !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])\d{3}(\d|X|x)$/i.test(value)) {
        tip = '身份证号格式错误'
        pass = false
    } else if (!city[value.substr(0, 2)]) {
        tip = '地址编码错误'
        pass = false
    } else {
        // 18位身份证需要验证最后一位校验位
        if (value.length == 18) {
            value = value.split('')
            // ∑(ai×Wi)(mod 11)
            // 加权因子
            let factor = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2 ]
            // 校验位
            let parity = [ 1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2 ]
            let sum = 0
            let ai = 0
            let wi = 0
            for (let i = 0; i < 17; i++) {
                ai = value[i]
                wi = factor[i]
                sum += ai * wi
            }
            let last = parity[sum % 11]
            if (parity[sum % 11] != value[17]) {
                tip = '请输入正确的身份证号'
                pass = false
            }
        }
    }
    if (!pass) { return tip } else { return true };
}


export {
    dateFormat,
    getBrowser,getOs,
    listToTreeList, objToUrlOption, checkTel, checkEmail,checkPass,
    getToken,
    getCookie, setCookie, delCookie,
    getTokenTime,
    downloadFile,
    buttonIsShow,
    getRefreshToken,
    base64ToFile,
    getUserInfo,
    IdentityCodeValid
}