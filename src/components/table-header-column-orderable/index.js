import React from 'react';
import PropTypes from 'prop-types';
import ArrowDown from 'material-ui/svg-icons/navigation/arrow-downward';
import ArrowUp from 'material-ui/svg-icons/navigation/arrow-upward';
import {
  TableHeaderColumn,
} from 'material-ui/Table';

const arrowStyle = {
  color: 'rgba(158,158,158)',
  width: '16px',
  height: '16px',
};

const TableHeaderColumnOrderable = ({ direction, ...rest }) =>
  <TableHeaderColumn
    {...rest}
    style={{
      cursor: 'pointer',
    }}
  >
    <div style={{ display: 'flex' }}>
      {direction === 'desc' && <ArrowDown style={arrowStyle} />}
      {direction === 'asc' && <ArrowUp style={arrowStyle} />}
      {rest.children}
    </div>
  </TableHeaderColumn>;

TableHeaderColumnOrderable.propTypes = {
  direction: PropTypes.any,
};

export default TableHeaderColumnOrderable;
