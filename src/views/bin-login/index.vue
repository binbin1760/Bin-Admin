<template>
  <div class="login">
    <div class="title">
      <img
        class="logo"
        :src="faviocnIcon"
      />
      <p>Bin-Admin</p>
    </div>
    <p class="tips">中后台管理系统模板</p>
    <div class="form">
      <n-form
        ref="loginFormRef"
        label-placement="left"
        :model="params"
        size="large"
        style="width: 100%"
      >
        <n-form-item>
          <n-input
            v-model:value="params.id"
            placeholder="请输入账号"
          >
            <template #prefix>
              <n-icon
                size="18"
                color="#808695"
              >
                <PersonOutline />
              </n-icon>
            </template>
          </n-input>
        </n-form-item>
        <n-form-item path="pass">
          <n-input
            v-model:value="params.pass"
            placeholder="请输入密码"
            type="password"
          >
            <template #prefix>
              <n-icon
                size="18"
                color="#808695"
              >
                <LockClosedOutline />
              </n-icon>
            </template>
          </n-input>
        </n-form-item>
      </n-form>
      <n-button
        type="info"
        style="width: 100%"
        @click="submit"
        size="large"
      >
        登录
      </n-button>
    </div>
  </div>
</template>

<script setup lang="ts">
  import faviocnIcon from '@/assets/faviocn.png'
  import { PersonOutline, LockClosedOutline } from '@vicons/ionicons5'
  const rouetr = useRouter()
  const params = reactive<{ id: string; pass: string }>({
    id: '',
    pass: ''
  })
  function submit() {
    rouetr.push('/home/dashboard')
  }
</script>
<style scoped lang="less">
  .login {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 200px;
    .title {
      .logo {
        width: 48px;
        height: 48px;
        margin-right: 8px;
      }
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 32px;
    }
    .tips {
      margin-bottom: 10px;
      font-size: 14px;
      color: #808695;
    }
    .form {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 320px;
    }
  }
</style>
