import React from 'react';
import PropTypes from 'prop-types';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';

const RemoveDialog = ({
  close,
  remove,
  open,
  children,
  ...rest
}) => {
  return (
    <Dialog
      actions={[
        <FlatButton
          label="Cancel"
          onTouchTap={close}
          primary
        />,
        <FlatButton
          label="Remove"
          onTouchTap={() => {
            remove();
            close();
          }}
          secondary
        />,
      ]}
      modal
      open={open}
      {...rest}
    >
      {children}
    </Dialog>
  );
};

RemoveDialog.propTypes = {
  children: PropTypes.any.isRequired,
  open: PropTypes.bool.isRequired,
  remove: PropTypes.func.isRequired,
  close: PropTypes.func.isRequired,
};

export default RemoveDialog;
