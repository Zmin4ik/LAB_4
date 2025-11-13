import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import App from './components/App.vue'
import TooltipDirective from './directives/tooltip'
import ClickOutside from './directives/click-outside'
import './styles/global.css'

const app = createApp(App)

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate as any)

app.use(pinia)
app.directive('tooltip', TooltipDirective)
app.directive('click-outside', ClickOutside)

app.mount('#app')