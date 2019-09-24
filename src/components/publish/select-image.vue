<template>
  <el-tabs type="card">
      <el-tab-pane label="素材库">
        <div class="img-list">
          <el-card :body-style="{padding:'10px'}" class="img-item" v-for="item in list" :key="item.id">
            <img :src="item.url" alt="" @click="clickImg(item.url)">
          </el-card>
        </div>
        <el-row type="flex" justify="center">
          <el-pagination
            background
            layout="prev, pager, next"
            :total="page.total"
            :page-size="page.pageSize"
            :current-page="page.currentPage"
            @current-change="changePage">
          </el-pagination>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="上传图片">
        <el-upload
          class="avatar-uploader"
          action=""
          :http-request="uploadImg"
          :show-file-list="false">
          <i class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-tab-pane>
    </el-tabs>
</template>

<script>
export default {
  data () {
    return {
      list: [],
      loading: false,
      page: {
        total: 0,
        currentPage: 1,
        pageSize: 10
      }
    }
  },
  methods: {
    // 点击素材图片时触发
    clickImg (item) {
      this.$emit('selectOneImg', item)
    },

    // 上传图片
    uploadImg (params) {
      let data = new FormData()
      data.append('image', params.file)
      this.$axios({
        url: '/user/images',
        method: 'POST',
        data
      })
        .then(res => {
          this.$emit('selectOneImg', res.data.url)
        })
    },

    // 获取图片素材
    getMaterial () {
      this.loading = true
      this.$axios({
        url: '/user/images',
        params: {
          collect: false,
          page: this.page.currentPage,
          per_page: this.page.pageSize
        }
      }).then(res => {
        this.list = res.data.results
        this.page.total = res.data.total_count
        this.loading = false
      })
    },
    changePage (newPage) {
      this.page.currentPage = newPage
      this.getMaterial()
    }
  },
  created () {
    this.getMaterial()
  }
}
</script>

<style lang="less" scoped>
  .img-list{
    display: flex;
    flex-wrap: wrap;

    .img-item{
      width: 150px;
      height: 150px;
      margin: 8px;

      img{
        width: 100%;
        height: 100%;
      }
    }
  }
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
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      width: 178px;
      height: 178px;
      line-height: 178px;
      text-align: center;
    }
    .avatar {
      width: 178px;
      height: 178px;
      display: block;
    }
</style>
