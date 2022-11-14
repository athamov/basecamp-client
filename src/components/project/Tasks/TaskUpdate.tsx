import React, { FC, useState,useEffect } from 'react';
import { useNavigate,useParams } from 'react-router-dom'
import { observer } from "mobx-react-lite";
// import { StoreContext } from '../../../context/store-context';
import TaskService from "../../../service/TaskService";

const TaskUpdate: FC = () => {
  const [name,setName] = useState<string>("");
  const { id,task_id } = useParams<string>();
  // const store = useContext(StoreContext);
  const navigate = useNavigate()

  useEffect(() => {
    if(id && task_id) {
      TaskService.get(id,task_id).then((task:any) =>setName(task.data.task_name))
    }
  },[id,task_id])


  const handleNameChange = (even:any) => {
    setName(even.target.value);
  };

  const handleClick = (event:any) => {
    event.preventDefault();
    if(id && task_id) {
    let updated = TaskService.update(id,task_id,name);
    updated.then((e:any) => {
      console.log(e)
      if(e.data==='updated succesfully') navigate(`/user/${id}`);
    }).catch((e:any) => {
      console.log(e)
    })
  }
  }

  return (
    <div className="constainer w-3/4 min-w-3/4 m-auto mt-20">
      <form>
        <div className="relative z-0 mb-6 w-full group">
            <input type="text" name="Task name" id="task_name" value={name && name} className="FormInput peer" placeholder='' required onChange={handleNameChange}/>
            <label htmlFor="task name" className="FormLabel">Task name</label>
        </div>
        <div className="relative group justify-end text-right">
          <button className="CustomButton Blue" 
          onClick={handleClick}>Submit</button>
        </div>
      </form>
    </div>
  )
}

export default observer(TaskUpdate);