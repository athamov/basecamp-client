import { ISubtask } from '../model/ISubtask';
import { makeAutoObservable } from "mobx";
import store,{ RootStore } from "./store";

import Subtask from "../service/SubtaskService";

class SubtaskStore{
  root:RootStore;
  subtask=[] as ISubtask[];
  constructor(root:RootStore) {
    this.root=root;
    makeAutoObservable(this)
  }

  setSubtask(task:ISubtask) {
    this.subtask.push(task);
  }

  async add(project_id:string,task_id:string,subtask:string) {
    this.root.setLoading(true)
    try {
    const response = await Subtask.create(project_id,task_id,subtask);
    this.setSubtask(response.data);
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

  async fetchAll(project_id:string,task_id: string) {
    this.root.setLoading(true)
    try {
    const response = await Subtask.fetchAll(project_id,task_id);
    response.data.forEach(subtask =>this.setSubtask(subtask))
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

  async get(project_id:string,subtask_id:string) {
    this.root.setLoading(true)
    try {
    const response = await Subtask.get(project_id,subtask_id);
    this.setSubtask(response.data);
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
      const response = await Subtask.toggleIsDone(project_id,task_id)
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

  async update(project_id: string,subtask_id: string,subtask:string) {
    this.root.setLoading(true)
    try {
    const response = await Subtask.update(project_id,subtask_id,subtask);
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

  async delete(project_id: string,subtask_id: string) {
    this.root.setLoading(true)
    try {
    const response = await Subtask.delete(project_id,subtask_id);
    this.setSubtask({} as ISubtask);
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

export const subtaskStore = new SubtaskStore(store)