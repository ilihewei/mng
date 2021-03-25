<template>
  <div class="monyCard flex-column space-between" :style="cardStyle">
    <div class="top">
      <img :src="cardParam.logoUrl || defaultlogo" class="ico" alt="">
      <div style="display: inline-block;vertical-align: middle;">
        <div class="tit">{{cardParam.bankName}}</div>
<!--        <div class="txt">{{cardParam.expiryDate}}</div>-->
      </div>
<!--      <div v-if="cardParam.cardStatus == 6 || cardParam.cardStatus == 5" style="float: right;border-radius: 5px;font-size:12px;background: #fff;padding:5px 10px;">-->
<!--        <span v-if="cardParam.cardStatus == 6" style="color:#F56C6C">已退卡</span>-->
<!--        <span v-if="cardParam.cardStatus == 5" style="color:#F56C6C">退卡审核中</span>-->
<!--      </div>-->

    </div>
    <div class="btm">
<!--      <span class="notice"></span>-->
      <span class="num">{{cardParam.walletShowName}}</span>
    </div>
  </div>
</template>

<script>
import bg from '../../common/img/gsbgd.png';
import logo from '../../common/img/gslogo.png';
export default {
  props: ['cardParam'],
  data() {
    return {
      cardStyle:{
        background:`url(${this.cardParam.bgUrl || bg})`,
        backgroundSize: '100% 100%'
      },
      defaultlogo:logo
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
.monyCard .top .txt{font-size:12px;color:#fff;position: relative;top: 3px;}
.monyCard .btm {text-align: center;align-items: center;}
.monyCard .btm .notice{font-size:12px;color:#fff;}
.monyCard .btm .num{font-size:20px;color:#fff;align-items: center;}
</style>