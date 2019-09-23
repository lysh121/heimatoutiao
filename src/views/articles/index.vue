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
          <el-radio-group v-model="radio">
            <el-radio :label="1">全部</el-radio>
            <el-radio :label="2">草稿</el-radio>
            <el-radio :label="3">待审核</el-radio>
            <el-radio :label="4">审核通过</el-radio>
            <el-radio :label="5">审核失败</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道列表：">
          <el-select>

          </el-select>
        </el-form-item>
        <el-form-item label="时间选择：">
          <el-date-picker
                type="daterange"
                range-separator="-"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
              </el-date-picker>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  }
}
</script>

<style></style>
