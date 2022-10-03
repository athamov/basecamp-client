import React, { FC, lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { observer } from "mobx-react-lite";
import NoRoute from './components/NoRoute'
import Loader from './components/Loader'
const Dashboard = lazy(() => import('./components/Dashboard'));
const LoginForm = lazy(() => import('./components/auth/LoginForm'));
const RegistrationForm = lazy(() => import('./components/auth/RegistrationForm'));
const UserUpdateForm = lazy(() => import('./components/auth/UserUpdateForm'));
const ProjectAdd = lazy(() => import('./components/project/ProjectAdd'));
const Project = lazy(() => import('./components/project/Project'));

const App: FC = () => { 
    return (
        <div className="container m-auto h-full min-h-screen font-rale pb-10">
        <Suspense fallback={<Loader />}>
        <Routes>
            <Route path="/" element={<Navigate to="/user" />}/>
            <Route path="/user" element={<Dashboard />} >
                <Route path="update" element={<UserUpdateForm />} />
                <Route path='addProject' element={<ProjectAdd/>} />
                <Route path=':id/*' element={<Project/>} > 
                </Route>
            </Route>
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<RegistrationForm />} />
            <Route path="*" element={<NoRoute />}/>
        </Routes>
        </Suspense>
        </div>
    );
};

export default observer(App);