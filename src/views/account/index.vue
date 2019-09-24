<template>
  <el-card>
    <bread-crumb slot="header">
      <template slot="title">
        账户信息
      </template>
    </bread-crumb>
    <el-form v-model="formData" label-position="right" label-width="120px">
      <el-form-item label="用户名">
        <el-input v-model="formData.name" style="width: 300px;"></el-input>
      </el-form-item>
      <el-form-item label="头条号简介">
        <el-input v-model="formData.intro" style="width: 300px;"></el-input>
      </el-form-item>
      <el-form-item label="用户邮箱">
        <el-input type="e-mail" v-model="formData.email" style="width: 300px;"></el-input>
      </el-form-item>
      <el-form-item label="手机号">
        <el-input type="mobile" v-model="formData.mobile" disabled style="width: 300px;"></el-input>
      </el-form-item>
      <el-divider></el-divider>
      <el-form-item>
        <el-button type="primary">修改</el-button>
      </el-form-item>
    </el-form>
    <img class="user-img" :src="formData.photo" alt="">
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      formData: {

      }
    }
  },
  methods: {
    // 获取用户个人信息
    getUserInfo () {
      this.$axios({
        url: '/user/profile'
      })
        .then(res => {
          this.formData = res.data
        })
    }
  },
  created () {
    this.getUserInfo()
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
