import React from 'react';
import PropTypes from 'prop-types';
import MainLayout from 'layouts/main';
import smartify from './smartify';
import InputText from 'components/input-text';
import { Form } from 'react-redux-form';
import FlatButton from 'material-ui/FlatButton';
import {
  Card,
} from 'material-ui/Card';
import { Redirect } from 'react-router';
import { CenteredCardText } from 'components/elements';
import ErrorBox from 'components/error-box';

const ChangePassword = ({ form, submit }) =>
  <MainLayout title="Update password">
    {form.submitted && <Redirect push to="/logout" />}
    <Card>
      <Form
        model="changePassword"
        onSubmit={submit}
        id="change-password-form"
      >
        <CenteredCardText>
          <InputText model=".password" floatingLabelText="New password" required fullWidth />
          <br />
          <InputText model=".passwordRepeat" floatingLabelText="Confirm password" required fullWidth />
          <br />
          <InputText model=".currentPassword" floatingLabelText="Old password" required fullWidth />
        </CenteredCardText>
        <CenteredCardText>
          <ErrorBox model="changePassword.commonErrors" />
        </CenteredCardText>
        <CenteredCardText>
          <center>
            <FlatButton
              type="submit"
              label="Update"
              form="change-password-form"
            />
          </center>
        </CenteredCardText>
      </Form>
    </Card>
  </MainLayout>;

ChangePassword.propTypes = {
  submit: PropTypes.func.isRequired,
  form: PropTypes.any,
};

export default smartify(ChangePassword);
