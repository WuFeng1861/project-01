import { createRouter, createWebHistory } from 'vue-router'
import NodeList from '../views/NodeList.vue'
import SpeedTest from '../views/SpeedTest.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: NodeList
    },
    {
      path: '/speed-test/:id',
      name: 'speedTest',
      component: SpeedTest,
      props: true
    }
  ]
})

export default router