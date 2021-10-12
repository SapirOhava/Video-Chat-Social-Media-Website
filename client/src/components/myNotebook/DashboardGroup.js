import  React from 'react';
import NavbarComponentGroup from "./NavbarComponentGroup";
import { Container } from 'react-bootstrap';
import AddFolderButton from './AddFolderButton';
import AddFileButton from './AddFileButton';
import { useFolder } from '../../hooks/useFolder';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {useParams,useLocation} from 'react-router-dom';
import FolderBreadcrumbsGroup from './FolderBreadcrumbsGroup';
import FileGroup from './FileGroup';
import FolderGroup from './FolderGroup';
import { Link } from 'react-router-dom';


const DashboardGroup = ({group:{ group},auth}) => {
    const { folderId }=useParams()
    const{state= {} } = useLocation();
    const {folder, childFolders,childFiles} =useFolder(folderId,state.folder,group._id)
    
    
    return (
        <>
        <NavbarComponentGroup group={group} />
        <Link to={`/group/${group._id}`} className='btn btn-dark my-1'>
                Back To group
            </Link>
        <Container fluid> 
        <div className="d-flex align-items-center">
        <FolderBreadcrumbsGroup currentFolder={folder}/>
       
            <div>
                
            <AddFileButton currentFolder={folder} profile={group._id}/>
            <AddFolderButton currentFolder={folder} profile={group._id}/>
            </div>
        
        
        
        </div>
        
        {childFolders.length > 0 && (
          <div className="d-flex flex-wrap">
            {childFolders.map(childFolder => (
              <div
                key={childFolder.id}
                style={{ maxWidth: "250px" }}
                className="p-2"
              >
                <FolderGroup folder={childFolder}
                index={childFolder.id}
                group={group}
                AuthUserId={auth.user._id}
                path={[...folder.path.map(path => path.name),folder.name].join('/')} 
    
                
                 />
              </div>
            ))}
          </div>
        )}
        {childFolders.length > 0 && childFiles.length > 0 && <hr/>}
        {childFiles.length > 0 && (
          <div className="d-flex flex-wrap">
            {childFiles.map(childFiles => (
              <div
                key={childFiles.id}
                style={{ maxWidth: "250px" }}
                className="p-2"
              >
                <FileGroup file={childFiles} 
                      path={[...folder.path.map(path => path.name),folder.name].join('/')} 
                      index={childFiles.id}
                      group={group}
                      AuthUserId={auth.user._id}
                />
              </div>
            ))}
          </div>
        )}
        </Container>
        </>
    )
    

}
DashboardGroup.propTypes = {
    group: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    group: state.group,
    auth: state.auth
});
export default connect(mapStateToProps, {  })(DashboardGroup);
