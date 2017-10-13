import React from 'react';
import PropTypes from 'prop-types';
import FlatButton from 'material-ui/FlatButton';
import smartify from './smartify';

const LogoutButton = ({ logout }) =>
  <FlatButton
    label="Logout"
    onTouchTap={logout}
  />;

LogoutButton.propTypes = {
  logout: PropTypes.func.isRequired,
};

export default smartify(LogoutButton);
