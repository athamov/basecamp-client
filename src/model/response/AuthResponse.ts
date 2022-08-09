import { IUser } from "../IUser"

export interface AuthResponse {
  token:{
  accessToken:string;
  refreshToken:string;},
  oldPassword:string,
  user:IUser;
}