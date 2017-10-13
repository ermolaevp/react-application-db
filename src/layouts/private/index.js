import React from 'react';
import PropTypes from 'prop-types';
import smartify from './smartify';
import Forbidden from 'pages/forbidden';

function hasAccess(uri, user) {
  if (/^\/requests\/add/.test(uri)) return (user.isAnalyst || user.isExpert);
  if (/^\/requests\/\d+\/edit/.test(uri)) return (user.isAnalyst || user.isExpert);
  if (/^\/references\/[a-z-]+\/[add|edit]/.test(uri)) return user.isModerator;
  if (/^\/references/.test(uri)) return user.hasAnyRole;
  if (/^\/requests/.test(uri)) return user.hasAnyRole;
  if (/^\/users/.test(uri)) return user.isAnyAdmin;
  return true;
}

const PrivateLayout = ({ contentComponent, loginComponent, ...rest }) => {
  if (!rest.currentUser.id) {
    return React.createElement(loginComponent, rest);
  }
  if (!hasAccess(rest.match.path, rest.currentUser)) {
    return React.createElement(Forbidden, {
      goBack: (e) => rest.history.goBack(),
    });
  }
  return (
    <div>
      {React.createElement(contentComponent, rest)}
    </div>
  );
};

PrivateLayout.propTypes = {
  contentComponent: PropTypes.any.isRequired,
  loginComponent: PropTypes.any.isRequired,
};

export default smartify(PrivateLayout);
