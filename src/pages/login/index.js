import React from 'react';
import PropTypes from 'prop-types';
import { Form, Errors } from 'react-redux-form';
import { Link } from 'react-router-dom';
import { required } from 'utils/validators';
import Input from 'components/input';
import GuestLayout from 'layouts/guest';
import Button from 'components/button';
import styled from 'styled-components';
import smartify from './smartify';
import InputText from 'components/input-text';
import FlatButton from 'material-ui/FlatButton';
import {
  Card,
  CardActions,
  CardHeader,
  CardMedia,
  CardTitle,
  CardText
} from 'material-ui/Card';

const validators = {
  required,
};

const Login = ({ submit }) => (
  <Card>
    <Form
      model="login"
      onSubmit={submit}
    >
      <CardHeader
        subtitle="Applications DB"
      />
      <CardText>
        <InputText
          model=".email"
          floatingLabelText="Email"
          required
          autoFocus
        />
        <br />
        <InputText
          model=".password"
          type="password"
          floatingLabelText="Password"
          autoComplete="new-password"
          required
        />
      </CardText>
      <CardText>
        <ErrorBox model="login.commonErrors" show />
      </CardText>
      <CardActions style={{ display: 'flex', justifyContent: 'space-around' }}>
        <FlatButton
          label="Login"
          type="submit"
          primary
        />
        <FlatButton
          label="Sign up"
          containerElement={<Link to="/signup" />}
        />
      </CardActions>
    </Form>
  </Card>
);

const SmartLogin = smartify(Login);

const LoginWithLayout = () => (
  <GuestLayout contentComponent={SmartLogin} title="Login" />
);

const ErrorBox = styled(Errors)`
  max-width: 250px;
  font-size: 14px;
  margin: 20px 0;
  color: #ab3232;
  text-align: center;
`;

const RestoreLink = styled(Link)`
  flex: 1;
  color: rgb(199, 229, 252);
`;

const Footer = styled.div`
  display: flex;
  align-items: center;
`;

Login.propTypes = {
  submit: PropTypes.func.isRequired,
};

export default LoginWithLayout;
