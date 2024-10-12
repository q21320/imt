import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/components/Menu.vue'),
      redirect: '/user',
      meta: {
        icon: "icon-maotai1",
        title: 'i茅台',
      },
      children: [
        {
          path: '/user',
          name: 'user',
          meta: {
            icon: "icon-yonghuguanli1",
            title: '茅台用户管理',
          },
          component: () => import('@/views/mt/user.vue')
        },
        {
          path: '/goods',
          name: 'goods',
          meta: {
            icon: "icon-shangpinliebiao1",
            title: '茅台商品列表',
          },
          component: () => import('@/views/mt/goods.vue')
        },
        {
          path: '/shop',
          name: 'shop',
          meta: {
            icon: "icon-dianpu",
            title: '茅台店铺管理',
          },
          component: () => import('@/views/mt/shop.vue')
        },
      ]
    },
    {
      path: '/damai',
      name: 'damai',
      component: () => import('@/components/Menu.vue'),
      redirect: '/damai/damaiIndex',
      meta: {
        icon: "icon-damaiwang",
        title: '大麦',
      },
      children: [
        {
          path: '/damai/damaiIndex',
          name: 'damaiIndex',
          meta: {
            icon: "icon-damaiwang",
            title: '大麦首页',
          },
          component: () => import('@/views/damai/index.vue')
        },
      ]
    },
  ]
})


export default router
