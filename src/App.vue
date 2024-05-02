<script setup lang="ts">
import {useThemeConfig} from "@/stores/themeConfig.ts";
import {storeToRefs} from "pinia";
import {useI18n} from "vue-i18n";

const stores = useThemeConfig()
const {themeConfig} = storeToRefs(stores)
const {messages, locale} = useI18n()

watch(() => themeConfig.value.globalI18n, (v) => {
  console.log('v-----',v)
  locale.value = v
},{
  immediate:true
})
</script>

<template>
  <el-config-provider :locale="messages[themeConfig.globalI18n]">
    <router-view/>
  </el-config-provider>
</template>

<style lang="scss" scoped></style>
