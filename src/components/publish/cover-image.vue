
<template>
  <el-row type="flex" justify="start">
    <div class="image-row">
       <div class="image-list" v-for="(item,index) in images" :key="index">
         <span>点击选择图片</span>
          <img  @click="dialogVisible = true" :src="item?item:defaultImg" alt="">
        </div>
    </div>
    <el-dialog
      title="提示"
      :visible="dialogVisible"
      width="30%"
      @close="dialogVisible = false"
      >
      <select-image></select-image>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </el-row>
</template>

<script>
export default {
  props: ['images'],
  data () {
    return {
      defaultImg: require('../../assets/img/pic_bg.png'),
      dialogVisible: false
    }
  }
}
</script>

<style lang="less" scoped>
.image-row{
  margin:0 40px 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  display: flex;

  .image-list{
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px;

    span{
      font-size: 16px;
      margin-bottom: 5px;
    }

    img{
      width: 200px;
      height: 200px;
    }
  }
}
</style>
