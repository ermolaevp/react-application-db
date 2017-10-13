import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import Header from './header';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

function genTitle(title) {
  if (!Array.isArray(title)) return title;
  return title.map(t => t.name).reverse().join(' / ');
}

function genBreadcrumbs(title) {
  if (!Array.isArray(title)) return title;
  const stack = [...title];
  const breadcrumbs = [];
  while (stack.length !== 0) {
    const item = stack.shift();
    if (item.link && item.name) {
      breadcrumbs.push(<Link key={item.link} to={item.link} style={{ color: '#fff', textDecoration: 'underline' }}>{item.name}</Link>);
    } else if (item.name) {
      breadcrumbs.push(<span key={item.name}>{item.name}</span>);
    }
    if (stack.length !== 0) breadcrumbs.push(<span key={'separator' + stack.length}> / </span>);
  }
  return breadcrumbs;
}

const Main = ({ title, actions, toolbar, children, withBack }) => (
  <Container>
    <Helmet title={genTitle(title)} />
    <FixedHeader title={genBreadcrumbs(title)} actions={actions} withBack={withBack} />
    <Wrapper className={toolbar && 'with-toolbar'}>
      {children}
    </Wrapper>
    {toolbar && <Toolbar>{toolbar}</Toolbar>}
  </Container>
);

const FixedHeader = styled(Header)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 5000000;
  transform: translate3d(0, 0, 0);
  backface-visibility: hidden;
  transition: transform .2s ease-out;
`;

const Container = styled.div`
`;

const Toolbar = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  transform: translate3d(0, 0, 0);
  backface-visibility: hidden;
  transition: transform .2s ease-out;
  z-index: 999;
`;

const Wrapper = styled.div`
  margin-top: 1rem;

  &.with-toolbar {
    margin-bottom: 66px;
  }
`;

export const Content = styled.div`
  padding: 0 15px;
`;

Main.propTypes = {
  title: PropTypes.any,
  withBack: PropTypes.bool,
  actions: PropTypes.array,
  children: PropTypes.any,
  toolbar: PropTypes.any,
};

export default Main;
