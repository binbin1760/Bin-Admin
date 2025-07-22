import { PropType } from 'vue'
export const basecChartProps = {
  //获取用户聊天信息
  chatRequestApi: {
    type: Function as PropType<() => Promise<any>>,
    required: true
  }
}
