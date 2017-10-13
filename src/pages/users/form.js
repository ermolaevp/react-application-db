import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'react-redux-form';
import InputText from 'components/input-text';

const UserForm = ({ model, submit, id }) =>
  <Form
    model={model}
    onSubmit={submit}
    id={id}
  >
    <InputText
      model=".name"
      floatingLabelText="Name"
      required
      autoFocus
    />
    <br />
    <InputText
      model=".surname"
      floatingLabelText="Surname"
      required
      autoFocus
    />
    <br />
    <InputText
      model=".middleName"
      floatingLabelText="Middle name"
      required
      autoFocus
    />
  </Form>
;

UserForm.propTypes = {
  model: PropTypes.string.isRequired,
  submit: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
};

export default UserForm;
