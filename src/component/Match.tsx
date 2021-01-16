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
            <span>{match.me.win ? 'Vistory' : 'Defeat'}</span>
            <span>{match.gameCreation}</span>
            <span>{match.gameDuration}</span>
            <img
              src={`http://ddragon.leagueoflegends.com/cdn/${champStore.ddragonVersion || '11.1.1'}/img/champion/${match.me.championId}.png`}
              alt="champ img"
              style={{ width: '30px', height: '30px' }}
            />
            <p>{match.me.championId}</p>
            <p>Level{match.me.champLevel}</p>
            <p>
              {match.me.kills} / {match.me.deaths} / {match.me.assists}
            </p>
            <p>{match.me.deaths ? `${((match.me.kills + match.me.assists) / match.me.deaths).toFixed(1)}:1` : 'Perfect'} KDA</p>
            <p>
              {match.me.totalMinionsKilled}({(match.me.totalMinionsKilled / Math.floor(match.gameRawDuration / 60)).toFixed(1)}) CS
            </p>
            {match.me.item.map((item, index) => {
              return (
                <span key={index}>
                  {item ? (
                    <img
                      src={`http://ddragon.leagueoflegends.com/cdn/${champStore.ddragonVersion || '11.1.1'}/img/item/${item}.png`}
                      alt="champ img"
                      style={{ width: '20px', height: '20px' }}
                    />
                  ) : (
                    <span style={{ width: '20px', height: '20px', background: '#ffffff' }}>d</span>
                  )}
                </span>
              );
            })}
            <div>
              {match.me.rune.map((rune, index) => {
                return (
                  <div style={{ width: '20px', height: '20px', background: 'black' }} key={index}>
                    <img src={`https://ddragon.canisback.com/img/${rune}`} alt="champ img" style={{ width: '20px', height: '20px' }} />
                  </div>
                );
              })}
            </div>
            <div>
              {match.teams.map(team => {
                return team.participants.map(partice => {
                  return (
                    <div key={partice.participantsId}>
                      <span>{partice.name}</span>
                      <img
                        src={`http://ddragon.leagueoflegends.com/cdn/${champStore.ddragonVersion || '11.1.1'}/img/champion/${partice.championId}.png`}
                        alt="champ img"
                        style={{ width: '20px', height: '20px' }}
                      />
                    </div>
                  );
                });
              })}
            </div>
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
