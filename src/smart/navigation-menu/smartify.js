import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

const selector = createStructuredSelector({
  roles: state => state.currentUser && state.currentUser.roles,
  id: state => state.currentUser && state.currentUser.id,
});

export default connect(selector);
