import axios from "axios";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useEffect, useState } from "react";
import "./chatOnline.css";
import { getFriends } from '../../actions/profile';
import avatar from "../../img/avatar.jpg";


const ChatOnline = ({ getFriends, profile: { friends, loading }, onlineUsers, currentId, setCurrentChat }) => {

    //const [friends, setFriends] = useState([]);
    const [onlineFriends, setOnlineFriends] = useState([]);
    const [NOTonlineFriends, setNOTOnlineFriends] = useState([]);

    useEffect(() => {
        getFriends();
    }, [currentId]);


    useEffect(() => {

        setOnlineFriends(friends.filter((f) => onlineUsers.some((ou) => ou.userId === f.user._id)));
        setNOTOnlineFriends(friends.filter((f) => !onlineUsers.some((ou) => ou.userId === f.user._id)));

    }, [friends, onlineUsers]);


    const handleClick = async (user) => {
        try {
            const res = await axios.get(
                `/api/conversations/find/${currentId}/${user._id}`
            );

            if (res.data !== null) {
                setCurrentChat(res.data);
            }

            // if there isnt already conversation between this 2 users , we create 
            //a new conversation between them.
            else {
                const config = {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }

                const body = {
                    "senderId": currentId,
                    "receiverId": user._id
                }
                const res = await axios.post(`/api/conversations/`, body, config);

                setCurrentChat(res.data);
            }

        } catch (err) {
            console.log(err);
        }
    };


    return (
        <div className="chatOnline">
            {onlineFriends.map((o) => (
                <div className="chatOnlineFriend" key={o._id} onClick={() => handleClick(o.user)}>
                    <div className="chatOnlineImgContainer">
                        {o.photo ? (
                            <img
                                className="chatOnlineImg"
                                src={`/uploads/${o.photo}`}
                                alt="..."
                            />) : (<img
                                className="chatOnlineImg"
                                src={avatar}
                                alt="..."
                            />)
                        }
                        <div className="chatOnlineBadge"></div>
                    </div>
                    <span className="chatOnlineName">{o?.user.name}</span>
                </div>
            ))}


            {NOTonlineFriends.map((o) => (
                <div className="chatOnlineFriend" key={o._id} onClick={() => handleClick(o.user)}>
                    <div className="chatOnlineImgContainer">
                        {o.photo ? (
                            <img
                                className="chatOnlineImg"
                                src={`/uploads/${o.photo}`}
                                alt="..."
                            />) : (<img
                                className="chatOnlineImg"
                                src={avatar}
                                alt="..."
                            />)
                        }
                        <div className="chatOnlineBadgeOff"></div>
                    </div>
                    <span className="chatOnlineName">{o?.user.name}</span>
                </div>
            ))}


        </div>
    );
}


ChatOnline.propTypes = {
    getFriends: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    profile: state.profile

});

export default connect(mapStateToProps, { getFriends })(ChatOnline)