<template>
    <div class="monyCard flex-column space-between" :style="cardStyle">
        <div class="top">
            <img src="../../common/img/numIcon.png" class="ico" alt="">
            <div style="display: inline-block;vertical-align: middle;">
                <div class="tit">次卡</div>
<!--                <div>{{cardParam}}</div>-->
                <div class="txt">{{cardParam.cardInformation}}</div>
<!--                <div class="txt">累计可使用10次、不限时间</div>-->
            </div>
            <div v-if="cardParam.cardStatus == 6 || cardParam.cardStatus == 5" style="float: right;border-radius: 5px;font-size:12px;background: #fff;padding:5px 10px;">
                <span v-if="cardParam.cardStatus == 6" style="color:#F56C6C">已退卡</span>
                <span v-if="cardParam.cardStatus == 5" style="color:#F56C6C">退卡审核中</span>
            </div>
        </div>
        <div class="btm">
            <span class="notice">可用次数：</span>
            <span class="num">{{cardParam.cardValue || cardParam.value}}{{cardParam.unit}}</span>
        </div>
    </div>
</template>

<script>
    import bg from '../../common/img/numCardBg.png';
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
       width:100%;
       height: 100%;
       min-height:130px;
       box-sizing: border-box;
       padding:15px;
       border-radius: 1em;
       /*background: url("../../common/img/numCardBg.png");background-size: 100% 100%;*/
   }
    .monyCard .top .ico{width:35px;height:35px;vertical-align: middle;margin-right: 10px;}
    .monyCard .top .tit{font-size:16px;color:#fff;}
    .monyCard .top .txt{font-size:12px;color:#fff;}
   .monyCard .btm {text-align: right;}
   .monyCard .btm .notice{font-size:12px;color:#fff;}
   .monyCard .btm .num{font-size:16px;color:#fff;}
</style>