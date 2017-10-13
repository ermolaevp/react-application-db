import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { currentUser } from 'selectors';

const selector = createStructuredSelector({
  currentUser,
});

export default connect(selector);
