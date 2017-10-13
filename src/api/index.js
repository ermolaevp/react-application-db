import {
  makeActionCreator,
  makePostActionCreator,
  makePostIdActionCreator,
  makeIdActionCreator,
  makeIdDeleteActionCreator,
  makeSendFileActionCreator,
  makeReducer,
  makeRawReducer,
} from './helpers';

import {
  logout,
  updateToken,
} from '../actions';

import * as actionTypes from 'constants/action-types';

const initalCurrentUser = { roles: [] };

const endpoint = process.env.ENDPOINT;
const makeAction = makeActionCreator(endpoint, fetch);
const makeIdAction = makeIdActionCreator(endpoint, fetch);
const makePostAction  = makePostActionCreator(endpoint, fetch);
const makeIdPostAction = makePostIdActionCreator(endpoint, fetch);
const makeIdDeleteAction = makeIdDeleteActionCreator(endpoint, fetch);
const makeSendFileAction = makeSendFileActionCreator(endpoint, fetch);

const columns = {
  profiles: ['name', 'surname', 'middleName'],
  applicationTypes: ['name', 'osTypeId', 'marketLink'],
  applications: ['applicationTypeId', 'version', 'description', 'recommendations', 'releasedAt', 'privacyPolicy'],
  oses: ['osTypeId', 'version', 'description', 'releasedAt'],
  requests: ['description', 'authorId', 'assigneeId', 'statusId', 'assigneeReason', 'sourceName', 'createdAt'],
  requestToApplication: ['requestId', 'applicationId'],
  requestToOs: ['requestId', 'osId'],
  ratings: ['requestId', 'dataConceptId', 'rateId', 'protectedDataTypeId', 'protectedDataLocationId'],
  evidences: ['ratingId', 'url', 'description', 'filePath', 'hash'],
};

