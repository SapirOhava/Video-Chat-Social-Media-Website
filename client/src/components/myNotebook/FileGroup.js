import { faFile } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";
import { FaRegTrashAlt } from "react-icons/fa";
import { storage,database} from "../../firebase";

import React from "react";



export default function FileGroup({ file,path ,index, group, AuthUserId}) {
  function DeleteFile(){
    // Create a reference to the file to delete
    if (path==='Root'){
      path='';
    }
  const desertRef = storage.ref().child(`files/${file.userId}/${path}/${file.name}`);

    // Delete the file
  desertRef.delete().then(() => {
    console.log("the file delete from the store");
  database.files.doc(file.id).delete().then(()=>{
    console.log("the file delete from data bass");
  }).catch(()=>{
    console.log("the file is not delete from data")
  })
  }).catch((error) => {
  console.log(error,"the file is not delete from storeg")
  });
  }


  return (
    <>
    {group.owner === AuthUserId  && (
      <>
     <ContextMenuTrigger id={index}>
     <a
      href={file.url}
      target="_blank"
      className="btn btn-outline-dark text-truncate w-100"
    >
      <FontAwesomeIcon icon={faFile} className="mr-2" />
      {file.name}
    </a>
      </ContextMenuTrigger>

    
   
    <ContextMenu id={index} className="adva">
        <MenuItem  className="adva1" onClick={DeleteFile}>
          <div>
           <FaRegTrashAlt/>
          . delete
          </div>
        </MenuItem>
      </ContextMenu>
      </>
   )}
    {group.owner !== AuthUserId  && (
      <>
       <a
      href={file.url}
      target="_blank"
      className="btn btn-outline-dark text-truncate w-100"
    >
      <FontAwesomeIcon icon={faFile} className="mr-2" />
      {file.name}
    </a>

      </>
    )}
    </>
  )
}