import React, { useEffect } from 'react';
import styled from 'styled-components';
import { observer, inject } from 'mobx-react';
import { userProps } from 'types/usetStore.type';
import { champProps } from 'types/champStore.type';
import MainLayout from 'component/MainLayout';
import UserInfo from 'component/UserInfo';
import Match from 'component/Match';

interface HomeContainerProps {
  userStore: userProps;
  champStore: champProps;
}

const User = ({ userStore, champStore }: HomeContainerProps) => {
  useEffect(() => {
    userStore.resetDone();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <MainLayout>
      <Container>
        <UserInfo />
        <div className="border"></div>
        <Match />
      </Container>
    </MainLayout>
  );
};

const Container = styled.div`
  width: 85%;
  margin: 0 auto;
`;

export default inject('userStore', 'champStore')(observer(User));
