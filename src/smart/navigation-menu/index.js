import React from 'react';
import PropTypes from 'prop-types';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui/svg-icons/navigation/menu';
import smartify from './smartify';
import { Link } from 'react-router-dom';
import allRoles from 'constants/roles';

const NavigationMenu = ({ roles = [], id }) => <IconMenu
  iconButtonElement={<IconButton><MenuIcon color="white" /></IconButton>}
  anchorOrigin={{ horizontal: 'left', vertical: 'top' }}
  targetOrigin={{ horizontal: 'left', vertical: 'top' }}
>
  {roles && roles.includes('webadmin') && <MenuItem primaryText="Users" containerElement={<Link to="/users" />} />}
  {roles && !roles.includes('webadmin') && roles.some(r => allRoles.includes(r)) && <MenuItem primaryText="References" containerElement={<Link to="/references" />} />}
</IconMenu>;

NavigationMenu.propTypes = {
  roles: PropTypes.array,
  id: PropTypes.number,
};

export default smartify(NavigationMenu);
