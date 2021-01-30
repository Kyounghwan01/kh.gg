import React, { useState, useEffect } from 'react';
import PageNation from 'component/Pagenation';
import MyDetail from 'component/MyDetail';
import MatchEachDetail from 'component/MatchEachDetail';
import styled from 'styled-components';
import { observer } from 'mobx-react';
import useStores from 'lib/useStores';
import { userProps } from 'types/usetStore.type';
import { Redirect } from 'react-router-dom';

const Match = () => {
  const { userStore }: { userStore: userProps } = useStores();
  const [isRedirect, setIsRedirect] = useState<boolean>(false);

  useEffect(() => {
    if (!userStore.matchInfo.length) {
      setIsRedirect(true);
    }
  }, [userStore]);

  return (
    <>
      {!isRedirect ? (
        <MatchContainer>
          {userStore.matchInfo.map(match => {
            return (
              <React.Fragment key={match.gameId}>
                <MyDetail match={match} />
                {match.isOpenDetail && <MatchEachDetail match={match} />}
              </React.Fragment>
            );
          })}
          <PageNation />
        </MatchContainer>
      ) : (
        <Redirect to="/" />
      )}
    </>
  );
};

const MatchContainer = styled.div`
  .empty-item {
    display: inline-block;
    width: 22px;
    height: 22px;
    background: grey;
    opacity: 0.3;
    border-radius: 5px;
  }
  .champ-image-width-height {
    width: 60px;
    height: 60px;
  }
  .img-width-height {
    width: 30px;
    height: 30px;
  }
  .height-15 {
    height: 15px;
  }
  .champion-info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    &__image-box {
      display: flex;
      justify-content: center;
    }
    p {
      color: #555;
      text-align: center;
      margin-top: 15px;
    }
  }
`;

export default observer(Match);
