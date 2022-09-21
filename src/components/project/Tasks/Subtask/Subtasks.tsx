import React, {FC, useState,useEffect, useContext} from 'react';
import { useParams } from 'react-router-dom'
import { observer } from "mobx-react-lite";
import { ISubtask } from "../../../../model/ISubtask";
import { StoreContext } from '../../../../context/store-context';
import Subtask from "./Subtask";
interface Iprops  {
  task_id:string
}



const Subtasks:FC<{task_id:string}> = ({task_id}:Iprops) => {
  const [ subtasks,setSubtasks ] = useState<ISubtask[]>([])
  const [name,setName] = useState<string>("");
  const store = useContext(StoreContext);
  const { id } = useParams();

  useEffect(() => {
    if(id) store.SubtaskStore.fetchAll(id,task_id).then((data:any) =>setSubtasks(data));
  },[store.SubtaskStore,id,task_id])

  const handleNameChange = (even:any) => {
    setName(even.target.value);
  };

  const handleAdd = () => {
    if(id && task_id && name) {
      store.SubtaskStore.add(id,task_id,name).then((e:any) => {})
    }
  }
  return (
    <>
    <form>   
      <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300">Search</label>
      <div className="relative">
        <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
          <span className="material-symbols-outlined w-5 h-5 text-gray-500 dark:text-gray-400">
          post_add
          </span>
        </div>
        <input type="input" id="default-search" value={name} className="block p-4 pl-10 w-full z-10 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="add subtask" required onChange={handleNameChange}/>
        <button type="submit" className="text-white absolute right-2.5 px-4 py-2 bottom-2.5 font-medium rounded-lg text-sm bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800" onClick={handleAdd}>subtask</button>
      </div>
    </form>
      {subtasks && subtasks.map((subtask) =><div key={subtask._id}>
        <Subtask Subtask={subtask} />
      </div>)}
    </>
  )
}

export default observer(Subtasks);