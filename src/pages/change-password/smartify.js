import connectForm from 'utils/connect-form';
import { actions } from 'react-redux-form';
import translates from 'constants/error-translates';

export default connectForm({
  form: 'changePassword',
  action: 'changePassword',
  after: ({ dispatch }) => dispatch(actions.reset('changePassword')),
  errorTransform: (err) => Promise.reject({
    commonErrors: translates[err.message] || err.message,
  }),
});
