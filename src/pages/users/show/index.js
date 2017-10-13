import React from 'react';
import PropTypes from 'prop-types';
import MainLayout from 'layouts/main';
import smartify from './smartify';
import FlatButton from 'material-ui/FlatButton';
import {
  Card,
  CardText,
  CardActions,
} from 'material-ui/Card';
import Subheader from 'material-ui/Subheader';
import { List, ListItem } from 'material-ui/List';
import DoneIcon from 'material-ui/svg-icons/action/done';
import SquareIcon from 'material-ui/svg-icons/image/crop-square';
import { Link } from 'react-router-dom';
import allRoles from 'constants/all-roles';
import { TwoColumns } from 'components/elements';

const UserProfile = ({ user }) => {
  const title = [
    { name: 'Users', link: '/users' },
    { name: user.fullName || user.email },
  ];
  return (
    <MainLayout title={title}>
      <Card>
        <CardText>
          <TwoColumns>
            <div>
              <Subheader>Main info</Subheader>
              <List>
                <ListItem
                  primaryText={user.name}
                  secondaryText="Name"
                  disabled
                />
                <ListItem
                  primaryText={user.surname}
                  secondaryText="Surname"
                  disabled
                />
                <ListItem
                  primaryText={user.middleName}
                  secondaryText="Middle name"
                  disabled
                />
                <ListItem
                  primaryText={user.email}
                  secondaryText="Email"
                  disabled
                />
              </List>
              <Subheader>Activated</Subheader>
              <List style={{ width: '250px' }}>
                <ListItem
                  primaryText="Activated"
                  rightIcon={user.active ? <DoneIcon /> : <SquareIcon />}
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
                    rightIcon={user.hasRole(r.role) ? <DoneIcon /> : <span />}
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
              containerElement={<Link to={`/users/${user.id}/edit`} />}
            />
          </center>
        </CardActions>
      </Card>
    </MainLayout>
  );
};

UserProfile.propTypes = {
  user: PropTypes.object.isRequired,
};

export default smartify(UserProfile);
