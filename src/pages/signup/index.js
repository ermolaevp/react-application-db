import React from 'react';
import PropTypes from 'prop-types';
import smartify from './smartify';
import MainLayout from 'layouts/main';
import { Link } from 'react-router-dom';
import Icon from 'components/icon';
import { Form, Errors } from 'react-redux-form';
import {
  Card,
  CardActions,
  CardHeader,
  CardMedia,
  CardTitle,
  CardText
} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import InputText from 'components/input-text';
import { email, passwordsMatch, passwordMinLength } from 'utils/validators';
import { Redirect } from 'react-router';
import ErrorBox from 'components/error-box';

const validators = {
  passwordsMatch,
  passwordMinLength,
  email,
};

const messages = {
  passwordsMatch: 'Passwords do not match',
  passwordMinLength: 'Password should be at least 8 symbols',
  email: 'Incorrect email',
};

const Signup = ({ form, submit }) => (
  <Card>
    {form.submitted && <Redirect push to="/" />}
    <Form
      model="signup"
      onSubmit={submit}
      validators={{ '': validators }}
    >
      <CardHeader
        subtitle="Applications DB"
      />
      <CardText>
        <InputText
          model=".email"
          hintText="Email"
          floatingLabelText="Email"
          autoFocus
          required
        />
        <br />
        <InputText
          model=".password"
          hintText="Password"
          floatingLabelText="Password"
          type="password"
          autoComplete="new-password"
          required
        />
        <br />
        <InputText
          model=".password_repeat"
          hintText="Confirm password"
          floatingLabelText="Confirm password"
          type="password"
          required
        />
      </CardText>
      <CardText>
        <ErrorBox
          model="signup"
          show={field => field.submitFailed}
          messages={messages}
        />
      </CardText>
      <CardActions style={{ display: 'flex', justifyContent: 'space-around' }}>
        <FlatButton
          label="Login"
          containerElement={<Link to="/" />}
        />
        <FlatButton
          label="Sign up"
          type="submit"
          primary
        />
      </CardActions>
    </Form>
  </Card>
);

Signup.propTypes = {
  submit: PropTypes.func.isRequired,
  form: PropTypes.any,
};

export default smartify(Signup);
