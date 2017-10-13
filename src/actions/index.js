import * as actionTypes from 'constants/action-types';

export const updateToken = payload => ({ type: actionTypes.UPDATE_TOKEN, payload });
export const logout = () => ({ type: actionTypes.LOGOUT });
