import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import '@/lib/firebase'
import '@/assets/style/reset.css'

const app = createApp(App)

app.use(router)

app.mount('#app')
