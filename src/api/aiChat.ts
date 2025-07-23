import { BaseResponse, request } from '@/unitls'

interface BaseChatType {
  id: string
  name: string
}

export interface BaseChatMessage {
  id?: string
  role: 'user' | 'assistant'
  content: string
  createTime?: number
}

export interface chatMessageParams extends BaseChatMessage {
  chtatId: string
}

export interface ChatType extends BaseChatType {
  belongToUserId: string
  createTime: number
  message: BaseChatMessage[]
}

export function addNewChat(name: string): Promise<BaseResponse<ChatType>> {
  return request({
    url: '/api/add/chat',
    method: 'get',
    params: { name }
  })
}

export function getChatById(id: string): Promise<BaseResponse<ChatType>> {
  return request({
    url: '/api/get/chat',
    method: 'get',
    params: { id }
  })
}

export function getUserChats(): Promise<BaseResponse<ChatType[]>> {
  return request({
    url: '/api/user/chats',
    method: 'get'
  })
}

export function deleteAiChat(id: string): Promise<BaseResponse<null>> {
  return request({
    url: '/api/delete/aiChat',
    method: 'get',
    params: { id }
  })
}

export function addChatMessage(
  data: chatMessageParams
): Promise<BaseResponse<null>> {
  return request({
    url: '/api/add/chatmessage',
    method: 'post',
    data
  })
}
