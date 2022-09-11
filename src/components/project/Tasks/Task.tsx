import React, {FC, useState,useEffect, useContext} from 'react';
import { useNavigate,useParams } from 'react-router-dom'
import { observer } from "mobx-react-lite";
import {ITask} from "../../../model/ITask"
import { StoreContext } from '../../../context/store-context';
import Subtasks from './Subtask/Subtasks'

export const defaultTask:ITask = {
  task_name:'',
  Project:'',
  is_done:false,
  _id:''
}

const Task: FC<{Task:ITask}> = ({Task}) => {
  const [ task,setTask ] = useState<string>(defaultTask.task_name);
  const [isActivated,setIsActivated] = useState<boolean>(true);
  const [ checked, setChecked] = useState<boolean>(defaultTask.is_done)
  const store = useContext(StoreContext);
  const {id} = useParams();
  const navigate = useNavigate()

  useEffect(() =>{
      setChecked(Task.is_done)
      setTask(Task.task_name)
  },[Task])

  const toggleCollapse = () => {
    setIsActivated(!isActivated)
  }

  const toggleCheckbox = () => {
    if(id) store.TaskStore.toggleIsDone(id,Task._id).then(() => {
      window.location.reload();
    });
  }

  const handleUpdate = () => {
    navigate(`task/${Task._id}`);
  }

  const handleDelete = () => {
    if(id) store.TaskStore.delete(id,Task._id).then((data) => {
      alert(data);
      window.location.reload();
    });
  }
  return (
    <div id="accordion-collapse" data-accordion="collapse">
      <h2 id="accordion-collapse-heading-1" className="flex flex-row items-center justify-between w-full p-5 font-medium text-left text-gray-500 border border-b-0 border-gray-200 rounded-t-xl focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800">
      <div className="flex items-center pl-4 mr-4 rounded text-center border border-gray-200 dark:border-gray-700 w-full">
        <input id="bordered-checkbox-1" type="checkbox" checked={checked} name="bordered-checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onChange={toggleCheckbox} />
        <label htmlFor="bordered-checkbox-1" className="py-4 ml-2 w-full text-sm font-medium text-gray-900 dark:text-gray-300">{task}</label>
      </div>
      <div className="flex flex-row">
      <button type="button" className="focus:outline-none flex mr-5 text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900" onClick={handleUpdate}>
        <span className="material-symbols-outlined">
        edit
        </span>
        <span className="m-1">Update</span></button>
      <button type="button" className="focus:outline-none text-white flex bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-7 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900" onClick={handleDelete}>
        <span className="material-symbols-outlined">
        folder_delete
        </span>
        <span className="m-1">Delete</span> 
      </button>
      </div>
      <button type="button" className="flex flex-row"  data-accordion-target="#accordion-collapse-body-1" aria-expanded="true" aria-controls="accordion-collapse-body-1" onClick={toggleCollapse}>
        <h3>{isActivated?"show":"hide"}</h3>
        <span className={isActivated?"material-symbols-outlined w-6 h-6 shrink-0 rotate-180":"material-symbols-outlined w-6 h-6 shrink-0"}>
          expand_less
          </span>
      </button>
    </h2>
    <div id="accordion-collapse-body-1" className={isActivated?"hidden":""} aria-labelledby="accordion-collapse-heading-1">
      <Subtasks task_id={Task._id} />
    </div>
    </div>
  )
}

export default observer(Task);