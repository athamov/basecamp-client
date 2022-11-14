import $api from '../http/index';
import { AxiosResponse } from 'axios';
import { IChat } from '../model/IChat';

export default class ChatService {
  static async create(project_id:string, name:string):Promise<AxiosResponse<IChat>> {
    return $api.post<IChat>(`/project/${project_id}/chat`, {name});
  }

  static async fetchAll(project_id:string):Promise<AxiosResponse<IChat[]>> {
    return $api.get<IChat[]>(`/project/${project_id}/chat`);
  }

  static async get(project_id:string,chat_id: string):Promise<AxiosResponse<IChat>> {
    return $api.get<IChat>(`/project/${project_id}/chat/${chat_id}`);
  }

  static update(project_id:string,chat_id:string,name:string):Promise<AxiosResponse<IChat>> {
    return $api.put<IChat>(`/project/${project_id}/chat/${chat_id}`,{project_name:name});
  }

  static delete(project_id:string,chat_id:string):any {
    return $api.delete<IChat>(`/project/${project_id}/chat/${chat_id}`)
  }
};