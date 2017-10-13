import React from 'react';
import AddIcon from 'material-ui/svg-icons/content/add';
import FlatButton from 'material-ui/FlatButton';

const AddButton = props => <FlatButton
  icon={<AddIcon />}
  style={{ marginBottom: '1rem' }}
  backgroundColor="#CFD8DC"
  {...props}
/>;

export default AddButton;
