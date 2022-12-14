import {IMember,role,request} from '../model/IMember';
import { makeAutoObservable } from "mobx";
import store,{ RootStore } from "./store";
import MemberService from "../service/MemberService";

class MemberStore{
  root:RootStore;
  members=[] as IMember[];
  constructor(root:RootStore) {
    this.root=root;
    makeAutoObservable(this)
  }

  setMembers(member:IMember) {
    this.members.push(member);
  }

  async addMember(project_id:string,email:string,role:role,request:request) {
    this.root.setLoading(true)
    try {
    const response = await MemberService.createMember(project_id,email,role,request);
    if(response.status < 400) {
    this.setMembers(response.data);
    return response.data;
    }
    }
    catch(e:any) {
      console.error(e.response?.data?.message);
      return e.response?.data?.message;
    }
    finally {
      this.root.setLoading(false);
    }
  }

  async fetchMembers(project_id:string) {
    this.root.setLoading(true)
    try {
    const response = await MemberService.fetchMembers(project_id);
    response.data.forEach(member =>this.setMembers(member))
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

  async getMember(project_id:string,member_id:string) {
    this.root.setLoading(true)
    try {
    const response = await MemberService.getMember(project_id,member_id);
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

  async updateMember(project_id: string,member_id: string,role:role,request:request) {
    this.root.setLoading(true)
    try {
    const response = await MemberService.updateMember(project_id,member_id,role,request);
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

  async deleteMember(project_id: string,member_id: string) {
    this.root.setLoading(true)
    try {
    const response = await MemberService.deleteMember(project_id,member_id);
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

export const memberStore = new MemberStore(store)