import React, {FC, useState,useEffect} from 'react';
import { useParams, Link } from 'react-router-dom'
import { observer } from "mobx-react-lite";
import {IChat} from "../../../model/IChat";
import {IMessage} from "../../../model/IMessage";
// import { StoreContext } from '../../../context/store-context';
import ChatService from '../../../service/ChatService';
import MessageService from '../../../service/MessageService';

interface Iprops  {
  chat_id:string
}


const Chat: FC<{chat_id:string}> = ({chat_id}:Iprops) => {
  const [ chats,setChats ] = useState<IChat>()
  const [ message,setMessage ] = useState<string>("")
  const [ messages,setMessages ] = useState<IMessage[]>()
  const [ChatCollapse,setChatCollapse] = useState<boolean>(false);
  // const store = useContext(StoreContext);
  const {id} = useParams();

  useEffect(() => {
    if(id && chat_id) ChatService.get(id, chat_id).then((res:any) =>{
      setChats(res.data.chat);
      setMessages(res.data.messages);
    })
    .catch((error) =>{console.error(error)});
  },[id, chat_id]);

  const handleClick = (event:any) => {
    event.preventDefault();
    if(id){
      MessageService.create(id, chat_id,message).then((messageRes:any)=>{
        ChatService.get(id, chat_id).then((res:any) =>{
          setChats(res.data.chat);
          setMessages(res.data.messages);
          setMessage("");
        });
      });
    }
  }

  const handleChatChange = (even:any) => {
    if(even.target.value.length < 15) 
    setMessage(even.target.value);
  };

  const toggleMainCollapse = () => {
    setChatCollapse(!ChatCollapse)
  }

  return (
      <div className=" bottom-10 right-10 bg-rose-800 w-56 m-auto" id="accordion-collapse" data-accordion="collapse">
      <h2 id="accordion-collapse-heading-1">
        <button type="button" className="flex items-center cursor-context-menu justify-between w-full p-2 font-medium text-left text-rose-500 border border-b-0 border-rose-200 rounded-t-xl focus:ring-4 focus:ring-rose-200 dark:focus:ring-rose-800 dark:border-rose-700 dark:text-rose-400 hover:bg-rose-300 dark:hover:bg-rose-800" data-accordion-target="#accordion-collapse-body-1" aria-expanded="true" aria-controls="accordion-collapse-body-1"  onClick={toggleMainCollapse}>
          <Link to={"chat/"+chats?._id}><div className="text-center">{ chats && chats?.chat_name } </div></Link> 
          <span className={ChatCollapse?"material-symbols-outlined w-6 h-6 shrink-0 rotate-180":"material-symbols-outlined w-6 h-6 shrink-0"}>
          expand_less
          </span>
        </button>
      </h2>
      <div id="accordion-collapse-body-1" className={ChatCollapse?"border-rose-200":"hidden"} aria-labelledby="accordion-collapse-heading-1"  >
      <div className="bg-red-400 w-full p-2">
        {messages && messages.map(message =>
        <Link to={"message/"+message._id} key={message._id}>
          <div className="text-base max-h-80 max-w-52 overflow-auto bg-scroll shadow-inner border-y-2">
            <p className="text-blue-200">{message.message_owner}</p>
            <p className="max-w-sm text-sm">{message.message}</p>
          </div>
        </Link>

          )}
      </div>
      <form>   
        <label htmlFor="default-search" className="mb-2 text-sm font-medium text-rose-900 sr-only dark:text-rose-300">text</label>
        <div className="relative">
            <input type="text" id="default-search" value={message} className="block py-1.5 pl-0.5 mr-1 w-full text-sm text-rose-900 bg-rose-50 rounded-lg border border-rose-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-rose-700 dark:border-rose-600 dark:placeholder-rose-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="text" required onChange={handleChatChange}/>
            <button type="button" className="text-white absolute right-2.5 bottom-1 bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-1.5 py-1 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"  onClick={handleClick}>send</button>
        </div>
      </form>
      </div>
      </div>
  )
}

export default observer(Chat);