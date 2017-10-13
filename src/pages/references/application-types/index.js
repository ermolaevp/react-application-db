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
import FlatButton from 'material-ui/FlatButton';
import FilterIcon from 'material-ui/svg-icons/content/filter-list';
import EditIcon from 'material-ui/svg-icons/editor/mode-edit';
import DoneIcon from 'material-ui/svg-icons/action/done';
import { Form } from 'react-redux-form';
import InputText from 'components/input-text';
import InputSelect from 'components/input-select';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import AddButton from 'components/add-button';

const ApplicationTypes = ({
  currentUser,
  applicationTypes,
  osTypes,
  toggleOrdering,
  getDirection,
  submit,
  isFilterFormOpen,
  toggleFilterForm,
  visitLink,
  visit,
}) => {
  if (visitLink) return <Redirect push to={visitLink} />;
  const title = [
    { name: 'References', link: '/references' },
    { name: 'Applications' },
  ];
  return (
    <MainLayout title={title}>
      {currentUser.isModerator && <AddButton onClick={visit('/references/application-types/add')} />}
      <Form model="applicationTypeFilterForm" onSubmit={submit}>
        <Table>
          <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
            <TableRow>
              <TableHeaderColumnOrderable
                onTouchTap={toggleOrdering('name')}
                direction={getDirection('name')}
              >
                <span>Name</span>
              </TableHeaderColumnOrderable>
              <TableHeaderColumnOrderable
                onTouchTap={toggleOrdering('name', 'osTypes')}
                direction={getDirection('name', 'osTypes')}
              >
                <span>OS</span>
              </TableHeaderColumnOrderable>
              <TableHeaderColumnOrderable
                onTouchTap={toggleOrdering('marketLink')}
                direction={getDirection('marketLink')}
              >
                <span>Link</span>
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
                  model={'.name'}
                  floatingLabelText="Name"
                  fullWidth
                />
              </TableHeaderColumn>
              <TableHeaderColumn>
                <InputSelect
                  floatingLabelText="OS"
                  model=".osTypeId"
                  fullWidth
                >
                  <MenuItem value={null} primaryText="" />
                  {osTypes.map(osType =>
                    <MenuItem
                      key={osType.id}
                      value={osType.id}
                      primaryText={osType.name}
                    />)}
                </InputSelect>
              </TableHeaderColumn>
              <TableHeaderColumn>
                <InputText
                  model={'.marketLink'}
                  floatingLabelText="Link"
                  fullWidth
                />
              </TableHeaderColumn>
              <TableHeaderColumn style={{ textAlign: 'right' }}>
                <IconButton type="submit">
                  <DoneIcon />
                </IconButton>
              </TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false} showRowHover>
            {applicationTypes.map(entity =>
              <TableRow
                key={entity.id}
                onTouchTap={visit(`/references/application-types/show/${entity.id}`)}
              >
                <TableRowColumn>
                  {entity['name']}
                </TableRowColumn>
                <TableRowColumn>
                  {entity.osTypes['name']}
                </TableRowColumn>
                <TableRowColumn>
                  {entity['marketLink']}
                </TableRowColumn>
                <TableRowColumn style={{ textAlign: 'right' }} onTouchTap={e => e.stopPropagation()}>
                  {currentUser.roles.includes('moderator') && <IconButton onClick={visit(`/references/application-types/edit/${entity.id}`)}>
                    <EditIcon />
                  </IconButton>}
                </TableRowColumn>
              </TableRow>
            )}
          </TableBody>
          <TableFooter adjustForCheckbox={false}>
            <TableRow>
              <TableRowColumn />
            </TableRow>
          </TableFooter>
        </Table>
      </Form>
    </MainLayout>
  );
};

ApplicationTypes.propTypes = {
  currentUser: PropTypes.object.isRequired,
  applicationTypes: PropTypes.array.isRequired,
  osTypes: PropTypes.array.isRequired,
  toggleOrdering: PropTypes.func.isRequired,
  getDirection: PropTypes.func.isRequired,
  submit: PropTypes.func.isRequired,
  isFilterFormOpen: PropTypes.bool.isRequired,
  toggleFilterForm: PropTypes.func.isRequired,
  visitLink: PropTypes.any,
  visit: PropTypes.func.isRequired,
};

export default smartify(ApplicationTypes);
