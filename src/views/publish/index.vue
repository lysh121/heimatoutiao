<template>
  <el-card>
    <bread-crumb slot="header">
      <template slot="title">
        发表文章
      </template>
    </bread-crumb>
    <el-form label-width="80px" :rules="publishrules" :model="formData" ref="publishForm" >
      <el-form-item label="标题" prop="title">
        <el-input placeholder="文章名称" v-model="formData.title">
        </el-input>
        </el-form-item>
      <el-form-item label="内容" prop="content">
        <el-input type="textarea" v-model="formData.content"></el-input>
        </el-form-item>
      <el-form-item label="封面">
        <el-radio-group v-model="formData.cover.type">
          <el-radio :label="1">单图</el-radio>
          <el-radio :label="3">三图</el-radio>
          <el-radio :label="0">无图</el-radio>
          <el-radio :label="-1">自动</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="频道" prop="channel_id">
        <el-select v-model="formData.channel_id" clearable>
          <el-option
          v-for="item in channels"
          :key="item.id"
          :value="item.id"
          :label="item.name">
          </el-option>
          </el-select>
      </el-form-item>
      <el-divider></el-divider>
      <el-form-item>
        <el-button type="primary" @click="publish(false)">发表</el-button>
        <el-button @click="publish(true)">存入草稿</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      channels: [],
      formData: {
        title: '',
        content: '',
        channel_id: null,
        cover: {
          type: 0,
          images: []
        }
      },
      publishrules: {
        title: [
          { required: true, message: '标题不能为空' },
          { min: 5, max: 30, message: '标题长度为5-30个字符之间' }
        ],
        content: [
          { required: true, message: '内容不能为空' }
        ],
        channel_id: [
          { required: true, message: '频道不能为空' }
        ]
      }
    }
  },
  methods: {
    publish (draft) {
      this.$refs.publishForm.validate((isOk) => {
        if (isOk) {
          this.$axios({
            url: '/articles',
            method: 'POST',
            params: { draft }, // draft为true时是草稿
            data: this.formData
          })
            .then(() => {
              this.$router.push('/articles')
            })
        }
      })
    },
    getChannels () {
      this.$axios({
        url: '/channels'
      })
        .then(res => {
          this.channels = res.data.channels
        })
    }
  },
  created () {
    this.getChannels()
  }
}
</script>

<style></style>
