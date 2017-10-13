import { connect } from 'react-redux';
import api from 'api';

const mapDispatchToProps = (dispatch) => ({
  uploadFile: (data) => {
    return dispatch(api.actions.uploadFile(data));
  },
});

export default connect(null, mapDispatchToProps);
