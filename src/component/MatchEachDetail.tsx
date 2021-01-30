import React from 'react';
import styled from 'styled-components';
import { observer } from 'mobx-react';
import useStores from 'lib/useStores';
import { champProps } from 'types/champStore.type';
import { matchProps } from 'types/champStore.type';

const MatchEachDetail = ({ match }: { match: matchProps }) => {
  const { champStore }: { champStore: champProps } = useStores();

  const checkBlueRedImg = (isWin: boolean, index: number): string => {
    if (isWin && !index) {
      return `b`;
    } else if ((!isWin && !index) || (isWin && index)) {
      return `r`;
    } else {
      return `b`;
    }
  };

  return (
    <DetailContainer>
      {match.teams.map((team, teamsIndex) => {
        const redOrBlue = checkBlueRedImg(match.me.win, teamsIndex);
        return (
          <React.Fragment key={teamsIndex}>
            <TeamContainer $isRedOrBlue={teamsIndex} $isWin={match.me.win}>
              <table>
                <thead>
                  <tr>
                    <th style={{ width: '30%' }}>
                      <span className={(match.me.win && teamsIndex) || (!match.me.win && !teamsIndex) ? 'font-red' : 'font-blue'}>
                        {(match.me.win && teamsIndex) || (!match.me.win && !teamsIndex) ? 'Default ' : 'Vistory '}
                        <span style={{ color: '#555', fontSize: '13px' }}>{team.teamId === 100 ? '(Blue Team)' : '(Red Team)'}</span>
                      </span>
                    </th>
                    <th style={{ width: '10%' }}>Summoner</th>
                    <th style={{ width: '10%' }}>Lv</th>
                    <th style={{ width: '10%' }}>KDA</th>
                    <th style={{ width: '10%' }}>Damage</th>
                    <th style={{ width: '10%' }}>CS</th>
                    <th style={{ width: '20%' }}>Item</th>
                  </tr>
                </thead>
                <tbody>
                  {team.participants.map((each, indexs) => {
                    return (
                      <tr key={indexs} className={each.name === match.me.name ? 'me' : ''}>
                        <td>
                          <div className="champion-info">
                            <div className="champion-info__image-box">
                              <img
                                src={`http://ddragon.leagueoflegends.com/cdn/${champStore.ddragonVersion || '11.1.1'}/img/champion/${
                                  each.championId
                                }.png`}
                                alt="champ img"
                                style={{ width: '30px', height: '30px', borderRadius: '50%', marginRight: '5px' }}
                              />
                              <div className="champion-info__image-box__spell">
                                {each.spell.map((spell, index) => {
                                  return (
                                    <div
                                      style={{
                                        width: '15px',
                                        height: '15px',
                                        background: 'black',
                                        borderRadius: '5px',
                                        margin: '0 5px 5px 0',
                                      }}
                                      key={index}>
                                      <img
                                        src={`http://ddragon.leagueoflegends.com/cdn/${champStore.ddragonVersion || '11.1.1'}/img/spell/${spell}.png`}
                                        alt="spell-img"
                                        style={{ width: '15px', height: '15px' }}
                                      />
                                    </div>
                                  );
                                })}
                              </div>

                              <div className="champion-info__image-box__rune">
                                {each.rune.map((rune, index) => {
                                  return (
                                    <div
                                      style={{
                                        width: '15px',
                                        height: '15px',
                                        background: index === 0 ? 'black' : 'rgba( 201, 201, 201, 0.5 )',
                                        borderRadius: '5px',
                                        marginBottom: index === 0 ? '5px' : '0px',
                                      }}
                                      key={index}>
                                      <img
                                        src={`https://ddragon.canisback.com/img/${rune}`}
                                        alt="rune-img"
                                        style={{ width: '15px', height: '15px' }}
                                      />
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td>{each.name}</td>
                        <td>{each.champLevel}</td>
                        <td>
                          {each.deaths ? `${((each.kills + each.assists) / each.deaths).toFixed(1)}:1` : 'Perfect'} ({each.kills}/{each.deaths}/
                          {each.assists})
                        </td>
                        <td>{each.totalDamageDealtToChampions.toLocaleString()}</td>
                        <td>
                          {each.totalMinionsKilled} ({(each.totalMinionsKilled / Math.floor(match.gameRawDuration / 60)).toFixed(1)}/m)
                        </td>
                        <td>
                          {each.item.map((item, itemIndex) => {
                            return (
                              <React.Fragment key={itemIndex}>
                                {item ? (
                                  <img
                                    src={`http://ddragon.leagueoflegends.com/cdn/${champStore.ddragonVersion || '11.1.1'}/img/item/${item}.png`}
                                    alt="champ img"
                                    style={{ width: '22px', height: '22px', borderRadius: '5px' }}
                                  />
                                ) : (
                                  <div className="empty-item"></div>
                                )}
                              </React.Fragment>
                            );
                          })}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </TeamContainer>
            {!teamsIndex && (
              <div className="common">
                <div className="object">
                  <div>
                    <img className="height-15" src={`/images/icon-baron-${redOrBlue}.png`} alt="바론 이미지" />
                    <span>{team.baronKills}</span>
                  </div>
                  <div>
                    <img className="height-15" src={`/images/icon-dragon-${redOrBlue}.png`} alt="용 이미지" />
                    <span>{team.dragonKills}</span>
                  </div>
                  <div>
                    <img className="height-15" src={`/images/icon-tower-${redOrBlue}.png`} alt="타워 이미지" />
                    <span>{team.towerKills}</span>
                  </div>
                </div>
                <div className="common-data">
                  <div className="common-data__context">
                    <span>Total kiill</span>
                  </div>
                  <div className="common-data__graph">
                    <BarGraph $redOrblue={redOrBlue} $width={(team.totalKills / (team.totalKills + match.teams[1].totalKills)) * 100}>
                      <span>{team.totalKills}</span>
                    </BarGraph>
                    <BarGraph
                      $redOrblue={redOrBlue === 'r' ? 'b' : 'r'}
                      $width={(match.teams[1].totalKills / (team.totalKills + match.teams[1].totalKills)) * 100}>
                      <span>{match.teams[1].totalKills}</span>
                    </BarGraph>
                  </div>
                  <div className="common-data__context">
                    <span>Total gold</span>
                  </div>
                  <div className="common-data__graph">
                    <BarGraph $redOrblue={redOrBlue} $width={(team.totalGolds / (team.totalGolds + match.teams[1].totalGolds)) * 100}>
                      <span>{team.totalGolds}</span>
                    </BarGraph>
                    <BarGraph
                      $redOrblue={redOrBlue === 'r' ? 'b' : 'r'}
                      $width={(match.teams[1].totalGolds / (team.totalGolds + match.teams[1].totalGolds)) * 100}>
                      <span>{match.teams[1].totalGolds}</span>
                    </BarGraph>
                  </div>
                </div>
                <div className="object">
                  <div>
                    <img className="height-15" src={`/images/icon-baron-${redOrBlue === 'r' ? 'b' : 'r'}.png`} alt="바론 이미지" />
                    <span>{match.teams[1].baronKills}</span>
                  </div>
                  <div>
                    <img className="height-15" src={`/images/icon-dragon-${redOrBlue === 'r' ? 'b' : 'r'}.png`} alt="용 이미지" />
                    <span>{match.teams[1].dragonKills}</span>
                  </div>
                  <div>
                    <img className="height-15" src={`/images/icon-tower-${redOrBlue === 'r' ? 'b' : 'r'}.png`} alt="타워 이미지" />
                    <span>{match.teams[1].towerKills}</span>
                  </div>
                </div>
              </div>
            )}
          </React.Fragment>
        );
      })}
    </DetailContainer>
  );
};

const DetailContainer = styled.div`
  .common {
    display: grid;
    grid-template-columns: 1fr 1.5fr 1fr;
    background: #dddddd;
    padding: 10px;
    border: 1px solid #cccccc;
    .object {
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      span {
        margin-left: 10px;
        color: #555;
      }
    }
    .common-data {
      display: grid;
      grid-template-columns: 70px 400px;
      grid-gap: 10px;
      align-items: center;
      justify-content: center;
      &__context {
        color: #555;
        font-size: 15px;
      }
      &__graph {
        display: flex;
      }
    }
  }
`;

const TeamContainer = styled.div<{ $isRedOrBlue: Number; $isWin: Boolean }>`
  background: ${props =>
    (props.$isRedOrBlue === 0 && !props.$isWin) || (props.$isRedOrBlue === 1 && props.$isWin) ? 'rgb(232,224,224)' : 'rgb(214,226, 234)'};

  .me {
    background: ${props => ((props.$isRedOrBlue === 0 && !props.$isWin) || (props.$isRedOrBlue === 1 && props.$isWin) ? '#e1d1d0' : '#c6dbe9')};
  }

  table {
    width: 100%;
    border-collapse: collapse;
    thead {
      background: white;
      th {
        color: #555;
        padding: 5px;
      }
    }
    tbody {
      tr {
        td {
          text-align: center;
          color: #555;
          padding: 0;
        }
      }
    }
  }

  .font-red {
    color: rgb(197, 68, 62);
  }
  .font-blue {
    color: rgb(26, 120, 174);
  }
`;

const BarGraph = styled.div<{ $redOrblue: string; $width: number }>`
  height: 20px;
  width: ${props => `${props.$width * 4}px`};
  background: ${props => (props.$redOrblue === 'r' ? 'rgb(208, 90, 83)' : 'rgb(84, 141, 202)')};
  line-height: 20px;
  text-align: center;
  font-size: 15px;
  color: #555;
`;

export default observer(MatchEachDetail);
