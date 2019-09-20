<template>
  <div class="login">
    <el-card class="login-box">
      <div class="title"><img src="../../assets/img/logo_index.png" alt /></div>
      <el-form class="login-form" :model="loginForm" ref="rulesForm" :rules="loginRules" status-icon>
        <!-- 手机号 -->
        <el-form-item prop="mobile"><el-input v-model="loginForm.mobile" placeholder="请输入手机号"></el-input></el-form-item>
        <!-- 验证码 -->
        <el-form-item prop="code">
          <el-input v-model="loginForm.code" placeholder="验证码" style="width:65%"></el-input>
          <el-button style="float:right">发送验证码</el-button>
        </el-form-item>
        <el-form-item prop="agree">
          <!-- 同意选项 -->
          <el-checkbox v-model="loginForm.agree">我已阅读并同意用户协议和隐私条款</el-checkbox>
        </el-form-item>
        <!-- 登录按钮 -->
        <el-form-item><el-button style="width:100%" type="primary" @click="submitForm">登录</el-button></el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 表单数据
      loginForm: {
        mobile: '', // 手机号
        code: '', // 验证码
        agree: false // 是否同意协议
      },

      // 校验规则
      loginRules: {
        mobile: [{ required: true, message: '请输入您的手机号' }, { pattern: /^1[3456789]\d{9}$/, message: '请输入合法的手机号' }],
        code: [{ required: true, message: '请输入验证码' }, { pattern: /^\d{6}$/, message: '验证码为6位数字' }],

        // 自定义校验函数
        agree: [
          {
            validator: function (rule, value, callBack) {
              if (value) {
                // 正确，勾选了协议
                callBack()
              } else {
                // 错误，没有勾选协议
                callBack(new Error('您必须同意协议'))
              }
            }
          }
        ]
      } // 登录规则集合
    }
  },
  methods: {
    submitForm () {
      // 校验整个表单的规则
      // validate 方法传入的函数有两个校验参数，
      this.$refs.rulesForm.validate(valid => {
        if (valid) {
          this.$axios({
            method: 'post',
            url: '/authorizations',
            data: this.loginForm
          })
            .then(res => {
              window.localStorage.setItem('user-token', res.data.token)
              this.$router.push('/home')
            })
            .catch(() => {
              this.$message({
                message: '您的手机号或验证码输入错误',
                type: 'warning'
              })
            })
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.login {
  background-image: url('../../assets/img/login_bg.jpg');
  background-size: cover;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  .login-box {
    width: 440px;

    .title {
      text-align: center;

      img {
        width: 40%;
        padding: 10px;
      }
    }
    .login-form {
      padding: 0 20px;
    }
  }
}
</style>
