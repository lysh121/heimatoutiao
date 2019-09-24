
<template>
  <el-row type="flex" justify="start">
    <div class="image-row">
       <div class="image-list" v-for="(item,index) in images" :key="index">
         <span>点击选择图片</span>
          <img  @click="openLayer(index)" :src="item?item:defaultImg" alt="">
        </div>
    </div>
    <!-- 弹层组件 -->
    <el-dialog
      :visible="dialogVisible"
      width="50%"
      @close="dialogVisible = false"
      >
      <select-image @selectOneImg="receiveImg"></select-image>
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
      dialogVisible: false,
      selectIndex: -1
    }
  },
  methods: {

    // 接收子组件传过来的参数，并将数据向上继续传递一层
    receiveImg (url) {
      this.$emit('selectImg', url, this.selectIndex)
      this.dialogVisible = false
    },

    // 打开层
    openLayer (index) {
      this.dialogVisible = true
      this.selectIndex = index
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
