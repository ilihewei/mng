<template>
  <div class="flex-row page-box" v-if="total > pageSize">
    <el-pagination
      background
      :current-page = "pageNum"
      @current-change = "handleCurrentChange"
      layout="prev, pager, next"
      :total="total"
      :page-size="pageSize">
    </el-pagination>
  </div>
</template>

<script>
export default {
  props: [
    'total',
    'pageSize',
    'pageNum'
  ],
  data () {
    return {
    }
  },
  mounted(){
    console.log(this.total)
    console.log(this.pageSize)
    console.log(this.pageNum)
  },
  methods: {
    handleCurrentChange (val) {
      this.$emit('getList', val)
    }
  }
}
</script>

<style scoped>

</style>
