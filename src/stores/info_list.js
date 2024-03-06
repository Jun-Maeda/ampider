import { ref } from 'vue'
import { defineStore } from 'pinia'

export const infoListStore = defineStore(
  'info_list',
  () => {
    const info_list = ref([])

    function resetInfoList() {
      info_list.value = []
    }

    return { resetInfoList, info_list }
  },
  {
    persist: false,
  },
)
