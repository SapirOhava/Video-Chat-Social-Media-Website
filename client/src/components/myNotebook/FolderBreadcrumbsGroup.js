import React from 'react';

import { Breadcrumb } from "react-bootstrap";
import { ROOT_FOLDER } from '../../hooks/useFolder';
import { Link } from 'react-router-dom';


export default function FolderBreadcrumbsGroup({ currentFolder }){
    let path=currentFolder === ROOT_FOLDER ? [] : [ROOT_FOLDER]
    if (currentFolder) path =[...path,...currentFolder.path]
    return (
        <Breadcrumb
      className="flex-grow-1"
      listProps={{ className: "bg-white pl-3 m-3" }}
    >
        
        {path.map((folder,index)=>(
             <Breadcrumb.Item className="text-truncate d-inline-block" 
             linkAs={Link}
             linkProps={{
                 to:{
                     pathname:folder.id ? `/folderG/${folder.id}` : "/myNotebookGroup",
                     state: { folder: { ...folder, path: path.slice(1, index) } },
                    },
             }}
             key={folder.id}
             style={{maxWidth:"150px"}}
             >
             {folder.name}
             </Breadcrumb.Item>

        ))}
        {currentFolder && (
            <Breadcrumb.Item className="text-truncate d-inline-block" 
            style={{maxWidth:"200px"}}
            active
            >
            {currentFolder.name}
            </Breadcrumb.Item>
        )}
        </Breadcrumb>
    )
}
