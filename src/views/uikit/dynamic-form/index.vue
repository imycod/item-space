<script setup lang="ts">
import DynamicFormItem from "@/components/form-layout/DynamicFormItem.vue";

import root from "./model.ts";
</script>

<template>
  <div class="mb-5">请输入 test1</div>
  <DynamicFormItem :form-state="root"></DynamicFormItem>
</template>

<style scoped lang="scss">

</style>