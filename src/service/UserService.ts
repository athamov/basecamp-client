import $api from '../http/index';
import { AxiosResponse } from 'axios';
import { IUser } from '../model/IUser';

export default class UserService {
  static fetchUsers():Promise<AxiosResponse<IUser[]>> {
    return $api.get<IUser[]>('/users');
  }

  static fetchUser():Promise<AxiosResponse<IUser>> {
    return $api.get<IUser>('/user');
  }

  static updateUser(username:string, password:string, oldPassword:string):Promise<AxiosResponse<IUser>> {
    return $api.put<IUser>('/user', { username: username, password: password, oldPassword: oldPassword});
  }

  static deleteUser():any {
    return $api.delete('/user');
  }
};
