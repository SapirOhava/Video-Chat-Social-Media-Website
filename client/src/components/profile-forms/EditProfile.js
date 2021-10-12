import React, { Fragment, useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createProfile, getCurrentProfile } from '../../actions/profile';

const EditProfile = ({ profile: { profile, loading }, createProfile, getCurrentProfile, history }) => {
    const [formData, setFormData] = useState({
        photo: '',
        Language: '',
        location: '',
        Gender: '',
        findMe: '',
        Academic_degree: '',
        Academic_Institution: '',
        Field_of_Study: '',
        about: '',
        following: '',
        followers: '',
        resetPasswordLink: ''

    });

    useEffect(() => {
        getCurrentProfile();

        setFormData({
            photo: loading || !profile.photo ? '' : profile.photo,
            Language: loading || !profile.Language ? '' : profile.Language,
            location: loading || !profile.location ? '' : profile.location,
            Gender: loading || !profile.Gender ? '' : profile.Gender,
            findMe: loading || !profile.findMe ? '' : profile.findMe,
            Academic_degree: loading || !profile.Academic_degree ? '' : profile.Academic_degree,
            Academic_Institution: loading || !profile.Academic_Institution ? '' : profile.Academic_Institution,
            Field_of_Study: loading || !profile.Field_of_Study ? '' : profile.Field_of_Study,
            about: loading || !profile.about ? '' : profile.about

        })
    },[loading,getCurrentProfile]);

    const {
        photo,
        Language,
        location,
        Gender, 
        Academic_degree,
        Academic_Institution,
        Field_of_Study,
        about,
        findMe, 
    } = formData;


    const onChange = e =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onChangePhoto = e =>{
    setFormData({ ...formData, [e.target.name]: e.target.files[0] });
    }


    const onSubmit = e => {
        e.preventDefault();
        const newFormData = new FormData();
        newFormData.append( "photo",photo);
        newFormData.append("Language",Language);
        newFormData.append("location",location);
        newFormData.append("Gender",Gender);
        newFormData.append("findMe",findMe);
        newFormData.append("Academic_degree",Academic_degree);
        newFormData.append("Academic_Institution",Academic_Institution);
        newFormData.append("Field_of_Study",Field_of_Study);
        newFormData.append("about",about);

        createProfile(newFormData , history , true);
    }
    return (
        <Fragment>
            <h1 className="sapir">
                    Edit Your Profile
            </h1>
            
            <small>* = required field</small>
            <form className="form" onSubmit={e => onSubmit(e) } encType="multipart/form-data">
                
            <input type="file" name="photo" filename="photo" onChange={e=>onChangePhoto(e)}/>

            <div className="form-group">
                    <small className="form-text"
                    >looking for a pal?</small>
                    <select name="findMe" value={findMe} onChange={e => onChange(e)}>
                        <option value="y">Yes</option>
                        <option value="n">No</option>
                    </select>
                </div>


                <div className="form-group">
                    <small className="form-text"
                    >Gender</small>
                    <select name="Gender" value={Gender} onChange={e => onChange(e)}>
                        <option value=""></option>
                        <option value="m">Male</option>
                        <option value="f">Female</option>
                    </select>
                </div>



                <div className="form-group">
                    <small className="form-text"
                    >Language</small>
                    <select name="Language" value={Language} onChange={e => onChange(e)}>
                        <option value=""></option>
                        <option value="Hebrew">Hebrew</option>
                        <option value="English">English</option>
                    </select>
                </div>


                <div className="form-group">
                    <small className="form-text">Location</small>
                    <input type="text" placeholder="" name="location" value={location} onChange={e => onChange(e)} />
                </div>


                <div className="form-group">
                    <small className="form-text">Academic Institution</small>
                    <input type="text" placeholder="" name="Academic_Institution" value={Academic_Institution} onChange={e => onChange(e)} />
                </div>


                <div className="form-group">
                    <small className="form-text">Academic degree</small>
                    <input type="text" placeholder="" name="Academic_degree" value={Academic_degree} onChange={e => onChange(e)} />
                </div>


                <div className="form-group">
                    <small className="form-text">Fields of Study</small>
                    <input type="text" placeholder="" name="Field_of_Study" value={Field_of_Study} onChange={e => onChange(e)} />
                    <small className="form-text"
                    >Please use comma separated values (eg.,JavaScript,algorithms,Data Structure)</small>
                </div>

                <div className="form-group">
                    <small className="form-text">Tell us about yourself ,
                and What are you looking for in your study partner</small>
                    <textarea placeholder="" name="about" value={about} onChange={e => onChange(e)}></textarea>
                </div>

                <input type="submit" className="btn btn-primary my-1" />
                <Link className="btn btn-light my-1" to="/dashboard">Go Back</Link>
            </form>
        </Fragment>
    )
}

EditProfile.propTypes = {
    createProfile: PropTypes.func.isRequired,
    getCurrentProfile: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    profile: state.profile
});

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(withRouter(EditProfile));
