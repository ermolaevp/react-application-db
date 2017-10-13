import { compose } from 'redux';
import { connect } from 'react-redux';
import api from 'api';
import { createStructuredSelector } from 'reselect';
import { id } from 'selectors';
import withJob from 'utils/with-job';
import { actions } from 'react-redux-form';
import { withRouter } from 'react-router';
import translates from 'constants/error-translates';

const MODEL = 'osTypeForm';

const selector = createStructuredSelector({
  id,
});

const mapDispatchToProps = (dispatch, { history }) => ({
  load: (id) => dispatch(api.actions.oneOsType.get(id))
    .then(data => dispatch(actions.change('osTypeForm', data))),
  submit: (data) => {
    const request = dispatch(api.actions.osTypes.update(data.id, data))
      .catch(err => Promise.reject({ commonErrors: translates[err.message] || err.message }));
    dispatch(actions.submit(MODEL, request, { fields: true }))
      .then(data => history.push(`/references/os-types/show/${data.id}`));
  },
  reset: () => dispatch(actions.reset(MODEL)),
});

const work = ({ load, id }) => load(id);

export default compose(
  withRouter,
  connect(selector, mapDispatchToProps),
  withJob({ work }),
);
