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
  data: state => state.oneApplicationType.results,
});

const mapDispatchToProps = (dispatch, { history }) => ({
  load: (id) => dispatch(api.actions.oneApplicationType.get({ id: `eq.${id}`, select: '*,os_types(*)' })),
  remove: (id) => (e) => dispatch(api.actions.applicationTypes.remove(id))
    .then(data => history.push('/references/application-types')),
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
