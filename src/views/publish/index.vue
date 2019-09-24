<template>
  <el-card>
    <bread-crumb slot="header">
      <template slot="title">
        {{name}}
      </template>
    </bread-crumb>
    <el-form label-width="80px" :rules="publishrules" :model="formData" ref="publishForm" >
      <el-form-item label="标题" prop="title">
        <el-input placeholder="文章名称" v-model="formData.title">
        </el-input>
        </el-form-item>
      <el-form-item  style="height: 400px;"  label="内容" prop="content">
        <quill-editor  style="height: 320px"  v-model="formData.content"></quill-editor>
        </el-form-item>
      <el-form-item label="封面" prop="cover">
        <el-radio-group @change="changeType" v-model="formData.cover.type">
          <el-radio :label="1">单图</el-radio>
          <el-radio :label="3">三图</el-radio>
          <el-radio :label="0">无图</el-radio>
          <el-radio :label="-1">自动</el-radio>
        </el-radio-group>
      </el-form-item>
      <!-- 封面组件 -->
      <cover-image @selectImg="changeImg" :images="formData.cover.images"></cover-image>
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
      name: '发表文章',
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
    // 类型改变事件
    changeType () {
      switch (this.formData.cover.type) {
        case 1:
          this.formData.cover.images = ['']
          break
        case 3:
          this.formData.cover.images = ['', '', '']
          break
        default:
          this.formData.cover.images = []
          break
      }
    },

    changeImg (url, index) {
      // 正常写法
      // this.formData.cover.images = this.formData.cover.images.map(function (item, i) {
      //   if (index === i) {
      //     return url
      //   }
      //   return item
      // })

      // this.formData.cover.images.splice(index, 1, url)     //直接替换，只适用于字符串

      // 简写形式
      this.formData.cover.images = this.formData.cover.images.map((item, i) => index === i ? url : item)
    },

    publish (draft) {
      this.$refs.publishForm.validate((isOk) => {
        if (isOk) {
          let { articleId } = this.$route.params
          debugger
          this.$axios({
            url: articleId ? `/articles/${articleId}` : '/articles',
            method: articleId ? 'PUT' : 'POST',
            params: { draft }, // draft为true时是草稿
            data: this.formData
          })
            .then(() => {
              this.$router.push('/home/articles')
            })
        }
      })
    },

    // 获取频道数据
    getChannels () {
      this.$axios({
        url: '/channels'
      })
        .then(res => {
          this.channels = res.data.channels
        })
    },
    // 根据文章id获取文章详情
    getArticleById (articleId) {
      this.$axios({
        url: `/articles/${articleId}`
      })
        .then(res => {
          this.formData = res.data
        })
    }
  },
  created () {
    this.getChannels()
    let { articleId } = this.$route.params
    articleId && this.getArticleById(articleId)
    this.name = articleId ? '修改文章' : '发表文章'
  }
}
</script>

<style></style>
