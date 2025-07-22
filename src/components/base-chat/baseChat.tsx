import { defineComponent, ref, PropType, toRefs, watch } from 'vue'
import { NButton } from 'naive-ui'
import styles from './chat.module.css'
import { useScrollHook } from '@/hooks'
import { ReceiveMessage, SendMessage } from './component'
import { ChatType, BaseChatMessage } from '@/api'

/**
 * 聊天窗口配置 以及 数据模型
 *  data:获取聊天信息的方法,聊天会做流式传输是否需要考虑将聊天双放的message分开保存？
 *  组件props说明
 *  editHight： 编辑栏的高度 默认200px
 */

export default defineComponent({
  name: 'baseChat',
  props: {
    editHight: {
      type: Number as PropType<number>,
      default: 200,
      required: true
    },
    chatHistoryListWidth: {
      type: Number as PropType<number>,
      default: 300,
      required: true
    },
    sendAble: {
      type: Boolean as PropType<boolean>,
      default: true,
      required: true
    },
    data: {
      type: Array as PropType<BaseChatMessage[]>,
      default: [],
      required: true
    },
    chatHistoryList: {
      type: Array as PropType<ChatType[]>,
      default: [],
      required: true
    },
    setDefaultChat: {
      type: String as PropType<string>,
      default: '',
      required: true
    }
  },
  emits: [
    'update:data',
    'update:chatHistoryList',
    'update:sendAble',
    'update:setDefaultChat',
    'sendMessage',
    'selectChat'
  ],
  setup(props, { emit }) {
    const currChat = ref<number>(-1)
    const {
      editHight,
      chatHistoryListWidth,
      data,
      chatHistoryList,
      sendAble,
      setDefaultChat
    } = toRefs(props)
    const editContent = ref<string>('')
    const showContent = ref<string>('')
    // 滚动条
    const messageRef = ref<HTMLElement | null>(null)
    const messageItemRef = ref<HTMLElement | null>(null)
    const { scrollToBottom } = useScrollHook(messageRef, messageItemRef)

    function editBoxBlur(e: any) {
      const target = e.target
      // 检查内容是否为空
      if (target.innerHTML === '<br>' || target.innerHTML.trim() === '') {
        // 清空内容并移除多余的 <br> 标签
        target.innerHTML = ''
      }
      showContent.value = target.innerHTML
      editContent.value = target.innerText
    }
    // 发送信息
    function sendMessage() {
      // 获取输入栏的 DOM 元素
      const inputElement = document.querySelector(
        `.${styles['chat-custom-richEdit']}`
      )
      // 获取输入栏的内容
      const messageContent = (inputElement as HTMLElement)?.innerText.trim()

      // 如果内容不为空，则添加到 chatData 中
      if (messageContent) {
        // 清空输入栏
        if (inputElement) {
          ;(inputElement as HTMLElement).innerText = ''
        }
        const sendData: BaseChatMessage = {
          role: 'user',
          content: editContent.value
        }
        data.value.push(sendData)
        emit('update:sendAble', false)
        emit('sendMessage', sendData)
        emit('update:data', data.value)
      }
    }
    //选中聊天
    function selectChat(index: number, id: string) {
      currChat.value = index
      emit('selectChat', id)
      emit('update:setDefaultChat', id)
    }
    //新建聊天
    function newChat() {
      currChat.value = -1
      emit('selectChat', '')
      emit('update:data', [])
      emit('update:setDefaultChat', '')
    }
    watch(data.value, () => {
      scrollToBottom()
    })
    watch(
      () => setDefaultChat.value,
      (newVal) => {
        chatHistoryList.value.forEach((chat, index) => {
          if (chat.id === newVal) {
            currChat.value = index
          }
        })
      },
      { immediate: true }
    )
    return () => (
      <div class={styles['chat']}>
        <div
          class={styles['chat-history-list']}
          style={{ width: chatHistoryListWidth.value + 'px' }}
        >
          {chatHistoryList.value?.map((item, index) => {
            return (
              <div
                class={[
                  styles['chat-history-list-item'],
                  currChat.value === index
                    ? styles['chat-history-list-item-active']
                    : ''
                ]}
                onClick={() => selectChat(index, item.id)}
                key={index}
              >
                {item.name}
              </div>
            )
          })}
        </div>
        <div class={styles['chat-body']}>
          <div
            ref={messageRef}
            class={styles['chat-message-body']}
          >
            {data.value.map((item) =>
              item.role === 'user' ? (
                <SendMessage message={item.content} />
              ) : (
                <ReceiveMessage message={item.content} />
              )
            )}
          </div>
          <div
            style={{ height: editHight.value + 'px' }}
            class={styles['chat-editmessage-box']}
          >
            <div
              contenteditable
              onBlur={editBoxBlur}
              class={styles['chat-custom-richEdit']}
            ></div>
            <div class={styles['chat-editbox-button-list']}>
              <div>
                <NButton
                  disabled={!sendAble.value}
                  onClick={newChat}
                  type={'primary'}
                >
                  新启聊天
                </NButton>
              </div>
              <div>
                <NButton
                  disabled={!sendAble.value}
                  onClick={sendMessage}
                  type={'primary'}
                >
                  发送
                </NButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
})
