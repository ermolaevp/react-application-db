import React from 'react';
import Logo from 'components/logo';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Helmet from 'react-helmet';

const GuestLayout = ({ contentComponent, title, ...rest }) => (
  <Container>
    <Helmet title={title} />
    <FlexBox>
      <div>
        {React.createElement(contentComponent, rest)}
      </div>
    </FlexBox>
  </Container>
);

const Container = styled.div`

  height: 100vh;
`;

const FlexBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  margim-bottom: 66px;
`;

const Footer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  text-align: center;
  height: 66px;
  font-size: 12px;
  letter-spacing: -0.2px;
`;

GuestLayout.propTypes = {
  contentComponent: PropTypes.any.isRequired,
  title: PropTypes.string,
};

export default GuestLayout;
