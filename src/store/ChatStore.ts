import { IChat } from '../model/IChat';
import { makeAutoObservable } from "mobx";
import { RootStore } from "./store";
import ChatService from "../service/ChatService";

export class ChatStore{
  root:RootStore;
  chats=[] as IChat[];
  constructor(root:RootStore) {
    this.root=root;
    makeAutoObservable(this)
  }

  setChats(chat:IChat) {
    this.chats.push(chat);
  }

  async create(project_id:string,name:string) {
    this.root.setLoading(true)
    try {
    const response = await ChatService.create(project_id,name);
    this.setChats(response.data);
    return 'created successfully';
    }
    catch(e:any) {
      console.error(e.response?.data?.message);
      return e.response?.data?.message;
    }
    finally {
      this.root.setLoading(false);
    }
  }

  async fetchAll(project_id:string) {
    this.root.setLoading(true)
    try {
    const response = await ChatService.fetchAll(project_id);
    response.data.forEach(chat =>this.setChats(chat))
    return response.data;
    }
    catch(e:any) {
      console.error(e.response?.data?.message);
      return e.response?.data?.message;
    }
    finally {
      this.root.setLoading(false);
    }
  }

  async get(project_id:string,chat_id:string) {
    this.root.setLoading(true)
    try {
    const response = await ChatService.get(project_id,chat_id);
    this.setChats(response.data);
    return response.data;
    }
    catch(e:any) {
      console.error(e.response?.data?.message);
      return e.response?.data?.message;
    }
    finally {
      this.root.setLoading(false);
    }
  }

  async update(project_id: string,chat_id: string,name:string) {
    this.root.setLoading(true)
    try {
    const response = await ChatService.update(project_id,chat_id,name);
    return response.data;
    }
    catch(e:any) {
      console.error(e.response?.data?.message);
      return e.response?.data?.message;
    }
    finally {
      this.root.setLoading(false);
    }
  }

  async delete(project_id: string,chat_id: string) {
    this.root.setLoading(true)
    try {
    const response = await ChatService.delete(project_id,chat_id);
    this.setChats({} as IChat);
    return response.data;
    }
    catch(e:any) {
      console.error(e.response?.data?.message);
      return e.response?.data?.message;
    }
    finally {
      this.root.setLoading(false);
    }
  }
}