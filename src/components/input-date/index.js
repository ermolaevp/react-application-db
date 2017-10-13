import React from 'react';
import PropTypes from 'prop-types';
import { Control } from 'react-redux-form';
import DatePicker from 'material-ui/DatePicker';

const InputDate = ({ model, ...rest }) =>
  <Control
    model={model}
    component={props => {
      return (
        <div>
          <DatePicker
            {...props}
            errorText={props.touched && props.error}
            value={props.value && new Date(props.value)}
            onChange={(event, value) => props.onChange(new Date(value))}
          />
        </div>
      );
    }}
    controlProps={rest}
  />;

InputDate.propTypes = {
  model: PropTypes.string.isRequired,
};

export default InputDate;
