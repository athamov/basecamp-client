import { ITask } from '../model/ITask';
import { makeAutoObservable } from "mobx";
import store,{ RootStore } from "./store";

import TaskService from "../service/TaskService";

class TaskStore{
  root:RootStore;
  tasks=[] as ITask[];
  constructor(root:RootStore) {
    this.root=root;
    makeAutoObservable(this)
  }

  setTask(task:ITask) {
    this.tasks.push(task);
  }

  async addTask(project_id:string,task:string) {
    this.root.setLoading(true)
    try {
    const response = await TaskService.create(project_id,task);
    this.setTask(response.data);
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
    const response = await TaskService.fetchAll(project_id);
    response.data.forEach(task =>this.setTask(task))
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

  async get(project_id:string,task_id:string) {
    this.root.setLoading(true)
    try {
    const response = await TaskService.get(project_id,task_id);
    this.setTask(response.data);
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

  async toggleIsDone(project_id:string,task_id: string) {
    this.root.setLoading(true)
    try {
      const response = await TaskService.toggleIsDone(project_id,task_id)
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

  async update(project_id: string,task_id: string,task:string) {
    this.root.setLoading(true)
    try {
    const response = await TaskService.update(project_id,task_id,task);
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

  async delete(project_id: string,task_id: string) {
    this.root.setLoading(true)
    try {
    const response = await TaskService.delete(project_id,task_id);
    this.setTask({} as ITask);
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

export const taskStore = new TaskStore(store)