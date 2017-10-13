import React from 'react';
import PropTypes from 'prop-types';
import MainLayout from 'layouts/main';
import smartify from './smartify';
import FlatButton from 'material-ui/FlatButton';
import { Link } from 'react-router-dom';
import Dialog from 'material-ui/Dialog';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import { List, ListItem } from 'material-ui/List';

const ProtectedDataType = ({
  currentUser,
  data,
  remove,
  isRemoveModalOpen,
  hideRemoveModal,
  showRemoveModal,
}) => {
  const title = [
    { name: 'References', link: '/references' },
    { name: 'Data types', link: '/references/protected-data-types' },
    { name: data.name },
  ];
  return (
    <MainLayout title={title}>
      <Card>
        <CardHeader
          title="Data type"
        />
        <CardText>
          <List>
            <ListItem
              primaryText={data.name}
              secondaryText="Data type"
              disabled
            />
          </List>
        </CardText>
        {currentUser.roles.includes('moderator') && <CardActions>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <FlatButton
              label="Edit"
              containerElement={<Link to={`/references/protected-data-types/edit/${data.id}`} />}
            />
            <FlatButton
              label="Remove"
              onTouchTap={showRemoveModal}
              secondary
            />
          </div>
        </CardActions>}
      </Card>
      <Dialog
        actions={[
          <FlatButton
            label="Cancel"
            onTouchTap={hideRemoveModal}
            primary
          />,
          <FlatButton
            label="Remove"
            onTouchTap={remove(data.id)}
            secondary
          />,
        ]}
        modal={false}
        open={isRemoveModalOpen}
        onRequestClose={hideRemoveModal}
      >
        Remove {data.name}?
      </Dialog>
    </MainLayout>
  );
};

ProtectedDataType.propTypes = {
  currentUser: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  remove: PropTypes.func.isRequired,
  isRemoveModalOpen: PropTypes.bool.isRequired,
  hideRemoveModal: PropTypes.func.isRequired,
  showRemoveModal: PropTypes.func.isRequired,
};

export default smartify(ProtectedDataType);
