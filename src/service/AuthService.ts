import $api from '../http/index';
import { AxiosResponse } from 'axios';
import { AuthResponse } from '../model/response/AuthResponse';

export default class AuthService {
  static async login(email: string, password: string): Promise<AxiosResponse<AuthResponse>> {
    return $api.post<AuthResponse>('/login',{email: email, password: password});
  };

  static async registration(email: string, password: string,name: string): Promise<AxiosResponse<AuthResponse>> {
    return $api.post<AuthResponse>('/registration',{email: email, password: password, name:name});
  };

  static async logout() {
    return $api.post('/logout');
  };
};

