import React from 'react';
import styled from 'styled-components';
import { observer } from 'mobx-react';
import useStores from 'lib/useStores';
import { userProps } from 'types/usetStore.type';
import { champProps } from 'types/champStore.type';
import { matchProps } from 'types/champStore.type';

const MyDetail = ({ match }: { match: matchProps }) => {
  const { userStore, champStore }: { userStore: userProps; champStore: champProps } = useStores();
  return (
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
            style={{ width: '60px', height: '60px', borderRadius: '50%', marginRight: '5px' }}
          />

          <div className="champion-info__image-box__spell">
            {match.me.spell.map((spell, index) => {
              return (
                <div className="img-width-height" style={{ background: 'black', borderRadius: '5px', margin: '0 5px 5px 0' }} key={index}>
                  <img
                    src={`http://ddragon.leagueoflegends.com/cdn/${champStore.ddragonVersion || '11.1.1'}/img/spell/${spell}.png`}
                    alt="spell-img"
                    className="img-width-height"
                  />
                </div>
              );
            })}
          </div>

          <div className="champion-info__image-box__rune">
            {match.me.rune.map((rune, index) => {
              return (
                <div
                  style={{
                    width: '30px',
                    height: '30px',
                    background: index === 0 ? 'black' : 'rgba( 201, 201, 201, 0.5 )',
                    borderRadius: '5px',
                    marginBottom: index === 0 ? '5px' : '0px',
                  }}
                  key={index}>
                  <img src={`https://ddragon.canisback.com/img/${rune}`} alt="rune-img" style={{ width: '30px', height: '30px' }} />
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
                <div className="empty-item img-width-height"></div>
              )}
            </span>
          );
        })}
      </div>
      {/* team list */}
      <>
        {match.teams.map((team, index) => {
          return (
            <div className="team-info" key={index}>
              {team.participants.map(partice => {
                return (
                  <div key={partice.participantsId} className="team-info__champ">
                    <img
                      src={`http://ddragon.leagueoflegends.com/cdn/${champStore.ddragonVersion || '11.1.1'}/img/champion/${partice.championId}.png`}
                      alt="champ img"
                      style={{
                        width: '20px',
                        height: '20px',
                        borderRadius: partice.participantsId === match.me.participantsId ? '50%' : '0%',
                      }}
                    />
                    <span>{partice.name}</span>
                  </div>
                );
              })}
            </div>
          );
        })}
      </>
      <div className="detail-btn" onClick={() => userStore.setOpen(match.gameId)}>
        {match.isOpenDetail ? '▲' : '▼'}
      </div>
    </Container>
  );
};

const Container = styled.div<{ $isWin: boolean }>`
  margin-top: 30px;
  background: ${props => (props.$isWin ? 'rgb(163,205, 235)' : 'rgb(226,182,179)')};
  border: 1px solid rgb(205, 210, 210);
  padding: 10px 0;
  width: 100%;
  display: flex;
  display: grid;
  grid-template-columns: 0.8fr 1fr 0.8fr 1fr 1fr 1fr 1fr 0.2fr;
  .game-info {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    p {
      color: #555;
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
    grid-template-columns: 1fr;
    grid-template-rows: 1fr;
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

export default observer(MyDetail);
