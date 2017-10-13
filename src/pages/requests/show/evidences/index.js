import React from 'react';
import PropTypes from 'prop-types';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import InputText from 'components/input-text';
import InputSelect from 'components/input-select';
import MenuItem from 'material-ui/MenuItem';
import UploadFile from 'smart/file-uploader';
import ErrorBox from 'components/error-box';
import { Form } from 'react-redux-form';
import CloseIcon from 'material-ui/svg-icons/navigation/close';
import IconButton from 'material-ui/IconButton';
import AddIcon from 'material-ui/svg-icons/content/add';
import withDialog from 'utils/with-dialog';
import styled from 'styled-components';

const Evidences = ({
  submit,
  form,
  open,
  rating,
  visit,
  requestId,
  evidences,
  closeAddDialog,
  removeEvidence,
  dialogOpen,
  canAddEvidence,
  toggleDialog,
}) => {
  const DialogTitle =
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      <div>
        Attachments
      </div>
      <div>
        {canAddEvidence && <IconButton onClick={toggleDialog}>
          <AddIcon />
        </IconButton>}
      </div>
    </div>;
  return (
    <Dialog
      title={DialogTitle}
      actions={[
        <FlatButton
          label="Close"
          onTouchTap={closeAddDialog}
        />,
      ]}
      open={open}
      modal
      autoScrollBodyContent
    >
      <div>
        {evidences.map((evidence, i) =>
          <StyledTable
            key={i}
            className="underlined"
          >
            <tbody>
              <tr>
                <th>URL</th>
                <td>{evidence.url && <a target="_blank" href={evidence.url}>{evidence.url}</a>}</td>
                <td rowSpan={3} style={{ textAlign: 'right' }}>
                  <IconButton onClick={() => removeEvidence(evidence)}>
                    <CloseIcon />
                  </IconButton>
                </td>
              </tr>
              <tr>
                <th>Description</th>
                <td>{evidence.description}</td>
              </tr>
              <tr>
                <th>Файл</th>
                <td>{evidence.filePath && <a target="_blank" href={`/uploads/${evidence.filePath}`}>{evidence.filePath}</a>}</td>
              </tr>
            </tbody>
          </StyledTable>
        )}
      </div>
      <Dialog
        title="Add attachment"
        actions={[
          <FlatButton
            label="Close"
            onTouchTap={() => {
              toggleDialog();
            }}
          />,
          <FlatButton
            label="Add"
            form="evidence-form"
            type="submit"
            primary
          />,
        ]}
        open={dialogOpen}
        modal
      >
        <Form
          model="evidenceForm"
          onSubmit={model => {
            submit(model);
            toggleDialog();
          }}
          id="evidence-form"
        >
          <InputText
            model=".url"
            floatingLabelText="URL"
            fullWidth
          />
          <br />
          <InputText
            model=".description"
            floatingLabelText="Description"
            rows={2}
            multiLine
            fullWidth
          />
          <br />
          {form.filePath.value !== '' && <center>
            <a target="_blank" href={`/uploads/${form.filePath.value}`}>{form.filePath.value}</a>
          </center>}
          <UploadFile model=".filePath" />
        </Form>
      </Dialog>
    </Dialog>
  );
};

const StyledTable = styled.table`
  width: 100%;
  td, th {
    text-align: left;
    padding: .5rem 3px;
  }
`;

Evidences.propTypes = {
  submit: PropTypes.func.isRequired,
  evidences: PropTypes.array.isRequired,
  form: PropTypes.object.isRequired,
  removeEvidence: PropTypes.func.isRequired,
};

export default withDialog(Evidences);
