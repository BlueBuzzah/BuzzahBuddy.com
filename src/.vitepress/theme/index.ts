import Layout from './Layout.vue'
import Notices from './Notices.vue'
import Shot from './Shot.vue'

export default {
  Layout,
  enhanceApp({ app }) {
    app.component('Notices', Notices)
    app.component('Shot', Shot)
  },
}
