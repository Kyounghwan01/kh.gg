import React, { useEffect, useState } from 'react';
import MainLayout from 'component/MainLayout';
// import useStores from 'lib/hook/useStores';
import { observer, inject } from 'mobx-react';
import { TestInterface } from 'store/TestStore';
import { useParams } from 'react-router';

interface HomeContainerProps {
  testStore: TestInterface;
}

const Index = ({ testStore }: { testStore: TestInterface }) => {
  const test = useParams();
  const [userName, setUserName] = useState<string>('');

  const onChangeSummerName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(e.currentTarget.value);
  };

  const searchUserName = () => {
    testStore.search(userName);
    setUserName('');
  };

  return (
    <MainLayout>
      <div>search box</div>
      <input type="text" value={userName} onChange={onChangeSummerName} />
      <button onClick={searchUserName}>찾기!</button>
      {testStore.loading && <span>로딩중!</span>}
      {JSON.stringify(testStore.userData)}
    </MainLayout>
  );
};

export default inject('testStore')(observer(Index));
