import  React from 'react';
import NavbarComponent from "./Navbar";
import { Container } from 'react-bootstrap';
import AddFolderButton from './AddFolderButton';
import AddFileButton from './AddFileButton';
import { useFolder } from '../../hooks/useFolder';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Folder from './Folder';
import File from './File';
import {useParams,useLocation} from 'react-router-dom';
import FolderBreadcrumbs from './FolderBreadcrumbs';


const Dashboard = ({profile,auth}) => {
    const { folderId }=useParams()
    const{state= {} } = useLocation();
    const {folder, childFolders,childFiles} =useFolder(folderId,state.folder,profile.user._id)
    
    
    return (
        <>
        <NavbarComponent profile={profile} />
        <Container fluid> 
        <div className="d-flex align-items-center">
        <FolderBreadcrumbs currentFolder={folder}/>
        {profile.user._id === auth.user._id  && (
            <div>
                
            <AddFileButton currentFolder={folder} profile={profile.user._id}/>
            <AddFolderButton currentFolder={folder } profile={profile.user._id}/>
            </div>
        )}
        
        
        </div>
        
        {childFolders.length > 0 && (
          <div className="d-flex flex-wrap">
            {childFolders.map(childFolder => (
              <div
                key={childFolder.id}
                style={{ maxWidth: "250px" }}
                className="p-2"
              >
                <Folder folder={childFolder}
                index={childFolder.id}
                profile={profile}
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
                <File file={childFiles} 
                      path={[...folder.path.map(path => path.name),folder.name].join('/')} 
                      index={childFiles.id}
                      ProfileUserId={profile.user._id}
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
Dashboard.propTypes = {
    profile: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    profile: state.profile.profile,
    auth: state.auth
});
export default connect(mapStateToProps, {  })(Dashboard);
