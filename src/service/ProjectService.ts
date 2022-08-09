import $api from '../http/index';
import { AxiosResponse } from 'axios';
import { IProject } from '../model/IProject';

export default class ProjectService {
  static async createProject(project_name:string, project_description:string):Promise<AxiosResponse<IProject>> {
    return $api.post<IProject>('/project', {project_name, project_description});
  }

  static async fetchProjects():Promise<AxiosResponse<IProject>> {
    return $api.get<IProject>('/all-project');
  }

  static async getProject(project_id:string):Promise<AxiosResponse<IProject>> {
    return $api.get<IProject>(`/project/:${project_id}`);
  }

  static updateProject(project_id:string,project_name:string,project_description:string):Promise<AxiosResponse<IProject>> {
    return $api.put<IProject>(`/project/:${project_id}`,{project_name:project_name,project_description:project_description});
  }

  static delete(project_id:string):any {
    return $api.delete<IProject>(`/project/:${project_id}`)
  }
}