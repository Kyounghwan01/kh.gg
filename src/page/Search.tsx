import React, { useEffect, useState } from 'react';
import MainLayout from 'component/MainLayout';
import { observer, inject } from 'mobx-react';
import { TestInterface } from 'store/TestStore';
import { ChampInterface } from 'store/ChampStore';
import { useParams } from 'react-router';

interface HomeContainerProps {
  testStore: TestInterface;
  champStore: ChampInterface;
}

const Index = ({ testStore, champStore }: HomeContainerProps) => {
  const test = useParams();
  const [userName, setUserName] = useState<string>('');

  useEffect(() => {
    champStore.getAllChamps();
  }, [champStore]);

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
      <button onClick={champStore.getAllChamps}>test</button>
      <input type="text" value={userName} onChange={onChangeSummerName} />
      <button onClick={searchUserName}>찾기!</button>
      {testStore.loading && <span>로딩중!</span>}
      {JSON.stringify(testStore.userData)}
    </MainLayout>
  );
};

export default inject('testStore', 'champStore')(observer(Index));
