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
          <div key={match.gameId}>
            <Container $isWin={match.me.win}>
              <div className="game-info">
                <p>{match.gameCreation}</p>
                <p>{match.me.win ? <span className="font-blue">Vistory</span> : <span className="font-red">Defeat</span>}</p>
                <p>{match.gameDuration}</p>
              </div>

              <div className="champion-info">
                <div className="champion-info__image-box">
                  <img
                    src={`http://ddragon.leagueoflegends.com/cdn/${champStore.ddragonVersion || '11.1.1'}/img/champion/${match.me.championId}.png`}
                    alt="champ img"
                    style={{ width: '60px', height: '60px', borderRadius: '50%' }}
                  />

                  <div className="champion-info__image-box__spell">
                    {match.me.spell.map((spell, index) => {
                      return (
                        <div style={{ width: '30px', height: '30px', background: 'black', borderRadius: '5px' }} key={index}>
                          <img
                            src={`http://ddragon.leagueoflegends.com/cdn/${champStore.ddragonVersion || '11.1.1'}/img/spell/${spell}.png`}
                            alt="spell-img"
                            style={{ width: '30px', height: '30px' }}
                          />
                        </div>
                      );
                    })}
                  </div>

                  <div className="champion-info__image-box__rune">
                    {match.me.rune.map((rune, index) => {
                      return (
                        <div key={index}>
                          {index === 0 ? (
                            <div style={{ width: '30px', height: '30px', background: 'black', borderRadius: '5px' }} key={index}>
                              <img src={`https://ddragon.canisback.com/img/${rune}`} alt="rune-img" style={{ width: '30px', height: '30px' }} />
                            </div>
                          ) : (
                            <div
                              style={{ width: '30px', height: '30px', backgroundColor: 'rgba( 201, 201, 201, 0.5 )', borderRadius: '5px' }}
                              key={index}>
                              <img src={`https://ddragon.canisback.com/img/${rune}`} alt="rune-img" style={{ width: '30px', height: '30px' }} />
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
                <p>{match.me.championId}</p>
              </div>

              <div className="score-info">
                <p>
                  {match.me.kills} / <span className="font-red">{match.me.deaths}</span> / {match.me.assists}
                </p>
                <p>
                  <span className="font-black">
                    {match.me.deaths ? `${((match.me.kills + match.me.assists) / match.me.deaths).toFixed(1)}:1` : 'Perfect'}
                  </span>{' '}
                  KDA
                </p>
              </div>

              <div className="game-detail-info">
                <p>Level {match.me.champLevel}</p>
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
                          style={{ width: '30px', height: '30px', borderRadius: '5px' }}
                        />
                      ) : (
                        <div
                          style={{
                            display: 'inline-block',
                            width: '30px',
                            height: '30px',
                            background: 'grey',
                            opacity: '0.3',
                            borderRadius: '5px',
                          }}></div>
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
                      <div key={partice.participantsId} className="team-info__champ">
                        {partice.participantsId === match.me.participantsId ? (
                          <img
                            src={`http://ddragon.leagueoflegends.com/cdn/${champStore.ddragonVersion || '11.1.1'}/img/champion/${
                              partice.championId
                            }.png`}
                            alt="champ img"
                            style={{ width: '20px', height: '20px', borderRadius: '50%' }}
                          />
                        ) : (
                          <img
                            src={`http://ddragon.leagueoflegends.com/cdn/${champStore.ddragonVersion || '11.1.1'}/img/champion/${
                              partice.championId
                            }.png`}
                            alt="champ img"
                            style={{ width: '20px', height: '20px' }}
                          />
                        )}
                        <span>{partice.name}</span>
                      </div>
                    );
                  });
                })}
              </div>
              <div className="detail-btn" onClick={() => userStore.setOpen(match.gameId)}>
                {match.isOpenDetail ? '▲' : '▼'}
              </div>
            </Container>
            {match.isOpenDetail && (
              <div>
                {match.teams
                  // todo: 디테일 리스트 (내가 속한 팀부터 (이기고 지고 상관없음))
                  // .sort((a, b) => (a.win < b.win ? -1 : b.win < a.win ? 0 : 1))
                  .map((team, index) => {
                    return (
                      <div key={index}>
                        <div>
                          <img style={{ height: '10px' }} src={`/images/${team.win ? 'icon-baron-b' : 'icon-baron-r'}.png`} alt="바론 이미지" />
                          <span>{team.baronKills}</span>
                        </div>
                        <div>
                          <img style={{ height: '10px' }} src={`/images/${team.win ? 'icon-dragon-b' : 'icon-dragon-r'}.png`} alt="용 이미지" />
                          <span>{team.dragonKills}</span>
                        </div>
                        <div>
                          <img style={{ height: '10px' }} src={`/images/${team.win ? 'icon-tower-b' : 'icon-tower-r'}.png`} alt="타워 이미지" />
                          <span>{team.towerKills}</span>
                          <p> total kilss{team.totalKills}</p>
                        </div>
                      </div>
                    );
                  })}
              </div>
            )}
          </div>
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
  display: grid;
  grid-template-columns: 0.8fr 1fr 0.8fr 1fr 1fr 2.3fr 0.2fr;
  .game-info {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    p {
      color: #555;
    }
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
  .score-info {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    p {
      color: #555;
      font-weight: bold;
    }
  }
  .game-detail-info {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    p {
      color: #555;
    }
  }
  .item-info {
    display: grid;
    grid-template-columns: 35px 35px 35px 35px;
    grid-template-rows: 35px 35px;
    text-align: center;
    margin: 20px 0 0 10px;
  }
  .team-info {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    &__champ {
      display: block;
      width: 80px;
      height: 18px;
      margin-bottom: 3px;
      text-align: left;
      white-space: nowrap;
      img {
        display: inline-block;
        vertical-align: middle;
        margin-right: 3px;
      }
      span {
        display: inline-block;
        vertical-align: middle;
        font-size: 11px;
        color: #555;
      }
    }
  }
  .detail-btn {
    display: flex;
    justify-content: center;
    align-items: flex-end;
    &:hover {
      cursor: pointer;
    }
  }
  .font-black {
    color: black;
  }
  .font-red {
    color: rgb(197, 68, 62);
  }
  .font-blue {
    color: rgb(26, 120, 174);
  }
`;

export default observer(Match);
