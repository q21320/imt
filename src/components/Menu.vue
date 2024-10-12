<script lang="ts" setup>

import { ref } from 'vue';
import { useRoute } from 'vue-router';
import router from '../router';
const route = useRoute()
const collapsed = ref<boolean>(false);
const name = route.name as string;
const selectedKeys = ref<string[]>([name]);
const menus:any = router.getRoutes().filter(i => i.children.length > 0)

const collapseChange = (collapsed:boolean,type) => {
  console.log(collapsed)
  console.log(type)
}
</script>
<template>
  <a-layout style="min-height: 100vh">
    <a-layout-sider v-model:collapsed="collapsed" collapsible @collapse="collapseChange">
      <div class="logo" />
      <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline">
        <a-sub-menu v-for="i in menus" :key="i.path">
          <template #title>
            <i style="padding-right:30px ;" v-if="i.meta?.icon" class="iconfont" :class="i.meta?.icon"></i>
            <span>{{ i.meta.title }}</span>
          </template>
          <a-menu-item v-for="j in i.children" :key="j.name">
            <RouterLink :to="j.path">
              <i style="padding-right:30px ;" v-if="j.meta?.icon" class="iconfont" :class="j.meta?.icon"></i>
              <span>{{ j.meta?.title }}</span>
            </RouterLink>
          </a-menu-item>
        </a-sub-menu>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-content style="margin: 0 16px">
        <div style="padding: 8px 0">
        </div>
        <div p-24px style="background-color: #fff;border-radius:4px">
          <router-view>
            <template #default="{ Component }">
              <component :is="Component" />
            </template>
          </router-view>
        </div>
      </a-layout-content>
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
