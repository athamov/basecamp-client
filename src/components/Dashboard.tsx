import React, {FC, useContext, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import { useNavigate,Link,Route } from "react-router-dom";

import Navbar from './Navbar'

import {Context} from "../index";
import {IUser} from "../model/IUser";
import UserService from "../service/UserService";


const Dashboard: FC = () => {
  const {store} = useContext(Context);
  const [users, setUsers] = useState<IUser[]>([]);
  const AuthNavigate = useNavigate()
  useEffect(() => {
    const fetch = async () => {
      let isAuth = await store.userStore.isAuth;
      if (!isAuth) {
        AuthNavigate("/login")
      }
    }
    fetch();
  });

  async function getUsers() {
    try {
        const response = await UserService.fetchUsers();
        setUsers(response.data);
    } catch (e) {   
        console.log(e);
    }
  }
    
  return (
    <div>
      <Link 
        to="/login"
        className="inline-block CustomButton"
        onClick={() => store.userStore.logout()}
        >Выйти
      </Link>
      <div>
          <button onClick={getUsers}>Получить пользователей</button>
      </div>
      {users.map(user =>
          <div key={user.email}>{user.email}</div>
      )}
    </div>
  )
}

export default observer(Dashboard);

{/* <Route path='/topics/:topicId' element={<Navbar />} /> */}


