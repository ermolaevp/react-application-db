import React from 'react';
import PropTypes from 'prop-types';
import MainLayout from 'layouts/main';
import smartify from './smartify';
import RequestForm from '../form';
import FlatButton from 'material-ui/FlatButton';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';

const RequestsAdd = (props) => {
  const title = [
    { name: 'Requests', link: '/requests' },
    { name: 'Add' },
  ];
  return (
    <MainLayout title={title}>
      <Card>
        <CardHeader title="New Request" />
        <CardText>
          <RequestForm
            {...props}
          />
        </CardText>
        <CardActions>
          <center>
            <FlatButton
              label="Add"
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
