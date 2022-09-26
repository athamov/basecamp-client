import { IChat } from '../model/IChat';
import { makeAutoObservable } from "mobx";
import ChatService from "../service/ChatService";

class ChatStore{
  chats=[] as IChat[];
  constructor() {

    makeAutoObservable(this)
  }

  setChats(chat:IChat) {
    this.chats.push(chat);
  }

  async create(project_id:string,name:string) {
    try {
    const response = await ChatService.create(project_id,name);
    this.setChats(response.data);
    return 'created successfully';
    }
    catch(e:any) {
      console.error(e.response?.data?.message);
      return e.response?.data?.message;
    }
  }

  async fetchAll(project_id:string) {
    try {
    const response = await ChatService.fetchAll(project_id);
    response.data.forEach(chat =>this.setChats(chat))
    return response.data;
    }
    catch(e:any) {
      console.error(e.response?.data?.message);
      return e.response?.data?.message;
    }
  }

  async get(project_id:string,chat_id:string) {
    try {
    const response = await ChatService.get(project_id,chat_id);
    this.setChats(response.data);
    return response.data;
    }
    catch(e:any) {
      console.error(e.response?.data?.message);
      return e.response?.data?.message;
    }
  }

  async update(project_id: string,chat_id: string,name:string) {
    try {
    const response = await ChatService.update(project_id,chat_id,name);
    return response.data;
    }
    catch(e:any) {
      console.error(e.response?.data?.message);
      return e.response?.data?.message;
    }
  }

  async delete(project_id: string,chat_id: string) {
    try {
    const response = await ChatService.delete(project_id,chat_id);
    this.setChats({} as IChat);
    return response.data;
    }
    catch(e:any) {
      console.error(e.response?.data?.message);
      return e.response?.data?.message;
    }
  }
}

export const chatStore = new ChatStore()