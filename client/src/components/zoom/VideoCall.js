import { Button, Divider, InputAdornment, TextField } from "@material-ui/core";
import { Keyboard, VideoCallOutlined } from "@material-ui/icons";
import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import "./videoCall.css";
import { v4 as uuid } from "uuid";


const VideoCall = ( ) => {

  const [roomId , setRoomId] = useState();
  const onChange = e =>
        setRoomId( e.target.value );

  return (
    <div className="hero">
      <div className="hero__left">
        <div className="hero__featureText">
          <h1 className="hero__title">
            Premium video meetings.
          </h1>
          <p className="hero__subtitle">
          On this page you can create a video call for distance learning
          </p>
        </div>


        <div className="room">{roomId}</div>

        <div className="hero__buttons">
          <Button
            onClick={()=>{
              setRoomId(uuid());
            }}
            color="primary"
            variant="contained"
            className="hero__createBTN"
          >
            <VideoCallOutlined />
            <p>New Meeting</p>
          </Button>

          <TextField
            className="hero__input"
            value={roomId}
            variant="outlined"
            onChange={e => onChange(e)}
            placeholder="Enter a code or link "
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Keyboard className="icon" />
                </InputAdornment>
              ),
            }}  
          />
           {/* <Button className="hero__joinBTN" onClick={()=>{}}>
            Join
          </Button> */}
          {roomId ? (<Link to={`/room/${roomId}`} className="hero__joinBTN">Join Room</Link>) : (null)}
          
         
        </div>

        <Divider />

      </div>

      <div className="hero__right">
        <img
          className="hero__image"
          src="https://www.gstatic.com/meet/google_meet_marketing_ongoing_meeting_grid_427cbb32d746b1d0133b898b50115e96.jpg"
          alt="Feature IMG"
        />
      </div>
    </div>
  );
};

export default VideoCall;