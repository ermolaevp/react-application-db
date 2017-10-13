import React from 'react';
import PropTypes from 'prop-types';
import smartify from './smartify';
import { Redirect } from 'react-router';

const Home = ({ currentUser }) => {
  if (currentUser.hasRole('webadmin') || currentUser.hasRole('useradmin')) {
    return <Redirect push to="/users" />;
  }
  if (!currentUser.hasAnyRole) {
    return <Redirect push to="/profile" />;
  }
  return <Redirect push to="/references" />;
};

Home.propTypes = {
  currentUser: PropTypes.object.isRequired,
};

export default smartify(Home);
