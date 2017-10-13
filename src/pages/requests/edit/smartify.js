import { compose } from 'redux';
import { connect } from 'react-redux';
import api from 'api';
import { actions } from 'react-redux-form';
import { withRouter } from 'react-router';
import lifecycle from 'recompose/lifecycle';
import withJob from 'utils/with-job';
import translates from 'constants/error-translates';
import { createStructuredSelector } from 'reselect';
import { id, osTypes, applicationTypes, users, statuses } from 'selectors';

const MODEL = 'requestForm';

const selector = createStructuredSelector({
  id,
  osTypes,
  applicationTypes,
  users,
  statuses,
  form: state => state.requestForm,
  requestForm: state => state.forms.requestForm,
});

const mapDispatchToProps = (dispatch, { history, currentUser }) => ({
  load: (id) => {
    dispatch(api.actions.oneRequest.get(id)).then(data => dispatch(actions.change('requestForm', data)));
    dispatch(api.actions.osTypes.get());
    dispatch(api.actions.users.get());
    dispatch(api.actions.applicationTypes.get({ select: '*, os_types(id, name)' }));
  },
  submit: (data) => {
    let sourceUpdate;
    let sourceForm;
    let sourceId;
    if (data.sourceName === 'application') {
      sourceUpdate = api.actions.applications.updateAll;
      sourceForm = 'applicationForm';
      sourceId = 'applicationId';
    };
    if (data.sourceName === 'os') {
      sourceUpdate = api.actions.oses.updateAll;
      sourceForm = 'osForm';
      sourceId = 'osId';
    }
    const assigneeId = data.assigneeId === '' ? null : data.assigneeId;
    const sourceRequest = dispatch(sourceUpdate({ ...data, description: data.sourceDescription }, { id: `eq.${data[sourceId]}` }))
      .then(sourceData => {
        dispatch(api.actions.requests.update(data.id, { ...data, assigneeId, description: data.requestDescription }))
          .then(request => history.push(`/requests/${data.id}`));
      })
      .catch(err => Promise.reject({ commonErrors: translates[err.message] || err.message }));
    dispatch(actions.reset('applicationForm.commonErrors'));
    dispatch(actions.reset('osForm.commonErrors'));
    dispatch(actions.submit(sourceForm, sourceRequest, { fields: true }));
  },
  reset: () => dispatch(actions.reset(MODEL)),
  resetAssigneeReason: () => dispatch(actions.change(MODEL + '.assigneeReason', '')),
});

const work = ({ load, id }) => load(id);

export default compose(
  withRouter,
  connect(selector, mapDispatchToProps),
  withJob({ work }),
);
