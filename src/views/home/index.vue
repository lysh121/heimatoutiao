<template>
  <!-- 定义整个页面大容器 -->
  <el-container style="height:100vh">
    <!-- 左侧导航 -->
    <el-aside width="200px" style="background: #323745;">
      <layout-aside style="overflow: hidden;"></layout-aside>
    </el-aside>
    <!-- 右侧容器 -->
    <el-container style="background: #f2f3f5;">
      <el-header style="height: 50px;background: #fff;">
        <layout-header></layout-header>
      </el-header>
      <el-main>
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
