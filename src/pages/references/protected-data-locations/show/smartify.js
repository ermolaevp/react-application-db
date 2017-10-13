import { compose } from 'redux';
import { connect } from 'react-redux';
import api from 'api';
import { createStructuredSelector } from 'reselect';
import { id } from 'selectors';
import withJob from 'utils/with-job';
import { withState, withHandlers } from 'recompose';
import { withRouter } from 'react-router';

const selector = createStructuredSelector({
  id,
  data: state => state.oneProtectedDataLocation.results,
});

const mapDispatchToProps = (dispatch, { history }) => ({
  load: (id) => dispatch(api.actions.oneProtectedDataLocation.get(id)),
  remove: (id) => (e) => dispatch(api.actions.protectedDataLocations.remove(id))
    .then(data => history.push('/references/protected-data-locations')),
});

const work = ({ load, id }) => load(id);

export default compose(
  withRouter,
  withState('isRemoveModalOpen', 'setRemoveModalState', false),
  withHandlers({
    showRemoveModal: ({ setRemoveModalState }) => (e) => setRemoveModalState(true),
    hideRemoveModal: ({ setRemoveModalState }) => (e) => setRemoveModalState(false),
  }),
  connect(selector, mapDispatchToProps),
  withJob({ work }),
);
