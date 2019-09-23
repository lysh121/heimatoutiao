<template>
  <div>
    <el-card style="margin-bottom: 20px;">
      <bread-crumb slot="header">
        <template slot="title">
          内容列表
        </template>
      </bread-crumb>
      <el-form style="margin-left: 50px;">
        <el-form-item label="文章状态：">
          <el-radio-group v-model="radio">
            <el-radio :label="1">全部</el-radio>
            <el-radio :label="2">草稿</el-radio>
            <el-radio :label="3">待审核</el-radio>
            <el-radio :label="4">审核通过</el-radio>
            <el-radio :label="5">审核失败</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道列表：">
          <el-select>
          </el-select>
        </el-form-item>
        <el-form-item label="时间选择：">
          <el-date-picker
                type="daterange"
                range-separator="-"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
              </el-date-picker>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card>
      <div slot='header'>共找到55091条符合条件的内容</div>
      <ul class="list">
        <li class="list-item">
          <img src="../../assets/img/404.png" alt="">
          <dl>
            <dt class="title">
              123
            </dt>
            <dd>
              <el-tag>已发表</el-tag>
            </dd>
            <dd class="date">2019-10-23 12:23:32</dd>
          </dl>
          <div class="right"><span><i class="el-icon-edit"></i>修改</span><span><i class="el-icon-delete"></i>删除</span></div>
        </li>
      </ul>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  }
}
</script>

<style lang="less" scoped>
.list-item{
  display: flex;
  img{
    width: 180px;
    margin-right: 20px;
  }
  dl{
    flex: 1;
    .title{
      cursor: pointer;
    }
    dd{
      margin: 10px 0;
    }
    .date{
      font-size: 12px;
      color: #999;
    }
  }

  .right{
    float: right;
    font-size: 14px;

    span{
      margin-right: 5px;
    }
  }
}

</style>
