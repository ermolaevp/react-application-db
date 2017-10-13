import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'react-redux-form';
import InputText from 'components/input-text';
import ErrorBox from 'components/error-box';

const ProtectedDataTypeForm = ({ submit }) =>
  <Form
    model="protectedDataTypeForm"
    onSubmit={submit}
    id="protected-data-type-form"
  >
    <InputText
      model=".name"
      floatingLabelText="Name"
      required
      autoFocus
      fullWidth
    />
    <ErrorBox
      model="protectedDataTypeForm.commonErrors"
      show
    />
  </Form>
;

ProtectedDataTypeForm.propTypes = {
  submit: PropTypes.func.isRequired,
};

export default ProtectedDataTypeForm;
