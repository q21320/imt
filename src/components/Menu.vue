<script lang="ts" setup>
import {
  PieChartOutlined,
  DesktopOutlined,
} from '@ant-design/icons-vue';
import { ref } from 'vue';
const collapsed = ref<boolean>(false);
const selectedKeys = ref<string[]>(['1']);

</script>
<template>
  <a-layout style="min-height: 100vh">
    <a-layout-sider v-model:collapsed="collapsed" collapsible>
      <div class="logo" />
      <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline">
        <a-menu-item key="1">
          <RouterLink to="/">
            <pie-chart-outlined />
            <span>用户管理</span>
          </RouterLink>
        </a-menu-item>
        <a-menu-item key="2">
          <RouterLink to="/goods">
            <desktop-outlined />
            <span>商品列表</span>
          </RouterLink>
        </a-menu-item>
        <a-menu-item key="3">
          <RouterLink to="/shop">
            <desktop-outlined />
            <span>店铺管理</span>
          </RouterLink>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-content style="margin: 0 16px">
        <a-breadcrumb style="margin: 8px 0">
        </a-breadcrumb>
        <div p-24px style="background-color: #fff;border-radius:4px">
          <router-view>
            <template #default="{ Component }">
              <component :is="Component" />
            </template>
          </router-view>
        </div>
      </a-layout-content>
      <a-layout-footer style="text-align: center">
        Ant Design ©2018 Created by Ant UED
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>
<style scoped>
#components-layout-demo-side .logo {
  height: 32px;
  margin: 16px;
  background: rgba(255, 255, 255, 0.3);
}

.site-layout .site-layout-background {
  background: #fff;
}

[data-theme='dark'] .site-layout .site-layout-background {
  background: #141414;
}
</style>
