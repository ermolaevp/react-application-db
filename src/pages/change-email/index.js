import React from 'react';
import PropTypes from 'prop-types';
import MainLayout from 'layouts/main';
import smartify from './smartify';
import InputText from 'components/input-text';
import { Form } from 'react-redux-form';
import FlatButton from 'material-ui/FlatButton';
import { Card } from 'material-ui/Card';
import { CenteredCardText } from 'components/elements';
import { Redirect } from 'react-router';
import ErrorBox from 'components/error-box';

const ChangeEmail = ({ form, submit }) =>
  <MainLayout title="Update email">
    {form.submitted && <Redirect push to="/logout" />}
    <Card>
      <Form
        model="changeEmail"
        onSubmit={submit}
        id="change-email-form"
      >
        <CenteredCardText>
          <InputText model=".email" floatingLabelText="New email" fullWidth />
          <br />
          <InputText model=".currentPassword" type="password" floatingLabelText="Password" autoComplete="new-password" fullWidth />
        </CenteredCardText>
        <CenteredCardText>
          <ErrorBox model="changeEmail.commonErrors" />
        </CenteredCardText>
        <CenteredCardText>
          <center><FlatButton id="change-email-form" type="submit" label="Update" /></center>
        </CenteredCardText>
      </Form>
    </Card>
  </MainLayout>;

ChangeEmail.propTypes = {
  submit: PropTypes.func.isRequired,
  form: PropTypes.any,
};

export default smartify(ChangeEmail);
