import { h } from 'vue'
import DefaultTheme from 'vitepress/theme'
import BuyMeCoffeeModal from './BuyMeCoffeeModal.vue'

export default {
  extends: DefaultTheme,
  Layout() {
    return h(DefaultTheme.Layout, null, {
      'nav-bar-content-after': () => h(BuyMeCoffeeModal)
    })
  }
}