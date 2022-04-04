import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home'
import Login from '@/components/Login'
import NotebookList from '@/components/NotebookList'
import NoteDetail from '@/components/NoteDetail'
import TrashDetail from '@/components/TrashDetail'
Vue.use(VueRouter)

const routes = [
  {
    path:'/',
    name:'Home',
    component: Home
  },
  {
    path:'/login',
    name:'Login',
    component: Login
  },
  {
    path:'/notebooks',
    component: NotebookList
  },
  {
    path:'/note/:noteId',
    component: NoteDetail
  },
  {
    path:'/trash/:noteId',
    component: TrashDetail
  }
]

const router = new VueRouter({
  routes
})

export default router
