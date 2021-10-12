import React from 'react';
import PropTypes from 'prop-types';

const ProfileAbout = ({profile:{
    Field_of_Study,
    about,
    user:{ name }
}}) => {
    return (
        <div className="profile-about bg-light p-2">
          <h2 className="sapir">About Me:</h2>
          <p>
            {about}
          </p>
          <div className="line"></div>
          <h2 className="sapir">Study Field</h2>
          <div className="skills">
            {Field_of_Study.map((field,index)=>(
                <div key={index} className="p-1">
                  {field}
                </div>
            ))}
          </div>
        </div>
    )
}

ProfileAbout.propTypes = {
    profile:PropTypes.object.isRequired
}

export default ProfileAbout
