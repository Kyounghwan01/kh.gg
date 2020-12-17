import React, { useEffect, useState } from 'react';
import MainLayout from 'component/MainLayout';
import { observer, inject } from 'mobx-react';
import { TestInterface } from 'store/TestStore';
import { ChampInterface } from 'store/ChampStore';
import { useParams, useHistory } from 'react-router';

interface HomeContainerProps {
  testStore: TestInterface;
  champStore: ChampInterface;
}

const Search = ({ testStore, champStore }: HomeContainerProps) => {
  const test = useParams();
  const history = useHistory();
  const [userName, setUserName] = useState<string>('');

  useEffect(() => {
    champStore.getAllChamps();
  }, [champStore]);

  useEffect(() => {
    if (testStore.done) {
      history.push('/user');
    }
  }, [history, testStore.done]);

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

      {JSON.stringify(testStore.userData)}
      {testStore.loading && <span>로딩중!</span>}
      {testStore.errorMessage && <span>{testStore.errorMessage}</span>}
    </MainLayout>
  );
};

export default inject('testStore', 'champStore')(observer(Search));
