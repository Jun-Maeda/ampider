import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useCompanyStore = defineStore(
  'company_setting',
  () => {
    const company_data = ref(null)
    const company_edit = ref(null)
    const area_data = ref(null)
    const division_data = ref(null)
    const organization_data = ref(null)

    function resetcompany() {
      company_data.value = null
    }
    function resetcompany_edit() {
      company_edit.value = null
    }

    return { company_data, company_edit, area_data, division_data, organization_data, resetcompany, resetcompany_edit }
  },
  {
    persist: true,
  },
)
