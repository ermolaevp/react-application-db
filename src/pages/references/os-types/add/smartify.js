import { compose } from 'redux';
import { connect } from 'react-redux';
import api from 'api';
import { actions } from 'react-redux-form';
import { withRouter } from 'react-router';
import lifecycle from 'recompose/lifecycle';
import translates from 'constants/error-translates';

const MODEL = 'osTypeForm';

const mapDispatchToProps = (dispatch, { history }) => ({
  submit: (data) => {
    const request = dispatch(api.actions.osTypes.create(data))
      .catch((err) => Promise.reject({ commonErrors: translates[err.message] || err.message }));
    dispatch(actions.submit(MODEL, request, { fields: true }))
      .then(data => history.push(`/references/os-types/show/${data[0].id}`));
  },
  reset: () => dispatch(actions.reset(MODEL)),
});

export default compose(
  withRouter,
  connect(null, mapDispatchToProps),
  lifecycle({
    componentDidMount() {
      this.props.reset();
    },
  }),
);
