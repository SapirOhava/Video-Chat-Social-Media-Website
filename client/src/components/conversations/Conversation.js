import "./conversation.css";
import axios from 'axios';
import { connect } from 'react-redux';
import React, { useEffect ,useState } from 'react';

const Conversation = ({  conversation, currentUser  }) => {

    const [friendProfile, setFriendProfile] = useState(null);

    useEffect(() => {
        const friendId = conversation.members.find((m) => m !== currentUser._id);
    
        const getUser = async () => {
          try {
            const res = await axios.get(`/api/profile/user/${friendId}`);
            setFriendProfile(res.data);
          } catch (err) {
            console.log(err);
          }
        };
        getUser();
      }, [conversation, currentUser]);


    return (
        <div className="conversation">
            <img className="conversationImg" src={friendProfile?(`/uploads/${friendProfile.photo}`):""} />
            <span className="conversationName">{friendProfile?(friendProfile.user.name):""}</span>
        </div>
    )
}

const mapStateToProps = state => ({
    currentUser: state.auth.user
});

export default connect(mapStateToProps)(Conversation);
