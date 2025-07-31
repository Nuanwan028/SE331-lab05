import './assets/style.css'
import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import 'nprogress/nprogress.css'

// Vercel Analytics & Speed Insights
import { inject } from '@vercel/analytics'
import { injectSpeedInsights } from '@vercel/speed-insights'

const app = createApp(App)

// Inject ก่อน mount
inject()
injectSpeedInsights()

app.use(createPinia())
app.use(router)

app.mount('#app')
