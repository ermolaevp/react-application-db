import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { id, user } from 'selectors';
import api from 'api';
import withJob from 'utils/with-job';
import { actions } from 'react-redux-form';
import { withRouter } from 'react-router';

const MODEL = 'profile';

const selector = createStructuredSelector({
  id,
  user,
});

const mapDispatchToProps = (dispatch, props) => ({
  submit: (id) => (model) => {
    return dispatch(api.actions.updateProfile(id, model))
      .then(data => dispatch(api.actions.users.get()))
      .then(props.history.push(`/users/${id}`));
  },
  change: (model, data) => dispatch(actions.change(model, data)),
  setRole: (userRole, role, status) => dispatch(api.actions.setUserRole({ userRole, role, status })),
  toggleActive: (id) => dispatch(api.actions.toggleUserActivation({ id })),
  load: (id) => dispatch(api.actions.oneUser.get(id)).then(data => dispatch(actions.change(MODEL, data))),
});

const work = ({ id, load }) => load(id);

export default compose(
  withRouter,
  connect(selector, mapDispatchToProps),
  withJob({ work })
);
