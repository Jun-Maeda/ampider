import * as vueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import Chat from '@/views/Chat.vue'
import Admin from '@/views/Admin.vue'
import Upload from '@/views/Upload.vue'
import Test from '@/views/TestPage.vue'
import InfoCreate from '@/views/InfoCreate.vue'

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
    path: '/info_create',
    name: 'info_create',
    component: InfoCreate,
    props: true,
  },
]

const router = vueRouter.createRouter({
  history: vueRouter.createWebHistory(),
  routes,
})

export default router
