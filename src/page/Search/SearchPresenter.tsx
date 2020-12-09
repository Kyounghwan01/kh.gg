import React, { useEffect } from 'react';
import MainLayout from 'component/MainLayout';
// import useStores from 'lib/hook/useStores';
import { observer, inject } from 'mobx-react';
import { TestInterface } from 'store/TestStore';

interface HomeContainerProps {
  testStore: TestInterface;
}

const SearchPresenter = ({ testStore }: { testStore: TestInterface }) => {
  useEffect(() => {
    console.log(testStore.eeee);
  }, [testStore]);

  return (
    <MainLayout>
      <div>search box</div>
      {/* {testStore} */}
      <button onClick={testStore.addTodo}>dd</button>
    </MainLayout>
  );
};

export default inject('testStore')(observer(SearchPresenter));
