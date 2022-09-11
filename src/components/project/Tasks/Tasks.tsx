import React, {FC, useState,useEffect, useContext} from 'react';
import { useNavigate } from 'react-router-dom'
import { observer } from "mobx-react-lite";
import {ITask} from "../../../model/ITask";
import { StoreContext } from '../../../context/store-context';
import Task,{ defaultTask } from "./Task";
interface Iprops  {
  id:string
}

const Tasks: FC<{id:string}> = ({id}:Iprops) => {
  const [ tasks,setTasks ] = useState<ITask[]>([])
  const store = useContext(StoreContext);
  const navigate = useNavigate()

  useEffect(() => {
    store.TaskStore.fetchAll(id).then((data) =>setTasks(data));
  },[store.TaskStore,id])

  return (
    <section className="flex flex-col w-3/4 dark:text-red-300">
      <h1 className="text-3xl text-center mt-10">
        <span className="material-symbols-outlined mr-2 ">add_task</span>
        Task 
      </h1>
      {tasks && tasks.map((task) =><div key={task._id}>
        <Task Task={task} />
      </div>)}
    </section>
  )
}

export default observer(Tasks);