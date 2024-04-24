<script setup>
import {storeToRefs} from 'pinia';
import {useI18n} from "vue-i18n"

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
    <router-view/>
  </el-config-provider>
</template>

<style lang="scss" scoped></style>
