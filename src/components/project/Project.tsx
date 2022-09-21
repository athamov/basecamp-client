import React, { FC, useState, useEffect, useContext,lazy,Suspense } from 'react'
import Loader from '../Loader';
import { StoreContext } from '../../context/store-context';
import { Routes, Route,useParams,Link,useNavigate } from 'react-router-dom';
import { IProject } from '../../model/IProject';
import { IMember, role, request} from '../../model/IMember';
import { IUser } from '../../model/IUser';
import Dropzone from './Attachment/Dropzone';
const Tasks = lazy(() => import('./Tasks/Tasks'))
const Chats = lazy(() => import('./Chats/Chats'))
const TaskAdd = lazy(() => import('./Tasks/TaskAdd'))
const MemberAdd = lazy(() => import('./MemberAdd'))

const defaultProject:IProject = {
  project_name: '',
  description: '',
  _id: ''
} 

const Project:FC = () => {
  const [ user, setUser ] = useState<IUser>()
  const [ project,setProject ] = useState<IProject>(defaultProject)
  const [ members,setMembers ] = useState<IMember[]>()
  const [ currentMember,setCurrentMember ] = useState<IMember>()
  const store = useContext(StoreContext);
  const { id } = useParams<string>();
  const navigate = useNavigate();

  useEffect(() =>{
    if(id){
    setUser(store.userStore.user);
    store.ProjectStore.getProject(id).then((data:any)=> {if(data) setProject(data)});
    store.MemberStore.fetchMembers(id).then((data:any)=>setMembers(data));
  }
  },
  [store.ProjectStore,store.MemberStore,store.userStore,id]);

  useEffect(() => {
    if(user && members) {
      setCurrentMember(members.find((member:any) => member.User === user.id))
    }
  },[user,members])

  const handleMember=(event:any,member:IMember)=>{
    event.preventDefault();
    if(currentMember?.request.Read) {
      navigate("member/"+member._id)
    }
    else {
      alert("You are not allowed to view this member");
    }
  }

  const handleDeleteClick = (event:any)=>{
    event.preventDefault();
    if(id){
    let isDelete = store.ProjectStore.deleteProject(id)
    isDelete.then((e:any) => {
      alert(e)
      if(e==='deleted successfully') navigate('/user');
    }).catch((e:any) => {
      alert(e)
    })
  }
  }
  return (
    <div className="dark:text-yellow-100 flex flex-col items-center min-h-max">
      <Link to=''>
        <header className="flex flex-col items-center m-10">
          <h1 className=" text-3xl mt-2 ">Welcome {user?.name}  to <strong>{project?.project_name}</strong></h1>
          <h2 className="text-center break-words w-96 mt-5 max-h-48 overflow-auto bg-scroll shadow-inner"> <strong className="font-bold text-10">Description:</strong> {project?.description} </h2>
        </header>
      </Link>
      {/* Navbar for Project after all*/}
      {/* add member, add task, delete project */}
      <div className="inline-flex rounded-md shadow-sm" role="group">
        <Link to="new-member" type="button" className="py-2 px-4 text-sm font-medium text-green-700 bg-transparent rounded-l-lg border border-green-900 hover:bg-green-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-green-500 focus:bg-green-900 focus:text-white dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-700 dark:focus:bg-green-700">
        <span className="material-symbols-outlined m">
        person_add
        </span> <p>Add new Member</p>
        </Link>
        <Link to="new-task" type="button" className="py-2 px-8 text-sm font-medium text-sky-900 bg-transparent border-t border-b border-sky-900 hover:bg-sky-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-sky-500 focus:bg-sky-900 focus:text-white dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-sky-700 dark:focus:bg-sky-700">
        <span className="material-symbols-outlined">
        add_task
        </span>
          <p>Add new Task</p>
        </Link>
        <button type="button" className="py-2 px-4 text-sm font-medium text-gray-100 bg-transparent rounded-r-md border border-red-500 hover:bg-red-800 hover:text-white focus:z-10 focus:ring-2 focus:ring-red-500 focus:bg-red-900 focus:text-white dark:border-red-500 dark:text-red-400 dark:hover:text-white dark:hover:bg-red-700 dark:focus:bg-red-600">
        <span className="material-symbols-outlined" onClick={handleDeleteClick}>
        delete_forever
        </span>
          <p>Delete this Project</p>
        </button>
      </div>
      {/* Member */}
      <section className="mt-10 flex flex-row">
        {members?.map((member)=>
          <div className="flex flex-col cursor-pointer sm:flex-row m-3" key={member.User} onClick={(event)=>handleMember(event,member)}>
          {member.role==='admin'?
            <span className="material-symbols-outlined mt-2 mr-2">
              admin_panel_settings
            </span>:
            <span className="material-symbols-outlined mt-2 mr-2">
              person
            </span>}
          <h3 className="text-3xl ">{member.name}</h3>
        </div>
        )}
      </section>
      <Suspense fallback={<Loader />}>
      <Chats />
      </Suspense>
      <Suspense fallback={<Loader />}>
        <Tasks id={project?._id}/>
      </Suspense>
      {/* Attachment */}
      <Dropzone id={project?._id}/>

    </div>
  )
}

export default Project