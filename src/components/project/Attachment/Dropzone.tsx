import React, {FC, useState,useEffect, useContext} from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import {useDropzone} from 'react-dropzone'
import Dropzone from "react-dropzone";
import { observer } from "mobx-react-lite";
import {ITask} from "../../../model/ITask";
import { StoreContext } from '../../../context/store-context';
import UploadService from "./services/upload-files.service";

interface Iprops  {
  id:string
}

interface IProgressInfo {
  fileName:string,
  percentage:number
}
interface IFile {
  _id:string;
  name:string;
}

const Tasks: FC<{id:string}> = ({id}:Iprops) => {
  const [ progressInfos,setProgress] = useState<IProgressInfo[]>([])
  const [ selectedFiles,setSelectedFiles] = useState<IFile[]>([])
  const [ message,setMessage] = useState<any>("")
  const [ fileInfos,setFileInfos] = useState<IFile[]>([])
  const [ tasks,setTasks ] = useState<ITask[]>([])
  const store = useContext(StoreContext);
  const navigate = useNavigate()

  useEffect(() => {
    store.TaskStore.fetchAll(id).then((data) =>setTasks(data));
  },[store.TaskStore,id])

  useEffect(()=>{
    if(id) UploadService.getFiles(id).then((response:any) => {
      setFileInfos(response.data);
    });
  },[id])

  const upload = (idx:any, file:any) => {
    let _progressInfos = [...progressInfos];

    UploadService.upload(id,file, (event:any) => {
      _progressInfos[idx].percentage = Math.round(
        (100 * event.loaded) / event.total
      );
      setProgress(
        _progressInfos,
      );
    })
      .then((response:any) => {
        setMessage((prev:any) => {
          let nextMessage = [
            ...prev,
            "Uploaded the file successfully: " + file.name,
          ];
          return {
            nextMessage,
          };
          
        });

        return UploadService.getFiles(id);
      })
      .then((files:any) => {
        setFileInfos(files.data);
        setProgress([])
      })
      .catch(() => {
        _progressInfos[idx].percentage = 0;
        setMessage((prev:any) => {
          let nextMessage = [
            ...prev,
            "Could not upload the file: " + file.name,
          ];
          return {
            nextMessage,
          };
        });
        setProgress( _progressInfos)
      });
  }
 
  const uploadFiles = () => {
    const _selectedFiles = selectedFiles;

    let _progressInfos = [];

    for (let i = 0; i < _selectedFiles.length; i++) {
      _progressInfos.push({ percentage: 0, fileName: _selectedFiles[i].name });
    }

    setProgress(_progressInfos);
    setMessage([]);
    for (let i = 0; i < _selectedFiles.length; i++) {
      upload(i, _selectedFiles[i]);
    }
    setSelectedFiles([])
  }

  const onDrop = (files:any) => {
    if (files.length > 0) {
      setSelectedFiles(files);
    }
  }

  const handleDelete = async (upload_id:string) => {
    let deleteMessage = await UploadService.deleteFile(id,upload_id);
    if(deleteMessage.data === 'deleted successfully') {
      UploadService.getFiles(id).then((response:any) => {
        setFileInfos(response.data);
      });
    }
  }

  return (
    <div className="flex justify-center flex-col items-center w-full mt-5">
      {progressInfos &&
          progressInfos.map((progressInfo, index) => (
            <div className="mb-2 w-3/4 text-center text-lg" key={index}>
              <span >{progressInfo.fileName}</span>
              <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                <div className="bg-blue-600 h-2.5 rounded-full" style={{width: progressInfo.percentage+"%"}}></div>
              </div>
            </div>
          ))}
        <div className="my-3">
          <Dropzone onDrop={onDrop}>
            {({ getRootProps, getInputProps }) => (
              <section>

                <div {...getRootProps({ className: "dropzone" })}>
                  <input {...getInputProps()} />
                  {selectedFiles &&
                  Array.isArray(selectedFiles) &&
                  selectedFiles.length ? (
                    <div className="text-center text-lg">
                      {selectedFiles.length > 3
                        ? `${selectedFiles.length} files`
                        : selectedFiles.map((file) => file.name).join(", ")}
                    </div>
                  ) : (
                    <label htmlFor="dropzone-file" className="flex flex-col justify-center items-center w-full h-64 bg-gray-50 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600" >
                    <div className="flex flex-col justify-center items-center pt-5 pb-6" >
                        <svg aria-hidden="true" className="mb-3 w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">PNG, JPG, PDF or TXT (MAX. 800x400px)</p>
                    </div>
                </label>
                  )}
                </div>
                <aside className="text-center">
                  <button type="button" className="py-2 px-3 flex text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"                     
                  disabled={!selectedFiles}
                  onClick={uploadFiles}>
                    <span className="material-symbols-outlined">
                    file_download
                    </span>
                    <h1 className="mt-0.5">Upload</h1>
                  </button>
                </aside>
              </section>
            )}
          </Dropzone>
        </div>

        {message.length > 0 && (
          <div className="p-4 mb-4 text-sm text-blue-700 bg-blue-100 rounded-lg dark:bg-blue-200 dark:text-blue-800" role="alert">
            <ul >
              {message.map((item:any, i:number) => {
                return <li key={i}>{item}</li>;
              })}
            </ul>
          </div>
        )}

        {fileInfos.length > 0 && (
          <div className="card">
            <div className="card-header">List of Files</div>
            <ul className="list-group list-group-flush">
              {fileInfos &&
                fileInfos.map((file, index) => (
                  <li className="list-group-item" key={index}>
                    <a href={"https://basecamp-server.herokuapp.com/api/project"+id+"/upload/"+file._id}>{file.name}</a>
                    <button type="button" className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2" onClick={()=>handleDelete(file._id)}>Delete</button>
                  </li>
                ))}
            </ul>
          </div>
        )}
</div>
  )
}

export default observer(Tasks);