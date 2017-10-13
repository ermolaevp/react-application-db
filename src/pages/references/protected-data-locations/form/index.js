import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'react-redux-form';
import InputText from 'components/input-text';
import ErrorBox from 'components/error-box';

const ProtectedDataLocationForm = ({ submit }) =>
  <Form
    model="protectedDataLocationForm"
    onSubmit={submit}
    id="protected-data-location-form"
  >
    <InputText
      model=".name"
      floatingLabelText="Name"
      required
      autoFocus
      fullWidth
    />
    <ErrorBox
      model="protectedDataLocationForm.commonErrors"
      show
    />
  </Form>
;

ProtectedDataLocationForm.propTypes = {
  submit: PropTypes.func.isRequired,
};

export default ProtectedDataLocationForm;
