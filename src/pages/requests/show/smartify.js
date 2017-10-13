import { compose } from 'redux';
import { connect } from 'react-redux';
import api from 'api';
import { createStructuredSelector } from 'reselect';
import {
  id,
  dataConcepts,
  rates,
  protectedDataTypes,
  protectedDataLocations,
  ratings,
  users,
  statuses,
} from 'selectors';
import withJob from 'utils/with-job';
import { withRouter } from 'react-router';
import withAddDialog from 'utils/with-add-dialog';
import withRemoveDialog from 'utils/with-remove-dialog';
import { actions } from 'react-redux-form';
import checkRole from 'utils/check-role';
import withRemoveRatingDialog from 'utils/with-remove-rating-dialog';

const selector = createStructuredSelector({
  id,
  data: state => state.oneRequest.results,
  dataConcepts,
  rates,
  users,
  protectedDataTypes,
  protectedDataLocations,
  ratings,
  evidenceForm: state => state.forms.evidenceForm,
  statuses,
  ratingId: state => +state.forms.evidenceForm.ratingId.value,
  evidences: state => {
    const ratingId = +state.forms.evidenceForm.ratingId.value;
    const ratings = state.ratings.results;
    const rating = ratings.find(r => r.id === ratingId);
    return rating ? rating.attachments : [];
  },
  assigneeUser: state => {
    const assigneeId = state.oneRequest.results['assigneeId'];
    if (assigneeId) {
      const user = state.users.results.find(u => u.id === assigneeId);
      if (user) return checkRole(user);
    }
  },
  requestForm: state => state.forms.requestForm,
});

const mapDispatchToProps = (dispatch, { history, match }) => ({
  load: id => {
    dispatch(api.actions.users.get());
    dispatch(api.actions.statuses.get());
    dispatch(api.actions.oneRequest.get(id)).then(data => dispatch(actions.change('requestForm', data)));
    dispatch(api.actions.dataConcepts.get());
    dispatch(api.actions.rates.get());
    dispatch(api.actions.ratings.get({ requestId: `eq.${id}`, select: '*,attachments(*)' }));
    dispatch(api.actions.protectedDataTypes.get());
    dispatch(api.actions.protectedDataLocations.get());
  },
  submit: id => model => {
    dispatch(api.actions.ratings.create({ requestId: id, ...model }))
      .then(data => dispatch(api.actions.ratings.get({ requestId: `eq.${id}`, select: '*,attachments(*)' })))
      .then(dispatch(actions.reset('ratingForm')));
  },
  update: (statuses, users) => model => {
    const status = statuses.find(s => s.id === model.statusId);
    const user = users.find(u => u.id === model.assigneeId);
    const allowedUser = status && user && user.allowedRequestStatuses.includes(status.name);
    let assigneeId = !model.assigneeId ? null : model.assigneeId;
    let assigneeReason = model.assigneeReason;
    if (allowedUser === false) { // user does not fit status
      assigneeId = null;
      assigneeReason = '';
    }
    dispatch(api.actions.requests.update(model.id, {
      statusId: model.statusId,
      assigneeId,
      assigneeReason,
    })).then(data => dispatch(api.actions.oneRequest.get(data.id))
      .then(data => dispatch(actions.change('requestForm', data))));
  },
  setRatingId: ratingId => dispatch(actions.change('evidenceForm.ratingId', ratingId)),
  addEvidence: model => dispatch(api.actions.evidences.create(model))
    .then(data => dispatch(api.actions.ratings.get({ requestId: `eq.${match.params.id}`, select: '*,attachments(*)' })))
    .then(dispatch(actions.change('evidenceForm.url', '')))
    .then(dispatch(actions.change('evidenceForm.filePath', '')))
    .then(dispatch(actions.change('evidenceForm.description', '')))
    .then(dispatch(actions.change('evidenceForm.hash', ''))),
  removeEvidence: ({id, filePath}) => {
    dispatch(api.actions.evidences.remove(id));
    filePath && dispatch(api.actions.evidences.removeFile.get({ filePath }));
    dispatch(api.actions.ratings.get({ requestId: `eq.${match.params.id}`, select: '*,attachments(*)' }));
  },
  resetEvidenceForm: () => dispatch(actions.reset('evidenceForm')),
  removeRequest: id => () => dispatch(api.actions.requests.remove(id)).then(history.push('/requests')),
  resetAssigneeReason: () => dispatch(actions.change('requestForm.assigneeReason', '')),
  removeRating: id => () => {
    dispatch(api.actions.ratings.remove(id))
      .then(data => dispatch(api.actions.ratings.get({ requestId: `eq.${match.params.id}`, select: '*,attachments(*)' })));
  },
});

const work = ({ load, id }) => load(id);

export default compose(
  withRouter,
  withAddDialog,
  withRemoveDialog,
  withRemoveRatingDialog,
  connect(selector, mapDispatchToProps),
  withJob({ work }),
);
