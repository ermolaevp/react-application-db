import React from 'react';
import PropTypes from 'prop-types';
import MainLayout from 'layouts/main';
import smartify from './smartify';
import ProtectedDataLocationForm from '../form';
import FlatButton from 'material-ui/FlatButton';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import { CenteredCardText } from 'components/elements';

const ProtectedDataLocationAdd = ({ submit }) => {
  const title = [
    { name: 'References', link: '/references' },
    { name: 'Locations', link: '/references/protected-data-locations/' },
    { name: 'Add' },
  ];
  return (
    <MainLayout title={title}>
      <Card>
        <CardHeader title="Location" />
        <CenteredCardText>
          <ProtectedDataLocationForm submit={submit} />
        </CenteredCardText>
        <CardActions>
          <center>
            <FlatButton
              label="Add"
              type="submit"
              form="protected-data-location-form"
            />
          </center>
        </CardActions>
      </Card>
    </MainLayout>
  );
};

ProtectedDataLocationAdd.propTypes = {
  submit: PropTypes.func.isRequired,
};

export default smartify(ProtectedDataLocationAdd);
