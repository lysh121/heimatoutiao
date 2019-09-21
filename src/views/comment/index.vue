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
                     <el-button @click="handleClick(scope.row)" type="text" size="small">修改</el-button>
                     <el-button type="text" size="small">关闭评论</el-button>
                   </template>
                 </el-table-column>
           </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tableData: []
    }
  },
  methods: {
    handleClick (row) {
      console.log(row)
    },
    getComment () {
      this.$axios({
        url: '/articles',
        // 路径参数 Query参数
        params: {
          response_type: 'comment'
        }
      })
        .then(res => {
          this.tableData = res.data.results
        })
    },
    stateFormatter (row, colunm, cellValue, index) {
      debugger
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
