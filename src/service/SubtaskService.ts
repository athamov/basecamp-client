import $api from '../http/index';
import { AxiosResponse } from 'axios';
import { ISubtask } from '../model/ISubtask';

export default class TaskService {
  static async create(project_id: string,task_id:string,subtask:string):Promise<AxiosResponse<ISubtask>> {
    return $api.post<ISubtask>(`/project/${project_id}/task/${task_id}/subtask`,{subtask: subtask});
  }

  static async fetchAll(project_id:string,task_id: string): Promise<AxiosResponse<ISubtask[]>> {
    return $api.get<ISubtask[]>(`/project/${project_id}/task/${task_id}/subtask`);
  }

  static toggleIsDone(project_id:string,subtask_id:string): Promise<AxiosResponse<ISubtask>> {
    return $api.post<ISubtask>(`/project/${project_id}/subtask/${subtask_id}`);
  } 

  static get(project_id:string,subtask_id:string): Promise<AxiosResponse<ISubtask>> {
    return $api.get<ISubtask>(`/project/${project_id}/subtask/${subtask_id}`);
  } 

  static update(project_id: string,subtask_id: string,subtask:string): Promise<AxiosResponse<ISubtask>> {
    return $api.put(`/project/${project_id}/subtask/${subtask_id}`, {subtask});
  }

  static delete(project_id:string,subtask_id:string):any {
    return $api.delete(`/project/${project_id}/subtask/${subtask_id}`);  
  }
}