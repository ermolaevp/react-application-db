import React from 'react';
import PropTypes from 'prop-types';
import ErrorBox from 'components/error-box';
import { Form } from 'react-redux-form';
import InputText from 'components/input-text';
import InputSelect from 'components/input-select';
import MenuItem from 'material-ui/MenuItem';
import InputDate from 'components/input-date';
import { TwoColumns } from 'components/elements';

const RequestForm = ({
  form,
  submit,
  osTypes,
  applicationTypes,
  users,
  currentUser,
  resetAssigneeReason,
}) => {
  const marketLink = form.applicationTypeId && form.applicationTypeId !== '' &&
    applicationTypes.length > 0 &&
    applicationTypes.find(a => a.id === form.applicationTypeId).marketLink;
  return (
    <Form
      model="requestForm"
      onSubmit={submit}
      id="request-form"
    >
      <TwoColumns>
        <div style={{ padding: '0 20px' }}>
          <InputSelect
            floatingLabelText="Data type"
            model=".sourceName"
            disabled={!!form.id}
            required
            fullWidth
          >
            <MenuItem
              value="application"
              primaryText="Application"
            />
            <MenuItem
              value="os"
              primaryText="ОС"
            />
          </InputSelect>
          {form.sourceName === 'os' && <InputSelect
            floatingLabelText="OS"
            model=".osTypeId"
            fullWidth
            required
          >
            {osTypes.map(osType =>
              <MenuItem
                key={osType.id}
                value={osType.id}
                primaryText={osType.name}
              />)}
          </InputSelect>}
          {form.sourceName === 'application' && <div>
            <InputSelect
              floatingLabelText="Application"
              model=".applicationTypeId"
              fullWidth
              required
            >
              {applicationTypes.map(applicationType =>
                <MenuItem
                  key={applicationType.id}
                  value={applicationType.id}
                  primaryText={`(${applicationType.osTypes.name}) ${applicationType.name}`}
                />)}
            </InputSelect>
            {marketLink && <div style={{ paddingTop: '2rem' }}>
              <a href={marketLink} target="_blank">{marketLink}</a>
            </div>}
          </div>}
          <InputText
            model=".version"
            floatingLabelText="Version"
            fullWidth
            required
          />
          <InputDate
            model=".releasedAt"
            floatingLabelText="Released at"
            fullWidth
          />
          <InputText
            model=".sourceDescription"
            floatingLabelText="Description"
            rows={2}
            multiLine
            fullWidth
          />
          {form.sourceName === 'application' && <InputText
            model=".privacyPolicy"
            floatingLabelText="Privacity policy"
            rows={2}
            multiLine
            fullWidth
          />}
          {form.sourceName === 'application' && <InputText
            model=".recommendations"
            floatingLabelText="Recommendations"
            rows={2}
            multiLine
            fullWidth
          />}
        </div>
        <div style={{ padding: '0 20px' }}>
          <InputText
            model=".requestDescription"
            floatingLabelText="Request description"
            rows={2}
            multiLine
            fullWidth
          />
          <InputSelect
            floatingLabelText="Assignee to"
            model=".assigneeId"
            fullWidth
            afterChange={(value) => value === '' && resetAssigneeReason()}
          >
            <MenuItem value={''} primaryText="" />
            {users.filter(u => u.allowedRequestStatuses.includes(form.statusName)).map(user =>
              <MenuItem
                key={user.id}
                value={user.id}
                primaryText={user.email}
              />)}
          </InputSelect>
          <InputText
            model=".assigneeReason"
            floatingLabelText="Assignee reason"
            disabled={form.assigneeId === ''}
            rows={2}
            multiLine
            fullWidth
          />
        </div>
      </TwoColumns>
      <div style={{ textAlign: 'center' }}>
        <ErrorBox
          model="requestForm.commonErrors"
          show
        />
        <ErrorBox
          model="applicationForm.commonErrors"
          show
        />
        <ErrorBox
          model="osForm.commonErrors"
          show
        />
      </div>
    </Form>
  );
};

RequestForm.propTypes = {
  form: PropTypes.object.isRequired,
  currentUser: PropTypes.object.isRequired,
  submit: PropTypes.func.isRequired,
  osTypes: PropTypes.array.isRequired,
  users: PropTypes.array.isRequired,
  applicationTypes: PropTypes.array.isRequired,
};

export default RequestForm;
