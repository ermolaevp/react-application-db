import React from 'react';
import PropTypes from 'prop-types';
import MainLayout from 'layouts/main';
import smartify from './smartify';
import RequestForm from '../form';
import FlatButton from 'material-ui/FlatButton';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import Forbidden from 'pages/forbidden';

const RequestsAdd = (props) => {
  if (props.form.statusName !== 'New') {
    return <Forbidden goBack={props.history.goBack} />;
  }
  const title = [
    { name: 'Requests', link: '/requests' },
    { name: props.id, link: `/requests/${props.id}` },
    { name: 'Update' },
  ];
  return (
    <MainLayout title={title}>
      <Card>
        <CardHeader title="Update request" />
        <CardText>
          <RequestForm
            {...props}
          />
        </CardText>
        <CardActions>
          <center>
            <FlatButton
              label="Save"
              type="submit"
              form="request-form"
            />
          </center>
        </CardActions>
      </Card>
    </MainLayout>
  );
};

RequestsAdd.propTypes = {
  form: PropTypes.object.isRequired,
  submit: PropTypes.func.isRequired,
  osTypes: PropTypes.array.isRequired,
  users: PropTypes.array.isRequired,
  applicationTypes: PropTypes.array.isRequired,
};

export default smartify(RequestsAdd);
