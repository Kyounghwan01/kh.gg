import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import useStores from 'lib/useStores';
import { userProps } from 'types/usetStore.type';
import { champProps } from 'types/champStore.type';

const Match = () => {
  const { userStore, champStore }: { userStore: userProps; champStore: champProps } = useStores();
  useEffect(() => {
    if (!userStore.matchInfo.length) {
      userStore.setMatchData();
    }
  }, [champStore, userStore]);
  return <div>matches component</div>;
};

export default observer(Match);
