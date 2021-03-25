<template>
  <div id="index">
    <!-- header -->
    <div class="head">
      <header class="w">
        <div class="l">
<!--          <img src="../assets/img/logo2.png">-->
          <img src="../assets/img/logo1.png">
          <span>北京神州数码方圆科技有限公司</span>
        </div>
        <ul class="r div_nav">
          <li class="l"><a href="#" class="l firstA">公司简介</a><span class="l">公司简介</span></li>
          <li class="l" @click="selectPage"><a href="#" class="l">行业新闻</a><span class="l">行业新闻</span></li>
          <li class="l" @click="selectPage"><a href="#" class="l">合作伙伴</a><span class="l">合作伙伴</span></li>
          <li class="l" @click="selectPage"><a href="#" class="l">尊享服务</a><span class="l">尊享服务</span></li>
          <li class="l" @click="selectPage"><a href="#" class="l">区域代理</a><span class="l">区域代理</span></li>
          <li class="l" @click="selectPage"><a href="#" class="l">联系我们</a><span class="l">联系我们</span></li>
        </ul>
      </header>
      <div class="xian"></div>
    </div>
    <div class="main">
    <swiper/>
      <!-- nav -->
      <section id="nav">
        <div class="w">
          <h2>公司简介</h2>
          <p>真诚、共赢、无微不至</p>
          <div class="intrdo"><!---->
               北京神州数码方圆科技有限公司为神州数码信息服务股份有限公司（简称：神州信息 股票代码：000555.SZ）的全资子公司。
            神州信息作为金融科技全产业链综合服务商，拥有三十余年行业信息化建设经验，是国内信息化产业领导者和数字中国的践行者，依托深厚的自主研发能力，
            融合科技与业务，赋能行业数字化转型，推动中国数字化升级，支撑数字中国的使命。
            神州信息战略聚焦金融科技，以大数据、人工智能、区块链、云计算与分布式、物联网以及量子通信等新技术的应用，驱动软件及服务产品智能化迭代，助力金融机构安全合规地推进基础架构升级及业务创新；
            融合金融、政企、农业、运营商等行业数据及场景资源，创新金融场景，打造新的服务平台并提供运营服务，赋能金融行业数字化转型，打造产业融合新生态。
          </div>
        </div>
      </section>
    </div>
    <footer>
      <div class="w">
<!--        <p><i class="iconfont icon-shouji1"></i> 联系方式：123456789（田先生）/1234567(康小姐)</p>-->
        <p><i class="iconfont icon-youxiang"></i> 邮箱：fangyuan@dcits.com</p>
        <p><i class="iconfont icon-guanwang-"></i> 官网：http://www.dcitsfy.com</p>
        <p><i class="iconfont icon-dizhi1"></i> 地址：北京市房山区阎富路69号院46号楼1至4层101一层28</p>
        <p><i class="iconfont icon-beian"></i> 网站备案/许可证号：京ICP备2021007088号-1</p>
      </div>
    </footer>
  </div>

</template>

<script>
import api from '../api/api';
import {mapState, mapActions,mapMutations} from 'vuex';
import swiper from '../components/swiper'
// import '../../common/font/iconfont.css'

export default {
  name: "index",
  components:{swiper},
  data(){
    return {

    }
  },
  watch: {},
  mounted(){},
  destroyed() {},
  activated() {},
  methods:{
    selectPage(){
      this.$message({
        type:'info',
        message: '正在建设',
      });
    }
  },
  computed:{},
}
</script>
<style scoped lang="less">
#index{
  height: 100%;
  width: 100%;
  background: #f7f7f7;
  overflow: auto;
  /*header*/
  .head{
    width: 100%;
    position: fixed;
    top:0;
    left:0 ;
    background: #fff;
    z-index: 1000;
    border-bottom: 2px solid #ebebeb;
  }
  header{
    height:80px ;
    line-height: 80px;
  }
  header .l{
    display: flex;
    cursor: pointer;
    span{
      font-size:16px ;
      color:#323335 ;
    }
  }
  header .l img{
    padding-top: 20px;
    padding-right: 10px;
    height: 40px;
    width: 50px;
  }
  header .r{
    width:600px ;
  }
  header .r a{
    width:80px ;
    margin: 0 6px;
    font-size:14px;
    color:#323335 ;
    text-align: center;
    display: block;
    //border-bottom: 2px solid #f60;
  }
  header .r .firstA{
    display: block;
    color: #f60;
    //border-bottom: 1px solid #f60;
  }
  header .r span{
    width:80px ;
    margin: 0 6px;
    font-size:14px ;
    color:#323335 ;
    text-align: center;
    display: none;
    cursor:pointer ;
  }
  header .r li:hover a{
    display: none;
  }
  header .r li:hover span{
    display: block;
    color: #f60;
    //border-bottom: 1px solid #f60;
  }
  //.xian{
  //  height:3px ;
  //  border-bottom: 2px solid #ebebeb;
  //  background: url(../assets/img/xian.jpg);
  //}
  .main{
    //height: 1600px;
    margin-top: 80px;
    /*nav*/
    #nav{
      background:#f7f7f7;
      padding:22px 0 60px;
    }

    #nav .w h2{
      font-size:22px ;
      color:#000 ;
      line-height:57px ;
      text-align:center;
    }
    #nav .w p{
      text-align: center;
      color:#9a989b;
      margin-bottom:29px ;
    }
    #nav .w .intrdo{
      font-size: 16px;
      color: #666666;
      line-height: 30px;
    }
  }
  /*footer*/
  footer{
    background: #363636;
    padding:30px 0 33px;
  }
  footer p{
    font-size:14px ;
    color:#fff ;
    line-height:36px ;
    text-align: center;
  }
  footer p i{
    margin-right: 10px;
  }
}
</style>