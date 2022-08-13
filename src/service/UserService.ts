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

  static updateUser(name:string,email:string, password:string, oldPassword:string):Promise<AxiosResponse<IUser>> {
    return $api.put<IUser>('/user', { name: name,email:email, newPassword: password, oldPassword: oldPassword});
  }

  static deleteUser():any {
    return $api.delete('/user');
  }
};
