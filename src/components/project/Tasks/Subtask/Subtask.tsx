import React, { FC, useState,useEffect } from 'react';
import { useNavigate,useParams } from 'react-router-dom'
import { observer } from "mobx-react-lite";
import { ISubtask } from "../../../../model/ISubtask"
// import { StoreContext } from '../../../../context/store-context';
import SubtaskService from "../../../../service/SubtaskService";

export const defaultSubtask:ISubtask = {
  subtask_name:'',
  Task:'',
  is_done:false,
  _id:''
}

const Subtask: FC<{Subtask:ISubtask}> = ({Subtask}) => {
  const [ subtask,setSubtask ] = useState<string>(defaultSubtask.subtask_name);
  const [ checked, setChecked] = useState<boolean>(defaultSubtask.is_done)
  // const store = useContext(StoreContext);
  const {id} = useParams();
  const navigate = useNavigate()

  useEffect(() =>{
      setChecked(Subtask.is_done)
      setSubtask(Subtask.subtask_name)
  },[Subtask])

  const toggleCheckbox = () => {
    if(id) SubtaskService.toggleIsDone(id,Subtask._id).then(() => {
      window.location.reload();
    });
  }

  const handleUpdate = () => {
    navigate(`subtask/${Subtask._id}`);
  }

  const handleDelete = () => {
    if(id) SubtaskService.delete(id,Subtask._id).then((data:any) => {
      console.log(data);
      window.location.reload();
    });
  }
  return (
    <div className="flex flex-row mx-5">
      <div className="flex items-center pl-3 mr-3 rounded text-center border border-gray-200 dark:border-gray-700 w-full">
        <input id="bordered-checkbox-1" type="checkbox" checked={checked} name="bordered-checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onChange={toggleCheckbox} />
        <label htmlFor="bordered-checkbox-1" className="py-3 ml-1 w-full text-sm font-medium text-gray-900 dark:text-gray-300">{subtask}</label>
      </div>
      <div className="flex flex-row">
      <button type="button" className="focus:outline-none flex mr-5 text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-3 py-1.5 my-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900" onClick={handleUpdate}>
        <span className="material-symbols-outlined">
        edit
        </span>
        <span className="m-1">Update</span></button>
      <button type="button" className="focus:outline-none text-white flex bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-6 py-2 my-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900" onClick={handleDelete}>
        <span className="material-symbols-outlined">
        folder_delete
        </span>
        <span className="m-1">Delete</span> </button>
      </div>
    </div>
  )
}

export default observer(Subtask);