<template>
  <div>
    <el-card>
        <bread-crumb slot="header">
        <template slot='title'>评论列表</template>
        </bread-crumb>
        <el-table
             :data="tableData"
             style="width: 100%;border:1px solid #EBEEF5;">
             <el-table-column
               prop="title"
               width="600px"
               label="标题">
             </el-table-column>
             <el-table-column
               prop="comment_status"
               :formatter="stateFormatter"
               align="center"
               label="评论状态">
             </el-table-column>
             <el-table-column
               prop="total_comment_count"
               align="center"
               label="总评论数">
             </el-table-column>
             <el-table-column
               prop="fans_comment_count"
               align="center"
               label="粉丝评论数">
             </el-table-column>
             <el-table-column
                   label="操作">
                   <template slot-scope="scope">
                     <el-button type="text" size="small">修改</el-button>
                     <el-button :style="{color:scope.row.comment_status?'#E6A23C':'#409EFF'}" @click="closeOrOpen(scope.row)" type="text" size="small">{{scope.row.comment_status?'关闭评论':'打开评论'}}</el-button>
                   </template>
                 </el-table-column>
           </el-table>
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
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tableData: [],
      page: {
        total: 0,
        currentPage: 1,
        pageSize: 10
      }
    }
  },
  methods: {
    changePage (newPage) {
      this.page.currentPage = newPage
      this.getComment()
    },
    closeOrOpen (row) {
      let mess = row.comment_status ? '关闭' : '打开'
      this.$confirm(`确定要${mess}评论吗？`)
        .then(() => {
          this.$axios({
            url: '/comments/status',
            method: 'PUT',
            params: { article_id: row.id.toString() },
            data: { allow_comment: !row.comment_status }
          })
            .then(() => {
              this.getComment()
            })
        })
    },
    getComment () {
      this.$axios({
        url: '/articles',
        // 路径参数 Query参数
        params: {
          response_type: 'comment',
          page: this.page.currentPage,
          per_page: this.page.pageSize
        }
      })
        .then(res => {
          this.tableData = res.data.results
          this.page.total = res.data.total_count
        })
    },
    stateFormatter (row, colunm, cellValue, index) {
      return cellValue ? '正常' : '关闭'
    }
  },
  created () {
    this.getComment()
  }
}
</script>

<style>
</style>
