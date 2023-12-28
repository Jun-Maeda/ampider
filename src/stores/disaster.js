import { ref } from 'vue'
import { defineStore } from 'pinia'

export const disasterDetailStore = defineStore(
  'disaster',
  () => {
    const disaster_data = ref(null)

    function resetDisaster() {
        disaster_data.value = null
    }

    return { resetDisaster, disaster_data }
  },
  {
    persist: true,
  },
)
