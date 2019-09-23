<template>
  <el-card style="position: relative;">
    <!-- 面包屑组件 -->
    <bread-crumb slot="header">
      <template slot="title">
        素材管理
      </template>
    </bread-crumb>
    <el-upload class="btn-upload" :show-file-list="false" action="" :http-request="uploadImg">
      <el-button type="primary">上传图片</el-button>
    </el-upload>
    <!-- 标签页 -->
    <el-tabs v-model="activeName" @tab-click="chanegTab">
      <!-- 全部素材列表 -->
      <el-tab-pane label="全部素材" name="all">
        <div class="img-list" v-loading="loading">
          <el-card v-for="(item, index) in list" :key="index" style="margin: 10px;">
            <div class="img-item">
              <el-image fit="cover" :src="item.url" class="image">
                <div slot="error" class="image-slot"><i class="el-icon-picture-outline"></i></div>
              </el-image>
              <div class="bottom">
                <i class="el-icon-star-on" @click="collectOrCancel(item)" :style='{ color:item.is_collected?"#d81e06":"inherit"}'></i>
                <i class="el-icon-delete-solid" @click="delImg(item.id)"></i>
              </div>
            </div>
          </el-card>
        </div>
        <!-- 分页 -->
        <el-row type="flex" justify="center" style="margin-top: 20px;">
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

      <!-- 收藏素材列表 -->
      <el-tab-pane label="收藏素材" name="collect">
        <div class="img-list" v-loading="loading">
          <el-card v-for="(item, index) in list" :key="index" style="margin: 10px;">
            <div class="img-item">
              <el-image fit="cover" :src="item.url" class="image">
                <div slot="error" class="image-slot"><i class="el-icon-picture-outline"></i></div>
              </el-image>
            </div>
          </el-card>
        </div>
        <!-- 分页 -->
        <el-row type="flex" justify="center" style="margin-top: 20px;">
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
    </el-tabs>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'all',
      list: [],
      page: {
        total: 0,
        currentPage: 1,
        pageSize: 10
      },
      loading: false
    }
  },
  methods: {
    collectOrCancel (item) {
      let mess = item.is_collected ? '取消' : ''
      this.$confirm(`确定要${mess}收藏图片？`)
        .then(() => {
        // console.log(imgId)
          this.$axios({
            url: '/user/images/' + item.id,
            method: 'PUT',
            data: { collect: !item.is_collected }
          })
            .then(() => {
              this.getMaterial()
            })
        })
    },
    delImg (imgId) {
      this.$confirm('确定要删除该图片吗？')
        .then(() => {
        // console.log(imgId)
          this.$axios({
            url: '/user/images/' + imgId,
            method: 'DELETE'
          })
            .then(() => {
              this.getMaterial()
            })
        })
    },
    uploadImg (params) {
      const data = new FormData()
      data.append('image', params.file)
      this.$axios({
        url: '/user/images',
        method: 'POST',
        data
      })
        .then(() => {
          this.getMaterial()
        })
    },
    changePage (newPage) {
      this.page.currentPage = newPage
      this.getMaterial()
    },
    chanegTab () {
      this.page.currentPage = 1
      this.getMaterial()
    },
    getMaterial () {
      this.loading = true
      this.$axios({
        url: '/user/images',
        params: {
          collect: this.activeName === 'collect',
          page: this.page.currentPage,
          per_page: this.page.pageSize
        }
      }).then(res => {
        this.list = res.data.results
        this.page.total = res.data.total_count
        this.loading = false
      })
    }
  },
  created () {
    this.getMaterial()
  }
}
</script>

<style lang="less" scoped>
.btn-upload{
    position: absolute;
    margin-top: -10px;
    right: 40px;
    z-index: 1;
  }
.img-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;

  .img-item {
    width: 200px;
    height: 200px;
    flex-direction: column;
    justify-content: space-between;

    .el-image{
      width: 100%;
      height: 180px;
    }

    .bottom {
      display: flex;
      justify-content: space-around;
    }
  }
}
</style>
