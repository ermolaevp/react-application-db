import { compose } from 'redux';
import { connect } from 'react-redux';
import withJob from 'utils/with-job';
import { withRouter } from 'react-router';
import { logout } from 'actions';

const mapDispatchToProps = (dispatch, props) => ({
  logout: () => {
    dispatch(logout());
    props.history.push('/');
  },
});

const work = ({ logout }) => logout();

export default compose(
  withRouter,
  connect(null, mapDispatchToProps),
  withJob({ work }),
);
