import { ref } from 'vue'
import { defineStore } from 'pinia'

export const loaderStore = defineStore('draft', () => {
  const load = ref(false)

  return { load }
})
