<template>
  <el-row class="header" type="flex" justify="space-between" align="middle">
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
            <el-dropdown trigger="click">
              <div class="el-dropdown-link">
                <!-- 用户头像 -->
                <img src="../../assets/img/avatar.jpg" class="user-img" />
                13911111111
                <i class="el-icon-caret-bottom"></i>
              </div>
              <!-- 用户信息下拉菜单 -->
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>个人信息</el-dropdown-item>
                <el-dropdown-item>Git地址</el-dropdown-item>
                <el-dropdown-item divided>退出</el-dropdown-item>
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
      userImg: ''
    }
  }
}
</script>

<style lang="less" scoped>
.header{
  color: #333;
  height: 50px;
  line-height:50px;

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
