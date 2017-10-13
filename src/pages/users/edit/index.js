import React from 'react';
import PropTypes from 'prop-types';
import MainLayout from 'layouts/main';
import smartify from './smartify';
import allRoles from 'constants/all-roles';
import FlatButton from 'material-ui/FlatButton';
import {
  Card,
} from 'material-ui/Card';
import Subheader from 'material-ui/Subheader';
import Toggle from 'material-ui/Toggle';
import ProfileForm from 'pages/profile/edit/form';
import { CenteredCardText } from 'components/elements';
import TextField from 'material-ui/TextField';

const UserEdit = ({ user, submit, toggleActive, setRole, currentUser }) => {
  const title = [
    { name: 'Users', link: '/users' },
    { name: user.fullName || user.email, link: '/users/' + user.id },
    { name: 'Update' },
  ];
  return (
    <MainLayout title={title}>
      <Card>
        <CenteredCardText>
          <Subheader>Main info</Subheader>
          <ProfileForm submit={submit(user.id)} />
          <TextField floatingLabelText="Email" value={user.email} fullWidth disabled />
        </CenteredCardText>
        {user.id !== currentUser.id && <CenteredCardText>
          <Subheader>Activated</Subheader>
          <Toggle
            label="Activated"
            defaultToggled={user.active}
            onToggle={(e, checked) => toggleActive(user.id)}
          />
        </CenteredCardText>}
        {user.id !== currentUser.id && <CenteredCardText>
          <Subheader>Roles</Subheader>
          {allRoles.map(r =>
            <Toggle
              key={r.role}
              label={r.name}
              style={{ marginBottom: '1rem' }}
              defaultToggled={user.hasRole(r.role)}
              onToggle={(e, checked) => setRole(user.role, r.role, checked)}
            />
          )}
        </CenteredCardText>}
        <CenteredCardText>
          <center>
            <FlatButton
              type="submit"
              label="Save"
              form="profile-form"
            />
          </center>
        </CenteredCardText>
      </Card>
    </MainLayout>
  );
};

UserEdit.propTypes = {
  user: PropTypes.any.isRequired,
  submit: PropTypes.func.isRequired,
  toggleActive: PropTypes.func.isRequired,
  setRole: PropTypes.func.isRequired,
  currentUser: PropTypes.object.isRequired,
};

export default smartify(UserEdit);
