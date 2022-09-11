import $api from '../http/index';
import { AxiosResponse } from 'axios';
import { ITask } from '../model/ITask';

export default class TaskService {
  static async create(project_id: string,task:string,):Promise<AxiosResponse<ITask>> {
    return $api.post<ITask>(`/project/${project_id}/task`,{task});
  }

  static async fetchAll(project_id:string): Promise<AxiosResponse<ITask[]>> {
    return $api.get<ITask[]>(`/project/${project_id}/task`);
  }

  static get(project_id:string,task_id:string): Promise<AxiosResponse<ITask>> {
    return $api.get<ITask>(`/project/${project_id}/task/${task_id}`);
  } 

  static toggleIsDone(project_id:string,task_id:string): Promise<AxiosResponse<ITask>> {
    return $api.post(`/project/${project_id}/task/${task_id}`);
  }

  static update(project_id: string,task_id: string,task:string): Promise<AxiosResponse<ITask>> {
    return $api.put(`/project/${project_id}/task/${task_id}`, {task});
  }

  static delete(project_id:string,task_id:string):any {
    return $api.delete(`/project/${project_id}/task/${task_id}`);  
  }
}