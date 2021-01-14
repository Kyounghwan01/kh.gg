import React from 'react';
import { MobXProviderContext } from 'mobx-react';
import { userProps } from 'types/usetStore.type';
import { champProps } from 'types/champStore.type';

interface storeInterface {
  userStore: userProps;
  champStore: champProps;
}

function useStores() {
  return React.useContext(MobXProviderContext) as storeInterface;
}
export default useStores;
