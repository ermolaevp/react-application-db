import React from 'react';
import PropTypes from 'prop-types';
import InputText from 'components/input-text';
import { Form } from 'react-redux-form';

const ProfileForm = ({ submit }) =>
  <Form
    model="profile"
    onSubmit={submit}
    id="profile-form"
  >
    <InputText model=".name" floatingLabelText="Name" fullWidth required />
    <br />
    <InputText model=".surname" floatingLabelText="Surname" fullWidth required />
    <br />
    <InputText model=".middleName" floatingLabelText="Middle name" fullWidth />
  </Form>;

ProfileForm.propTypes = {
  submit: PropTypes.func.isRequired,
};

export default ProfileForm;
