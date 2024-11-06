import { createApp } from 'vue'

// Vuetify
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { VNumberInput } from 'vuetify/labs/VNumberInput'

import App from './App.vue'

const vuetify = createVuetify({
  theme: {
    defaultTheme: 'dark',
  },
  components: {
    ...components,
    VNumberInput,
  },
  directives,
})

createApp(App).use(vuetify).mount('#app')
