import React, { FC, useState,useEffect } from 'react';
import { observer } from "mobx-react-lite";
import {ITask} from "../../../model/ITask";
// import { StoreContext } from '../../../context/store-context';
import Task from "./Task";
import TaskService from "../../../service/TaskService";

interface Iprops  {
  id:string
}

const Tasks: FC<{id:string}> = ({id}:Iprops) => {
  const [ tasks,setTasks ] = useState<ITask[]>([])
  // const store = useContext(StoreContext);

  useEffect(() => {
    if(id) TaskService.fetchAll(id).then((res:any) =>setTasks(res.data));
  },[id])

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