import { compose } from 'redux';
import { connect } from 'react-redux';
import api from 'api';
import { createStructuredSelector } from 'reselect';
import { id, osTypes } from 'selectors';
import withJob from 'utils/with-job';
import { actions } from 'react-redux-form';
import { withRouter } from 'react-router';
import lifecycle from 'recompose/lifecycle';
import translates from 'constants/error-translates';

const MODEL = 'applicationTypeForm';

const selector = createStructuredSelector({
  id,
  osTypes,
});

const mapDispatchToProps = (dispatch, { history }) => ({
  load: (id) => {
    dispatch(api.actions.osTypes.get());
    dispatch(api.actions.oneApplicationType.get({ id: `eq.${id}`, select: '*,os_types(*)' }))
      .then(data => dispatch(actions.change(MODEL, data)));
  },
  submit: (data) => {
    const request = dispatch(api.actions.applicationTypes.update(data.id, data))
      .catch(err => Promise.reject({ commonErrors: translates[err.message] || err.message }));
    dispatch(actions.submit(MODEL, request, { fields: true }))
      .then(data => history.push(`/references/application-types/show/${data.id}`));
  },
  reset: () => dispatch(actions.reset(MODEL)),
});

const work = ({ load, id }) => load(id);

export default compose(
  withRouter,
  connect(selector, mapDispatchToProps),
  withJob({ work }),
);
