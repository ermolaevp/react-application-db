import api from 'api';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import withJob from 'utils/with-job';
import { compose } from 'redux';
import { withState, withHandlers } from 'recompose';
import queryString from 'query-string';
import withOrder from 'utils/with-order';
import { withRouter } from 'react-router';

const selector = createStructuredSelector({
  search: (_, props) => queryString.parse(props.history.location.search),
  protectedDataTypes: state => state.protectedDataTypes.results,
});

const mapDispatchToProps = (dispatch, props) => ({
  load: (search = {}) => {
    const order = props.getOrderObject();
    dispatch(api.actions.protectedDataTypes.get({ ...order, ...search }));
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
    props.history.push('/references/protected-data-types?' + queryString.stringify(res));
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
