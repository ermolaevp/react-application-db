import React from 'react';
import PropTypes from 'prop-types';
import MainLayout from 'layouts/main';
import smartify from './smartify';
import { Link } from 'react-router-dom';
import FlatButton from 'material-ui/FlatButton';
import {
  Card,
  CardText,
  CardActions,
} from 'material-ui/Card';
import Subheader from 'material-ui/Subheader';
import { List, ListItem } from 'material-ui/List';
import DoneIcon from 'material-ui/svg-icons/action/done';
import allRoles from 'constants/all-roles';
import { TwoColumns } from 'components/elements';

const UserProfile = ({ currentUser }) => {
  return (
    <MainLayout title="Profile">
      <Card>
        <CardText>
          <TwoColumns>
            <div>
              <Subheader>Main info</Subheader>
              <List>
                <ListItem
                  primaryText={currentUser.name}
                  secondaryText="Name"
                  disabled
                />
                <ListItem
                  primaryText={currentUser.surname}
                  secondaryText="Surname"
                  disabled
                />
                <ListItem
                  primaryText={currentUser.middleName}
                  secondaryText="Middle name"
                  disabled
                />
                <ListItem
                  primaryText={currentUser.email}
                  secondaryText="Email"
                  disabled
                />
              </List>
            </div>
            <div>
              <Subheader>Roles</Subheader>
              <List style={{ width: '250px' }}>
                {allRoles.map(r =>
                  <ListItem
                    key={r.role}
                    primaryText={r.name}
                    rightIcon={currentUser.hasRole(r.role) ? <DoneIcon /> : <span />}
                    disabled
                  />
                )}
              </List>
            </div>
          </TwoColumns>
        </CardText>
        <CardActions>
          <center>
            <FlatButton
              label="Edit"
              containerElement={<Link to="/profile/edit" />}
            />
          </center>
        </CardActions>
      </Card>
    </MainLayout>
  );
};

UserProfile.propTypes = {
  currentUser: PropTypes.object.isRequired,
};

export default smartify(UserProfile);
