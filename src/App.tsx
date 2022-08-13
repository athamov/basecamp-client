import React, { FC, useContext, useEffect,lazy,Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
// import {StoreContext} from './context/store-context'
import { observer } from "mobx-react-lite";
import NoRoute from './components/NoRoute'
import Loader from './components/Loader'
const Dashboard = lazy(() => import('./components/Dashboard'));
const LoginForm = lazy(() => import('./components/LoginForm'));
const RegistrationForm = lazy(() => import('./components/RegistrationForm'));
const UserUpdateForm = lazy(() => import('./components/UserUpdateForm'));
const ProjectAdd = lazy(() => import('./components/ProjectAdd'));
const Project = lazy(() => import('./components/Project'));

const App: FC = () => {
    // const store = useContext(StoreContext);
    
    return (
        <>
        <Suspense fallback={<Loader />}>
        <Routes>
            <Route path="/" element={<Navigate to="/user" />}/>
            <Route path="/user/*" element={<Dashboard />} >
                <Route path="update" element={<UserUpdateForm />} />
                <Route path='addProject' element={<ProjectAdd/>} />
                <Route path=':id' element={<Project/>} />
            </Route>
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<RegistrationForm />} />
            <Route path="*" element={<NoRoute />}/>
        </Routes>
        </Suspense>
        </>
    );
};

export default observer(App);