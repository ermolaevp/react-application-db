import { connect } from 'react-redux';
import { logout } from 'actions';

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout()),
});

export default connect(null, mapDispatchToProps);
