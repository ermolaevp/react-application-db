import React from 'react';
import PropTypes from 'prop-types';
import smartify from './smartify';
import MainLayout from 'layouts/main';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
  TableFooter,
} from 'material-ui/Table';
import LockIcon from 'material-ui/svg-icons/action/lock';
import { Redirect } from 'react-router';
import IconButton from 'material-ui/IconButton';
import EditIcon from 'material-ui/svg-icons/editor/mode-edit';
import FilterIcon from 'material-ui/svg-icons/content/filter-list';
import TableHeaderColumnOrderable from 'components/table-header-column-orderable';
import InputText from 'components/input-text';
import DoneIcon from 'material-ui/svg-icons/action/done';
import { Form } from 'react-redux-form';
import InputSelect from 'components/input-select';
import MenuItem from 'material-ui/MenuItem';
import AddButton from 'components/add-button';
import Pagination from 'components/pagination';

function fullName({ name, surname, middleName }) {
  let fName = surname;
  if (name.length > 0) fName += (' ' + name.charAt(0) + '.');
  if (middleName.length > 0) fName += (' ' + middleName.charAt(0) + '.');
  return fName;
}

const Users = ({
  submit,
  users,
  isFilterFormOpen,
  toggleFilterForm,
  toggleOrdering,
  getDirection,
  visitLink,
  visit,
  usersPaginationMeta,
}) => {
  if (visitLink) return <Redirect push to={visitLink} />;
  return (
    <MainLayout title="Users">
      <AddButton
        onClick={visit('/users/add')}
      />
      <Form model="userFilterForm" onSubmit={submit}>
        <Table>
          <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
            <TableRow>
              <TableHeaderColumnOrderable
                onTouchTap={toggleOrdering('name')}
                direction={getDirection('name')}
              >
                <span>Full name</span>
              </TableHeaderColumnOrderable>
              <TableHeaderColumnOrderable
                onTouchTap={toggleOrdering('email')}
                direction={getDirection('email')}
              >
                <span>Email</span>
              </TableHeaderColumnOrderable>
              <TableHeaderColumnOrderable
                onTouchTap={toggleOrdering('active')}
                direction={getDirection('active')}
              >
                <span>Activated</span>
              </TableHeaderColumnOrderable>
              <TableHeaderColumn style={{ textAlign: 'right' }}>
                <IconButton onClick={toggleFilterForm} >
                  <FilterIcon />
                </IconButton>
              </TableHeaderColumn>
            </TableRow>
            <TableRow style={{ display: isFilterFormOpen ? 'table-row' : 'none' }}>
              <TableHeaderColumn>
                <InputText
                  model={'.surname'}
                  floatingLabelText="Surname"
                  fullWidth
                />
              </TableHeaderColumn>
              <TableHeaderColumn>
                <InputText
                  model={'.email'}
                  floatingLabelText="Email"
                  fullWidth
                />
              </TableHeaderColumn>
              <TableHeaderColumn>
                <InputSelect
                  floatingLabelText="Activated"
                  model=".active"
                  fullWidth
                >
                  <MenuItem value={null} primaryText="" />
                  <MenuItem value={1} primaryText="Activated" />
                  <MenuItem value={0} primaryText="Blocked" />
                </InputSelect>
              </TableHeaderColumn>
              <TableHeaderColumn style={{ textAlign: 'right' }}>
                <IconButton type="submit">
                  <DoneIcon />
                </IconButton>
              </TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false} showRowHover>
            {users.map(user =>
              <TableRow
                key={user.id}
                onTouchTap={visit(`/users/${user.id}`)}
              >
                <TableRowColumn>{fullName(user)}</TableRowColumn>
                <TableRowColumn>{user.email}</TableRowColumn>
                <TableRowColumn>{!user.active && <LockIcon />}</TableRowColumn>
                <TableRowColumn style={{ textAlign: 'right' }} onTouchTap={e => e.stopPropagation()}>
                  <IconButton onClick={visit(`/users/${user.id}/edit`)}>
                    <EditIcon />
                  </IconButton>
                </TableRowColumn>
              </TableRow>
            )}
          </TableBody>
          <TableFooter adjustForCheckbox={false}>
            <TableRow>
              <TableRowColumn>
                {usersPaginationMeta && Math.ceil(usersPaginationMeta.total / 15) > 1 && <Pagination endpoint="users" {...usersPaginationMeta} />}
              </TableRowColumn>
            </TableRow>
          </TableFooter>
        </Table>
      </Form>
    </MainLayout>
  );
};

Users.propTypes = {
  submit: PropTypes.func.isRequired,
  users: PropTypes.array.isRequired,
  visit: PropTypes.func.isRequired,
  toggleFilterForm: PropTypes.func.isRequired,
  isFilterFormOpen: PropTypes.bool.isRequired,
  toggleOrdering: PropTypes.func.isRequired,
  getDirection: PropTypes.func.isRequired,
  visitLink: PropTypes.any,
  usersPaginationMeta: PropTypes.any,
};

export default smartify(Users);
