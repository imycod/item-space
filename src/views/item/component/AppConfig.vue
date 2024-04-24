<script lang="ts" setup>
import {ref} from 'vue';
import {usePrimeVue} from 'primevue/config';
import {useLayout} from "@/layout/composables/layout.js";
import {defaultPage, itemPage} from "@/router";
import router from "@/router";

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
}
</script>

<template>
  <button class="layout-config-button p-link" type="button" @click="onConfigButtonClick()">
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
    </div>
  </Sidebar>
</template>

<style lang="scss" scoped></style>
