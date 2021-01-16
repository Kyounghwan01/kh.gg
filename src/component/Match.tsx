import React, { useEffect } from 'react';
import styled from 'styled-components';
import { observer } from 'mobx-react';
import { toJS } from 'mobx';
import useStores from 'lib/useStores';
import { userProps } from 'types/usetStore.type';
import { champProps } from 'types/champStore.type';

const Match = () => {
  const { userStore, champStore }: { userStore: userProps; champStore: champProps } = useStores();
  useEffect(() => {
    if (!userStore.matchInfo.length) {
      userStore.setMatchData(JSON.parse(localStorage.getItem('matchData') || '{}'));
    }
  }, [champStore, userStore]);

  useEffect(() => {
    console.log(toJS(userStore.matchInfo));
  }, [userStore.matchInfo]);

  return (
    <div>
      {userStore.matchInfo.map(match => {
        return (
          <Container key={match.gameId} $isWin={match.me.win}>
            <span>{match.gameCreation}</span>
            <span>{match.gameDuration}</span>
            <img
              src={`http://ddragon.leagueoflegends.com/cdn/${champStore.ddragonVersion || '11.1.1'}/img/champion/${match.me.championId}.png`}
              alt="champ img"
              style={{ width: '30px', height: '30px' }}
            />
          </Container>
        );
      })}
      <div className="pages">
        끝 페이지 <span>{userStore.pageParams.lastPage}</span>
        total <span>{userStore.pageParams.total}</span>
        현재 페이지 <span>{userStore.pageParams.currentPage}</span>
      </div>
    </div>
  );
};

const Container = styled.div<{ $isWin: boolean }>`
  margin-top: 30px;
  background: ${props => (props.$isWin ? 'blue' : 'red')};
  border: 1px solid rgb(205, 210, 210);
  border-radius: 4px;
  padding: 10px 0;
  width: 100%;
`;

export default observer(Match);
