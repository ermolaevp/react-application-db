import React from 'react';
import PropTypes from 'prop-types';
import MainLayout from 'layouts/main';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const References = ({ currentUser }) => {
  return (
    <MainLayout title="References">
      <Container>
        <RefLink to="/references/os-types"><span>OSes</span></RefLink>
        <RefLink to="/references/application-types"><span>Applications</span></RefLink>
        <RefLink to="/references/protected-data-types"><span>Data types</span></RefLink>
        <RefLink to="/references/protected-data-locations"><span>Locations</span></RefLink>
      </Container>
    </MainLayout>
  );
};

const RefLink = styled(Link)`
  display: flex;
  width: 170px;
  height: 170px;
  background-color: white;
  text-align: center;
  margin: 0 0.5rem 1rem;
  padding: 0 10px;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 6px, rgba(0, 0, 0, 0.12) 0px 1px 4px;
  &:hover {
    background-color: #E8EAF6;
  }
  > span {
    width: 100%;
    align-self: center;
    text-align: center;
  }
`;

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;

References.propTypes = {
  currentUser: PropTypes.object.isRequired,
};

export default References;
