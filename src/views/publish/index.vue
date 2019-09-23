<template>
  <el-card>
    <bread-crumb slot="header">
      <template slot="title">
        发表文章
      </template>
    </bread-crumb>
    <el-form label-width="80px">
      <el-form-item label="标题">
        <el-input placeholder="文章名称">

        </el-input>
        </el-form-item>
      <el-form-item label="内容">
        <el-input type="textarea"></el-input>
        </el-form-item>
      <el-form-item label="封面">
        <el-radio-group v-model="radio">
          <el-radio :label="3">单图</el-radio>
          <el-radio :label="6">三图</el-radio>
          <el-radio :label="9">无图</el-radio>
          <el-radio :label="1">自动</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="频道">
        <el-select>
          <el-option
          v-for="item in channels"
          :key="item.id"
          :value="item.id"
          :label="item.name">
          </el-option>
          </el-select>
      </el-form-item>
      <el-divider></el-divider>
      <el-form-item>
        <el-button type="primary">发表</el-button>
        <el-button>存入草稿</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      radio: 3
    }
  }
}
</script>

<style></style>
