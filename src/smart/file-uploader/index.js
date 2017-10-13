import React from 'react';
import PropTypes from 'prop-types';
import smartify from './smartify';
import { Control } from 'react-redux-form';
import FlatButton from 'material-ui/FlatButton';

const FileUploader = ({ model, uploadFile }) =>
  <Control
    model={model}
    component={props =>
      <div>
        <center style={{ marginTop: '1rem' }}>
          <input
            type="file"
            id="add-file"
            accept="*/*"
            style={{ display: 'none' }}
            onChange={e => {
              for (let i = 0; i < e.target.files.length; i++) {
                const file = e.target.files[i];
                const fd = new FormData();
                fd.append('file', file);
                uploadFile(fd).then(data => {
                  props.onChange(data.Name);
                });
              }
              return false;
            }}
          />
          <FlatButton
            label="Add file"
            containerElement={<label htmlFor="add-file" />}
          />
        </center>
      </div>
    }
  />
  ;

FileUploader.propTypes = {
  model: PropTypes.string.isRequired,
  uploadFile: PropTypes.func.isRequired,
  onChange: PropTypes.func,
};

export default smartify(FileUploader);
