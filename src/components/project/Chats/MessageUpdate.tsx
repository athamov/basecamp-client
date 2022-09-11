import React, {FC, useState,useEffect, useContext} from 'react';
import { useNavigate,useParams } from 'react-router-dom'
import { observer } from "mobx-react-lite";
import { StoreContext } from '../../../context/store-context';

const ChatUpdate: FC = () => {
  const [message,setMessage] = useState<string>("");
  const { id, message_id } = useParams<string>();
  const store = useContext(StoreContext);
  const navigate = useNavigate()

  useEffect(() => {
    if(id && message_id) {
      store.MessageStore.get(id,message_id).then(message =>setMessage(message.message))
    }
  },[id,message_id,store.MessageStore])


  const handleMessageChange = (even:any) => {
    setMessage(even.target.value);
  };

  const handleClick = (event:any) => {
    event.preventDefault();
    if(id && message_id) {
    let updated = store.MessageStore.update(id,message_id,message);
    updated.then((e) => {
      alert(e)
      if(e==='updated succesfully') navigate(`/user/${id}`);
    }).catch((e) => {
      alert(e)
    })
  }
  }

  return (
    <div className="constainer w-3/4 min-w-3/4 m-auto mt-20">
      <form>
        <div className="relative z-0 mb-6 w-full group">
            <input type="text" name="message name" id="task_name" value={message && message} className="FormInput peer" placeholder='' required onChange={handleMessageChange}/>
            <label htmlFor="message" className="FormLabel">message</label>
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