import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useCompanyStore = defineStore(
  'company_setting',
  () => {
    const company_data = ref(null)
    const area_data = ref(null)
    const division_data = ref(null)
    const organization_data = ref(null)

    function resetcompany() {
      company_data.value = null
    }

    return { company_data, area_data, division_data, organization_data, resetcompany }
  },
  {
    persist: true,
  },
)
