<!--
 * @Author: wuxs 317009160@qq.com
 * @Date: 2024-04-26 05:15:40
 * @LastEditors: wuxs 317009160@qq.com
 * @LastEditTime: 2024-04-28 07:08:13
 * @FilePath: \item-workspace\src\views\item\Dashboard.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<script setup lang="ts">
// import {getUserInfo} from "@/api/user/index.ts"

const roles = []
onMounted(async () => {
  // const res = await getUserInfo()
  // const adminRole = (res.data.roles || []).filter(role => role.isDefault)
  // if (adminRole) {
  //   roles.push(adminRole[0].id)
  // }
})
</script>

<template>
  <button class="bg-purple-500">button</button>
  <Button>{{ $t('common.button') }}</Button>
  <el-button unstyled>button</el-button>
</template>

<style scoped lang="scss">

</style>