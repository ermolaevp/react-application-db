import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from './pages/home';

import Signup from './pages/signup';
import Login from './pages/login';
import Logout from './pages/logout';
import ChangePassword from './pages/change-password';
import ChangeEmail from './pages/change-email';

import Profile from './pages/profile';
import ProfileEdit from './pages/profile/edit';

import Users from './pages/users';
import UsersShow from './pages/users/show';
import UsersEdit from './pages/users/edit';
import UsersAdd from './pages/users/add';

import References from './pages/references';

import OsTypes from './pages/references/os-types';
import OsTypesShow from './pages/references/os-types/show';
import OsTypesEdit from './pages/references/os-types/edit';
import OsTypesAdd from './pages/references/os-types/add';

import ApplicationTypes from './pages/references/application-types';
import ApplicationTypesShow from './pages/references/application-types/show';
import ApplicationTypesEdit from './pages/references/application-types/edit';
import ApplicationTypesAdd from './pages/references/application-types/add';

import ProtectedDataTypes from './pages/references/protected-data-types';
import ProtectedDataTypesShow from './pages/references/protected-data-types/show';
import ProtectedDataTypesEdit from './pages/references/protected-data-types/edit';
import ProtectedDataTypesAdd from './pages/references/protected-data-types/add';

import ProtectedDataLocations from './pages/references/protected-data-locations';
import ProtectedDataLocationsShow from './pages/references/protected-data-locations/show';
import ProtectedDataLocationsEdit from './pages/references/protected-data-locations/edit';
import ProtectedDataLocationsAdd from './pages/references/protected-data-locations/add';

import Requests from './pages/requests';
import RequestsAdd from './pages/requests/add';
import RequestsEdit from './pages/requests/edit';
import RequestsShow from './pages/requests/show';

import NotFound from './pages/not-found';

import makeLayoutRoute from './utils/make-layout-route';
import GuestLayout from './layouts/guest';
import PrivateLayout from './layouts/private';

const GuestRoute = makeLayoutRoute(GuestLayout);
const PrivateRoute = makeLayoutRoute(PrivateLayout, { loginComponent: Login });

const Routes = () => (
  <Switch>
    <PrivateRoute exact path="/" component={Home} />
    <PrivateRoute path="/logout" component={Logout} />
    <PrivateRoute path="/change-password" component={ChangePassword} />
    <PrivateRoute path="/change-email" component={ChangeEmail} />

    <PrivateRoute path="/profile/edit" component={ProfileEdit} />
    <PrivateRoute path="/profile" component={Profile} />

    <PrivateRoute path="/users/add" component={UsersAdd} />
    <PrivateRoute path="/users/:id/:edit" component={UsersEdit} />
    <PrivateRoute path="/users/:id" component={UsersShow} />
    <PrivateRoute path="/users" component={Users} />

    <PrivateRoute path="/references/os-types/edit/:id" component={OsTypesEdit} />
    <PrivateRoute path="/references/os-types/show/:id" component={OsTypesShow} />
    <PrivateRoute path="/references/os-types/add" component={OsTypesAdd} />
    <PrivateRoute path="/references/os-types" component={OsTypes} />

    <PrivateRoute path="/references/application-types/edit/:id" component={ApplicationTypesEdit} />
    <PrivateRoute path="/references/application-types/show/:id" component={ApplicationTypesShow} />
    <PrivateRoute path="/references/application-types/add" component={ApplicationTypesAdd} />
    <PrivateRoute path="/references/application-types" component={ApplicationTypes} />

    <PrivateRoute path="/references/protected-data-types/edit/:id" component={ProtectedDataTypesEdit} />
    <PrivateRoute path="/references/protected-data-types/show/:id" component={ProtectedDataTypesShow} />
    <PrivateRoute path="/references/protected-data-types/add" component={ProtectedDataTypesAdd} />
    <PrivateRoute path="/references/protected-data-types" component={ProtectedDataTypes} />

    <PrivateRoute path="/references/protected-data-locations/edit/:id" component={ProtectedDataLocationsEdit} />
    <PrivateRoute path="/references/protected-data-locations/show/:id" component={ProtectedDataLocationsShow} />
    <PrivateRoute path="/references/protected-data-locations/add" component={ProtectedDataLocationsAdd} />
    <PrivateRoute path="/references/protected-data-locations" component={ProtectedDataLocations} />

    <PrivateRoute path="/requests/add" component={RequestsAdd} />
    <PrivateRoute path="/requests/:id/edit" component={RequestsEdit} />
    <PrivateRoute path="/requests/:id/ratings/:ratingId" component={RequestsShow} />
    <PrivateRoute path="/requests/:id" component={RequestsShow} />
    <PrivateRoute path="/requests" component={Requests} />

    <PrivateRoute path="/references" component={References} />
    <GuestRoute path="/signup" component={Signup} />
    <Route component={NotFound} />
  </Switch>
);

export default Routes;
