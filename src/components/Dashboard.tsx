import {FC, useContext, useEffect, useState,lazy,Suspense} from 'react';
import { observer } from "mobx-react-lite";
import { Routes, Route, useNavigate } from 'react-router-dom';
import { StoreContext } from '../context/store-context';
import { IUser } from "../model/IUser";
import Loader from './Loader'
const UserUpdateForm = lazy(() => import('./UserUpdateForm'));
const Navbar = lazy(() => import('./Navbar'));
const AllProject = lazy(() => import('./AllProject'));
const ProjectAdd = lazy(() => import('./ProjectAdd'));
const Project = lazy(() => import('./Project'));

const Dashboard: FC = () => {
  const store = useContext(StoreContext);
  const [user, setUser] = useState<IUser>();
  const navigate = useNavigate();

  useEffect(() => {
    let isAuth;
    if (localStorage.getItem('token') || store.isAuth) {
        isAuth = store.userStore.checkAuth();
        isAuth?.then(() => {
          setUser(store.userStore.user)
        })
        .catch(()=>{
          alert('from dashboard to login')
          navigate('/login')
        })
    }
    else {
      alert('from dashboard to login');
      navigate('/login')
    }

},[store,navigate]);
    
  return (
    <div className="container m-auto h-screen">
      <Navbar />
      <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<AllProject />} />
        <Route path="/update" element={<UserUpdateForm />} />
        <Route path='/addProject' element={<ProjectAdd/>} />
        <Route path=':id' element={<Project/>} />
      </Routes>
      </Suspense>
    </div>
  )
}

export default observer(Dashboard);