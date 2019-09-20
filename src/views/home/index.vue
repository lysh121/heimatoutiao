<template>
  <!-- 定义整个页面大容器 -->
  <el-container>
    <!-- 左侧导航 -->
    <el-aside width="200px">
      <layout-aside></layout-aside>
    </el-aside>
    <!-- 右侧容器 -->
    <el-container>
      <el-header height="50px">
        <layout-header></layout-header>
      </el-header>
      <el-main class="bg">
        <!-- 二级路由容器 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {}
</script>

<style>

</style>
