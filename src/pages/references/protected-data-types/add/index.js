import React from 'react';
import PropTypes from 'prop-types';
import MainLayout from 'layouts/main';
import smartify from './smartify';
import ProtectedDataTypeForm from '../form';
import FlatButton from 'material-ui/FlatButton';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import { CenteredCardText } from 'components/elements';

const ProtectedDataTypeAdd = ({ submit }) => {
  const title = [
    { name: 'References', link: '/references' },
    { name: 'Data types', link: '/references/protected-data-types/' },
    { name: 'Add' },
  ];
  return (
    <MainLayout title={title}>
      <Card>
        <CardHeader title="Data type" />
        <CenteredCardText>
          <ProtectedDataTypeForm submit={submit} />
        </CenteredCardText>
        <CardActions>
          <center>
            <FlatButton
              label="Add"
              type="submit"
              form="protected-data-type-form"
            />
          </center>
        </CardActions>
      </Card>
    </MainLayout>
  );
};

ProtectedDataTypeAdd.propTypes = {
  submit: PropTypes.func.isRequired,
};

export default smartify(ProtectedDataTypeAdd);
