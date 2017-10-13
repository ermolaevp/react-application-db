import React from 'react';
import PropTypes from 'prop-types';
import MainLayout from 'layouts/main';
import smartify from './smartify';
import ProfileForm from './form';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import { Link } from 'react-router-dom';
import {
  Card,
  CardText,
} from 'material-ui/Card';
import styled from 'styled-components';
import IconButton from 'material-ui/IconButton';
import EditIcon from 'material-ui/svg-icons/editor/mode-edit';

const ProfileEdit = ({ currentUser, submit }) =>
  <MainLayout title="Update profile">
    <Card>
      <CardText style={{ width: '400px', margin: '0 auto' }}>
        <ProfileForm submit={submit(currentUser.id)} />
        <WithChangeLink>
          <TextField floatingLabelText="Email" value={currentUser.email} disabled />
          <IconButton containerElement={<Link to="/change-email" />}>
            <EditIcon />
          </IconButton>
        </WithChangeLink>
        <WithChangeLink>
          <TextField floatingLabelText="Password" value="********" disabled />
          <IconButton containerElement={<Link to="/change-password" />}>
            <EditIcon />
          </IconButton>
        </WithChangeLink>
      </CardText>
      <CardText>
        <center><FlatButton type="submit" form="profile-form" label="Save" /></center>
      </CardText>
    </Card>
  </MainLayout>;

const WithChangeLink = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;

ProfileEdit.propTypes = {
  submit: PropTypes.func.isRequired,
  currentUser: PropTypes.object.isRequired,
};

export default smartify(ProfileEdit);
