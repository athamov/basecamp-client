import { makeAutoObservable } from "mobx";
import { RootStore } from "./store";
import ProjectService from "../service/ProjectService";
import MemberService from "../service/MemberService";
import { IProject } from "../model/IProject";
import { IMember,role,request } from "../model/IMember";

export class ProjectStore {
  root:RootStore;
  project={} as IProject;
  // members:IMember[];
  constructor(root:RootStore) {
    this.root=root
    makeAutoObservable(this);
  }

  setProject(project:IProject) {
    this.project=project;
  }

  async createProject(project_name:string,project_description:string) {
    this.root.setLoading(true)
    try{
    const response = await ProjectService.createProject(project_name,project_description);
    this.setProject(response.data);
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

  async getAllProjects() {
    this.root.setLoading(true)
    try{
    const response = await ProjectService.fetchProjects();
    console.log(response)
    // this.setProject(response.data);
    return response.data;
    }
    catch(e:any) {
      console.error(e.response?.data?.message);
      return [] as IProject[];
    }
    finally {
      this.root.setLoading(false);
    }
  }

  async getProject(project_id:string) {
    this.root.setLoading(true)
    try{
      console.log(project_id)
    const response = await ProjectService.fetchtProject(project_id);
    this.setProject(response.data);
    return response.data;
    }
    catch(e:any) {
      console.error(e.response?.data?.message);
    }
    finally {
      this.root.setLoading(false);
    }
  }

  async updateProject(project_id:string,project_name:string,project_description:string) {
    this.root.setLoading(true)
    try{
    const response = await ProjectService.updateProject(project_id,project_name,project_description);
    this.setProject(response.data);
    return 'updated successfully';
    }
    catch(e:any) {
      console.error(e.response?.data?.message);
      return e.response?.data?.message;
    }
    finally {
      this.root.setLoading(false);
    }
  }

  async deleteProject(project_id:string) {
    this.root.setLoading(true)
    try{
    await ProjectService.delete(project_id);
    this.setProject({} as IProject);
    return 'deleted successfully';
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