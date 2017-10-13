import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import withJob from 'utils/with-job';
import api from 'api';
import { compose } from 'redux';
import { actions } from 'react-redux-form';
import { currentUser } from 'selectors';
import { withRouter } from 'react-router';

const selector = createStructuredSelector({
  currentUser,
});

const mapDispatchToProps = (dispatch, props) => ({
  change: (model, data) => dispatch(actions.change(model, data)),
  submit: (id) => (model) => {
    dispatch(api.actions.updateProfile(id, model))
      .then(data => props.history.push('/profile'));
  },
});

const work = ({ change, currentUser }) => change('profile', {
  name: currentUser.name,
  surname: currentUser.surname,
  middleName: currentUser.middleName,
});

export default compose(
  withRouter,
  connect(selector, mapDispatchToProps),
  withJob({
    work,
    shouldWorkAgain: (prev, next) => {
      return prev.currentUser.name !== next.currentUser.name ||
        prev.currentUser.surname !== next.currentUser.surname ||
        prev.currentUser.middleName !== next.currentUser.middleName;
    },
  })
);
