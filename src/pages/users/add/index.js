import React from 'react';
import PropTypes from 'prop-types';
import smartify from './smartify';
import MainLayout from 'layouts/main';
import { Form } from 'react-redux-form';
import {
  Card,
  CardActions,
} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import InputText from 'components/input-text';
import { email, passwordsMatch, passwordMinLength } from 'utils/validators';
import { Redirect } from 'react-router';
import ErrorBox from 'components/error-box';
import { CenteredCardText } from 'components/elements';

const validators = {
  passwordsMatch,
  passwordMinLength,
  email,
};

const messages = {
  passwordsMatch: 'Passwords do not match',
  passwordMinLength: 'Password should be at least 8 symbols',
  email: 'incorrect email',
};

const title = [
  { name: 'Users', link: '/users' },
  { name: 'Add' },
];

const UsersAdd = ({ form, submit }) => (
  <MainLayout title={title}>
    {form.submitted && <Redirect push to="/users" />}
    <Card>
      <CenteredCardText>
        <Form
          model="signup"
          onSubmit={submit}
          validators={{ '': validators }}
          id="signup-form"
        >
          <InputText
            model=".email"
            floatingLabelText="Email"
            autoComplete="new-password"
            fullWidth
            autoFocus
            required
          />
          <br />
          <InputText
            model=".password"
            floatingLabelText="Password"
            type="password"
            autoComplete="new-password"
            fullWidth
            required
          />
          <br />
          <InputText
            model=".password_repeat"
            floatingLabelText="Confirm password"
            type="password"
            fullWidth
            required
          />
        </Form>
      </CenteredCardText>
      <CenteredCardText>
        <ErrorBox
          model="signup"
          show={field => field.submitFailed}
          messages={messages}
        />
      </CenteredCardText>
      <CardActions>
        <center>
          <FlatButton
            label="Add"
            type="submit"
            form="signup-form"
          />
        </center>
      </CardActions>
    </Card>
  </MainLayout>
);

UsersAdd.propTypes = {
  submit: PropTypes.func.isRequired,
  form: PropTypes.any,
};

export default smartify(UsersAdd);
