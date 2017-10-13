import React from 'react';
import PropTypes from 'prop-types';
import ErrorBox from 'components/error-box';
import { Form } from 'react-redux-form';
import InputText from 'components/input-text';
import InputSelect from 'components/input-select';
import MenuItem from 'material-ui/MenuItem';

const ApplicationTypeForm = ({ osTypes, submit }) =>
  <Form
    model="applicationTypeForm"
    onSubmit={submit}
    id="application-type-form"
  >
    <InputText
      model=".name"
      floatingLabelText="Name"
      required
      autoFocus
      fullWidth
    />
    <br />
    <InputSelect
      floatingLabelText="OS"
      model=".osTypeId"
      required
      fullWidth
    >
      {osTypes.map(osType =>
        <MenuItem
          key={osType.id}
          value={osType.id}
          primaryText={osType.name}
        />)}
    </InputSelect>
    <br />
    <InputText
      model=".marketLink"
      floatingLabelText="Link"
      required
      fullWidth
    />
    <ErrorBox
      model="applicationTypeForm.commonErrors"
      show
    />
  </Form>
;

ApplicationTypeForm.propTypes = {
  osTypes: PropTypes.array.isRequired,
  submit: PropTypes.func.isRequired,
};

export default ApplicationTypeForm;
