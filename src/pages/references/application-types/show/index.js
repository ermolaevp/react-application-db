import React from 'react';
import PropTypes from 'prop-types';
import MainLayout from 'layouts/main';
import smartify from './smartify';
import FlatButton from 'material-ui/FlatButton';
import { Link } from 'react-router-dom';
import Dialog from 'material-ui/Dialog';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import { List, ListItem } from 'material-ui/List';

const ApplicationType = ({
  currentUser,
  data,
  remove,
  isRemoveModalOpen,
  hideRemoveModal,
  showRemoveModal,
}) => {
  const title = [
    { name: 'References', link: '/references' },
    { name: 'Applications', link: '/references/application-types' },
    { name: data.name },
  ];
  return (
    <MainLayout title={title}>
      <Card>
        <CardHeader
          title="Application"
        />
        <CardText>
          <List>
            <ListItem
              primaryText={data.name}
              secondaryText="Name"
              disabled
            />
            <ListItem
              primaryText={data.osTypes.name}
              secondaryText="OS"
              disabled
            />
            <ListItem
              primaryText={data.marketLink}
              secondaryText="Link"
              disabled
            />
          </List>
        </CardText>
        {currentUser.roles.includes('moderator') && <CardActions>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <FlatButton
              label="Edit"
              containerElement={<Link to={`/references/application-types/edit/${data.id}`} />}
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

ApplicationType.propTypes = {
  currentUser: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  remove: PropTypes.func.isRequired,
  isRemoveModalOpen: PropTypes.bool.isRequired,
  hideRemoveModal: PropTypes.func.isRequired,
  showRemoveModal: PropTypes.func.isRequired,
};

export default smartify(ApplicationType);
