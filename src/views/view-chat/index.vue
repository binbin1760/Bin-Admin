<template>
  <BaseChat
    :edit-hight="180"
    :chatHistoryListWidth="300"
    v-model:data="data"
    v-model:chat-history-list="chatHistoryList"
    v-model:sendAble="sendAble"
    v-model:setDefaultChat="currChatId"
    @select-chat="selectCHat"
    @send-message="sendMessage"
  />
</template>

<script setup lang="ts">
  import { BaseChat } from '@/components'
  import { io } from 'socket.io-client'
  import {
    getUserChats,
    ChatType,
    BaseChatMessage,
    addNewChat,
    addChatMessage,
    chatMessageParams,
    getChatById
  } from '@/api'
  const message = useMessage()
  const socket = io('http://localhost:5133')
  socket.on('connection', (data) => {
    console.log(data)
  })

  interface chatHistoryList {
    id: string
    chatName: string
  }
  const data = ref<BaseChatMessage[]>([])
  const chatHistoryList = ref<ChatType[]>([])
  const sendAble = ref<boolean>(true)
  const currChatId = ref<string>()

  const sendMessage = async (_messageObj: BaseChatMessage) => {
    //将全部对话传递给AI ，确保缓存命中
    socket.emit('message', data.value)
    //data新增一条ai回复的数据
    const aiMessage: BaseChatMessage = {
      role: 'assistant',
      content: ''
    }
    data.value.push(aiMessage)

    //如果当前没有选中聊天，则新增聊天
    if (!currChatId.value) {
      await addChat(_messageObj.content.slice(0, 15))

      await postNewChatMessage({
        role: _messageObj.role,
        chtatId: currChatId.value || '',
        content: _messageObj.content
      })
    }

    //临时保存流式传输数据
    let tempStream = ''
    socket.on('message', async (res) => {
      const { delta, finish_reason } = res
      tempStream += delta?.content || ''
      data.value[data.value.length - 1].content = tempStream
      if (finish_reason === 'stop') {
        sendAble.value = true
        await postNewChatMessage({
          role: 'assistant',
          content: tempStream,
          chtatId: currChatId.value || ''
        })
        tempStream = ''
        console.log('接收完成')
      }
    })
  }

  function selectCHat(data: string) {
    currChatId.value = data
    if (!data) return
    getUserChatById(data)
  }

  async function addChat(name: string) {
    const res = await addNewChat(name)
    message.info(res.message)
    if (res.code === 200) {
      chatHistoryList.value.push(res.data)
      currChatId.value = res.data.id
    }
  }

  async function getUserAllChats() {
    const result = await getUserChats()
    if (result.code === 200) {
      chatHistoryList.value = result.data
    }
  }

  async function postNewChatMessage(data: chatMessageParams) {
    if (!data.chtatId) {
      message.error('未匹配到聊天')
      return
    }
    const result = await addChatMessage(data)
    message.info(result.message)
  }

  async function getUserChatById(id: string) {
    const result = await getChatById(id)
    if (result.code === 200) {
      data.value = result.data.message
    }
  }

  getUserAllChats()
  onUnmounted(() => {
    socket.disconnect()
  })
</script>
<style scoped lang="less"></style>
