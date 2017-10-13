import React from 'react';
import PropTypes from 'prop-types';
import SelectField from 'material-ui/SelectField';
import { Control } from 'react-redux-form';

const InputSelect = ({ model, ...rest }) =>
  <Control
    model={model}
    component={({ afterChange, ...props }) =>
      <div>
        <SelectField
          value={props.value}
          errorText={props.touched && props.error}
          {...props}
          onChange={(event, index, value) => {
            props.onChange(value);
            afterChange && afterChange(value);
          }}
        >
          {rest.children}
        </SelectField>
      </div>
    }
    controlProps={rest}
  />;

InputSelect.propTypes = {
  model: PropTypes.string.isRequired,
};

export default InputSelect;
