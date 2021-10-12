import React from 'react';
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faFolder } from '@fortawesome/free-solid-svg-icons';
import {Link} from 'react-router-dom';
import {Button} from 'react-bootstrap';

import { faFile } from "@fortawesome/free-solid-svg-icons";
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";
import { FaRegTrashAlt } from "react-icons/fa";
import { storage,database} from "../../firebase";
import {useParams,useLocation} from 'react-router-dom';
import { useFolder } from '../../hooks/useFolder';



function DeleteFolder(folderId,profile,path){
    
    
    if (folderId == null)
        return;
    

    database.files.
    where("folderId","==",folderId)
    .where("userId","==",profile.user._id)
    .get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            const file = database.formatDoc(doc)
              
            const desertRef = storage.ref().child(`files/${file.userId}/${path}/${file.name}`);
            console.log("deleting files: " + `files/${file.userId}/${path}/${file.name}`)

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
        });
    })
  
    database.folders.
    where("parentId","==",folderId)
    .where("userId","==",profile.user._id)
    .get()
    .then((querySnapshot) => {
         querySnapshot.forEach((doc) => {
            console.log("call other folder")
             const folder = database.formatDoc(doc)
             DeleteFolder(folder.id, profile,`${path}/${folder.name}`)

         })
})
    console.log("delete folder")

    database.folders.doc(folderId).delete().then(()=>{
                console.log("the file delete from data bass");
    }).catch(()=>{
                console.log("the file is not delete from data")
    })
    
}






export default function Folder({folder,index,profile,AuthUserId,path}) {
    if (path==='Root'){
        path='';
      }

    return (
        <>
        {profile.user._id === AuthUserId  && (
            <>
     <ContextMenuTrigger id={index}>
     <Button 
             to={{
                 pathname:`/folder/${folder.id}`,
                  state: {folder:folder},
              }}
              variant="outline-dark" 
              className="text-truncate w-100" 
              as={Link}>
             <FontAwesomeIcon icon={faFolder} className="mr-2" />
             {folder.name}
             </Button>
    
      </ContextMenuTrigger>
   
    <ContextMenu id={index} className="adva">
        <MenuItem  className="adva1" onClick={()=>DeleteFolder(folder.id,profile,path+"/"+folder.name)} >
          <div>
           <FaRegTrashAlt/>
          . delete
          </div>
        </MenuItem>
      </ContextMenu>
      </>
   )}
        
        {profile.user._id !== AuthUserId  && (
            <>
           <Button 
           to={{
               pathname:`/folder/${folder.id}`,
                state: {folder:folder},
            }}
            variant="outline-dark" 
            className="text-truncate w-100" 
            as={Link}>
           <FontAwesomeIcon icon={faFolder} className="mr-2" />
           {folder.name}
           </Button>
           </>
        )}
           </>
          
        
    )
}
