import React, { FC, useState,useEffect } from 'react';
import { useNavigate,useParams } from 'react-router-dom'
import { observer } from "mobx-react-lite";
// import { StoreContext } from '../../../context/store-context';
import ChatService from '../../../service/ChatService';

const ChatUpdate: FC = () => {
  const [ name,setName] = useState<string>("");
  const { id, chat_id } = useParams<string>();
  // const store = useContext(StoreContext);
  const navigate = useNavigate()

  useEffect(() => {
    if(id && chat_id) {
      ChatService.get(id,chat_id).then((res:any) =>setName(res.data.chat.chat_name))
    }
  },[id,chat_id])

  const handleNameChange = (even:any) => {
    setName(even.target.value);
  };

  const handleClick = (event:any) => {
    event.preventDefault();
    if(id && chat_id) {
    let updated = ChatService.update(id,chat_id,name);
    updated.then((e:any) => {
      console.log(e)
      navigate(`/user/${id}`);
    }).catch((e:any) => {
      console.log(e)
    })
  }}

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
      </form>
    </div>
  )
}

export default observer(ChatUpdate);