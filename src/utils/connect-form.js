import { connect } from 'react-redux';
import { actions } from 'react-redux-form';
import { createStructuredSelector } from 'reselect';
import api from 'api';

const identity = x => x;

export default (options = {}) => {
  options.modelTransform = options.modelTransform || identity;
  options.errorTransform = options.errorTransform || identity;

  if (!options.form) {
    throw new Error('form is not set');
  }

  if (!options.action) {
    throw new Error('action is not set');
  }

  const selector = createStructuredSelector({
    form: state => state.forms[options.form].$form,
  });

  const mapDispatchToProps = dispatch => ({
    reset: (model) => dispatch(actions.reset(model)),
    submit: (model) => {
      const data = options.modelTransform(model);
      const request = dispatch(api.actions[options.action](data)).catch(options.errorTransform);
      dispatch(actions.submit(options.form, request, { fields: true }))
        .then(options.after ? options.after({ dispatch, data }) : null);
    },
  });

  return connect(selector, mapDispatchToProps);
};
