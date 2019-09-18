<template>
  <!-- 定义整个页面大容器 -->
  <el-container>
    <!-- 左侧导航 -->
    <el-aside width="200px">
      <layout-aside></layout-aside>
    </el-aside>
    <!-- 右侧容器 -->
    <el-container>
      <el-header>头部</el-header>
      <el-main>
        <!-- 二级路由容器 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import Aside from '../../components/home/layout-aside.vue'
export default {
  components: {
    'layout-aside': Aside
  }
}
</script>
<style>
</style>
