import $api from '../http/index';
import { AxiosResponse } from 'axios';
import { IMember,role,request } from '../model/IMember';

export default class MemberService {
  static async createMember(project_id:string,email: string, role: role,request:request): Promise<AxiosResponse<IMember>> {
    return $api.post<IMember>(`/project/:${project_id}/member`,{email:email,role:role,request:request})
  }

  static async fetchMembers(project_id:string): Promise<AxiosResponse<IMember[]>> {
    return $api.get<IMember[]>(`/project/${project_id}/member`);
  }

  static getMember(project_id:string,membe_id:string): Promise<AxiosResponse<IMember>> {
    return $api.get<IMember>(`/project/${project_id}/member/:${membe_id}`);
  } 

  static updateMember(project_id: string,member_id: string,role:role,request:request): Promise<AxiosResponse<IMember>> {
    return $api.put(`/project/:${project_id}/member/${member_id}`, {role:role,request:request});
  }

  static deleteMember(project_id:string,member_id:string):any {
    return $api.delete(`/project/:${project_id}/member/${member_id}`);  
  }
}