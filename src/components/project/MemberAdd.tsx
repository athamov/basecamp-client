import React, {FC, useState } from 'react';
import { useNavigate,useParams } from 'react-router-dom'
import { observer } from "mobx-react-lite";
// import { StoreContext } from '../../context/store-context';
import MemberService from '../../service/MemberService';
import { role,request } from "../../model/IMember";

const MemberAdd: FC = () => {
  // const store = useContext(StoreContext);
  const [error,setError] = useState<boolean>(false)
  const [email,setEmail] = useState<string>("");
  const [admin,setAdmin] = useState<boolean>(false);
  const [request,setRequest] = useState<request>({Read:false,Write:false,Update:false,Delete:false})
  const { id } = useParams<string>();

  const navigate = useNavigate()

  const handleReadChange = (event:any) => {
    setRequest(prev=>{
      prev.Read=!prev.Read
      return prev
    })
  }

  const handleWriteChange = (event:any) => {
    setRequest(prev=>{
      prev.Write=!prev.Write
      return prev
    })
  }
  const handleUpdateChange = (event:any) => {
    setRequest(prev=>{
      prev.Update=!prev.Update
      return prev
    })
  }
  const handleDeleteChange = (event:any) => {
    setRequest(prev=>{
      prev.Delete=!prev.Delete
      return prev
    })
  }

  const handleEmailChange = (event:any) => {
    setEmail(event.target.value);
  };
  const handleAdmin = (event:any) => {
    setAdmin(!admin);
  }

  function isValidEmail(email:string) {
    return /\S+@\S+\.\S+/.test(email);
  }

  const handleClick = (event:any) => {
    event.preventDefault();
    if(id&&isValidEmail(email)){
    let memberRole = admin?role.admin:role.user;
    let created = MemberService.createMember(id,email,memberRole,request)
    created.then((e:any) => {
      alert(e)
      navigate(`/user/${id}`);
    }).catch((e:any) => {
      alert(e)
      setError(e);
    })
  } 
  else alert('input is not email')
  
  };

  return (
    <div className="constainer w-3/4 min-w-3/4 m-auto mt-20">
      {error&&
        <div className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800" role="alert">
        <span className="font-medium">Danger alert!</span> {error}
      </div>
      }
      <form className="flex flex-row">
        <div className="basis-2/3">
          <div className="relative z-0 my-6 mr-3 w-full group">
              <input type="email" name="Task name" id="task_name" className="FormInput peer" placeholder=" " required onChange={handleEmailChange}/>
              <label htmlFor="task name" className="FormLabel">Member email</label>
          </div>
          <div className="flex place-content-end mt-28">
            <div>
              <label htmlFor="purple-toggle" className="inline-flex justify-end relative items-center mr-5 cursor-pointer">
                <input type="checkbox" value="" id="purple-toggle" className="sr-only peer" onChange={handleAdmin}/>
                <div className="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-800 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-purple-600"></div>
                <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">Admin</span>
              </label>
            </div>
            <div className="relative group place-content-end text-right">
            <button className="CustomButton Blue" 
            onClick={handleClick}>Submit</button>
          </div>
          </div>
        </div>
        <div className="basis-1/3 ml-5">
          <h3 className="mb-4 font-semibold text-gray-900 dark:text-white">Requests</h3>
          <ul className="w-48 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
            <li className="w-full rounded-t-lg border-b border-gray-200 dark:border-gray-600">
                <div className="flex items-center pl-3">
                    <input id="read-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" onChange={handleReadChange}/>
                    <label htmlFor="read-checkbox" className="py-3 ml-2 w-full text-sm font-medium text-gray-900 dark:text-gray-300">Read</label>
                </div>
            </li>
            <li className="w-full rounded-t-lg border-b border-gray-200 dark:border-gray-600">
                <div className="flex items-center pl-3">
                    <input id="write-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" onChange={handleWriteChange}/>
                    <label htmlFor="write-checkbox" className="py-3 ml-2 w-full text-sm font-medium text-gray-900 dark:text-gray-300">Write</label>
                </div>
            </li>
            <li className="w-full rounded-t-lg border-b border-gray-200 dark:border-gray-600">
                <div className="flex items-center pl-3">
                    <input id="update-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" onChange={handleUpdateChange}/>
                    <label htmlFor="update-checkbox" className="py-3 ml-2 w-full text-sm font-medium text-gray-900 dark:text-gray-300">Update</label>
                </div>
            </li>
            <li className="w-full rounded-t-lg border-b border-gray-200 dark:border-gray-600">
                <div className="flex items-center pl-3">
                    <input id="delete-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" onChange={handleDeleteChange}/>
                    <label htmlFor="delete-checkbox" className="py-3 ml-2 w-full text-sm font-medium text-gray-900 dark:text-gray-300">Delete</label>
                </div>
            </li>
          </ul>
        </div>
      </form>
    </div>
  )
}

export default observer(MemberAdd);