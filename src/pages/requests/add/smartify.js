import { compose } from 'redux';
import { connect } from 'react-redux';
import api from 'api';
import { actions } from 'react-redux-form';
import { withRouter } from 'react-router';
import lifecycle from 'recompose/lifecycle';
import withJob from 'utils/with-job';
import translates from 'constants/error-translates';
import { createStructuredSelector } from 'reselect';
import { osTypes, applicationTypes, users, statuses } from 'selectors';

const MODEL = 'requestForm';

const selector = createStructuredSelector({
  osTypes,
  applicationTypes,
  users,
  statuses,
  form: state => state.requestForm,
});

const mapDispatchToProps = (dispatch, { history, currentUser }) => ({
  load: () => {
    dispatch(api.actions.osTypes.get());
    dispatch(api.actions.users.get());
    dispatch(api.actions.applicationTypes.get({ select: '*, os_types(id, name)' }));
  },
  submit: (formData) => {
    const data = {};
    Object.keys(formData).forEach(f => {
      if (formData[f] !== '') {
        data[f] = formData[f];
      }
    });
    let sourceCreate;
    let mappingCreate;
    let sourceForm;
    if (data.sourceName === 'application') {
      mappingCreate = api.actions.requestToApplication.create;
      sourceCreate = api.actions.applications.create;
      sourceForm = 'applicationForm';
    };
    if (data.sourceName === 'os') {
      mappingCreate = api.actions.requestToOs.create;
      sourceCreate = api.actions.oses.create;
      sourceForm = 'osForm';
    }
    const sourceRequest = dispatch(sourceCreate({ ...data, description: data.sourceDescription }))
      .then(sourceData => {
        dispatch(api.actions.requests.create({ ...data, description: data.requestDescription }))
          .then(requestData => {
            dispatch(mappingCreate({ [data.sourceName + 'Id']: sourceData[0].id, requestId: requestData[0].id }))
              .then(mapData => {
                dispatch(actions.reset(MODEL));
                dispatch(actions.reset('applicationForm'));
                dispatch(actions.reset('osForm'));
                history.push('/requests');
              });
          });
      })
      .catch(err => Promise.reject({ commonErrors: translates[err.message] || err.message }));
    dispatch(actions.reset('applicationForm.commonErrors'));
    dispatch(actions.reset('osForm.commonErrors'));
    dispatch(actions.submit(sourceForm, sourceRequest, { fields: true }));
  },
  reset: () => {
    dispatch(actions.reset(MODEL));
    dispatch(actions.reset('applicationForm'));
    dispatch(actions.reset('osForm'));
  },
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
