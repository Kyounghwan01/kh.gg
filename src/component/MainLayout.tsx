import React from 'react';
import Header from 'component/Header';
import styled from 'styled-components';

type MainLayoutTypes = {
  children: React.ReactNode;
};

const MainLayout = ({ children }: MainLayoutTypes) => {
  return (
    <Container>
      <Header />
      {children}
    </Container>
  );
};

const Container = styled.div``;

export default MainLayout;
