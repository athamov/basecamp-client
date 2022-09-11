import $api from '../http/index';
import { AxiosResponse } from 'axios';
import { IMessage } from '../model/IMessage';

export default class MessageService {
  static async create(project_id: string,chat_id:string,message:string):Promise<AxiosResponse<IMessage>> {
    return $api.post<IMessage>(`/project/${project_id}/chat/${chat_id}/message`,{message: message});
  }

  static async fetchAll(project_id:string,chat_id: string): Promise<AxiosResponse<IMessage[]>> {
    return $api.get<IMessage[]>(`/project/${project_id}/chat/${chat_id}/message`);
  }

  static get(project_id:string,message_id:string): Promise<AxiosResponse<IMessage>> {
    return $api.get<IMessage>(`/project/${project_id}/message/${message_id}`);
  } 

  static update(project_id: string,message_id: string,message:string): Promise<AxiosResponse<IMessage>> {
    return $api.put(`/project/${project_id}/message/${message_id}`, {message: message});
  }

  static delete(project_id:string,message_id:string):any {
    return $api.delete(`/project/${project_id}/message/${message_id}`);  
  }
}