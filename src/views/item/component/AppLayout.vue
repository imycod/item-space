<script setup lang="ts">
import AppConfig from "./AppConfig.vue";

import MainLogo from "../assets/item-ship-logo.svg"
import SubLogo from "../assets/item-ship-logo2.svg"

import {ItemMenu} from "@unisc-ui/item"
import "@unisc-ui/item/dist/style.css";

import {useI18, useMenu} from "~/composable/applayout"

const {menuList, applications, handleMenuClick, handleIconClick} = useMenu()

// 获取全局 i18n
const {getGlobalI18n} = useI18()
</script>

<template>
  <el-config-provider :locale="getGlobalI18n">
    <div class="flex">
      <ItemMenu style="height:100vh;" :data="menuList" :applications="applications" @handleIconClick="handleIconClick"
                @handleMenuClick="handleMenuClick">
        <template #main-logo>
          <MainLogo></MainLogo>
        </template>
        <template #sub-logo>
          <SubLogo></SubLogo>
        </template>
      </ItemMenu>
      <div>
        <router-view></router-view>
      </div>
    </div>
    <app-config></app-config>
  </el-config-provider>
</template>

<style scoped lang="scss">
</style>