import React, { useEffect } from 'react';
import styled from 'styled-components';
import { observer, inject } from 'mobx-react';
import { userProps } from 'types/usetStore.type';
import { champProps } from 'types/champStore.type';
import MainLayout from 'component/MainLayout';

interface HomeContainerProps {
  userStore: userProps;
  champStore: champProps;
}

const User = ({ userStore, champStore }: HomeContainerProps) => {
  useEffect(() => {
    userStore.resetDone();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { summonerLevel, tier, rank, summonerName, wins, losses, leaguePoints } = userStore.userData;
  const { recentPositions, recentChampion } = userStore;

  return (
    <MainLayout>
      <Container>
        <div className="user-info">
          {summonerName.length ? (
            <div className="user-data w310">
              <div className="user-rank flex">
                <img style={{ height: '100px' }} src={`/images/${tier}.png`} alt="티어 이미지" />
                <div className="user-rank__content">
                  <div className="user-rank__content__name">{summonerName}</div>
                  <div className="context">
                    Ladder Rank <span className="blue">{summonerLevel}</span>
                  </div>
                  <div className="context">
                    {leaguePoints} LP{' '}
                    <span className="blue">
                      {tier} {rank}
                    </span>
                  </div>
                  <div className="context">
                    {wins + losses}G / {wins}
                    <span className="blue">W</span> {losses}
                    <span className="blue" style={{ color: 'red' }}>
                      L
                    </span>{' '}
                    ({Math.floor((wins / (wins + losses)) * 100)}%)
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="user-data">최근 시즌에 진행한 경기가 없습니다.</div>
          )}
          <div className="user-data">
            <div className="context">
              Preferred Champion <span className="sub-desc">(last 100 Rank)</span>
            </div>
            <div className="user-data__prefrer-position" style={{ gridTemplateColumns: '1fr 1fr 1fr', gridTemplateRows: '1fr 1fr' }}>
              {Object.entries(recentChampion).map((el, index) => {
                if (index < 6) {
                  return (
                    <div key={index} className="user-data__prefrer-position__position-box flex">
                      <img
                        style={{ width: '40px' }}
                        src={`http://ddragon.leagueoflegends.com/cdn/${champStore.ddragonVersion}/img/champion/${el[0]}.png`}
                        alt="포지션 이미지"
                      />
                      <div className="user-data__prefrer-position__position-box__context">
                        <p>{el[1]}%</p>
                      </div>
                    </div>
                  );
                }
                return null;
              })}
            </div>
          </div>
          <div className="user-data w350">
            {/* <img
              style={{ width: '100px' }}
              src={`http://ddragon.leagueoflegends.com/cdn/${champStore.ddragonVersion}/img/item/6632.png`}
              alt="포지션 이미지"
            /> */}
            <div className="context">
              Preferred position <span className="sub-desc">(last 100 Rank)</span>
            </div>
            <div className="user-data__prefrer-position">
              {Object.entries(recentPositions).map((el, index) => {
                if (index < 4) {
                  return (
                    <div key={index} className="user-data__prefrer-position__position-box flex">
                      <img style={{ width: '40px' }} src={`/images/${el[0]}.png`} alt="포지션 이미지" />
                      <div className="user-data__prefrer-position__position-box__context">
                        <p className="pos">{el[0].toLowerCase()}</p>
                        <p>{el[1]}%</p>
                      </div>
                    </div>
                  );
                }
                return null;
              })}
            </div>
          </div>
        </div>
        <div className="border"></div>
        <div className="march-data">매치 데이터</div>
      </Container>
    </MainLayout>
  );
};

const Container = styled.div`
  width: 85%;
  margin: 0 auto;
  .user-info {
    width: 100%;
    margin: 30px auto;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin: 0;
  }
  .user-data {
    width: 470px;
    margin-top: 30px;
    margin-right: 20px;
    background: #ffffff;
    border: 1px solid rgb(205, 210, 210);
    border-radius: 4px;
    padding: 10px 0;
    height: 150px;
    .user-rank {
      height: 100%;
      display: flex;
      align-items: center;
      img {
        margin-left: 10px;
      }
      &__content {
        margin-left: 20px;
        &__name {
          margin: 5px 0;
          color: #242929;
          font-size: 25px;
          font-weight: bold;
        }
      }
    }
    &__prefrer-position {
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-template-rows: 1fr 1fr;
      padding-left: 15px;
      grid-gap: 10px;

      &__position-box {
        padding: 0 5px;
        display: inline-block;
        width: 150px;
        &__context {
          display: flex;
          flex-direction: column;
          justify-content: space-evenly;
          p {
            margin-left: 5px;
            font-size: 15px;
          }
          .pos {
            color: #059ede;
            font-weight: bold;
          }
        }
      }
    }
  }
  .flex {
    display: flex;
  }
  .border {
    width: 100%;
    border-top: 1px solid red;
  }
  .march-data {
    width: 100%;
    margin: 30px auto;
  }
  .context {
    margin: 0 0 5px 5px;
    color: #555e5e;
    font-size: 15px;
    text-decoration: none;
    line-height: 1.5;
    .blue {
      color: #059ede;
      font-weight: bold;
    }
    .sub-desc {
      font-size: 13px;
    }
  }
  .w310 {
    width: 310px !important;
  }
  .w350 {
    width: 350px !important;
    margin-right: 0;
  }
`;

export default inject('userStore', 'champStore')(observer(User));
