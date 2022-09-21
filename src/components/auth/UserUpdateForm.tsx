import React, {FC, useState,useEffect, useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import { observer } from "mobx-react-lite";
import { StoreContext } from '../../context/store-context';

const UserUpdateForm: FC = () => {
  const store = useContext(StoreContext);
  const [error,setError] = useState<boolean>(false)
  const [email,setEmail] = useState<string>(store.userStore.user?.email);
  const [oldPassword,setOldPassword] =useState<string>("");
  const [newPassword,setNewPassword] =useState<string>("");
  const [confirmPassword,setConfirmPassword]= useState<string>("");
  const [name,setName] = useState<string>("");
  const navigate = useNavigate()

  useEffect(() => {
    setEmail(store.userStore.user.email);
  },[store.userStore])

  const handleNameChange = (even:any) => {
    setName(even.target.value);
  };
  const handleOldPasswordChange = (even:any) => {
    setOldPassword(even.target.value);
  };
  const handleNewPasswordChange = (even:any) => {
    setNewPassword(even.target.value);
  };
  const handleConfirmChange = (even:any) => {
    setConfirmPassword(even.target.value);
  };

  const handleClick = (event: any) => {
    event.preventDefault();
    if(!name) {setName(store.userStore.user.name);}
    if(newPassword===confirmPassword) {
      let isUpdated = store.userStore.updateUser(name,email,newPassword,oldPassword)
      isUpdated.then((e:any) => {
        alert(e)
        if(e==='updated successfully') navigate('/user');
      }).catch((e:any) => {
        alert(e)
        setError(e);
      })
  }
}

  return (
    <div className="constainer w-3/4 min-w-3/4 m-auto mt-20">
      {error&&
        <div className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800" role="alert">
        <span className="font-medium">Danger alert!</span> Change a few things up and try submitting again.
      </div>
      }
      <form>
        <div className="relative z-0 mb-6 w-full group justify-end">
            <input type="email" id="disabled-input" aria-label="disabled input" name="floating_email" className="FormInput peer" placeholder=" " required disabled />
            <label htmlFor="floating_email" className="FormLabel">{email}</label>
        </div>
        <div className="relative z-0 mb-6 w-full group">
            <input type="text" name="floating_password" id="floating_password" className="FormInput peer" placeholder=" " required onChange={handleNameChange}/>
            <label htmlFor="floating_password" className="FormLabel">User name</label>
        </div>
        <div className="relative z-0 mb-6 w-full group">
            <input type="password" name="repeat_password" id="floating_repeat_password" className="FormInput peer" placeholder=" " onChange={handleOldPasswordChange} required />
            <label htmlFor="floating_repeat_password" className="FormLabel">Old Password</label>
        </div>
        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="relative z-0 mb-6 w-full group">
              <input type="password" name="floating_first_name" id="floating_first_name" className="FormInput peer" placeholder=" " onChange={handleNewPasswordChange} required />
              <label htmlFor="floating_first_name" className="FormLabel">New Password</label>
          </div>
          <div className="relative z-0 mb-6 w-full group">
              <input type="password" name="floating_last_name" id="floating_last_name" className="FormInput peer" placeholder=" " onChange={handleConfirmChange} required />
              <label htmlFor="floating_last_name" className="FormLabel">Confirm New Password</label>
          </div>
        </div>
        <div className="relative group justify-end text-right">
          <button className="CustomButton Blue" 
          onClick={handleClick}>Submit</button>
        </div>
      </form>
    </div>
  )
}

export default observer(UserUpdateForm);