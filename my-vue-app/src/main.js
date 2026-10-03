import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

const app = createApp(App)

// Calls binding.value.callback(isVisible) when the element scrolls into view
app.directive('observe-visibility', {
  mounted(el, { value }) {
    const { callback, once } = value
    const observer = new IntersectionObserver(([entry]) => {
      callback(entry.isIntersecting)
      if (entry.isIntersecting && once) {
        observer.disconnect()
      }
    }, { threshold: 0.1 })
    observer.observe(el)
    el._visibilityObserver = observer
  },
  unmounted(el) {
    el._visibilityObserver?.disconnect()
  }
})

app.mount('#app')
