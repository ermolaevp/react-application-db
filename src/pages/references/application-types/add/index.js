import React from 'react';
import PropTypes from 'prop-types';
import MainLayout from 'layouts/main';
import smartify from './smartify';
import ApplicationTypeForm from '../form';
import FlatButton from 'material-ui/FlatButton';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import { CenteredCardText } from 'components/elements';

const ApplicationTypeAdd = ({ osTypes, submit }) => {
  const title = [
    { name: 'References', link: '/references' },
    { name: 'Applications', link: '/references/application-types/' },
    { name: 'Add' },
  ];
  return (
    <MainLayout title={title}>
      <Card>
        <CardHeader title="Application" />
        <CenteredCardText>
          <ApplicationTypeForm submit={submit} osTypes={osTypes} />
        </CenteredCardText>
        <CardActions>
          <center>
            <FlatButton
              label="Add"
              type="submit"
              form="application-type-form"
            />
          </center>
        </CardActions>
      </Card>
    </MainLayout>
  );
};

ApplicationTypeAdd.propTypes = {
  submit: PropTypes.func.isRequired,
  osTypes: PropTypes.array.isRequired,
};

export default smartify(ApplicationTypeAdd);
