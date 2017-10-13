import React from 'react';
import PropTypes from 'prop-types';
import MainLayout from 'layouts/main';
import smartify from './smartify';
import OsTypeForm from '../form';
import FlatButton from 'material-ui/FlatButton';
import { Card, CardActions, CardHeader } from 'material-ui/Card';
import { CenteredCardText }  from 'components/elements';

const OsTypeAdd = ({ submit }) => {
  const title = [
    { name: 'References', link: '/references' },
    { name: 'OSes', link: '/references/os-types/' },
    { name: 'Add' },
  ];
  return (
    <MainLayout title={title}>
      <Card>
        <CardHeader title="OS" />
        <CenteredCardText>
          <OsTypeForm submit={submit} />
        </CenteredCardText>
        <CardActions>
          <center>
            <FlatButton
              label="Add"
              type="submit"
              form="os-type-form"
            />
          </center>
        </CardActions>
      </Card>
    </MainLayout>
  );
};

OsTypeAdd.propTypes = {
  submit: PropTypes.func.isRequired,
};

export default smartify(OsTypeAdd);
