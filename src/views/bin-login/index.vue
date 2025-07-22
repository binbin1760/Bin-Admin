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
            v-model:value="params.code"
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
            v-model:value="params.paw"
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
      <span
        class="forget-paw"
        @click="forgetPaw"
      >
        忘记密码？
      </span>
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
  import { login } from '@/api'
  import { saveUserInfo } from '@/unitls'
  const dialog = useDialog()
  const message = useMessage()
  const rouetr = useRouter()
  const params = reactive<{ code: string; paw: string }>({
    code: '',
    paw: ''
  })
  async function submit() {
    if (!params.code) {
      message.info('请输入账号')
      return
    }

    if (!params.paw) {
      message.info('请输入密码')
      return
    }
    const res = await login(params)
    message.info(res.message, { duration: 3000, closable: true })
    if (res.code === 200) {
      saveUserInfo(res.data)
      rouetr.push('/home/dashboard')
    }
  }

  function forgetPaw() {
    if (!params.code) {
      message.error('请输入账号,请先输入账号再进行找回！！！')
      return
    }
    dialog.warning({
      title: '提示',
      content: '以为您联系管理员,稍后请注意接听管理员电话',
      positiveText: '确认'
    })
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
        margin-right: var(--margin-main-right);
      }
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 32px;
    }
    .tips {
      margin-bottom: var(--margin-main-bottom);
      font-size: var(--fontSize-main-normal);
      color: #808695;
    }
    .form {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 320px;
      .forget-paw {
        cursor: pointer;
        color: #1890ff;
        text-decoration: underline;
        margin-left: auto;
      }
      .forget-paw:hover {
        color: #ff4040;
      }
    }
  }
</style>