const api = {
  actions: {
    // Users
    login: makePostAction('rpc/login', { after: saveTokenAndLoadUser }),
    signup: makePostAction('rpc/signup'),
    currentUser: makeAction('currentUser', 'current_users', { handleFailed: resetAuth, singular: true }),
    users: makeAction('users', 'users'),
    profiles: makeAction('profiles', 'profiles'),
    profile: makeAction('profile', 'profiles', { singular: true }),
    updateProfile: makeIdPostAction('profiles', { method: 'PATCH', whiteList: columns.profiles, after: reloadUser }),
    toggleUserActivation: makePostAction('rpc/toggle_user_activation', { after: loadUsersWithProfiles }),
    setUserRole: makePostAction('rpc/set_user_role', { after: reloadUsers }),
    changeEmail: makePostAction('rpc/change_email'),
    changePassword: makePostAction('rpc/change_password'),

    oneUser: makeIdAction('oneUser', 'users'),

    osTypes: {
      get: makeAction('osTypes', 'os_types').get,
      create: makePostAction('os_types'),
      update: makeIdPostAction('os_types', { method: 'PATCH', whiteList: ['name'] }),
      remove: makeIdDeleteAction('os_types', { after: reloadOsTypes }),
    },
    oneOsType: makeIdAction('oneOsType', 'os_types'),

    applicationTypes: {
      get: makeAction('applicationTypes', 'application_types').get,
      create: makePostAction('application_types'),
      update: makeIdPostAction('application_types', { method: 'PATCH', whiteList: columns.applicationTypes }),
      remove: makeIdDeleteAction('application_types', { after: reloadApplicationTypes }),
    },
    oneApplicationType: makeAction('oneApplicationType', 'application_types', { singular: true }),

    protectedDataLocations: {
      get: makeAction('protectedDataLocations', 'protected_data_locations').get,
      create: makePostAction('protected_data_locations'),
      update: makeIdPostAction('protected_data_locations', { method: 'PATCH', whiteList: ['name'] }),
      remove: makeIdDeleteAction('protected_data_locations', { after: reloadProtectedDataLocations }),
    },
    oneProtectedDataLocation: makeIdAction('oneProtectedDataLocation', 'protected_data_locations'),

    protectedDataTypes: {
      get: makeAction('protectedDataTypes', 'protected_data_types').get,
      create: makePostAction('protected_data_types'),
      update: makeIdPostAction('protected_data_types', { method: 'PATCH', whiteList: ['name'] }),
      remove: makeIdDeleteAction('protected_data_types', { after: reloadProtectedDataTypes }),
    },
    oneProtectedDataType: makeIdAction('oneProtectedDataType', 'protected_data_types'),

    applications: {
      get: makeAction('applications', 'applications').get,
      create: makePostAction('applications', { whiteList: columns.applications }),
      update: makeIdPostAction('applications', { method: 'PATCH', whiteList: columns.applications }),
      updateAll: makePostAction('applications', { method: 'PATCH', whiteList: columns.applications }),
      remove: makeIdDeleteAction('applications', { after: reloadApplications }),
    },
    oneApplication: makeIdAction('oneApplication', 'applications'),

    oses: {
      get: makeAction('oses', 'oses').get,
      create: makePostAction('oses', { whiteList: columns.oses }),
      update: makeIdPostAction('oses', { method: 'PATCH', whiteList: columns.oses }),
      updateAll: makePostAction('oses', { method: 'PATCH', whiteList: columns.oses }),
      remove: makeIdDeleteAction('oses', { after: reloadOses }),
    },
    oneOs: makeIdAction('oneOs', 'oses'),

    requests: {
      get: makeAction('requests', 'all_requests').get,
      create: makePostAction('requests', { whiteList: columns.requests }),
      update: makeIdPostAction('requests', { method: 'PATCH', whiteList: columns.requests }),
      remove: makeIdDeleteAction('requests', { after: reloadRequests }),
    },
    oneRequest: makeIdAction('oneRequest', 'all_requests'),

    evidences: {
      create: makePostAction('attachments', { whiteList: columns.evidences }),
      remove: makeIdDeleteAction('attachments'),
      removeFile: makeAction('remove', 'upload'),
    },

    statuses: {
      get: makeAction('statuses', 'statuses').get,
    },

    requestToApplication: {
      get: makeAction('requestToApplication', 'request_to_application').get,
      create: makePostAction('request_to_application', { whiteList: columns.requestToApplication }),
    },

    requestToOs: {
      get: makeAction('requestToOs', 'request_to_os').get,
      create: makePostAction('request_to_os', { whiteList: columns.requestToOs }),
    },

    dataConcepts: {
      get: makeAction('dataConcepts', 'data_concepts').get,
    },

    rates: {
      get: makeAction('rates', 'rates').get,
    },

    ratings: {
      get: makeAction('ratings', 'all_ratings').get,
      create: makePostAction('ratings', { whiteList: columns.ratings }),
      remove: makeIdDeleteAction('ratings'),
    },
    oneRating: makeIdAction('oneRating', 'ratings'),

    uploadFile: makeSendFileAction('upload'),
  },
  reducers: {
    profiles: makeReducer('profiles'),
    users: makeReducer('users'),
    oneUser: makeReducer('oneUser'),
    osTypes: makeReducer('osTypes'),
    applications: makeReducer('applications'),
    oses: makeReducer('oses'),
    requests: makeReducer('requests'),
    statuses: makeReducer('statuses'),
    allRequests: makeReducer('allRequests'),
    applicationTypes: makeReducer('applicationTypes'),
    oneOsType: makeReducer('oneOsType'),
    oneApplicationType: makeReducer('oneApplicationType'),
    oneProtectedDataLocation: makeReducer('oneProtectedDataLocation'),
    oneProtectedDataType: makeReducer('oneProtectedDataType'),
    oneRequest: makeReducer('oneRequest'),
    oneRating: makeReducer('oneRating'),
    protectedDataLocations: makeReducer('protectedDataLocations'),
    protectedDataTypes: makeReducer('protectedDataTypes'),
    dataConcepts: makeReducer('dataConcepts'),
    rates: makeReducer('rates'),
    ratings: makeReducer('ratings'),
    currentUser: makeRawReducer('currentUser', {
      reducer: (state = initalCurrentUser, action) => {
        if (action.type === actionTypes.LOGOUT) {
          return initalCurrentUser;
        }
        return state;
      },
    }),
  },
};

function saveTokenAndLoadUser({ data, dispatch }) {
  const token = data[0].token;
  localStorage.setItem('token', token);
  dispatch(updateToken(token));
  return dispatch(api.actions.users.get());
}

function resetAuth({ dispatch, error }) {
  return dispatch(logout());
}

function reloadUser({ dispatch, data }) {
  return dispatch(api.actions.currentUser.get());
}

function reloadUsers({ dispatch, data }) {
  return dispatch(api.actions.users.get());
}

function reloadOsTypes({ dispatch, data }) {
  return dispatch(api.actions.osTypes.get());
}

function reloadApplications({ dispatch, data }) {
  return dispatch(api.actions.applications.get());
}

function reloadOses({ dispatch, data }) {
  return dispatch(api.actions.oses.get());
}

function reloadRequests({ dispatch, data }) {
  return dispatch(api.actions.requests.get());
}

function reloadApplicationTypes({ dispatch, data }) {
  return dispatch(api.actions.applicationTypes.get());
}

function reloadProtectedDataTypes({ dispatch, data }) {
  return dispatch(api.actions.protectedDataTypes.get());
}

function reloadProtectedDataLocations({ dispatch, data }) {
  return dispatch(api.actions.protectedDataLocations.get());
}

function loadUsersWithProfiles({ dispatch, data }) {
  return dispatch(api.actions.users.get());
}

export default api;
