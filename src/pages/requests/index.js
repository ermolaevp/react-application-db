import React from 'react';
import PropTypes from 'prop-types';
import MainLayout from 'layouts/main';
import smartify from './smartify';
import { Redirect } from 'react-router';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
  TableFooter,
} from 'material-ui/Table';
import TableHeaderColumnOrderable from 'components/table-header-column-orderable';
import FilterIcon from 'material-ui/svg-icons/content/filter-list';
import EditIcon from 'material-ui/svg-icons/editor/mode-edit';
import DoneIcon from 'material-ui/svg-icons/action/done';
import AddIcon from 'material-ui/svg-icons/content/add';
import { Form } from 'react-redux-form';
import InputText from 'components/input-text';
import IconButton from 'material-ui/IconButton';
import InputSelect from 'components/input-select';
import MenuItem from 'material-ui/MenuItem';
import { List, ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import { Link } from 'react-router-dom';
import Pagination from 'components/pagination';

const Requests = ({
  currentUser,
  requests,
  statuses,
  toggleOrdering,
  getDirection,
  order,
  submit,
  isFilterFormOpen,
  toggleFilterForm,
  visitLink,
  visit,
  requestsPaginationMeta,
}) => {
  if (visitLink) return <Redirect push to={visitLink} />;
  const title = [
    { name: 'Requests' },
  ];
  const columns = [
    { field: 'id', name: 'ID' },
    { field: 'sourceName', name: 'Source' },
    { field: 'osName', name: 'OS' },
    { field: 'name', name: 'Name' },
    { field: 'version', name: 'Version' },
    { field: 'assignedToMe', name: 'Assignee to' },
    { field: 'statusName', name: 'Status' },
  ];
  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: '200px 1fr',
    gridColumnGap: '20px',
  };
  return (
    <MainLayout title={title}>
      <div style={gridStyle}>
        <div style={{ backgroundColor: '#ECEFF1' }}>
          <List>
            {(currentUser.isExpert || currentUser.isAnalyst) &&
              <ListItem
                primaryText="Add"
                leftIcon={<AddIcon />}
                onClick={visit('/requests/add')}
                style={{ backgroundColor: '#CFD8DC' }}
              />
            }
            {(currentUser.isExpert || currentUser.isAnalyst) && <Divider /> }
            <ListItem primaryText="All" containerElement={<Link to="/requests" />} />
            <ListItem primaryText="New" containerElement={<Link to="/requests?statusName=eq.New" />} />
            <ListItem primaryText="Created" containerElement={<Link to="/requests?statusName=eq.Created" />} />
            <ListItem primaryText="Rated" containerElement={<Link to="/requests?statusName=eq.Rated" />} />
            <ListItem primaryText="Approved" containerElement={<Link to="/requests?statusName=eq.Approved" />} />
            <ListItem primaryText="Released" containerElement={<Link to="/requests?statusName=eq.Released" />} />
            <Divider />
            <ListItem primaryText="For me" containerElement={<Link to="/requests?assignedToMe=eq.1" />} />
            <ListItem primaryText="For my role" containerElement={<Link to={`/requests?statusName=in.${currentUser.allowedRequestStatuses.join(',')}`} />} />
          </List>
        </div>
        <div>
          <Form model="requestsFilterForm" onSubmit={submit}>
            <Table>
              <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                <TableRow>
                  {columns.map(column =>
                    <TableHeaderColumnOrderable
                      key={column.field}
                      onTouchTap={toggleOrdering(column.field)}
                      direction={getDirection(column.field)}
                    >
                      <span>{column.name}</span>
                    </TableHeaderColumnOrderable>
                  )}
                  <TableHeaderColumn style={{ textAlign: 'right' }}>
                    <IconButton onClick={toggleFilterForm}>
                      <FilterIcon />
                    </IconButton>
                  </TableHeaderColumn>
                </TableRow>
                <TableRow style={{ display: isFilterFormOpen ? 'table-row' : 'none' }}>
                  {columns.map(column => {
                    if (column.field === 'id') {
                      return <TableHeaderColumn key={column.field}>
                        <InputText model={`.${column.field}`} floatingLabelText={column.name} type="number" min="0" fullWidth />
                      </TableHeaderColumn>;
                    }
                    if (column.field === 'assignedToMe') {
                      return <TableHeaderColumn key={column.field}>
                        <InputSelect
                          floatingLabelText={column.name}
                          model=".assignedToMe"
                          fullWidth
                        >
                          <MenuItem value={''} primaryText="" />
                          <MenuItem value={1} primaryText="me" />
                          <MenuItem value={0} primaryText="not me" />
                        </InputSelect>
                      </TableHeaderColumn>;
                    }
                    if (column.field === 'statusName') {
                      return <TableHeaderColumn key={column.field}>
                        <InputSelect
                          floatingLabelText={column.name}
                          model=".statusName"
                          fullWidth
                        >
                          <MenuItem value={''} primaryText="" />
                          {statuses.map(status =>
                            <MenuItem key={status.name} value={status.name} primaryText={status.name} />
                          )}
                        </InputSelect>
                      </TableHeaderColumn>;
                    }
                    return <TableHeaderColumn key={column.field}><InputText model={`.${column.field}`} floatingLabelText={column.name} fullWidth /></TableHeaderColumn>;
                  })}
                  <TableHeaderColumn style={{ textAlign: 'right' }}>
                    <IconButton type="submit">
                      <DoneIcon />
                    </IconButton>
                  </TableHeaderColumn>
                </TableRow>
              </TableHeader>
              <TableBody displayRowCheckbox={false} showRowHover>
                {requests.results.map(entity =>
                  <TableRow
                    key={entity.id}
                    onTouchTap={visit(`/requests/${entity.id}`)}
                  >
                    {columns.map(column => {
                      if (column.field === 'assignedToMe') return <TableRowColumn key={column.field}>{entity[column.field] === 1 ? 'me' : 'not me'}</TableRowColumn>;
                      return <TableRowColumn key={column.field}>{entity[column.field]}</TableRowColumn>;
                    })}
                    <TableRowColumn style={{ textAlign: 'right' }} onTouchTap={e => e.stopPropagation()}>
                      {((currentUser.isExpert || currentUser.isAnalyst) && entity['statusName'] === 'New') && <IconButton onClick={visit(`/requests/${entity.id}/edit`)}>
                        <EditIcon />
                      </IconButton>}
                    </TableRowColumn>
                  </TableRow>
                )}
              </TableBody>
              <TableFooter adjustForCheckbox={false}>
                <TableRow>
                  <TableRowColumn>
                    {requestsPaginationMeta && Math.ceil(requestsPaginationMeta.total / 15) > 1 && <Pagination endpoint="requests" {...requestsPaginationMeta} />}
                  </TableRowColumn>
                </TableRow>
              </TableFooter>
            </Table>
          </Form>
        </div>
      </div>
    </MainLayout>
  );
};

Requests.propTypes = {
  currentUser: PropTypes.object.isRequired,
  requests: PropTypes.object.isRequired,
  statuses: PropTypes.array.isRequired,
  toggleOrdering: PropTypes.func.isRequired,
  getDirection: PropTypes.func.isRequired,
  order: PropTypes.object.isRequired,
  submit: PropTypes.func.isRequired,
  isFilterFormOpen: PropTypes.bool.isRequired,
  toggleFilterForm: PropTypes.func.isRequired,
  visitLink: PropTypes.any,
  visit: PropTypes.func.isRequired,
  requestsPaginationMeta: PropTypes.any,
};

export default smartify(Requests);
