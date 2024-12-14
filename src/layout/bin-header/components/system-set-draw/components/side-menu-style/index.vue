<template>
  <n-collapse-item title="侧栏菜单">
    <div class="collapse-transition-main">
      <div class="setting">菜单激活颜色</div>
      <n-color-picker
        v-model:value="data.Menu!.itemColorActive"
        :show-alpha="false"
      />
      <div class="setting">菜单悬停颜色</div>
      <n-color-picker
        v-model:value="data.Menu!.itemColorHover"
        :show-alpha="false"
      />
      <div class="setting">菜单激活后悬停颜色</div>
      <n-color-picker
        v-model:value="data.Menu!.itemColorActiveHover"
        :show-alpha="false"
      />
      <div class="setting">菜单文本颜色</div>
      <n-color-picker
        v-model:value="data.Menu!.itemTextColor"
        :show-alpha="false"
      />
      <div class="setting">菜单文本悬停颜色</div>
      <n-color-picker
        v-model:value="data.Menu!.itemTextColorHover"
        :show-alpha="false"
      />
      <div class="setting">菜单文本激活颜色</div>
      <n-color-picker
        v-model:value="data.Menu!.itemTextColorActive"
        :show-alpha="false"
      />
      <div class="setting">菜单文本悬停颜色</div>
      <n-color-picker
        v-model:value="data.Menu!.itemTextColorActiveHover"
        :show-alpha="false"
      />
      <div class="setting">含有子级菜单文本颜色</div>
      <n-color-picker
        v-model:value="data.Menu!.itemTextColorChildActive"
        :show-alpha="false"
      />
      <div class="setting">含有子级菜单文本悬停颜色</div>
      <n-color-picker
        v-model:value="data.Menu!.itemTextColorChildActiveHover"
        :show-alpha="false"
      />
      <div class="setting">菜单图标颜色</div>
      <n-color-picker
        v-model:value="data.Menu!.itemIconColor"
        :show-alpha="false"
      />
      <div class="setting">菜单图标悬停颜色</div>
      <n-color-picker
        v-model:value="data.Menu!.itemIconColorHover"
        :show-alpha="false"
      />
      <div class="setting">菜单图标激活悬停颜色</div>
      <n-color-picker
        v-model:value="data.Menu!.itemIconColorActiveHover"
        :show-alpha="false"
      />
      <div class="setting">菜单图标激活颜色</div>
      <n-color-picker
        v-model:value="data.Menu!.itemIconColorActive"
        :show-alpha="false"
      />
      <div class="setting">含有菜单图标激活颜色</div>
      <n-color-picker
        v-model:value="data.Menu!.itemIconColorChildActive"
        :show-alpha="false"
      />
      <div class="setting">含有菜单图标悬停颜色</div>
      <n-color-picker
        v-model:value="data.Menu!.itemIconColorChildActiveHover"
        :show-alpha="false"
      />
      <div class="setting">箭头颜色</div>
      <n-color-picker
        v-model:value="data.Menu!.arrowColor"
        :show-alpha="false"
      />
      <div class="setting">箭头悬停颜色</div>
      <n-color-picker
        v-model:value="data.Menu!.arrowColorHover"
        :show-alpha="false"
      />
      <div class="setting">箭头激活颜色</div>
      <n-color-picker
        v-model:value="data.Menu!.arrowColorActive"
        :show-alpha="false"
      />
      <div class="setting">箭头激活悬停颜色</div>
      <n-color-picker
        v-model:value="data.Menu!.arrowColorActiveHover"
        :show-alpha="false"
      />
      <div class="setting">含有子菜单箭头激活颜色</div>
      <n-color-picker
        v-model:value="data.Menu!.arrowColorChildActive"
        :show-alpha="false"
      />
      <div class="setting">含有子菜单箭头激活悬停颜色</div>
      <n-color-picker
        v-model:value="data.Menu!.arrowColorChildActiveHover"
        :show-alpha="false"
      />
      <div class="setting">菜单压缩后图标的颜色</div>
      <n-color-picker
        v-model:value="data.Menu!.itemIconColorCollapsed"
        :show-alpha="false"
      />
    </div>
  </n-collapse-item>
</template>

<script setup lang="ts">
  import { useSystemStyleSettingStore } from '@/store/modules/systemStyleSetting'
  const systemSetStore = useSystemStyleSettingStore()
  const data = reactive<any>(systemSetStore.naiveComponentStyle)
</script>
<style scoped lang="less">
  .collapse-transition-main {
    .setting {
      margin-top: calc(var(--main-gap) * 3);
    }
  }
</style>
