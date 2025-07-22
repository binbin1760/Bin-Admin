import { defineComponent, PropType } from 'vue'
import { ChatLayout, ChatSideItem } from './components'
import styles from './treeChat.module.css'

/**
 * 1.自带tab component
 *
 */

export default defineComponent({
  name: 'treeChat',
  props: {},
  setup(props, ctx) {
    const mockSideData = [
      '聊天1',
      '聊天2',
      '聊天3',
      '聊天4',
      '聊天5',
      '聊天6',
      '聊天7',
      '聊天8',
      '聊天9',
      '聊天10'
    ]
    const mockHeaderData = [
      '分支1',
      '分支2',
      '分支3',
      '分支4',
      '分支5',
      '分支6',
      '分支7',
      '分支8',
      '分支9',
      '分支10'
    ]
    const mockContentData = [
      '分支聊天1',
      '分支聊天2',
      '分支聊天3',
      '分支聊天4',
      '分支聊天5',
      '分支聊天6',
      '分支聊天7',
      '分支聊天8',
      '分支聊天9',
      '分支聊天10'
    ]
    return () => (
      <ChatLayout>
        {{
          side: () => (
            <div class={styles['chat-slot-side']}>
              {mockSideData.map((item) => (
                <ChatSideItem title={item} />
              ))}
            </div>
          ),
          header: () => (
            <div class={styles['chat-slot-header']}>
              {mockHeaderData.map((item) => (
                <div class={styles['chat-slot-header-title']}>{item}</div>
              ))}
            </div>
          ),
          default: () => <div>321231</div>
        }}
      </ChatLayout>
    )
  }
})
