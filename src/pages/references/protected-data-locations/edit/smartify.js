import { compose } from 'redux';
import { connect } from 'react-redux';
import api from 'api';
import { createStructuredSelector } from 'reselect';
import { id } from 'selectors';
import withJob from 'utils/with-job';
import { actions } from 'react-redux-form';
import { withRouter } from 'react-router';
import translates from 'constants/error-translates';

const MODEL = 'protectedDataLocationForm';

const selector = createStructuredSelector({
  id,
});

const mapDispatchToProps = (dispatch, { history }) => ({
  load: (id) => dispatch(api.actions.oneProtectedDataLocation.get(id))
    .then(data => dispatch(actions.change('protectedDataLocationForm', data))),
  submit: (data) => {
    const request = dispatch(api.actions.protectedDataLocations.update(data.id, data))
      .catch(err => Promise.reject({ commonErrors: translates[err.message] || err.message }));
    dispatch(actions.submit(MODEL, request, { fields: true }))
      .then(data => history.push(`/references/protected-data-locations/show/${data.id}`));
  },
  reset: () => dispatch(actions.reset(MODEL)),
});

const work = ({ load, id }) => load(id);

export default compose(
  withRouter,
  connect(selector, mapDispatchToProps),
  withJob({ work })
);
