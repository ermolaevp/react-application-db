import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'react-redux-form';
import InputText from 'components/input-text';
import ErrorBox from 'components/error-box';

const OsTypeForm = ({ submit }) =>
  <Form
    model="osTypeForm"
    onSubmit={submit}
    id="os-type-form"
  >
    <InputText
      model=".name"
      floatingLabelText="Name"
      required
      fullWidth
      autoFocus
    />
    <ErrorBox
      model="osTypeForm.commonErrors"
      show
    />
  </Form>
;

OsTypeForm.propTypes = {
  submit: PropTypes.func.isRequired,
};

export default OsTypeForm;
