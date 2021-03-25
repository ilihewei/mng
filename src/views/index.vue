<template xmlns="http://www.w3.org/1999/html" xmlns="http://www.w3.org/1999/html" xmlns="http://www.w3.org/1999/html"
          xmlns="http://www.w3.org/1999/html">
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
            &nbsp;&nbsp;北京神州数码方圆科技有限公司（简称：神州方圆）是神州数码信息服务股份有限公司（简称：神州信息股票代码：000555.SZ）的全资子公司。神州方圆战略聚焦区块链、数字人民币相关场景的应用推广以及金融安全领域，致力于为金融机构、商户与企业、政府及其他客户提供金融数字化产品及解决方案。

            &nbsp;&nbsp;神州信息作为金融科技全产业链综合服务商，拥有三十余年行业信息化建设经验，是国内信息化产业领导者和数字中国的践行者，依托深厚的自主研发能力，融合科技与业务，赋能行业数字化转型，推动中国数字化升级，支撑数字中国的使命。
              神州信息于2016年抢先布局区块链，从研究区块链底层开源技术，到自主研发区块链解决方案，再到携手北京航空航天大学建立区块链联合实验室、研究开发基于区块链的产品及服务，积极探索数字技术融通创新推动产学研一体化发展带动产业创新，加速金融行业高质量发展及数字化转型。

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