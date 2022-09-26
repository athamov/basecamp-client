import React, { FC, useState } from 'react';
import { useNavigate,useParams } from 'react-router-dom'
import { observer } from "mobx-react-lite";
// import { StoreContext } from '../../../context/store-context';
import TaskService from '../../../service/TaskService';

const TaskAdd: FC = () => {
  const [error,setError] = useState<boolean>(false)
  const [name,setName] = useState<string>("");
  const { id } = useParams<string>();

  // const store = useContext(StoreContext);
  const navigate = useNavigate()

  const handleNameChange = (even:any) => {
    setName(even.target.value);
  };

  const handleClick = (event:any) => {
    event.preventDefault();
    if(id){
    let created = TaskService.create(id,name)
    created.then((e:any) => {
      alert(e)
      navigate(`/user/${id}`);
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
        <span className="font-medium">Danger alert!</span> {error}
      </div>
      }
      <form>
        <div className="relative z-0 mb-6 w-full group">
            <input type="text" name="Task name" id="task_name" className="FormInput peer" placeholder=" " required onChange={handleNameChange}/>
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

export default observer(TaskAdd);