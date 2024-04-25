<script setup lang="ts">
import AppConfig from "./AppConfig.vue";
import {useI18n} from "vue-i18n";
import {storeToRefs} from 'pinia';

// import {useThemeConfig} from '@/stores/themeConfig';
// const storesThemeConfig = useThemeConfig();
// const {themeConfig} = storeToRefs(storesThemeConfig);

// 获取全局 i18n
const {messages, locale} = useI18n();
const getGlobalI18n = computed(() => {
  return messages.value[locale.value];
});
</script>

<template>
  <el-config-provider :locale="getGlobalI18n">
    <app-config></app-config>
    <router-view></router-view>
  </el-config-provider>
</template>

<style scoped lang="scss">

</style>