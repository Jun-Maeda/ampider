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
