import React,{Fragment , useEffect} from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Alert from './components/layout/Alert';
//driv
import DashboardmyNotebook from './components/myNotebook/Dashboard';
import DashboardGroup from './components/myNotebook/DashboardGroup';

import About from './components/layout/About';
import Dashboard from './components/dashboard/Dashboard';
import CreateProfile from './components/profile-forms/CreateProfile';
import EditProfile from './components/profile-forms/EditProfile';
import Profiles from './components/profiles/Profiles';
import Search from './components/profiles/Search';
import SearchResult from './components/profiles/SearchResult';
import Profile from './components/profile/Profile';
import PrivateRoute from './components/routing/PrivateRoute';
import Groups from './components/groups/Groups';
import Group from './components/groups/Group';
import GroupForm from './components/groups/GroupForm';
import AllGroups from './components/groups/AllGroups';
import Followers from './components/profiles/Followers';
import Followings from './components/profiles/Followings';
import MyGroups from './components/profiles/MyGroups';
import Messenger from "./components/messenger/Messenger";
import Post from './components/post/Post';
import { Provider } from 'react-redux';
import store from './store';
import {loadUser} from './actions/auth';
import setAuthToken from  './utils/setAuthToken';
import VideoCall from './components/zoom/VideoCall';
import Room from './components/zoom/Room';

import './App.css';


if(localStorage.token){
  setAuthToken(localStorage.token);
}

const App = () =>{
  useEffect(()=>{
    store.dispatch(loadUser());
  },[]);
return(
<Provider store={store}> 
  <Router>
    <Fragment>
      <Navbar />
      <Route exact path="/" component={Landing} />
      <section className="container">
        <Alert/>
        <Switch>
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/profiles" component={Profiles} />
          <Route exact path="/profile/:id" component={Profile} />
          <Route exact path="/about" component={About} />
          <PrivateRoute exact path="/dashboard" component={Dashboard} />
          <PrivateRoute exact path="/create-profile" component={CreateProfile} />
          <PrivateRoute exact path="/edit-profile" component={EditProfile} />
          <PrivateRoute exact path="/create-group" component={GroupForm} /> 
          <PrivateRoute exact path="/adminGroups" component={Groups} /> 
          <PrivateRoute exact path="/group/:id" component={Group} />
          <PrivateRoute exact path="/posts/:id" component={Post} />
          <PrivateRoute exact path="/Groups" component={AllGroups} />
          <PrivateRoute exact path="/followers" component={Followers} />
          <PrivateRoute exact path="/followings" component={Followings} />
          <PrivateRoute exact path="/myGroups" component={MyGroups} />
          <PrivateRoute exact path="/search" component={Search} />
          <PrivateRoute exact path="/searchResult" component={SearchResult} />
          <PrivateRoute exact path="/messenger" component={Messenger} />
          {/*myNotebook*/}
          <PrivateRoute exact path="/myNotebook" component={DashboardmyNotebook} />
          <PrivateRoute exact path="/myNotebookGroup" component={DashboardGroup} />
          <PrivateRoute exact path="/folderG/:folderId" component={DashboardGroup}/>
          
          <PrivateRoute exact path="/folder/:folderId" component={DashboardmyNotebook}/>

          {/*zoom meeting*/}
          <PrivateRoute exact path="/room/:roomID" component={Room} />
          <PrivateRoute exact path="/videocall" component={VideoCall}/>
          /videocall
        </Switch>
      </section>
      </Fragment>
  </Router>
</Provider>
)};

export default App;
