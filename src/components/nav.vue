<template>
  <div class="header flex-row space-between">
    <div class="lft flex-row">
      <div class="flex-row flex-center logo">
        <img src="../assets/img/logo.png" alt="" style="width:31px;height:31px;">
        <div style="margin-left: 10px;">
          <div class="txt1">预付卡管理</div>
          <div class="txt2">Prepaid card management</div>
        </div>
      </div>
      <div class="flex-row nav" v-if="userRole=='admin'">
        <div class="li"  :class="{active: active == '消费管理'}" @click="toConsume()">消费管理</div>
        <div class="li" :class="{active: active == '制卡管理'}" @click="toCardMan()">制卡管理</div>
        <div class="li" :class="{active: active == '客户中心'}"  @click="userCenter()">客户中心</div>
        <div class="li" :class="{active: active == '退卡审核'}"  @click="toReturnCard()">退卡审核</div>
        <div class="li" :class="{active: active == '报表查询'}"  @click="reportForm()">报表查询</div>
        <div class="li" :class="{active: active == '用户中心'}"  @click="personalCenter()">用户中心</div>
        <div class="li" :class="{active: active == '用户钱包'}"  @click="personWallet()">用户钱包</div>
      </div>
      <div class="flex-row nav" v-if="userRole=='operator'">
        <div class="li"  :class="{active: active == '消费管理'}" @click="toConsume()">消费管理</div>
        <div class="li" :class="{active: active == '客户中心'}"  @click="userCenter()">客户中心</div>
        <div class="li" :class="{active: active == '用户钱包'}"  @click="personWallet()">用户钱包</div>
      </div>
    </div>
    <div class="rit flex-row flex-center">
      <el-input
          @keypress.native.enter="toSearch"
          size="mini"
          placeholder="输入手机号搜索用户"
          v-model="searchInput">
        <i slot="prefix" class="el-input__icon el-icon-search"></i>
      </el-input>
      <el-button type="text" style="margin:0 10px;" @click="toSearch"><i style="color:#30495E" class="el-icon-search"/></el-button>

      <el-badge value="1" v-if="false">
        <i class="el-icon-bell" style="font-size:16px;color:#30495E"></i>
      </el-badge>

      <el-dropdown style="cursor:pointer;">
        <div class="el-dropdown-link flex-row flex-center" style="white-space:nowrap ">
          <i class="el-icon-user-solid" style="color:#333;margin-right: 5px;" v-if="requestParams.imageUrl == ''"></i>
          <img v-else style="width:22px;height:22px;margin-right: 10px;border-radius: 50%;" :src="requestParams.imageUrl" alt="">
          {{userName}}<i class="el-icon-arrow-down"></i>
        </div>
        <el-dropdown-menu slot="dropdown" v-if="userRole=='admin'">
          <el-dropdown-item><span @click="setInfo">商户设置</span></el-dropdown-item>
          <el-dropdown-item><span @click="changePwd">修改密码</span></el-dropdown-item>
          <el-dropdown-item><span @click="logout">退出登录</span></el-dropdown-item>
        </el-dropdown-menu>
        <el-dropdown-menu slot="dropdown" v-if="userRole=='operator'">
          <el-dropdown-item><span @click="changePwd">修改密码</span></el-dropdown-item>
          <el-dropdown-item><span @click="logout">退出登录</span></el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>

    <el-dialog
        title="商户设置"
        :visible.sync="addDialog"
        width="500px">
      <div class="notice">更改商户信息</div>
      <el-form :model="requestParams" size="small" :rules="rules" ref="requestParams" label-width="100px" class="demo-requestParams">
        <el-form-item label="商户名称" prop="name">
          <el-input
              placeholder="输入商户名称"
              v-model="requestParams.name">
          </el-input>
        </el-form-item>
        <el-form-item label="商户类型" prop="type">
          <el-select style="width:100%;" v-model="requestParams.type" placeholder="选择商户类型">
            <el-option
                v-for="item in typeArr"
                :key="item.type"
                :label="item.value"
                :value="item.type">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="联系方式" prop="contact">
          <el-input
              placeholder="输入联系方式"
              v-model="requestParams.contact">
          </el-input>
        </el-form-item>
        <!--<el-form-item label="商铺地址" prop="address">
          <el-input
              placeholder="输入商铺地址"
              v-model="requestParams.address">
          </el-input>
        </el-form-item>-->
        <el-form-item label="商铺地址" prop="region">
          <el-cascader
              style="width: 100%;"
              v-model="requestParams.region"
              :props="regionProps"
              :options="provinceList"
              @change="provinceChange">
          </el-cascader>
        </el-form-item>
        <el-form-item label="详细地址" prop="address">
          <el-input
              placeholder="输入商铺详细地址"
              v-model="requestParams.address">
          </el-input>
        </el-form-item>
        <el-form-item label="商户账号" prop="account">
          <el-input
              placeholder="输入商户账号"
              v-model="requestParams.account">
          </el-input>
        </el-form-item>
        <el-form-item label="商户描述" prop="information">
          <el-input type="textarea" v-model="requestParams.information"></el-input>
        </el-form-item>
        <el-form-item label="更改头像" prop="imageUrl">
          <el-input  v-model="requestParams.imageUrl" v-show="false"></el-input>
          <div class="imgList" v-if="requestParams.imageUrl">
            <div class="li flex-row space-between flex-center">
              <i class="el-icon-close close" @click="removeImg"></i>
              <img :src="requestParams.imageUrl" style="max-width:100%;max-height:100%;" class="avatar">
            </div>
          </div>
          <importCom v-else :params="importParams" @refreshFn="refreshFn"/>
          <div v-if="!requestParams.imageUrl" class="notice" style="font-size:12px;color:#999;">尺寸：610x220px;格式：png/jpg  大小：<=1M</div>
        </el-form-item>
      </el-form>
      <div style="text-align: center;">
        <el-button size="small" @click="resetForm('requestParams');addDialog = false">取消</el-button>
        <el-button size="small" type="primary" @click="submitForm('requestParams')">确定</el-button>
      </div>
    </el-dialog>

    <el-dialog
        title="修改密码"
        :visible.sync="changePwdDialog"
        width="500px">
      <el-form :model="requestParams2" size="small" :rules="rules2" ref="requestParams2" label-width="100px" class="demo-requestParams">
        <el-form-item label="新密码" prop="password" style="margin-top:20px;">
          <el-input
              placeholder="输入新密码"
              type="password"
              v-model="requestParams2.password">
          </el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="repassword">
          <el-input
              placeholder="输入确认密码"
              type="password"
              v-model="requestParams2.repassword">
          </el-input>
        </el-form-item>
      </el-form>
      <div style="text-align: center;">
        <el-button size="small" @click="resetForm('requestParams2');changePwdDialog = false">取消</el-button>
        <el-button size="small" type="primary" @click="changePwdFn('requestParams2')">确定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import importCom from '../components/importCom'
