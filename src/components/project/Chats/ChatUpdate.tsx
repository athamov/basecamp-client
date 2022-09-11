import React, {FC, useState,useEffect, useContext} from 'react';
import { useNavigate,useParams } from 'react-router-dom'
import { observer } from "mobx-react-lite";
import { StoreContext } from '../../../context/store-context';

const ChatUpdate: FC = () => {
  const [ name,setName] = useState<string>("");
  const { id, chat_id } = useParams<string>();
  const store = useContext(StoreContext);
  const navigate = useNavigate()

  useEffect(() => {
    if(id && chat_id) {
      store.ChatStore.get(id,chat_id).then(chat =>setName(chat.chat.chat_name))
    }
  },[id,chat_id,store.ChatStore])

  const handleNameChange = (even:any) => {
    setName(even.target.value);
  };

  const handleClick = (event:any) => {
    event.preventDefault();
    if(id && chat_id) {
    let updated = store.ChatStore.update(id,chat_id,name);
    updated.then((e) => {
      alert(e)
      if(e==='updated succesfully') navigate(`/user/${id}`);
    }).catch((e) => {
      alert(e)
    })
  }}
  const handleDelete = () => {
    if(id && chat_id) {store.ChatStore.delete(id,chat_id).then((data) => {
      alert(data);
      navigate(`/user/${id}`);
    });
  }
  }

  return (
    <div className="constainer w-3/4 min-w-3/4 m-auto mt-20">
      <form>
        <div className="relative z-0 mb-6 w-full group">
            <input type="text" name="Chat name" id="task_name" value={name && name} className="FormInput peer" placeholder='' required onChange={handleNameChange}/>
            <label htmlFor="chat name" className="FormLabel">Chat name</label>
        </div>
        <div className="relative group justify-end text-right">
          <button className="CustomButton Blue" 
          onClick={handleClick}>Submit</button>
        </div>
        <button type="button" className="focus:outline-none text-white flex bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-7 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900" onClick={handleDelete}>
        <span className="material-symbols-outlined">
        folder_delete
        </span>
        <span className="m-1">Delete</span> 
      </button>
      </form>
    </div>
  )
}

export default observer(ChatUpdate);