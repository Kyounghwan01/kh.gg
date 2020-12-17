import React, { useEffect } from 'react';
import { observer, inject } from 'mobx-react';
import MainLayout from 'component/MainLayout';

import { TestInterface } from 'store/TestStore';
import { ChampInterface } from 'store/ChampStore';

interface HomeContainerProps {
  testStore: TestInterface;
  champStore: ChampInterface;
}

const User = ({ testStore, champStore }: HomeContainerProps) => {
  useEffect(() => {
    console.log(testStore);
  }, [testStore]);
  return (
    <MainLayout>
      <div>user area</div>
    </MainLayout>
  );
};

export default inject('testStore', 'champStore')(observer(User));
