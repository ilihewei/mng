<template>
  <div class="successAndFail">
    <div class="box">
      <img src="../../common/img/success.png" :alt="title"/>
      <p>{{title}}</p>
      <div v-if="rechargeTitle" class="consumMoney">{{rechargeTitle}}:<span>{{rechargeNum}}</span></div>
      <div v-if="remainingTitle" class="consumMoney">{{remainingTitle}}:<span>{{remainingNum}}</span></div>
    </div>
    <el-button type="primary" @click="comeBack">返回</el-button>
  </div>
</template>

<script>
export default {
  name: "successPage",
  props: [
    'title',//提示
    'rechargeTitle',//消费金额标题
    'remainingTitle',//剩余金额标题
    'rechargeNum',//消费金额
    'remainingNum',//剩余金额
  ],
  methods:{
    comeBack(){
      this.$router.back()
    },
  }
}
</script>

<style scoped lang="less">
.successAndFail{
  display: flex;
  flex-direction: column;
  width: 100%;
  .box {
    padding-top: 200px;
    img {
      width: 70px;
      height: 70px;
      position: relative;
      left: 50%;
      transform: translateX(-50%);
      top: 0;
      margin-bottom: 20px;
    }
    p {
      margin-bottom: 50px;
      text-align: center;
      font-size: 18px;
      color: #29AB91;
    }
    .consumMoney{
      text-align: center;
      padding: 10px;
      span{
        margin-left: 10px;
      }
    }
  }
  /deep/.el-button--primary{
    width: 8%;
    margin: 40px auto;
    position: relative;
    left: 7px;
  }
}
</style>