import React, { FC,useState,useEffect, useContext} from 'react'
import { StoreContext } from '../../context/store-context';
import { Link } from 'react-router-dom';
import {observer} from 'mobx-react-lite'
import { IProject } from '../../model/IProject'

const AllProject:FC = () => {
  const store = useContext(StoreContext);
  const [AllProjects,setAllProjects] = useState<IProject[]>();
  useEffect(() => {
    const res= store.ProjectStore.getAllProjects()
    res.then( (data:IProject[]) => setAllProjects(data) )
    .catch((error)=>{
      alert(error.message)
    })
  },[store.ProjectStore]);
  return (
    <div className="m-4 ">
      <h1>All projects you access to</h1>
      <div className="flex flex-row">
      {AllProjects && AllProjects.map((project)=>
        <div className="m-5 p-6 w-96 h-48 bg-white rounded-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700 overflow-auto bg-scroll shadow-inner" key={project._id}>
        <Link to={project._id}>
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{project.project_name}</h5>
        </Link>
        <p className="mb-3 break-words font-normal text-gray-700 dark:text-gray-400 overflow-auto bg-scroll shadow-inner">{project.description}</p>
        <Link to={project._id} className="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            See more
            <svg aria-hidden="true" className="ml-2 -mr-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
        </Link>
    </div>
      )}
      </div>
    </div>
  )
}

export default observer(AllProject);