import React, {FC, useState,useEffect, useContext} from 'react';
import {useNavigate} from 'react-router-dom'
import { observer } from "mobx-react-lite";
import { StoreContext } from '../context/store-context';

import {IUser} from "../model/IUser";

const ProjectAdd: FC = () => {
  const store = useContext(StoreContext);
  const [error,setError] = useState<boolean>(false)
  const [name,setName] = useState<string>("");
  const [description,settDescription] = useState<string>("")
  const [ user,setUser ] = useState<IUser>()

  const navigate = useNavigate()

  const handleNameChange = (even:any) => {
    setName(even.target.value);
  };
  const handleDesciptionChange = (even:any) => {
    settDescription(even.target.value);
  };

  useEffect(() => {
    setUser(store.userStore.user);
    // console.log(store.userStore)
  },[])

  const handleClick = (event:any) => {
    event.preventDefault();
    let created = store.ProjectStore.createProject(name,description)
    created.then((e) => {
      alert(e)
      if(e==='created successfully') navigate('/user');
    }).catch((e) => {
      alert(e)
      setError(e);
    })
  }

  return (
    <div className="constainer w-3/4 min-w-3/4 m-auto mt-20">
      {/* <input type="text" id="disabled-input" aria-label="disabled input" className="mb-6 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" value="Disabled input" disabled>
        gradient bla
      </input> */}
      {error&&
        <div className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800" role="alert">
        <span className="font-medium">Danger alert!</span> {error}
      </div>
      }
      <form>
        <div className="relative z-0 mb-6 w-full group">
            <input type="email" id="disabled-input" aria-label="disabled input" name="floating_email" className="FormInput peer" placeholder=" " required disabled />
            <label htmlFor="floating_email" className="FormLabel">{user?.email}</label>
        </div>
        <div className="relative z-0 mb-6 w-full group">
            <input type="text" name="floating_password" id="floating_password" className="FormInput peer" placeholder=" " required onChange={handleNameChange}/>
            <label htmlFor="floating_password" className="FormLabel">Project name</label>
        </div>
        <div className="relative z-0 mb-6 w-full group">
            <input type="text" name="repeat_password" id="floating_repeat_password" className="FormInput peer" placeholder=" " onChange={handleDesciptionChange} required />
            <label htmlFor="floating_repeat_password" className="FormLabel">Project Description</label>
        </div>
        <div className="relative group justify-end text-right">
          <button className="CustomButton Blue" 
          onClick={handleClick}>Submit</button>
        </div>
      </form>
    </div>
  )
}

export default observer(ProjectAdd);