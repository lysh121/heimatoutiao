<template>
  <div>
    <el-card style="margin-bottom: 20px;">
      <bread-crumb slot="header">
        <template slot="title">
          内容列表
        </template>
      </bread-crumb>
      <el-form style="margin-left: 50px;">

        <el-form-item label="文章状态：">
          <el-radio-group v-model="formData.status" @change="changeComdition">
            <el-radio :label="5">全部</el-radio>
            <el-radio :label="0">草稿</el-radio>
            <el-radio :label="1">待审核</el-radio>
            <el-radio :label="2">审核通过</el-radio>
            <el-radio :label="3">审核失败</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道列表：">
          <el-select v-model="formData.channels_id" placeholder="请选择" @change="changeComdition">
            <el-option v-for="item in channels" :value="item.id" :label="item.name" :key="item.id"></el-option>
        </el-select>
        </el-form-item>
        <el-form-item label="时间选择：">
          <el-date-picker unlink-panels @change="changeComdition" value-format="yyyy-MM-dd" v-model="formData.date" type="daterange" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card>
      <div slot="header">共找到{{ total }}条符合条件的内容</div>
      <ul class="list">
        <li class="list-item" v-for="(item, index) in list" :key="index">
          <el-image :src="item.cover.images[0]" alt="" class="img"></el-image>
          <dl>
            <dt class="title">{{ item.title }}</dt>
            <dd><el-tag :type="item.status|tagType">{{item.status|statusType}}</el-tag></dd>
            <dd class="date">{{ item.pubdate }}</dd>
          </dl>
          <div class="right">
            <span>
              <i class="el-icon-edit"></i>
              修改
            </span>
            <span @click="delArticles(item.id)">
              <i class="el-icon-delete"></i>
              删除
            </span>
          </div>
        </li>
      </ul>
      <el-row type="flex" justify="center">
        <el-pagination
        background
        :current-page="page.currentPage"
        :page-size="page.pageSize"
          layout="prev, pager, next"
          :total="page.total"
          @current-change='changePage'
          >
        </el-pagination>
      </el-row>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      total: 0,
      list: [],
      channels: [],
      formData: {
        status: 5,
        channels_id: null,
        date: []
      },
      page: {
        total: 0,
        currentPage: 1,
        pageSize: 10
      }
    }
  },
  methods: {

    // 删除文章
    delArticles (id) {
      this.$confirm('确定要删除该文章吗？')
        .then(() => {
          this.$axios({
            url: '/articles/' + id.toString(),
            method: 'DELETE'
          })
          this.queryArticles()
        })
    },

    // 页码改变事件
    changePage (newPage) {
      this.page.currentPage = newPage
      this.queryArticles()
    },
    // 状态变化事件
    changeComdition () {
      this.page.currentPage = 1
      this.queryArticles()
    },
    queryArticles () {
      let params = {
        status: this.formData.status === 5 ? null : this.formData.status,
        channel_id: this.formData.channels_id,
        begin_pubdate: this.formData.date.length ? this.formData.date[0] : null,
        end_pubdate: this.formData.date.length > 1 ? this.formData.date[1] : null,
        page: this.page.currentPage,
        per_page: this.page.pageSize
      }
      this.getArticle(params)
    },
    // 获取文章列表
    getArticle (params) {
      this.$axios({
        url: '/articles',
        params
      }).then(res => {
        this.total = res.data.total_count
        this.list = res.data.results
        this.page.total = res.data.total_count
      })
    },

    // 获取频道列表
    getChannels () {
      this.$axios({
        url: '/channels'
      })
        .then(res => {
          console.log(res.data)
          this.channels = res.data.channels
          this.formData.channels_id = res.data.channels.id
        })
    }
  },
  created () {
    this.getChannels()
    this.getArticle()
  },
  filters: {
    statusType (value) {
      switch (value) {
        case 0:
          value = '草稿'
          break
        case 1:
          value = '待审核'
          break
        case 2:
          value = '已发表'
          break
        case 3:
          value = '审核失败'
          break
        case 4:
          value = '已删除'
          break
      }
      return value
    },
    tagType (value) {
      switch (value) {
        case 0:
          value = 'info'
          break
        case 1:
          value = 'warning'
          break
        case 2:
          value = 'success'
          break
        case 3:
          value = 'danger'
          break
        default:
          value = ''
          break
      }
      return value
    }
  }
}
</script>

<style lang="less" scoped>
.list-item {
  display: flex;
  padding: 10px 0;
  border-bottom: 1px solid #e7e7e9;
  .img {
    width: 180px;
    margin-right: 20px;
  }
  dl {
    flex: 1;
    .title {
      cursor: pointer;
    }
    dd {
      margin: 10px 0;
    }
    .date {
      font-size: 12px;
      color: #999;
    }
  }

  .right {
    float: right;
    font-size: 14px;

    span {
      margin-right: 5px;
      cursor: pointer;
    }
  }
}
</style>
