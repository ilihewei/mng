<template>
  <div id="help" ref="flowImg">
    <!--      <div>-->
    <el-carousel :autoplay="false" arrow="hover" trigger="click" :height="height+'px'" >
      <el-carousel-item v-for="(item,index) in helpList" :key="index">
        <div class="swiperLable">
          <h2>{{item.title}}</h2>
          <h3>{{item.article}}</h3>
        </div>
        <img :src="item.imgSrc" alt="" style="max-width:100%;display:block;">
      </el-carousel-item>
    </el-carousel>
    <!--      </div>-->
  </div>
</template>

<script>
import img01 from '../assets/img/a.jpg'
import img03 from '../assets/img/b.jpg'
import img02 from '../assets/img/c.jpg'
import img04 from '../assets/img/d.jpg'
export default {
  name: "swiper",
  data(){
    return {
      height:500,
      helpList:[
        {imgSrc:img03,title:'中国更优秀的云及数字化服务商',article:'神州数码以自主创新核心技术赋能产业数字化转型和数字经济发展， 推动中华民族的伟大复兴。'},
        {imgSrc:img02,title:'《财富》中国500强：神州数码位列117位',article:'2020年财富中国500强发布，神州数码蝉联117位'},
        {imgSrc:img01,title:'',article:''},
        // {imgSrc:img04,title:'中国更优秀的云及数字化服务商',article:'神州数码以自主创新核心技术赋能产业数字化转型和数字经济发展， 推动中华民族的伟大复兴。'},
      ]
    }
  },
  mounted(){
    this.$nextTick(()=>{
      this.height = this.$refs.flowImg.offsetHeight;
      // console.log("this.height:",this.height)
    })
    window.onresize = ()=>{
      this.height = this.$refs.flowImg.offsetHeight;
    }
  },
  destroyed() {

  },
  methods:{
  },
  computed:{
  },
}
</script>

<style scoped lang="less">
.swiperLable{
  position: absolute;
  left: 12%;
  top: 40%;
  color: #fff;
  h2{
    font-size: 56px;
    line-height: 1;
    font-weight: bold;
    text-shadow: 1px 1px 5px #444;
  }
  h3{
    font-size: 18px;
    line-height: 1;
    margin-top: 30px;
    text-shadow: 1px 1px 5px #444;
  }
}
/deep/.el-carousel__arrow{
  width:auto !important;height:auto !important;background: none !important;
}
/deep/.el-carousel__arrow i{font-size:80px;color:#fff;opacity: 1}
/deep/.el-carousel__arrow:hover i{opacity: 1}
/deep/.el-carousel__button{background: #fff;}
</style>