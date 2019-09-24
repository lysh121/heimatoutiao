<template>
  <el-card>
    <bread-crumb slot="header">
      <template slot="title">
        账户信息
      </template>
    </bread-crumb>
    <el-form ref="accountForm" :model="formData" :rules="accountRules" label-position="right" label-width="120px">
      <el-form-item label="用户名" prop="name">
        <el-input v-model="formData.name" style="width: 300px;"></el-input>
      </el-form-item>
      <el-form-item label="头条号简介">
        <el-input v-model="formData.intro" style="width: 300px;"></el-input>
      </el-form-item>
      <el-form-item label="用户邮箱" prop="email">
        <el-input v-model="formData.email" style="width: 300px;"></el-input>
      </el-form-item>
      <el-form-item label="手机号">
        <el-input type="mobile" v-model="formData.mobile" disabled style="width: 300px;"></el-input>
      </el-form-item>
      <el-divider></el-divider>
      <el-form-item>
        <el-button type="primary" @click="saveUser">保存信息</el-button>
      </el-form-item>
    </el-form>
    <el-upload action="" :show-file-list="false" :http-request="updateImg">
      <img class="user-img" :src="formData.photo" alt="">
    </el-upload>
  </el-card>
</template>

<script>
import eventBus from '../../utils/eventBus'
export default {
  data () {
    return {
      formData: {},
      accountRules: {
        name: [
          { required: true, message: '用户名不能为空' },
          { min: 1, max: 7, message: '用户名长度为1-7个字符' }
        ],
        email: [
          { required: true, message: '邮箱不能为空' }
        ]
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
    },

    // 修改用户头像
    updateImg (params) {
      let data = new FormData()
      data.append('photo', params.file)
      this.$axios({
        url: '/user/photo',
        method: 'PATCH',
        data
      })
        .then(res => {
          this.formData.photo = res.data.photo
          this.$message({ message: '修改成功', type: 'success' })
          eventBus.$emit('updateUserInfo')
        })
    },

    // 修改用户信息
    saveUser () {
      this.$refs.accountForm.validate((isOk) => {
        if (isOk) {
          this.$axios({
            url: '/user/profile',
            method: 'PATCH',
            data: this.formData
          })
            .then(() => {
              this.$message({ message: '保存成功', type: 'success' })
              eventBus.$emit('updateUserInfo')
            })
        }
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
