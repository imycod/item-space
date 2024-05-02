<script setup lang="ts">
import {FormItem} from "./FormItem.ts";

const props = defineProps<{
  formState: FormItem | null
}>();

function getNext(): FormItem | null {
  let current: FormItem | null = props.formState;
  if (!current) {
    return null
  }
  const acients = []
  acients.unshift(current)
  while (current === current?.parent) {
    current = current.parent
    acients.unshift(current)
  }
  return props.formState!.next(props.formState!, acients)
}
</script>

<template>
  <template v-if="formState">
    <el-form>
      <el-form-item :label="formState.payload.label">
        <template v-if="formState.type === 'input'">
          <el-input v-model="formState.payload.value"></el-input>
        </template>
        <template v-else-if="formState.type==='checkbox'">
          <el-checkbox-group v-model="formState.payload.value">
            <el-checkbox v-for="option in formState.payload.options" :value="option.value">{{ option.value }}
            </el-checkbox>
          </el-checkbox-group>
        </template>
        <template v-else-if="formState.type==='select'">
          <el-select v-model="formState.payload.value">
            <el-option
                v-for="item in formState.payload.options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
            />
          </el-select>
        </template>
        <template v-else-if="formState.type==='radio'">
          <el-radio-group v-model="formState.payload.value">
            <el-radio :value="option.value" v-for="option in formState.payload.options">{{ option.label }}</el-radio>
          </el-radio-group>
        </template>
      </el-form-item>
    </el-form>
    <DynamicFormItem :form-state="getNext()"></DynamicFormItem>
  </template>
</template>

<style scoped lang="scss">

</style>