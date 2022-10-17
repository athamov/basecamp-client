import axios from 'axios';
import Cookies from 'universal-cookie';

import { API_URL } from "../http";
import {AuthResponse} from "../model/response/AuthResponse";
import {IUser} from "../model/IUser";

import AuthService from "../service/AuthService";
import  UserService  from "../service/UserService";

export class RootStore {
    isLoading = false;
    isAuth = false;
    user = {} as IUser;
    cookies = new Cookies();

    constructor() {
        this.isLoading = false;
    }

    setLoading(bool: boolean) {
        this.isLoading = bool;
    }
    setAuth(bool: boolean) {
        this.isAuth = bool;
    }

    setUser(user: IUser) {
        this.user = user;
    }

    setCookie(cname:string, cvalue:string, exdays:number) {
        const d = new Date();
        d.setTime(d.getTime() + (exdays*24*60*60*1000));
        let expires = "expires="+ d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }
  
    async login(email: string, password: string) {
        try {
            const response = await AuthService.login(email, password);
            this.cookies.set('refreshToken', response.data.token.refreshToken, {maxAge:2592000000,httpOnly:true});
            this.setCookie('refreshToken', response.data.token.refreshToken,10);
            localStorage.setItem('token', response.data.token.accessToken);
            this.setAuth(true);
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
            this.cookies.set('refreshToken', response.data.token.refreshToken, {maxAge:2592000000,httpOnly:true});
            this.setCookie('refreshToken', response.data.token.refreshToken,10);
            localStorage.setItem('token', response.data.token.accessToken);
            this.setAuth(true);
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
            this.setAuth(false);
            this.setUser({} as IUser);
            return 'loggged out successfully';
        } catch (e:any) {
            console.log(e.response?.data?.message);
            return e.response?.data?.message;
        }
    }
  
    async checkAuth() {
        try {
            const response = await axios.get<AuthResponse>(`${API_URL}/refresh`, {withCredentials: true})
            console.log(this.cookies.get('refreshToken'));
            this.setCookie('refreshToken', response.data.token.refreshToken,10);
            localStorage.setItem('token', response.data.token.accessToken);
            this.setAuth(true);
            this.setUser(response.data.user);
            return true
        } catch (e:any) {
            console.log(e.response?.data?.message);
            return false;
        }
    }
  
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

const store = new RootStore();

export default store;