import api from '../api/api'
import provinceList from '../../common/js/provinceList'
import {checkPass, checkTel} from '../api/baseData'
import md5 from 'js-md5'
export default {
  components:{
    importCom
  },
  data() {
    const checkOldPwd = (rule, value, callback) => {
      if (!value) {
        callback('请输入原密码');
      } else {
        callback();
      }
    };
    const checkPwd = (rule, value, callback) => {
      if (!value) {
        callback('请输入密码');
      } else {
        if (this.requestParams2.repassword != '') {
          this.$refs.requestParams2.validateField('repassword');//对repassword再次进行校验
        }
        let check = checkPass(value);
        // console.log("checkPass(value):",check)
        // console.log("checkPass(value)value:",value)
        if(check){
          callback();
        }else{
          callback(new Error('长度为8位且必须包含数字和字母'));
        }
      }
    };
    const checkRePwd = (rule, value, callback) => {
      if (!value) {
        callback('请再次输入密码');
      } else if (value != this.requestParams2.password) {
        callback(new Error('两次密码不一致'))
      } else {
        callback();
      }
    };
    let checkTelFn = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入手机号码'));
      } else {
        let check = checkTel(value);
        // console.log("checkTel(value):",check)
        if(check.isPass){
          callback();
        }else{
          callback(new Error(check.type));
        }

      }
    };
    return {
      provinceList:provinceList,
      regionProps:{
        label:'areaName',
        value:'areaName'
      },
      changePwdDialog:false,

      importParams:{
        url: api.getImporturl(),
        buttonSize: 'mini',
        buttonName: '',
        imageUrl:'',
      },
      name:'',
      userName:'',
      merchantId:'',
      userRole:'',//用户角色
      searchInput:'',
      active:'',
      addDialog:false,
      typeArr:[],
      requestParams: {
        "type":"",
        "account": "",
        "address": "",//详细地址
        "region": "",//省市区
        "consumption": "",
        "contact": '',
        "distance": "",
        "imageUrl": '',
        "information": "",
        "name": "",
      },
      rules: {
        name: [
          { required: true, message: '请输入名称', trigger: 'change' },
          { min: 1, max: 15, message: '长度在 1 到 15 个字符', trigger: 'change' }
        ],

        type: [
          { required: true, message: '请选择商户类型', trigger: 'change' },
        ],
        address: [
          { required: true, message: '请输入商铺详细地址', trigger: 'change' },
          { min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'change' }
        ],
        region: [
          { required: true, message: '请选择省市区', trigger: 'change' }
        ],
        account: [
          { required: true, message: '请输入账号', trigger: 'change' },
          { min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'change' }
        ],
        imageUrl: [
          { required: true, message: '请选择图片', trigger: 'change' },
        ],
        information: [
          { required: true, message: '请输入描述', trigger: 'change' },
          { min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'change' }
        ],
      },
      requestParams2: {
        oldpassword: '',
        password: '',
        repassword: '',
      },
      rules2: {
        oldpassword: [{required: true, validator: checkOldPwd, trigger: 'change'},],
        password: [{required: true, validator: checkPwd, trigger: 'change'},],
        repassword: [{required: true, validator: checkRePwd, trigger: 'change'},],
      }
    };
  },
  methods:{
    //切换省市区
    provinceChange(address){
      console.log('address',address)
    },
    //获取所有商户类型
    getmerchanttype(){
      api.merchanttype().then(res=>{
        console.log('this.typeArr',res)
        this.typeArr = res.data.data
      })
    },
    toSearch(){
      this.$router.push({
        path:'/userCenter',
        query:{keyword:this.searchInput}
      })
    },
    removeImg(){
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.importParams.imageUrl = '';
        this.requestParams.imageUrl = '';
        console.log("this.requestParams:",this.requestParams)
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    refreshFn (obj) {
      console.log("obj:",obj)
      this.importParams.imageUrl = obj.data;
      this.requestParams.imageUrl = obj.data;
      console.log("重新渲染页面")
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let tempObj = JSON.parse(JSON.stringify(this.requestParams));
          tempObj.region = tempObj.region.join(',');
          api.changeShopInfo(tempObj).then(res=>{
            console.log(res)
            if(res.data.returnCode == '000000'){
              this.addDialog = false
            }
            this.$message({
              type:res.data.returnCode =='000000'?'success':'warning',
              message:res.data.returnCode =='000000'?'修改成功':res.data.returnMsg
            })
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    changePwdFn(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let tempObj = {
            "merchantId": api.getSession('merchantId'),
            "name": api.getSession('name'),
            // "password": md5(this.requestParams2.password),
            'password': this.$getRsaCode(this.requestParams2.password),
            "userName": api.getSession('userName'),
          }
          api.changePwd(tempObj).then(res=>{
            console.log(res)
            this.$message({
              type:res.data.returnCode =='000000'?'success':'warning',
              message:res.data.returnCode =='000000'?'修改成功':res.data.returnMsg
            })
            if(res.data.returnCode == '000000'){
              this.addDialog = false
              this.logout()
            }

          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    changePwd(){
      this.changePwdDialog = true;
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    toReturnCard(){
      this.$router.push({
        path:'/returnCard'
      })
    },
    toCardMan(){
      this.$router.push({
        path:'/cardMange'
      })
    },
    toConsume(){
      this.$router.push({
        path:'/consume'
      })
    },
    userCenter(){
      this.$router.push({
        path:'/userCenter'
      })
    },
    personalCenter(){
      this.$router.push({
        path:'/personalCenter'
      })
    },
    reportForm(){
      this.$router.push({
        path:'/reportForm'
      })
    },
    personWallet(){
      this.$router.push({
        path:'/personWallet'
      })
    },
    setInfo(){
      this.addDialog = true;
      this.getUserInfo();
      this.addDialog = true;

    },
    setMoney(){
      this.geMoneyInfo();
      this.addDialog = true;
    },
    logout(){
      sessionStorage.clear();
      this.$router.push('/login')
    },
    getUserInfo(){
      let name = this.name;
      api.getShopInfo({name:name}).then(res=>{
        this.$nextTick(()=>{
          //this.resetForm('requestParams');
          this.requestParams = res.data.data;
          if(typeof (this.requestParams.region) == 'string' && this.requestParams.region.length){
            this.requestParams.region = this.requestParams.region.split(',');
          }
          console.log("用户信息：",this.requestParams)
        })
      })
    },
  },
  created() {
      this.provinceList = provinceList
    },
  mounted(){
    console.log('provinceList',provinceList)
    let userName = api.getSession('userName');
    let merchantId = api.getSession('merchantId');
    let userRole = api.getSession('userRole');
    if(!(userName && merchantId && userRole)){
      api.jumpToLogin();
    }
    this.userName = userName;
    this.merchantId = merchantId;
    this.userRole = userRole;
    this.name = api.getSession('name');

    this.getUserInfo();
    this.getmerchanttype()
  },
  watch: {
    '$route': {
      handler: function (val) {
        // console.log("路由：", this.$route)
        this.active = this.$route.meta.tit;
      },
      immediate: true,
      deep: true
    },
  }
}
</script>

<style lang="less" scoped>
.imgList .li{width:100px;height:100px;position: relative;border: 2px solid #eee;padding:5px;border-radius: 3px;}
.imgList .li .close{position: absolute;top:0;right:0;color:#666;font-size:16px;cursor: pointer;}
.imgList .li .close:hover{color:#409EFF;}


.header{
  height:60px;
  padding:0 15px;
  background: #FFFFFF;
  box-shadow: inset -1px 0 0 0 #E4E8EB, inset 0 -1px 0 0 #E4E8EB;
}
.header .lft{}
.header .logo .txt1{
  font-size: 22px;
  color: #30495E;
  letter-spacing: 4.47px;
}
.header .logo .txt2{
  font-size: 12px;
  color: #30495E;
  font-weight: bold;
  letter-spacing: -0.99px;}

.header .nav{
  margin-left: 40px;
  font-size: 16px;
  letter-spacing: 0;
  line-height: 60px;

}
.header .nav .li{
  margin-left: 30px;
  border-bottom: 2px solid transparent;
  cursor: pointer;
  color: #30495E;
}
.header .nav .li.active{
  color: #5479FA;
  border-bottom: 2px solid #5479FA;
}
.notice{color:#aaa;font-size:14px;margin:10px 0;}
/deep/ .el-badge__content{padding:0 3px;height:15px;line-height: 15px;}
/deep/ .el-dialog__body{padding:10px 20px 20px;}

/deep/ .el-dialog__header{background: #5479FA;padding:5px 15px;}
/deep/ .el-dialog__header .el-dialog__title{color:#fff;font-size:14px;}
/deep/ .el-dialog__header .el-dialog__headerbtn{top:10px;right:10px;}
/deep/ .el-dialog__header .el-dialog__headerbtn .el-dialog__close{color:#fff;}
/deep/ .cardDetailDialog .el-dialog__header .el-dialog__title{color:transparent;}
</style>
                <div class="li" :class="{active: active == '退卡管理'}"  @click="toReturnCard()">退卡管理</div>