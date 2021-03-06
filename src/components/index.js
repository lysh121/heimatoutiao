// 实现整体组件的统一注册
import layoutAside from './home/layout-aside'
import layoutHeader from './home/layout-header'
import breadCrumb from './common/bread-crumb'
import coverImg from './publish/cover-image'
import selectImg from './publish/select-image'

// 富文本编辑器
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { quillEditor } from 'vue-quill-editor'

export default {
  install: function (Vue) {
    Vue.component('layout-aside', layoutAside) // 注册 左侧导航组件
    Vue.component('layout-header', layoutHeader) // 注册头部组件
    Vue.component('bread-crumb', breadCrumb) // 注册面包屑组件

    Vue.component('quill-editor', quillEditor) // 富文本编辑器组件

    Vue.component('cover-image', coverImg)
    Vue.component('select-image', selectImg)
  }
}
