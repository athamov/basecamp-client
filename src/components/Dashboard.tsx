import {FC, useContext, useEffect,lazy,Suspense} from 'react';
import { observer } from "mobx-react-lite";
import { Routes, Route, useNavigate } from 'react-router-dom';
import { StoreContext } from '../context/store-context';
import Loader from './Loader'
const UserUpdateForm = lazy(() => import('./auth/UserUpdateForm'));
const Navbar = lazy(() => import('./Navbar'));
const AllProject = lazy(() => import('./project/AllProject'));
const ProjectAdd = lazy(() => import('./project/ProjectAdd'));
const Project = lazy(() => import('./project/Project'));
const TaskAdd = lazy(() => import('./project/Tasks/TaskAdd'));
const MemberAdd = lazy(() => import('./project/MemberAdd'));
const Member = lazy(() => import('./project/Member'))
const TaskUpdate = lazy(() => import('./project/Tasks/TaskUpdate'));
const SubtaskUpdate = lazy(() => import('./project/Tasks/Subtask/SubtaskUpdate'));
const ChatUpdate = lazy(() => import('./project/Chats/ChatUpdate'));
const MessageUpdate = lazy(() =>import('./project/Chats/MessageUpdate'));

const Dashboard: FC = () => {
  const store = useContext(StoreContext);
  const navigate = useNavigate();

  useEffect(() => {
    let isAuth;
    console.log(localStorage.getItem('token'))
    if (localStorage.getItem('token')) {
        isAuth = store.checkAuth();
        isAuth?.then(() => {
          // navigate('/user')
        })
        .catch(()=>{
          navigate('/login')
        })
    }
    else {
      navigate('/login')
    }

},[store,navigate]);
    
  return (
    <>
      <Navbar />
      <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<AllProject />} />
        <Route path="/update" element={<UserUpdateForm />} />
        <Route path='/addProject' element={<ProjectAdd/>} />
        <Route path='/:id/' element={<Project/>} />
        <Route path='/:id/new-task' element={<TaskAdd />} />
        <Route path='/:id/task/:task_id' element={<TaskUpdate />} />
        <Route path='/:id/subtask/:subtask_id' element={<SubtaskUpdate/>} />
        <Route path='/:id/new-member' element={<MemberAdd />} />
        <Route path='/:id/member/:member_id' element={<Member />} />
        <Route path='/:id/chat/:chat_id' element={<ChatUpdate />} />
        <Route path='/:id/message/:message_id' element={<MessageUpdate />} />
      </Routes>
      </Suspense>
    </>
  )
}

export default observer(Dashboard);