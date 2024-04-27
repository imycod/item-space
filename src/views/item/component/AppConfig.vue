<script lang="ts" setup>
import {ref} from 'vue';
import {usePrimeVue} from 'primevue/config';
import {useLayout} from "@/layout/composables/layout.js";
import {defaultPage} from "@/router";
import router from "@/router";
import {useThemeConfig} from "@/stores/themeConfig.ts";
import {useI18n} from "vue-i18n";
import {storeToRefs} from "pinia";

defineProps({
  simple: {
    type: Boolean,
    default: false
  }
});

const $primevue = usePrimeVue();

const {layoutConfig} = useLayout();

const visible = ref(false);

const onConfigButtonClick = () => {
  visible.value = !visible.value;
};
const onChangeTheme = (theme, mode) => {
  $primevue.changeTheme(layoutConfig.theme.value, theme, 'theme-css', () => {
    layoutConfig.theme.value = theme;
    layoutConfig.darkTheme.value = mode;
  });
};
const onDarkModeChange = (value) => {
  const newThemeName = value ? layoutConfig.theme.value.replace('light', 'dark') : layoutConfig.theme.value.replace('dark', 'light');

  layoutConfig.darkTheme.value = value;
  onChangeTheme(newThemeName, value);
};


const isComponentView = ref(false)

function onLayoutModeChange(value: string) {
  if (value === 'components') {
    defaultPage.forEach(route => {
      router.addRoute(route)
    })
  }
  router.replace(router.currentRoute.value.fullPath)
  router.removeRoute('item')
  router.replace('/')
}


const isLanguage = ref(false)
const isJapanese = ref(false)
const stores = useThemeConfig()
const {themeConfig}= storeToRefs(stores)
const {locale} = useI18n()

function onLanguageChange(value: boolean | string) {
  let lang = '';
  if (typeof value === 'string') {
    lang = !isJapanese.value ? 'en' : 'jp';
    isLanguage.value = isJapanese.value && false
  } else {
    lang = value ? 'zh-cn' : 'en';
    isJapanese.value = value && false
  }
  stores.setThemeConfig({
    globalI18n: lang
  })
  locale.value = lang
}
</script>

<template>
  <button class="layout-config-button p-link hover:bg-green-700/50" type="button" @click="onConfigButtonClick()">
    <i class="pi pi-cog"></i>
  </button>

  <Sidebar v-model:visible="visible" position="right" class="layout-config-sidebar w-26rem" pt:closeButton="ml-auto">
    <div class="p-2">
      <section class="py-4 flex align-items-center justify-content-between border-bottom-1 surface-border">
        <span :class="['text-xl font-semibold']">Dark Mode</span>
        <InputSwitch :modelValue="layoutConfig.darkTheme.value" @update:modelValue="onDarkModeChange"/>
      </section>

      <section class="py-4 flex align-items-center justify-content-between border-bottom-1 surface-border">
        <span class="text-xl font-semibold">Components</span>
        <InputSwitch v-model="isComponentView" @update:modelValue="onLayoutModeChange('components')"/>
      </section>

      <section class="py-4 flex align-items-center justify-content-between border-bottom-1 surface-border">
        <span class="text-xl font-semibold">{{ $t("user.title1") }}</span>
        <InputSwitch v-model="isLanguage" @update:modelValue="onLanguageChange"/>
      </section>

      <section class="py-4 flex align-items-center justify-content-between border-bottom-1 surface-border">
        <span class="text-xl font-semibold">{{ $t("user.title2") }}</span>
        <InputSwitch v-model="isJapanese" @update:modelValue="onLanguageChange('jp')"/>
      </section>
    </div>
  </Sidebar>
</template>

<style lang="scss" scoped></style>
