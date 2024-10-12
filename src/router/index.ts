import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/components/Menu.vue'),
      redirect: '/user',
      children: [
        {
          path: 'user',
          name: 'user',
          component: () => import('@/views/user.vue')
        },

      ]
    },
    {
      path: '/goods',
      name: 'goods',
      component: () => import('@/components/Menu.vue'),
      redirect: '/goods/index',
      children: [
        {
          path: 'index',
          name: 'goodsIndex',
          component: () => import('@/views/goods.vue')
        },
      ]
    },
    {
      path: '/shop',
      name: 'shop',
      component: () => import('@/components/Menu.vue'),
      redirect: '/shop/index',
      children: [
        {
          path: 'index',
          name: 'shopIndex',
          component: () => import('@/views/shop.vue')
        },
      ]
    },
  ]
})


export default router
