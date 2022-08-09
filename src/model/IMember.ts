import {IUser} from './IUser'

export enum role {
  admim,
  user
}
export interface request {
  Read:Boolean,
  Update:Boolean,
  Write:Boolean,
  Delete:Boolean
}

export interface IMember {
  User:IUser;
  role: role,
  request:request
}