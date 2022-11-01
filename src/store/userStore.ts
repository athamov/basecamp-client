import {makeAutoObservable} from "mobx";
import axios from 'axios';

import { API_URL } from "../http";
import {AuthResponse} from "../model/response/AuthResponse";
import {IUser} from "../model/IUser";
import store,{RootStore} from "./store";

import AuthService from "../service/AuthService";
import  UserService  from "../service/UserService";

class UserStore {
  root:RootStore
  user = {} as IUser;

  constructor(root:RootStore) {
      this.root=root
      makeAutoObservable(this);
  }



  setUser(user: IUser) {
      this.user = user;
  }

  async login(email: string, password: string) {
      try {
          const response = await AuthService.login(email, password);
          localStorage.setItem('token', response.data.token.accessToken);
          this.root.setAuth(true);
          this.setUser(response.data.user);
          return 'logged in successfully'
      } catch (e:any) {
          console.log(e.response?.data?.message);
          return e.response?.data?.message;
      }
  }

  async registration(email: string, password: string, name:string) {
      try {
          const response = await AuthService.registration(email, password, name);
          localStorage.setItem('token', response.data.token.accessToken);
          this.root.setAuth(true);
          this.setUser(response.data.user);
        return 'registered successfully'
      } catch (e:any) {
          console.log(e.response?.data?.message);
          return e.response?.data?.message
      }
  }

  async logout() {
      try {
          await AuthService.logout();
          localStorage.removeItem('token');
          this.root.setAuth(false);
          this.setUser({} as IUser);
          return 'loggged out successfully';
      } catch (e:any) {
          console.log(e.response?.data?.message);
          return e.response?.data?.message;
      }
  }

//   async checkAuth() {
//       try {
//           const response = await axios.get<AuthResponse>(`${API_URL}/refresh`, {withCredentials: true})
//           localStorage.setItem('token', response.data.token.accessToken);
//           this.root.setAuth(true);
//           this.setUser(response.data.user);
//           return true
//       } catch (e:any) {
//           console.log(e.response?.data?.message);
//           return false;
//       }
//   }

  async updateUser(name: string,email: string,newPassword: string, oldPassword:string) {
      try {
          const response = await UserService.updateUser(name, email, newPassword, oldPassword);
          this.setUser(response.data);
          return 'updated successfully'
      } catch (e:any) {
          console.log(e.response?.data?.message);
          return e.response?.data?.message;
      }
  }
}

export const userStore = new UserStore(store)