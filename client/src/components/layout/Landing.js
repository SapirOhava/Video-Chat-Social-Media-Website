import React  from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';




const Landing =({ isAuthenticated }) => {

  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }
    return (
        <section className="landing">
        <div className="light-overlay">
          <div className="landing-inner">
            {/* <h1 className="x-large">Welcome To GlobalPal</h1> */}
          </div>
        </div>
      </section>
    )
}
Landing.propTypes = {
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(Landing);