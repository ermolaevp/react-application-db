import {
  withReducer,
  withHandlers,
  compose,
} from 'recompose';
import { decamelize } from 'humps';

export default compose(
  withReducer('order', 'dispatch', (state, action) => {
    switch (action.type) {
      case 'TOGGLE':
        let direction;
        if (state.direction === null || action.column !== state.column || action.table !== state.table) direction = 'desc';
        if (state.direction === 'desc') direction = 'asc';
        if (state.direction === 'asc') direction = null;
        return {
          column: action.column,
          table: action.table,
          direction,
        };
      case 'ASC':
        return { ...state, direction: 'asc' };
      case 'DESC':
        return { ...state, direction: 'desc' };
      default:
        return state;
    }
  }, { table: '', column: '', direction: null }),
  withHandlers({
    orderAsc: ({ dispatch }) => (e) => dispatch({ type: 'ASC' }),
    orderDesc: ({ dispatch }) => (e) => dispatch({ type: 'DESC' }),
    toggleOrdering: ({ dispatch }) => (column, table = '') => (e) => dispatch({ type: 'TOGGLE', table, column }),
    getDirection: ({ order }) => (column, table = '') => order.table === table && order.column === column && order.direction,
    getOrderObject: ({ order }) => () => {
      if (!order.direction) return {};
      const orderKey = order.table === '' ? 'order' : order.table + '.order';
      return { [orderKey]: decamelize(order.column) + '.' + order.direction };
    },
  }),
);
