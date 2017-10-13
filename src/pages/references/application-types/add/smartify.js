import { compose } from 'redux';
import { connect } from 'react-redux';
import api from 'api';
import { actions } from 'react-redux-form';
import { withRouter } from 'react-router';
import lifecycle from 'recompose/lifecycle';
import withJob from 'utils/with-job';
import translates from 'constants/error-translates';
import { createStructuredSelector } from 'reselect';
import { id, osTypes } from 'selectors';

const selector = createStructuredSelector({
  id,
  osTypes,
});

const mapDispatchToProps = (dispatch, { history }) => ({
  load: () => dispatch(api.actions.osTypes.get()),
  submit: (data) => {
    const request = dispatch(api.actions.applicationTypes.create(data)).catch((err) => Promise.reject({
      commonErrors: translates[err.message] || err.message,
    }));
    dispatch(actions.submit('applicationTypeForm', request, { fields: true }))
      .then(data => history.push(`/references/application-types/show/${data[0].id}`));
  },
  reset: () => dispatch(actions.reset('applicationTypeForm')),
});

const work = ({ load }) => load();

export default compose(
  withRouter,
  connect(selector, mapDispatchToProps),
  withJob({ work }),
  lifecycle({
    componentDidMount() {
      this.props.reset();
    },
  }),
);
