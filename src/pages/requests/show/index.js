import React from 'react';
import PropTypes from 'prop-types';
import MainLayout from 'layouts/main';
import smartify from './smartify';
import FlatButton from 'material-ui/FlatButton';
import { Link } from 'react-router-dom';
import Dialog from 'material-ui/Dialog';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import { TwoColumns } from 'components/elements';
import { Form } from 'react-redux-form';
import InputText from 'components/input-text';
import InputSelect from 'components/input-select';
import MenuItem from 'material-ui/MenuItem';
import MoreHorizIcon from 'material-ui/svg-icons/navigation/more-horiz';
import AddIcon from 'material-ui/svg-icons/content/add';
import DoneIcon from 'material-ui/svg-icons/action/done';
import DeleteIcon from 'material-ui/svg-icons/action/delete';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import DropDownMenu from 'material-ui/DropDownMenu';
import RemoveDialog from 'components/remove-dialog';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
  TableFooter,
} from 'material-ui/Table';
import Evidences from './evidences';
import { Redirect } from 'react-router';

const RequestsShow = ({
  currentUser,
  data,
  submit,
  dataConcepts,
  rates,
  protectedDataTypes,
  protectedDataLocations,
  ratings,
  addDialogOpen,
  openAddDialog,
  closeAddDialog,
  setRatingId,
  match,
  history,
  addEvidence,
  evidences,
  evidenceForm,
  removeEvidence,
  resetEvidenceForm,
  update,
  removeDialogOpen,
  closeRemoveDialog,
  removeRequest,
  openRemoveDialog,
  assigneeUser,
  requestForm,
  resetAssigneeReason,
  users,
  setAssignee,
  statuses,
  removeRatingDialogOpen,
  openRemoveRatingDialog,
  removeRating,
  closeRemoveRatingDialog,
  ratingId,
}) => {
  const title = [
    { name: 'Requests', link: '/requests' },
    { name: data.id },
  ];
  const hasAction = {
    change: (currentUser.isAnalyst || currentUser.isExpert) && data.statusName === 'New',
    rate: (currentUser.isExpert || currentUser.isResearcher) && data.statusName === 'Created',
    remove: currentUser.isModerator,
    addEvidence: (currentUser.isExpert || currentUser.isResearcher) && data.statusName === 'Created',
    setStatusNew: (((currentUser.isExpert || currentUser.isResearcher) && data.statusName === 'Created') || (currentUser.isExpert && data.statusName === 'Rated')),
    setStatusCreated: (((currentUser.isAnalyst || currentUser.isExpert) && data.statusName === 'New') || (currentUser.isExpert && data.statusName === 'Rated')),
    setStatusRated: ((currentUser.isExpert || currentUser.isResearcher) && data.statusName === 'Created'),
    setStatusApproved: ((currentUser.isModerator && data.statusName === 'Released') || (currentUser.isExpert && data.statusName === 'Rated')),
    setStatusReleased: (currentUser.isModerator && data.statusName === 'Approved'),
  };
  const statusSelectMenu = [];
  if (hasAction.setStatusNew) statusSelectMenu.push(<MenuItem key={1} value={1} primaryText="New" />);
  if (hasAction.setStatusCreated) statusSelectMenu.push(<MenuItem key={2} value={2} primaryText="Created" />);
  if (hasAction.setStatusRated) statusSelectMenu.push(<MenuItem key={3} value={3} primaryText="Rated" />);
  if (hasAction.setStatusApproved) statusSelectMenu.push(<MenuItem key={4} value={4} primaryText="Approved" />);
  if (hasAction.setStatusReleased) statusSelectMenu.push(<MenuItem key={5} value={5} primaryText="Released" />);
  return (
    <MainLayout title={title}>
      <Card style={{ marginBottom: '1rem' }}>
        <CardHeader
          title="Request"
        />
        <CardText>
          <TwoColumns>
            <div>
              <dl>
                <div>
                  <dt>Data type</dt>
                  <dd>{data.sourceName}</dd>
                </div>
                {data.sourceName === 'application' && <div>
                  <dt>OS</dt>
                  <dd>{data.osName}</dd>
                </div>}
                <div>
                  <dt>Name</dt>
                  <dd>{data.name}</dd>
                </div>
                {data.sourceName === 'application' && <div>
                  <dt>Link в магазин</dt>
                  <dd><a href={data.marketLink} target="_blank">{data.marketLink}</a></dd>
                </div>}
                <div>
                  <dt>Version</dt>
                  <dd>{data.version}</dd>
                </div>
                <div>
                  <dt>Released at</dt>
                  <dd>{data.releasedAt}</dd>
                </div>
                <div>
                  <dt>Description</dt>
                  <dd>{data.sourceDescription}</dd>
                </div>
                {data.sourceName === 'application' && <div>
                  <dt>Privacity policy</dt>
                  <dd>{data.privacyPolicy}</dd>
                </div>}
                {data.sourceName === 'application' && <div>
                  <dt>Recommendations</dt>
                  <dd>{data.recommendations}</dd>
                </div>}
              </dl>
            </div>
            <div>
              <Form
                model="requestForm"
                onSubmit={update(statuses, users)}
                id="request-form"
              >
                <dl>
                  <div>
                    <dt>ID</dt>
                    <dd>{data.id}</dd>
                  </div>
                  <div>
                    <dt>Created at</dt>
                    <dd>{data.createdAt}</dd>
                  </div>
                  <div>
                    <dt>Author</dt>
                    <dd>{data.authorFullName}</dd>
                  </div>
                  <div>
                    <dt>Request description</dt>
                    <dd>{data.requestDescription}</dd>
                  </div>
                  <div>
                    <dt>Status</dt>
                    <dd>{data.statusName}</dd>
                  </div>
                  <div>
                    <dt>Assignee to</dt>
                    <dd>
                      <InputSelect
                        model=".assigneeId"
                        afterChange={(value) => value === '' && resetAssigneeReason()}
                      >
                        <MenuItem value={''} primaryText="" />
                        {users.filter(u => u.allowedRequestStatuses.includes(data.statusName)).map(user =>
                          <MenuItem
                            key={user.id}
                            value={user.id}
                            primaryText={user.email}
                          />)}
                      </InputSelect>
                    </dd>
                  </div>
                  <div>
                    <dt>Assignee reason</dt>
                    <dd>
                      <InputText
                        model=".assigneeReason"
                        disabled={requestForm.assigneeId.value === ''}
                        rows={2}
                        multiLine
                      />
                    </dd>
                  </div>
                  {statusSelectMenu.length > 0 && <div>
                    <dt>Set status</dt>
                    <dd>
                      <InputSelect
                        floatingLabelText="Status"
                        model=".statusId"
                      >
                        <MenuItem value={''} primaryText="" />
                        {statusSelectMenu}
                      </InputSelect>
                    </dd>
                  </div>}
                </dl>
              </Form>
            </div>
          </TwoColumns>
        </CardText>
        <CardActions>
          <TwoColumns>
            <div style={{ display: 'flex' }}>
              {hasAction.change && <FlatButton
                label="Edit"
                containerElement={<Link to={`/requests/${data.id}/edit`} />}
              />}
              {hasAction.remove && <FlatButton
                label="Remove"
                onTouchTap={openRemoveDialog}
                secondary
              />}
            </div>
            <div style={{ textAlign: 'right' }}>
              <IconButton
                type="submit"
                form="request-form"
              >
                <DoneIcon />
              </IconButton>
            </div>
          </TwoColumns>
        </CardActions>}
      </Card>
      <Card>
        <CardHeader
          title="Ratings"
        />
        <CardText>
          <Form model="ratingForm" onSubmit={submit(data.id)}>
            <Table>
              <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                <TableRow>
                  <TableHeaderColumn>Data concept</TableHeaderColumn>
                  <TableHeaderColumn>Data types</TableHeaderColumn>
                  <TableHeaderColumn>Locations</TableHeaderColumn>
                  <TableHeaderColumn>Rating</TableHeaderColumn>
                  <TableHeaderColumn />
                </TableRow>
                <TableRow>
                  <TableHeaderColumn>
                    <InputSelect
                      floatingLabelText="Data concepts"
                      model=".dataConceptId"
                      fullWidth
                      disabled={!hasAction.rate}
                    >
                      <MenuItem value={null} primaryText="" />
                      {dataConcepts.map(dataConcept =>
                        <MenuItem
                          key={dataConcept.id}
                          value={dataConcept.id}
                          primaryText={dataConcept.name}
                        />)}
                    </InputSelect>
                  </TableHeaderColumn>
                  <TableHeaderColumn>
                    <InputSelect
                      floatingLabelText="Data"
                      model=".protectedDataTypeId"
                      fullWidth
                      disabled={!hasAction.rate}
                    >
                      <MenuItem value={null} primaryText="" />
                      {protectedDataTypes.map(protectedDataType =>
                        <MenuItem
                          key={protectedDataType.id}
                          value={protectedDataType.id}
                          primaryText={protectedDataType.name}
                        />)}
                    </InputSelect>
                  </TableHeaderColumn>
                  <TableHeaderColumn>
                    <InputSelect
                      floatingLabelText="Locations"
                      model=".protectedDataLocationId"
                      fullWidth
                      disabled={!hasAction.rate}
                    >
                      <MenuItem value={null} primaryText="" />
                      {protectedDataLocations.map(protectedDataLocation =>
                        <MenuItem
                          key={protectedDataLocation.id}
                          value={protectedDataLocation.id}
                          primaryText={protectedDataLocation.name}
                        />)}
                    </InputSelect>
                  </TableHeaderColumn>
                  <TableHeaderColumn>
                    <InputSelect
                      floatingLabelText="Ratings"
                      model=".rateId"
                      fullWidth
                      disabled={!hasAction.rate}
                    >
                      <MenuItem value={null} primaryText="" />
                      {rates.map(rate =>
                        <MenuItem
                          key={rate.id}
                          value={rate.id}
                          primaryText={`${rate.weight}`}
                        />)}
                    </InputSelect>
                  </TableHeaderColumn>
                  <TableHeaderColumn style={{ textAlign: 'right' }}>
                    {hasAction.rate && <IconButton type="submit">
                      <AddIcon />
                    </IconButton>}
                  </TableHeaderColumn>
                </TableRow>
              </TableHeader>
              <TableBody displayRowCheckbox={false} showRowHover>
                {ratings.map(entity =>
                  <TableRow
                    key={entity.id}
                  >
                    <TableRowColumn>{entity['dataConceptName']}</TableRowColumn>
                    <TableRowColumn>{entity['protectedDataTypeName']}</TableRowColumn>
                    <TableRowColumn>{entity['protectedDataLocationName']}</TableRowColumn>
                    <TableRowColumn>{entity['rateWeight']}</TableRowColumn>
                    <TableRowColumn style={{ textAlign: 'right' }}>
                      <IconButton>
                        <MoreHorizIcon onClick={() => {
                          setRatingId(entity.id);
                          openAddDialog();
                        }} />
                      </IconButton>
                      {hasAction.rate && <IconButton>
                        <DeleteIcon onClick={() => {
                          setRatingId(entity.id);
                          openRemoveRatingDialog();
                        }} />
                      </IconButton>}
                    </TableRowColumn>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </Form>
        </CardText>
      </Card>
      <Evidences
        submit={addEvidence}
        closeAddDialog={() => {
          closeAddDialog();
          resetEvidenceForm();
        }}
        open={addDialogOpen}
        evidences={evidences}
        form={evidenceForm}
        removeEvidence={removeEvidence}
        canAddEvidence={hasAction.addEvidence}
      />
      <RemoveDialog
        open={removeDialogOpen}
        close={closeRemoveDialog}
        remove={removeRequest(data.id)}
      >
        Remove request {data.id}?
      </RemoveDialog>
      <RemoveDialog
        open={removeRatingDialogOpen}
        close={closeRemoveRatingDialog}
        remove={removeRating(ratingId)}
      >
        Remove rating?
      </RemoveDialog>
    </MainLayout>
  );
};

RequestsShow.propTypes = {
  currentUser: PropTypes.object.isRequired,
  closeAddDialog: PropTypes.func.isRequired,
  data: PropTypes.any.isRequired,
};

export default smartify(RequestsShow);
