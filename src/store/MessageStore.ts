import { IMessage } from '../model/IMessage';
import { makeAutoObservable } from "mobx";
import { RootStore } from "./store";
import MessageService from "../service/MessageService";

export class MessageStore{
  root:RootStore;
  messages=[] as IMessage[];
  constructor(root:RootStore) {
    this.root=root;
    makeAutoObservable(this)
  }

  setChats(messages:IMessage) {
    this.messages.push(messages);
  }

  async add(project_id:string,chat_id:string,message:string) {
    this.root.setLoading(true)
    try {
    const response = await MessageService.create(project_id,chat_id,message);
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

  async fetchAll(project_id:string,chat_id:string) {
    this.root.setLoading(true)
    try {
    const response = await MessageService.fetchAll(project_id,chat_id);
    response.data.forEach(message =>this.setChats(message))
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

  async get(project_id:string,message_id:string) {
    this.root.setLoading(true)
    try {
    const response = await MessageService.get(project_id,message_id);
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

  async update(project_id: string,message_id: string,name:string) {
    this.root.setLoading(true)
    try {
    const response = await MessageService.update(project_id,message_id,name);
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

  async delete(project_id: string,message_id: string) {
    this.root.setLoading(true)
    try {
    const response = await MessageService.delete(project_id,message_id);
    this.setChats({} as IMessage);
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