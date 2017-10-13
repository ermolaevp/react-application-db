import connectForm from 'utils/connect-form';
import { compose } from 'redux';
import { actions } from 'react-redux-form';

export default compose(
  connectForm({
    form: 'signup',
    action: 'signup',
    after: ({ dispatch }) => dispatch(actions.reset('signup')),
  })
);
