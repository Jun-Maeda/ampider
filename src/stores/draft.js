import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useDraftStore = defineStore(
  'draft',
  () => {
    const draft_data = ref(null)

    function resetDraft() {
      draft_data.value = null
    }

    return { resetDraft, draft_data }
  },
  {
    persist: true,
  },
)
