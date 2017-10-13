import { connect } from 'react-redux';
import { compose } from 'redux';
import { createSelector, createStructuredSelector } from 'reselect';
import { id, users } from 'selectors';
import api from 'api';
import withJob from 'utils/with-job';
import checkRole from 'utils/check-role';

const user = createSelector(
  id,
  users,
  (id, users) => checkRole(users.find(u => u.id === id)),
);

const selector = createStructuredSelector({
  user,
});

const mapDispatchToProps = (dispatch, props) => ({
  load: () => dispatch(api.actions.users.get()),
});

const work = ({ load }) => load();

export default compose(
  connect(selector, mapDispatchToProps),
  withJob({ work }),
);
