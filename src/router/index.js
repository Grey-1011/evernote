import Vue from 'vue'
import VueRouter from 'vue-router'


import Router from 'vue-router';
Vue.use(Router)
Vue.use(VueRouter)

const originalReplace = Router.prototype.replace
Router.prototype.replace = function replace(location) {
  return originalReplace.call(this, location).catch(err => err);
}
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

export default new Router({
  routes:[
    {
      path:'/',
      alias:'/notebooks',
      component: ()=> import('@/components/NotebookList')
    },
    {
      path:'/login',
      component: ()=> import('@/components/Login.vue')
    },
    {
      path: '/note',
      component: () => import('@/components/NoteDetail')
    },
    {
      path:'/trash',
      component: () => import('@/components/TrashDetail')
    }
  ]
})

