import { createForms } from 'react-redux-form';

export default createForms({
  login: {
    email: '',
    password: '',
  },
  signup: {
    email: '',
    password: '',
    password_repeat: '',
  },
  profile: {
    name: '',
    surname: '',
    middleName: '',
  },
  applicationForm: {
    name: '',
    osTypeId: '',
    version: '',
    description: '',
    marketLink: '',
    recommendationForApplication: '',
    releaseTime: '',
  },
  userFilterForm: {
    surname: '',
    email: '',
    active: '',
  },
  osForm: {
    osTypeId: '',
    requestId: '',
    description: '',
    version: '',
  },
  osTypeForm: {
    name: '',
  },
  osTypeFilterForm: {
    name: '',
  },
  applicationTypeForm: {
    name: '',
    osTypeId: '',
    marketLink: '',
  },
  applicationTypeFilterForm: {
    name: '',
    osTypeId: '',
    marketLink: '',
  },
  protectedDataTypeForm: {
    name: '',
  },
  protectedDataTypeFilterForm: {
    name: '',
  },
  protectedDataLocationForm: {
    name: '',
  },
  protectedDataLocationFilterForm: {
    name: '',
  },
  changeEmail: {
    email: '',
    currentPassword: '',
  },
  changePassword: {
    password: '',
    passwordRepeat: '',
    currentPassword: '',
  },
  requestForm: {
    sourceName: 'application',
    applicationTypeId: '',
    osTypeId: '',
    version: '',
    sourceDescription: '',
    privacyPolicy: '',
    recommendations: '',
    requestDescription: '',
    assigneeReason: '',
    assigneeId: '',
    statusName: 'New',
  },
  requestsFilterForm: {
    id: '',
    sourceName: '',
    osName: '',
    name: '',
    version: '',
    statusName: '',
  },
  ratingForm: {
    dataConceptId: '',
    rateId: '',
    protectedDataTypeId: '',
    protectedDataLocationId: '',
  },
  evidenceForm: {
    ratingId: '',
    url: '',
    description: '',
    filePath: '',
    hash: '',
  },
});
