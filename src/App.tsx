import React, { FC, useContext, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Context } from "./index";
import { observer } from "mobx-react-lite";
import Dashboard from './components/Dashboard'
import LoginForm from "./components/LoginForm";
import RegistrationForm from "./components/RegistrationForm"
import UserUpdateForm from "./components/UserUpdateForm"
import Navbar from "./components/Navbar"

import '../src/style.css';

const App: FC = () => {
    const {store} = useContext(Context);
    useEffect(() => {
        if (localStorage.getItem('token')) {
            store.userStore.checkAuth()
        }
    },[store]);

    if (store.userStore.isLoading) {
        return <div>Загрузка...</div>
    }
    return (
        <>
        {store.userStore.isAuth?<Navbar />:""}
        <Routes>
            <Route path="/" element={<Navigate to="/dashboard" />}/>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/logout" element={<LoginForm />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<RegistrationForm />} />
            <Route path="/user/update" element={<UserUpdateForm />} />
        </Routes>
        </>
    );
};

export default observer(App);