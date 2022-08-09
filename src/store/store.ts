import {makeAutoObservable} from "mobx";
import axios from 'axios';

import {API_URL} from "../http";
import {AuthResponse} from "../model/response/AuthResponse";
import {IUser} from "../model/IUser";

import AuthService from "../service/AuthService";
import  UserService  from "../service/UserService"


export default class RootStore {
    userStore:UserStore
    constructor() {
        this.userStore = new UserStore(this);
    }
}

 class UserStore {
    root:RootStore
    user = {} as IUser;
    isAuth = false;
    isLoading = false;

    constructor(root:RootStore) {
        this.root=root
        makeAutoObservable(this);
    }

    setAuth(bool: boolean) {
        this.isAuth = bool;
    }

    checkToken():boolean {
        if(localStorage.getItem('token')){
            return true;
        }
        else {return false;}
    }

    setUser(user: IUser) {
        this.user = user;
    }

    setLoading(bool: boolean) {
        this.isLoading = bool;
    }

    async login(email: string, password: string) {
        try {
            const response = await AuthService.login(email, password);
            localStorage.setItem('token', response.data.token.accessToken);
            this.setAuth(true);
            this.setUser(response.data.user);

        } catch (e:any) {
            console.log(e.response?.data?.message);
        }
    }

    async registration(email: string, password: string, name:string) {
        try {
            const response = await AuthService.registration(email, password, name);
            console.log(response)
            localStorage.setItem('token', response.data.token.accessToken);
            this.setAuth(true);
            this.setUser(response.data.user);
        } catch (e:any) {
            console.log(e.response?.data?.message);
        }
    }

    async logout() {
        try {
            await AuthService.logout();
            localStorage.removeItem('token');
            this.setAuth(false);
            this.setUser({} as IUser);

        } catch (e:any) {
            console.log(e.response?.data?.message);
        }
    }

    async checkAuth() {
        this.setLoading(true);
        try {
            const response = await axios.get<AuthResponse>(`${API_URL}/refresh`, {withCredentials: true})
            console.log(response);
            localStorage.setItem('token', response.data.token.accessToken);
            this.setAuth(true);
            this.setUser(response.data.user);
        } catch (e:any) {
            console.log(e.response?.data?.message);
        } finally {
            this.setLoading(false);
        }
    }

    async updateUser(name: string, newPassword: string, OldPassword:string) {
        this.setLoading(true);
        try {
            const response = await UserService.updateUser(name, newPassword, OldPassword);
            console.log(response)
            this.setUser(response.data);
        } catch (e:any) {
            console.log(e.response?.data?.message);
        } finally {
            this.setLoading(false);
        } 
    }
}

class RouteRoot {
    
}


// class RootStore {
//     constructor() {
//         this.userStore = new UserStore(this)
//         this.todoStore = new TodoStore(this)
//     }
// }

// class UserStore {
//     constructor(rootStore) {
//         this.rootStore = rootStore
//     }

//     getTodos(user) {
//         // Access todoStore through the root store.
//         return this.rootStore.todoStore.todos.filter(todo => todo.author === user)
//     }
// }

// class TodoStore {
//     todos = []
//     rootStore

//     constructor(rootStore) {
//         makeAutoObservable(this, { rootStore: false })
//         this.rootStore = rootStore
//     }
// }