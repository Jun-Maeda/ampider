import { ref } from 'vue'
import { defineStore } from 'pinia'

export const disasterListStore = defineStore(
  'disaster_list',
  () => {
    const disaster_list = ref([])

    function resetDisasterList() {
      disaster_list.value = null
    }

    return { resetDisasterList, disaster_list }
  },
  {
    persist: false,
  },
)
