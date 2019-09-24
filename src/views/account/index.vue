<template>
  <el-card>
    <bread-crumb slot="header">
      <template slot="title">
        账户信息
      </template>
    </bread-crumb>
    <el-form label-position="right" label-width="120px">
      <el-form-item label="用户名">
        <el-input style="width: 300px;"></el-input>
      </el-form-item>
      <el-form-item label="头条号简介">
        <el-input style="width: 300px;"></el-input>
      </el-form-item>
      <el-form-item label="用户邮箱">
        <el-input style="width: 300px;"></el-input>
      </el-form-item>
      <el-form-item label="手机号">
        <el-input disabled style="width: 300px;"></el-input>
      </el-form-item>
    </el-form>
    <img class="user-img" src="../../assets/img/404.png" alt="">
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      formData: {

      }
    }
  }
}
</script>

<style lang="less" scoped>
  .user-img{
    width: 200px;
    height: 200px;
    border-radius: 50%;
    position: absolute;
    top: 150px;
    left: 800px;
  }
</style>
