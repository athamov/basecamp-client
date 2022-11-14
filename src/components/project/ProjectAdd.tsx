import React, {FC, useState,useEffect, useContext} from 'react';
import {useNavigate} from 'react-router-dom'
import { observer } from "mobx-react-lite";
import { StoreContext } from '../../context/store-context';
import ProjectService from '../../service/ProjectService';

import {IUser} from "../../model/IUser";

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
    setUser(store.user);
  },[store])

  const handleClick = (event:any) => {
    event.preventDefault();
    let created = ProjectService.createProject(name,description)
    created.then((e:any) => {
      console.log(e)
      navigate('/user');
    }).catch((e:any) => {
      console.log(e)
      setError(e);
    })
  }

  return (
    <div className="constainer w-3/4 min-w-3/4 m-auto mt-20">
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