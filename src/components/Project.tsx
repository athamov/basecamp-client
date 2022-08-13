import React, { FC, useState, useEffect, useContext } from 'react'
import { StoreContext } from '../context/store-context';
import {useParams } from 'react-router-dom';
import { IProject } from '../model/IProject';
import { IMember,role,request} from '../model/IMember';

const Project:FC = () => {
  const [ project,setProject ] = useState<IProject>()
  const [member,setMember] = useState<IMember>()
  const store = useContext(StoreContext);
  const { id } = useParams();
  
  useEffect(() =>{
    // console.log(id);
    if(id){
    store.ProjectStore.getProject(id).then((data)=>setProject(data));
    store.MemberStore.fetchMembers(id).then((data)=>setMember(data));
  }
  },[store,id]);

  useEffect(() =>{
    if(member) console.log(member);
  },[member]);
  return (
    <div>Project</div>
  )
}

export default Project