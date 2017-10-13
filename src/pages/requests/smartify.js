import api from 'api';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import withJob from 'utils/with-job';
import { compose } from 'redux';
import { withState, withHandlers } from 'recompose';
import queryString from 'query-string';
import withOrder from 'utils/with-order';
import { withRouter } from 'react-router';
import {
  statuses,
  search,
  requestsPaginationMeta,
} from 'selectors';

const selector = createStructuredSelector({
  search,
  requests: state => state.requests,
  statuses,
  requestsPaginationMeta,
});

const mapDispatchToProps = (dispatch, props) => ({
  load: (search = {}) => {
    const order = props.getOrderObject();
    dispatch(api.actions.statuses.get());
    dispatch(api.actions.requests.get({ limit: 15, offset: 0, ...order, ...search }));
  },
  submit: (model) => {
    const res = {};
    Object.keys(model).filter(k => model[k] !== '').forEach(k => {
      let v = model[k];
      if (k === 'id' || k === 'assignedToMe') {
        res[k] = `eq.${+v}`;
      } else {
        res[k] = `like.*${v}*`;
      }
    });
    props.history.push('/requests?' + queryString.stringify(res));
  },
});

const work = ({ load, search }) => load(search);

export default compose(
  withOrder,
  withRouter,
  withState('visitLink', 'setVisitLink', null),
  withState('isFilterFormOpen', 'setFilterFormState', false),
  withHandlers({
    toggleFilterForm: ({ setFilterFormState }) => (e) => setFilterFormState((current) => !current),
    visit: ({ setVisitLink }) => (visitLink) => (e) => setVisitLink(visitLink),
  }),
  connect(selector, mapDispatchToProps),
  withJob({
    work,
    shouldWorkAgain: (prev, next) => {
      return JSON.stringify(prev.order) !== JSON.stringify(next.order) ||
        JSON.stringify(prev.search) !== JSON.stringify(next.search);
    },
  })
);
