import * as vueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import Chat from '@/views/Chat.vue'
import Admin from '@/views/Admin.vue'
import Upload from '@/views/Upload.vue'
import Test from '@/views/TestPage.vue'
import Test2 from '@/views/TestPage2.vue'
import InfoCreate from '@/views/InfoCreate.vue'
import InfoList from '@/views/InfoList.vue'
import InfoDetail from '@/views/InfoDetail.vue'
import InfoDraftList from '@/views/InfoDraftList.vue'
import InfoDraftCreate from '@/views/InfoDraftCreate.vue'
import ChartDetail from '@/views/ChartDetail.vue'
import DisasterList from '@/views/DisasterList.vue'
import UserSetting from '@/views/UserSetting.vue'
import DisasterDetail from '@/views/DisasterDetail.vue'
import EmployeeList from '@/views/EmployeeList.vue'
import UserCreate from '@/views/UserCreate.vue'
import UserEdit from '@/views/UserEdit.vue'
import CompanyCreate from '@/views/CompanyCreate.vue'
import CompanyEdit from '@/views/CompanyEdit.vue'
import AreaCreate from '@/views/AreaCreate.vue'
import DivisionCreate from '@/views/DivisionCreate.vue'
import OrganizationCreate from '@/views/OrganizationCreate.vue'
import CompanyList from '@/views/CompanyList.vue'
import AreaList from '@/views/AreaList.vue'
import DivisionList from '@/views/DivisionList.vue'
import OrganizationList from '@/views/OrganizationList.vue'
import ManualSafetyConf from '@/views/ManualSafetyConf.vue'
import NotificationSetting from '@/views/NotificationSetting.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    props: true,
  },
  {
    path: '/chat',
    name: 'chat',
    component: Chat,
    props: true,
  },
  {
    path: '/admin',
    name: 'admin',
    component: Admin,
    props: true,
  },
  {
    path: '/upload',
    name: 'upload',
    component: Upload,
    props: true,
  },
  {
    path: '/test',
    name: 'test',
    component: Test,
    props: true,
  },
  {
    path: '/test2',
    name: 'test2',
    component: Test2,
    props: true,
  },
  {
    path: '/info_create',
    name: 'info_create',
    component: InfoCreate,
    props: true,
  },
  {
    path: '/info_list',
    name: 'info_list',
    component: InfoList,
    props: true,
  },
  {
    path: '/info_detail',
    name: 'info_detail',
    component: InfoDetail,
    props: true,
  },
  {
    path: '/info_draft_list',
    name: 'info_draft_list',
    component: InfoDraftList,
    props: true,
  },
  {
    path: '/info_draft_create',
    name: 'info_draft_create',
    component: InfoDraftCreate,
    props: true,
  },
  {
    path: '/manual_safety_conf',
    name: 'manual_safety_conf',
    component: ManualSafetyConf,
    props: true,
  },
  {
    path: '/disaster_list',
    name: 'disaster_list',
    component: DisasterList,
    props: true,
  },
  {
    path: '/disaster_detail',
    name: 'disaster_detail',
    component: DisasterDetail,
    props: true,
  },
  {
    path: '/chart_detail',
    name: 'chart_detail',
    component: ChartDetail,
    props: true,
  },
  {
    path: '/user_setting',
    name: 'user_setting',
    component: UserSetting,
    props: true,
  },
  {
    path: '/user_create',
    name: 'user_create',
    component: UserCreate,
    props: true,
  },
  {
    path: '/user_edit',
    name: 'user_edit',
    component: UserEdit,
    props: true,
  },
  {
    path: '/employee_list',
    name: 'employee_list',
    component: EmployeeList,
    props: true,
  },
  {
    path: '/company_create',
    name: 'company_create',
    component: CompanyCreate,
    props: true,
  },
  {
    path: '/company_edit',
    name: 'company_edit',
    component: CompanyEdit,
    props: true,
  },
  {
    path: '/area_create',
    name: 'area_create',
    component: AreaCreate,
    props: true,
  },
  {
    path: '/division_create',
    name: 'division_create',
    component: DivisionCreate,
    props: true,
  },
  {
    path: '/organization_create',
    name: 'organization_create',
    component: OrganizationCreate,
    props: true,
  },
  {
    path: '/company_list',
    name: 'company_list',
    component: CompanyList,
    props: true,
  },
  {
    path: '/area_list',
    name: 'area_list',
    component: AreaList,
    props: true,
  },
  {
    path: '/division_list',
    name: 'division_list',
    component: DivisionList,
    props: true,
  },
  {
    path: '/organization_list',
    name: 'organization_list',
    component: OrganizationList,
    props: true,
  },
  {
    path: '/notification_setting',
    name: 'notification_setting',
    component: NotificationSetting,
    props: true,
  },
]

const router = vueRouter.createRouter({
  history: vueRouter.createWebHistory(),
  routes,
})

export default router
