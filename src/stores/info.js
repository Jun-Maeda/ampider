import { ref } from 'vue'
import { defineStore } from 'pinia'

export const infoDetailStore = defineStore(
  'info',
  () => {
    const info_data = ref(null)

    function resetInfo() {
      info_data.value = null
    }

    return { resetInfo, info_data }
  },
  {
    persist: true,
  },
)
