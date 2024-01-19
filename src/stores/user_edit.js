import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useUserEditStore = defineStore(
  'company_setting',
  () => {
    const user_data = ref(null)

    function reset_user() {
      user_data.value = null
    }

    return { user_data, reset_user }
  },
  {
    persist: true,
  },
)
