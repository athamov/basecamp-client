import {FC, useContext, useState} from 'react';
import { useNavigate,Link } from "react-router-dom";
import {observer} from "mobx-react-lite";

import basecamp from '../basecamp.logo.svg'
import { StoreContext } from '../context/store-context';

const Navbar: FC = () => {
  const [show,setShow] = useState<string>("hidden")
  const store = useContext(StoreContext);
  const navigate = useNavigate();
    
  const handleClick = (event:any) => {
    event.preventDefault();
    let isLogout = store.logout()
    isLogout.then((e:any) => {
      console.log(e.data)
      navigate('/login');
    }).catch((e:any) => {
      console.log(e.data)
    })
  }

  const toggleNav = () => {
    console.log("ss")
    if(show==="hidden") setShow("visible");
    else setShow("hidden");
  }
  
  return (
    <nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-900">
      <div className="container flex flex-wrap justify-between items-center mx-auto">
        <Link               
          to='/user'
          className="flex items-center"
        >
          <img src={basecamp} className="mr-3 h-6 sm:h-9" alt="Flowbite Logo" />
          <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Flowbite</span>
        </Link>
      <button data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false" onClick={toggleNav}>
      <span className="sr-only">Open main menu</span>
      <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
    </button>
    <div className={"w-full md:block md:w-auto "+show} id="navbar-default">
      <ul className="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium">
        <li>
          <Link       
          to='addProject'
          className="block py-2 pr-4 pl-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white" aria-current="page">Create Project</Link>
        </li>
        <li>
          <Link           
            to="/user/update" 
            className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
          >Update User</Link>
        </li>
        <li>
          <button          
          onClick={handleClick} 
          className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
          >Log out</button>
        </li>
      </ul>
    </div>
  </div>
</nav>

  )
}

export default observer(Navbar);

