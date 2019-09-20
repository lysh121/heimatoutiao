<template>
  <el-row class="header" type="flex">
          <!-- 左侧部分 -->
          <el-col :span="12">
            <i class="el-icon-s-fold"></i>
            <span class="title">江苏传智播客教育科技股份有限公司</span>
          </el-col>

          <!-- 右侧部分 -->
          <el-col :span="12" class="right">

            <!-- 文章搜索框，鼠标悬浮显示提示文字 -->
            <el-tooltip class="item" effect="dark" content="搜索" placement="bottom">
              <el-input
                placeholder="请输入搜索的文章内容"
                prefix-icon="el-icon-search"
                v-model="search"
                style="width:200px"
              ></el-input>
            </el-tooltip>

            <!-- 用户消息提醒 -->
            <el-tooltip class="item" effect="dark" content="消息" placement="bottom">
              <el-badge :value="num" class="item msg">消息</el-badge>
            </el-tooltip>

            <!-- 用户信息显示 -->
            <el-dropdown trigger="click" @command="commonClick">
              <div class="el-dropdown-link">
                <!-- 用户头像 -->
                <img :src='userInfo.photo?userInfo.photo:defaultImg' class="user-img" />
                {{userInfo.name}}
                <i class="el-icon-caret-bottom"></i>
              </div>
              <!-- 用户信息下拉菜单 -->
              <!-- command方法 -->
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="account">个人信息</el-dropdown-item>
                <el-dropdown-item command="git">Git地址</el-dropdown-item>
                <el-dropdown-item divided command="lgout">退出</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-col>
        </el-row>

</template>

<script>
export default {
  data () {
    return {
      search: '',
      num: '',
      userInfo: {},
      defaultImg: require('../../assets/img/avatar.jpg') // 图片地址转成base64
    }
  },
  methods: {
    getUserInfo () {
      this.$axios({
        url: '/user/profile'
      })
        .then(res => {
          this.userInfo = res.data
        })
    },

    // 公共点击事件
    commonClick (command) {
      switch (command) {
        case 'account':
          this.$router.push('/home/account')
          break
        case 'git':
          window.location.href = 'https://github.com/lysh121/heimatoutiao'
          break
        case 'lgout':
          window.localStorage.clear() // 清空缓存 清除所有的缓存  只能清除自己当前项目的缓存
          this.$router.push('/login')
          break
      }
    }
  },
  created () {
    this.getUserInfo()
  }
}
</script>

<style lang="less" scoped>
.header{
  align-items: center;
  height: 50px;
  color: #333;

.el-icon-s-fold{
  font-size: 24px;
  vertical-align: text-bottom;
}
.title{
  margin-left: 4px;
}

  .right {
      text-align: right;
      .user-img{
        border-radius: 50%;
        width: 36px;
      }

      .msg {
        margin: 0 20px;
        line-height: 40px;
      }
      .user-msg {
        margin: 0 10px;
      }
    }
}

</style>
