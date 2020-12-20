import React, { useEffect } from 'react';
import { observer, inject } from 'mobx-react';
import { userProps } from 'store/UserStore';
import { ChampInterface } from 'store/ChampStore';
import MainLayout from 'component/MainLayout';

interface HomeContainerProps {
  userStore: userProps;
  champStore: ChampInterface;
}

// useEffect done 제거

const User = ({ userStore, champStore }: HomeContainerProps) => {
  useEffect(() => {
    userStore.resetDone();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <MainLayout>
      <div>user area</div>
    </MainLayout>
  );
};

export default inject('userStore', 'champStore')(observer(User));
