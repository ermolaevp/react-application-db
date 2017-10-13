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
  data: state => state.oneProtectedDataType.results,
});

const mapDispatchToProps = (dispatch, { history }) => ({
  load: (id) => dispatch(api.actions.oneProtectedDataType.get(id)),
  remove: (id) => (e) => dispatch(api.actions.protectedDataTypes.remove(id))
    .then(data => history.push('/references/protected-data-types')),
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
