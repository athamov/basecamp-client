import React, { FC, useState,useEffect } from 'react';
import { useNavigate,useParams } from 'react-router-dom'
import { observer } from "mobx-react-lite";
// import { StoreContext } from '../../../../context/store-context';
import SubtaskService from "../../../../service/SubtaskService";

const SubtaskUpdate: FC = () => {
  const [name,setName] = useState<string>("");
  const { id,subtask_id } = useParams<string>();
  // const store = useContext(StoreContext);
  const navigate = useNavigate()

  useEffect(() => {
    if(id && subtask_id) {
      SubtaskService.get(id,subtask_id).then((data:any) =>setName(data.subtask.subtask_name))
    }
  },[id,subtask_id])

  const handleNameChange = (even:any) => {
    setName(even.target.value);
  };

  const handleClick = (event:any) => {
    event.preventDefault();
    if(id && subtask_id) {
    let updated = SubtaskService.update(id,subtask_id,name);
    updated.then((e:any) => {
      alert(e)
      navigate(`/user/${id}`);
    }).catch((e:any) => {
      alert(e)
    })
  }
  }

  return (
    <div className="constainer w-3/4 min-w-3/4 m-auto mt-20">
      <form>
        <div className="relative z-0 mb-6 w-full group">
            <input type="text" name="subtask name" id="task_name" value={name && name} className="FormInput peer" placeholder='' required onChange={handleNameChange}/>
            <label htmlFor="subtask name" className="FormLabel">subtask name</label>
        </div>
        <div className="relative group justify-end text-right">
          <button className="CustomButton Blue" 
          onClick={handleClick}>Submit</button>
        </div>
      </form>
    </div>
  )
}

export default observer(SubtaskUpdate);