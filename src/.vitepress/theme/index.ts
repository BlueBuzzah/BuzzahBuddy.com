import Layout from './Layout.vue'
import Notices from './Notices.vue'

export default {
  Layout,
  enhanceApp({ app }) {
    app.component('Notices', Notices)
  },
}
