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
            <div className="game-info">
              <span>{match.gameCreation}</span>
              <span>{match.me.win ? 'Vistory' : 'Defeat'}</span>
              <span>{match.gameDuration}</span>
            </div>

            <div className="champion-info">
              <div className="champion-info__image-box">
                <img
                  src={`http://ddragon.leagueoflegends.com/cdn/${champStore.ddragonVersion || '11.1.1'}/img/champion/${match.me.championId}.png`}
                  alt="champ img"
                  style={{ width: '30px', height: '30px' }}
                />

                <div className="champion-info__image-box__spell">
                  {match.me.spell.map((spell, index) => {
                    return (
                      <div style={{ width: '20px', height: '20px', background: 'black' }} key={index}>
                        <img
                          src={`http://ddragon.leagueoflegends.com/cdn/${champStore.ddragonVersion || '11.1.1'}/img/spell/${spell}.png`}
                          alt="spell-img"
                          style={{ width: '20px', height: '20px' }}
                        />
                      </div>
                    );
                  })}
                </div>

                <div className="champion-info__image-box__rune">
                  {match.me.rune.map((rune, index) => {
                    return (
                      <div style={{ width: '20px', height: '20px', background: 'black' }} key={index}>
                        <img src={`https://ddragon.canisback.com/img/${rune}`} alt="rune-img" style={{ width: '20px', height: '20px' }} />
                      </div>
                    );
                  })}
                </div>
              </div>
              <p>{match.me.championId}</p>
            </div>

            <div className="score-info">
              <p>
                {match.me.kills} / {match.me.deaths} / {match.me.assists}
              </p>
              <p>{match.me.deaths ? `${((match.me.kills + match.me.assists) / match.me.deaths).toFixed(1)}:1` : 'Perfect'} KDA</p>
            </div>

            <div className="game-detail-info">
              <p>Level{match.me.champLevel}</p>
              <p>
                {match.me.totalMinionsKilled}({(match.me.totalMinionsKilled / Math.floor(match.gameRawDuration / 60)).toFixed(1)}) CS
              </p>
              <p>킬관여도 {Math.floor(((match.me.kills + match.me.assists) / match.me.totalKill) * 100)}%</p>
            </div>

            <div className="item-info">
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
                      <div style={{ display: 'inline-block', width: '20px', height: '20px', background: 'grey', opacity: '0.3' }}></div>
                    )}
                  </span>
                );
              })}
            </div>

            <div className="team-info">
              {/* 0~4번 왼쪽 나머지 오른쪽 */}
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
  background: ${props => (props.$isWin ? 'rgb(163,205, 235)' : 'rgb(226,182,179)')};
  border: 1px solid rgb(205, 210, 210);
  border-radius: 4px;
  padding: 10px 0;
  width: 100%;
  display: flex;
  .game-info {
    display: flex;
    flex-direction: column;
  }
  .champion-info {
    display: flex;
    flex-direction: column;
    &__image-box {
      display: flex;
    }
  }
  .item-info {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr;
  }
  .team-info {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
  }
`;

export default observer(Match);
