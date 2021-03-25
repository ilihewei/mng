<template>
  <div class="monyCard flex-column space-between" :style="cardStyle">
    <div class="top">
      <img src="../../common/img/yearIcon.png" class="ico" alt="">
      <div style="display: inline-block;vertical-align: middle;">
        <div class="tit">年卡</div>
        <div class="txt">{{cardParam.cardInformation}}</div>
        <!--                <div class="txt">购买之日起一年内有效</div>-->
      </div>
      <div v-if="cardParam.cardStatus == 6 || cardParam.cardStatus == 5" style="float: right;border-radius: 5px;font-size:12px;background: #fff;padding:5px 10px;">
        <span v-if="cardParam.cardStatus == 6" style="color:#F56C6C">已退卡</span>
        <span v-if="cardParam.cardStatus == 5" style="color:#F56C6C">退卡审核中</span>
      </div>

    </div>
    <div class="btm">
      <span class="notice">到期时间：</span>
      <span class="num">{{ cardParam.cardValue || cardParam.value}}{{cardParam.unit}}</span>
    </div>
  </div>
</template>

<script>
import bg from '../../common/img/yearCardBg.png';
export default {
  props: ['cardParam'],
  data() {
    return {
      cardStyle:{
        background:`url(${this.cardParam.imageUrl || bg})`,
        backgroundSize: '100% 100%'
      }
    };
  },
  methods:{

  },
  watch: {
    '$route': {
      handler: function (val) {

      },
      immediate: true,
      deep: true
    },
  }
}
</script>

<style lang="less" scoped>
.monyCard{
  border-radius: 1em;
  width:100%;
  height: 100%;
  min-height:130px;
  box-sizing: border-box;
  padding:15px;
  /*background: url("../../common/img/yearCardBg.png");background-size: 100% 100%;*/
}
.monyCard .top .ico{width:35px;height:35px;vertical-align: middle;margin-right: 10px;}
.monyCard .top .tit{font-size:16px;color:#fff;}
.monyCard .top .txt{font-size:12px;color:#fff;}
.monyCard .btm {text-align: right;}
.monyCard .btm .notice{font-size:12px;color:#fff;}
.monyCard .btm .num{font-size:16px;color:#fff;}
</style>