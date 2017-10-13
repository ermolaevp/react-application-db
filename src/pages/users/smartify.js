import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import withJob from 'utils/with-job';
import api from 'api';
import { users, search, usersPaginationMeta } from 'selectors';
import { withState, withHandlers } from 'recompose';
import { withRouter } from 'react-router';
import withOrder from 'utils/with-order';
import queryString from 'query-string';

const selector = createStructuredSelector({
  search,
  users,
  usersPaginationMeta,
});

const mapDispatchToProps = (dispatch, props) => ({
  load: (search = {}) => {
    const order = props.getOrderObject();
    dispatch(api.actions.users.get({ limit: 15, offset: 0, ...order, ...search }));
  },
  submit: (model) => {
    const res = {};
    Object.keys(model).forEach(k => {
      const v = model[k];
      if (v !== '') {
        if (typeof v === 'string') res[k] = `like.*${v}*`;
        if (typeof v === 'number') res[k] = `eq.${v}`;
      }
    });
    props.history.push('/users?' + queryString.stringify(res));
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
