export enum role {
  admin='admin',
  user='user'
}
export interface request {
  Read:boolean,
  Update:boolean,
  Write:boolean,
  Delete:boolean
}

export interface IMember {
  _id:string,
  name:string,
  User:string,
  role: role,
  request:request
}