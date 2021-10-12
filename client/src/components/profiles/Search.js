import React, { Fragment, useState } from 'react';
import {Link , withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {searchProfiles} from '../../actions/profile';

const Search = ({searchProfiles , history}) => {
    const [formData, setFormData] = useState({
       
        Language: '',
        location: '',
        Gender: '',
        Academic_degree: '',
        Academic_Institution: '',
        Field_of_Study: ''
      

    });

    const {
      
        Language,
        location,
        Gender,
        Academic_degree,
        Academic_Institution,
        Field_of_Study,

    } = formData;


    const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();
        searchProfiles(formData , history )
    }
    return (
        <Fragment>
            
            <h1 className="sapir" >
                Search a Pal
            </h1>
            
            <form className="form" onSubmit={e => onSubmit(e)} >
            
                <div className="form-group">
                    <small className="form-text"
                    >Gender</small>
                    <select name="Gender" value={Gender} onChange={e=> onChange(e)}>
                        <option value=""></option>
                        <option value="m">Male</option>
                        <option value="f">Female</option>
                    </select>    
                </div>

                <div className="form-group">
                    <small className="form-text"
                    >Language</small>
                    <select name="Language" value={Language} onChange={e=> onChange(e)}>
                        <option value=""></option>
                        <option value=">Hebrew">Hebrew</option>
                        <option value="English">English</option>
                    </select>    
                </div>


                <div className="form-group">
                <small className="form-text">Location</small>
                    <input type="text" placeholder="" name="location" value={location} onChange={e=> onChange(e)}/>
                </div>


                <div className="form-group">
                <small className="form-text">Academic Institution</small>
                    <input type="text" placeholder="" name="Academic_Institution" value={Academic_Institution} onChange={e=> onChange(e)}/>
                </div>


                <div className="form-group">
                <small className="form-text">Academic degree</small>
                    <input type="text" placeholder="" name="Academic_degree" value={Academic_degree} onChange={e=> onChange(e)}/>
                </div>


                <div className="form-group">
                <small className="form-text">Fields of Study</small>
                    <input type="text" placeholder="" name="Field_of_Study" value={Field_of_Study} onChange={e=> onChange(e)}/>
                    <small className="form-text"
                    >Please use comma separated values (eg.,JavaScript,algorithms,Data Structure)</small>
                </div>


                <input type="submit" className="btn btn-primary my-1" />
                <Link className="btn btn-light my-1" to="/dashboard">Go Back</Link>
            </form>
            
        </Fragment>
    )
}

Search.propTypes = {
    searchProfiles : PropTypes.func.isRequired
}

export default connect(null,{searchProfiles})(withRouter(Search)); 
