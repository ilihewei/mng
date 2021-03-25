<template>
  <div ref="upload" style="display: inline-block">
    <el-upload
            v-loading.fullscreen="loading"
            element-loading-text="正在上传..."
            class="upload-demo avatar-uploader"
            :action="uploadurl"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            :headers="headers"
            :on-success="onsuccess"
            :on-error="onerror"
            :show-file-list="false"
            :before-upload="beforeupload"
            name="file"
            list-type="picture"
            :data="data_s"
            :file-list="attachmentLs"

    >
      <i slot="trigger" class="el-icon-plus avatar-uploader-icon" style="border:1px dashed #ddd"></i>
<!--      <el-button slot="trigger" :size=params.buttonSize  type="primary"><i class="el-icon-download" style="font-size: 14px;"></i> {{params.buttonName}}</el-button> -->
    </el-upload>
  </div>
</template>

<script>
  import api from '../api/api'
  export default {
    props: ['params'],
    data: function () {
      return {
        loading: false,
        maxsize: this.params.maxsize || 15,
        // Authorization: localStorage.getItem('token') || '2c1a82be1c29a582bd2f9a87f5e8d645',
        File: 'File',
        data_s: {
          // referenceId: '123',
          // test: this.params.type,
          // file: ''
        },
        accepttype: ['jpeg','jpg','png','gif'],
        headers: {
          // 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJ0b2tlblR5cGUiOiJhY2Nlc3NfdG9rZW4iLCJ1c2VySWQiOiI0Iiwic3ViIjoiaHFxMiIsImp0aSI6IjY1OWI2NGFhLTczNTktNGRkZC1hY2YzLWZiZjBmNzMwYTQ1ZSIsImlhdCI6MTU1MDcyOTQ5MCwiZXhwIjoxNTUwNzM1NDkwfQ.-EGw7PqU2ClQJNB034ztGe2G_saizPcIKjOdZ-iRGsA'
          'token': api.getToken()
        },
        uploadurl: this.params.url,
        attachmentLs: []
      }
    },
    methods: {
      beforeRemove(file, attachmentLs){
        console.log("删除之前")
        /*this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$emit('refreshFn','delete')
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
          return false;
        });*/

      },
      handlePreview (file) {},
      handleRemove (file, attachmentLs) {
        console.log("file,",file)
        console.log("attachmentLs,",attachmentLs)
      },
      beforeupload (file, fileList) {
        console.log('file',file)
        console.log('this.params',this.params)
        // 额外参数
        for (let item in this.params.tempParams) {
          this.data_s[item] = this.params.tempParams[item]
        }
        if (file.size > this.maxsize * 1024 * 1024) {
          this.$message({duration: 4000,
            message: `文件大小不能超过${this.maxsize}M！`,
            type: 'warning'
          })
          return false
        }
        let filetype = file.name.split('.')
        // 限制上传类型
        if (!this.accepttype.contains(filetype[filetype.length - 1])) {
          this.$message({duration: 4000,
            message: '此类型文件不允许上传！',
            type: 'warning'
          })
          return false
        }
        // this.data_s.file = file.name
        // this.data_s.file = file
        this.loading = true
      },

      onsuccess (response, file, fileList) {
        this.$message({
          message: response.returnCode == '000000'?'上传成功':response.returnMsg,
          type: response.returnCode == '000000'?'success':'warning'
        })
        if (response.returnCode == '000000') {
          this.$emit('refreshFn',response)  // 导入成功后通知父组件
        }
        if (response.returnCode == '000009') {
          this.$message.error('请重新登陆')
          api.jumpToLogin()
        }
        this.loading = false
      },
      onerror (err, response, file) {
        this.loading = false
        console.log('err：', err)
        console.log('response：', response)
        console.log('file：', file)
      }
    },
    watch: {
      /* attachmentLs: {
        handler: function (val) {
          /!* let idx=this.idx;
             console.log(val); *!/
          // console.log(this.weekly_report_detail);
          this.$emit('fileList', this.attachmentLs)
        },
        deep: true
      } */
    },
    computed: {
    },
    mounted () {
      console.log('params:', this.params)
      Array.prototype.contains = function (obj) {
        let i = this.length
        while (i--) {
          if (this[i] === obj) {
            return true
          }
        }
        return false
      }
    }
  }
</script>
<style scoped>

  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
