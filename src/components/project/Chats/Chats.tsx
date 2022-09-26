import React, {FC, useState,useEffect} from 'react';
import { useParams } from 'react-router-dom'
import { observer } from "mobx-react-lite";
import {IChat} from "../../../model/IChat";
// import { StoreContext } from '../../../context/store-context';
import Chat  from './Chat'
import ChatService from '../../../service/ChatService';

const Chats: FC = () => {
  const [ chats,setChats ] = useState<IChat[]>([])
  const [ name,setName ] = useState<string>("")
  const [ChatCollapse,setChatCollapse] = useState<boolean>(false);
  // const store = useContext(StoreContext);
  const { id } = useParams()

  useEffect(() => {
    if(id) getChat(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[id]);

  const handleClick = (event:any) => {
    event.preventDefault();
    if(id){
      ChatService.create(id,name).then(() => {
        getChat(id);
      })
    }
  }

  const getChat = (id:string) => {
    ChatService.fetchAll(id).then((res:any) => {
      setChats(res.data);
    })
  }

  const handleChatChange = (even:any) => {
    setName(even.target.value);
  };

  const toggleMainCollapse = () => {
    setChatCollapse(!ChatCollapse)
  }

  return (
    <section className="relative ">
      <div className="fixed bottom-10 right-10 rounded-xl transition ease-in-out delay-150 z-20 bg-red-900 w-60 max-h-96 overflow-auto bg-scroll shadow-inner" id="accordion-collapse" data-accordion="collapse">
      <h2 id="accordion-collapse-heading-1" className=" transition ease-in-out delay-150 ">
        <button type="button" className="flex items-center justify-between w-full p-2 font-medium text-left text-gray-400 border border-b-0 border-gray-300 rounded-t-xl focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-800 dark:border-gray-800 dark:text-gray-300 hover:bg-gray-400 dark:hover:bg-gray-900" data-accordion-target="#accordion-collapse-body-1" aria-expanded="true" aria-controls="accordion-collapse-body-1"  onClick={toggleMainCollapse}>
          <div className="text-center">Chats </div>
          <span className={ChatCollapse?"material-symbols-outlined w-6 h-6 shrink-0 rotate-180":"material-symbols-outlined w-6 h-6 shrink-0"}>
          expand_less
          </span>
        </button>
      </h2>
      <div id="accordion-collapse-body-1" className={ChatCollapse?" transition ease-in-out delay-150 ":" transition ease-in-out delay-150  hidden"} aria-labelledby="accordion-collapse-heading-1"  >
      <form>   
        <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300">Search</label>
        <div className="relative">
            <input type="text" id="default-search" value={name} className="block p-2 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="add topic" required onChange={handleChatChange}/>
            <button type="button" className="text-white absolute right-2.5 bottom-1 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-1.5 py-1.5 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"  onClick={handleClick}>add topic</button>
        </div>
      </form>
      {chats && chats.map(chat =><div key={chat._id}>
        <Chat chat_id={chat._id}/>
      </div>)}
      </div>
      </div>
    </section>
  )
}

export default observer(Chats);