<template>
  <n-collapse-item title="Input输入框样式">
    <div class="collapse-transition-main">
      <div class="setting">输入框高度</div>
      <n-input
        placeholder="请输入"
        v-model:value="height"
        @blur="heightBlur"
      />
      <div class="setting">字体大小</div>
      <n-input
        placeholder="请输入"
        v-model:value="fontSize"
        @blur="fontSizeMediumBlur"
      />
      <div class="setting">圆角</div>
      <n-input
        placeholder="请输入"
        v-model:value="borderRadius"
        @blur="borderRadiusBlur"
      />
      <div class="setting">输入框颜色</div>
      <n-color-picker
        v-model:value="data.Input!.color"
        :show-alpha="false"
      />
      <div class="setting">聚焦颜色</div>
      <n-color-picker
        v-model:value="data.Input!.colorFocus"
        :show-alpha="false"
      />
      <div class="setting">文本颜色</div>
      <n-color-picker
        v-model:value="data.Input!.textColor"
        :show-alpha="false"
      />
      <div class="setting">光标颜色</div>
      <n-color-picker
        v-model:value="data.Input!.caretColor"
        :show-alpha="false"
      />
      <div class="setting">提示语字体颜色</div>
      <n-color-picker
        v-model:value="data.Input!.placeholderColor"
        :show-alpha="false"
      />
      <div class="setting">Disabled禁用时字体颜色</div>
      <n-color-picker
        v-model:value="data.Input!.textColorDisabled"
        :show-alpha="false"
      />
      <div class="setting">边框</div>
      <n-input
        placeholder="请输入"
        v-model:value="border"
        @blur="borderBlur"
      />
      <div class="tips">
        建议聚焦边框 悬停边框 聚焦悬停阴影 三个颜色设置保持一致
      </div>
      <div class="setting">聚焦边框</div>
      <n-input
        placeholder="请输入"
        v-model:value="borderFocus"
        @blur="borderFocusBlur"
      />
      <div class="setting">悬停边框</div>
      <n-input
        placeholder="请输入"
        v-model:value="borderHover"
        @blur="borderHoverBlur"
      />
      <div class="setting">聚焦悬停阴影</div>
      <n-input
        placeholder="请输入"
        v-model:value="boxShadowFocus"
        @blur="boxShadowFocusBlur"
      />
    </div>
  </n-collapse-item>
</template>

<script setup lang="ts">
  import { useSystemStyleSettingStore } from '@/store/modules/systemStyleSetting'
  const systemSetStore = useSystemStyleSettingStore()
  const data = reactive<any>(systemSetStore.naiveComponentStyle)
  const height = ref<string>(data.Input.heightMedium)
  const fontSize = ref<string>(data.Input.fontSizeMedium)
  const borderRadius = ref<string>(data.Input.borderRadius)
  const border = ref<string>(data.Input.border)
  const borderHover = ref<string>(data.Input.borderHover)
  const boxShadowFocus = ref<string>(data.Input.boxShadowFocus)
  const borderFocus = ref<string>(data.Input.borderFocus)
  //失焦事件
  function heightBlur() {
    data.Input.heightMedium = height.value
  }

  function fontSizeMediumBlur() {
    data.Input.fontSizeMedium = fontSize.value
  }

  function borderRadiusBlur() {
    data.Input.borderRadius = borderRadius.value
  }

  function borderBlur() {
    data.Input.border = border.value
  }

  function borderHoverBlur() {
    data.Input.borderHover = borderHover.value
  }

  function boxShadowFocusBlur() {
    data.Input.boxShadowFocus = boxShadowFocus.value
  }

  function borderFocusBlur() {
    data.Input.borderFocus = borderFocus.value
  }
</script>
<style scoped lang="less">
  .collapse-transition-main {
    .setting {
      margin-top: calc(var(--main-gap) * 3);
    }
    .tips {
      margin-top: calc(var(--main-gap) * 3);
      font-size: var(--fontSize-main-normal);
      color: red;
    }
  }
</style>
