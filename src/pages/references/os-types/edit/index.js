import React from 'react';
import PropTypes from 'prop-types';
import MainLayout from 'layouts/main';
import smartify from './smartify';
import OsTypeForm from '../form';
import FlatButton from 'material-ui/FlatButton';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import { CenteredCardText } from 'components/elements';

const OsTypeEdit = ({ submit }) => {
  const title = [
    { name: 'References', link: '/references' },
    { name: 'OSes', link: '/references/os-types/' },
    { name: 'Update' },
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
              label="Update"
              type="submit"
              form="os-type-form"
            />
          </center>
        </CardActions>
      </Card>
    </MainLayout>
  );
};

OsTypeEdit.propTypes = {
  submit: PropTypes.func.isRequired,
};

export default smartify(OsTypeEdit);
