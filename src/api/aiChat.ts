import { BaseResponse } from '@/unitls/request'
import request from '@/unitls/request'
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
  return request.get('/api/add/chat', { name })
}

export function getChatById(id: string): Promise<BaseResponse<ChatType>> {
  return request.get('/api/get/chat', { id })
}

export function getUserChats(): Promise<BaseResponse<ChatType[]>> {
  return request.get('/api/user/chats')
}

export function deleteAiChat(id: string): Promise<BaseResponse<null>> {
  return request.get('/api/delete/aiChat', { id })
}

export function addChatMessage(
  data: chatMessageParams
): Promise<BaseResponse<null>> {
  return request.post('/api/add/chatmessage', data)
}
