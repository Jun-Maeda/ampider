import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useDraftStore = defineStore(
  'counter',
  () => {
    const draft_data = ref({})

    function resetDraft() {
      draft_data.value = {}
    }

    return { resetDraft, draft_data }
  },
  // {
  //   persist: true,
  // },
)
