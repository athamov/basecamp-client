import React, { FC,useState,useEffect } from 'react'
// import { StoreContext } from '../../context/store-context';
import { useNavigate,useParams } from 'react-router-dom';
import {observer} from 'mobx-react-lite'
import { IMember,role } from "../../model/IMember";
import MemberService from '../../service/MemberService';

const MemberDefault:IMember = {
  _id: 'default',
  name: '',
  User:'', 
  role:role.user,
  request:{
    Read:false,
    Write:false,
    Update:false,
    Delete:false
}} 

const Member:FC = () => {
  // const store = useContext(StoreContext);
  const [member,setMember] = useState<IMember>(MemberDefault);

  const [error,setError] = useState<boolean>(false);
  const [admin,setAdmin] = useState<boolean>();
  const [ read,setRead ] = useState<boolean>(MemberDefault.request.Read);
  const [ write,setWrite ] = useState<boolean>(MemberDefault.request.Write);
  const [ update,setUpdate ] = useState<boolean>(MemberDefault.request.Update);
  const [ Delete,setDelete ] = useState<boolean>(MemberDefault.request.Delete);
  const { id,member_id } = useParams<string>();

  const navigate = useNavigate()

  useEffect(() => {
    if(id && member_id) {
      MemberService.getMember(id,member_id).then((res:any) =>setMember(res.member))
    }
  },[id,member_id])

  useEffect(() => {
    if(member) {
      setRead(member.request.Read && true)
      setWrite(member.request.Delete && true)
      setUpdate(member.request.Update && true)
      setDelete(member.request.Delete && true)
      setAdmin(member.role===role.admin?true:false)
    }
  },[member])
  useEffect(() =>{

  })

  const handleReadChange = (event:any) => {
    setRead(event.target.checked);
  }

  const handleWriteChange = (event:any) => { 
    setWrite(!write);
  }
  const handleUpdateChange = (event:any) => {
    setUpdate(!update);
  }
  const handleDeleteChange = (event:any) => {
    setDelete(!Delete);
  }

  const handleAdmin = (event:any) => {
    setAdmin(!admin);
  }

  const handleClick = (event:any) => {
    event.preventDefault(); 
    if(id && member_id){
    const request = {Read:read,Write:write,Update:update,Delete:Delete}
    let memberRole = admin?role.admin:role.user;
    let created = MemberService.updateMember(id,member_id,memberRole,request)
    created.then((e:any) => {
      console.log(e)
      navigate(`/user/${id}`);
    }).catch((e:any) => {
      console.log(e)
      setError(e);
    })
  } 
  else alert('input is not email')
  };

  const handleDelete = (event:any) => {
    event.preventDefault();
    if(id && member_id) {
      let deleted = MemberService.deleteMember(id,member_id)
      deleted.then((e:any) => {
        console.log(e)
        navigate(`/user/${id}`);
      }).catch((e:any) => {
        console.log(e)
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
      <form className="flex flex-row">
        <div className="basis-2/3">
          <div className="relative z-0 my-6 mr-3 w-full group">
              <input type="text" id="disabled-input" aria-label="" className="FormInput peer" value={member?.name} disabled />
          </div>
          <div className="flex place-content-end mt-28">
            <div>
              <label htmlFor="purple-toggle" className="inline-flex justify-end relative items-center mr-5 cursor-pointer">
                <input type="checkbox" name="adminCheckbox" checked={admin} defaultChecked={admin && true} id="purple-toggle" className="sr-only peer" onChange={handleAdmin}/>
                <div className="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-800 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-purple-600"></div>
                <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">Admin</span>
              </label>
            </div>
            <div className="relative group place-content-end text-right">
            <button className="CustomButton Blue" 
            onClick={handleClick}>Submit</button>
          </div>
          </div>
        </div>
        <div className="basis-1/3 ml-5">
          <h3 className="mb-4 font-semibold text-gray-900 dark:text-white">Requests</h3>
          <ul className="w-48 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
            <li className="w-full rounded-t-lg border-b border-gray-200 dark:border-gray-600">
                <div className="flex items-center pl-3">
                    <input id="read-checkbox" type="checkbox" checked={read}  className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" onChange={handleReadChange}/>
                    <label htmlFor="read-checkbox" className="py-3 ml-2 w-full text-sm font-medium text-gray-900 dark:text-gray-300">Read</label>
                </div>
            </li>
            <li className="w-full rounded-t-lg border-b border-gray-200 dark:border-gray-600">
                <div className="flex items-center pl-3">
                  <input id="write-checkbox" type="checkbox" checked={write}  className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" onChange={handleWriteChange}/>
                  <label htmlFor="write-checkbox" className="py-3 ml-2 w-full text-sm font-medium text-gray-900 dark:text-gray-300">Write</label>
                </div>
            </li>
            <li className="w-full rounded-t-lg border-b border-gray-200 dark:border-gray-600">
                <div className="flex items-center pl-3">
                    <input id="update-checkbox" type="checkbox" value="" checked={update} className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" onChange={handleUpdateChange}/>
                    <label htmlFor="update-checkbox" className="py-3 ml-2 w-full text-sm font-medium text-gray-900 dark:text-gray-300">Update</label>
                </div>
            </li>
            <li className="w-full rounded-t-lg border-b border-gray-200 dark:border-gray-600">
                <div className="flex items-center pl-3">
                    <input id="delete-checkbox" type="checkbox" value="" checked={Delete} className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" onChange={handleDeleteChange}/>
                    <label htmlFor="delete-checkbox" className="py-3 ml-2 w-full text-sm font-medium text-gray-900 dark:text-gray-300">Delete</label>
                </div>
            </li>
          </ul>
        </div>
      </form>
      <div className="relative h-32 w-full">
      <button type="button" className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900 absolute bottom-0 right-0" onClick={handleDelete}>Delete member</button>
      </div>
    </div>
  )
}

export default observer(Member);