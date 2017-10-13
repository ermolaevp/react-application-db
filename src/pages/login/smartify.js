import connectForm from 'utils/connect-form';
import { compose } from 'redux';
import lifecycle from 'recompose/lifecycle';
import { actions } from 'react-redux-form';

const translates = {
  'invalid email or password': 'Invalid email or password',
  'user was not activated': 'User blocked',
};

export default compose(
  connectForm({
    form: 'login',
    action: 'login',
    after: ({ dispatch }) => dispatch(actions.reset('login')),
    errorTransform: (err) => Promise.reject({
      commonErrors: translates[err.message] || err.message,
    }),
  }),
  lifecycle({
    componentDidMount() {
      this.props.reset('login');
    },
  }),
);
