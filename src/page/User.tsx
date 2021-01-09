import React, { useEffect } from 'react';
import styled from 'styled-components';
import { observer, inject } from 'mobx-react';
import { userProps } from 'types/usetStore.type';
import { champProps } from 'types/champStore.type';
import MainLayout from 'component/MainLayout';
import PieChart from 'component/PieChart';
import RecentChamp from 'component/RecentChamp';

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
            <div className="user-data">
              <div>소환사 이름: {summonerName}</div>
              <div>레벨 : {summonerLevel}</div>
              <div>
                솔로랭크 : {tier} {rank}{' '}
              </div>
              <img style={{ width: '100px' }} src={`/images/${tier}.png`} alt="티어 이미지" />
              <div>
                {leaguePoints} LP / : {wins}W {losses}L
              </div>
              <div>
                <PieChart isData={!!summonerName.length} wins={wins} losses={losses} />
                Win Ratio {Math.floor((wins / (wins + losses)) * 100)}%
              </div>
            </div>
          ) : (
            <div className="user-data">최근 시즌에 진행한 경기가 없습니다.</div>
          )}
          <div className="current-champs">
            최근 100경기 이내 많이 사용한 챔쓰
            {Object.entries(recentChampion).map((el, index) => {
              if (index < 5) {
                return <RecentChamp key={index} name={el[0]} count={el[1]} version={champStore.ddragonVersion} />;
              }
              return null;
            })}
          </div>
          <div className="current-position">
            {/* <img
              style={{ width: '100px' }}
              src={`http://ddragon.leagueoflegends.com/cdn/${champStore.ddragonVersion}/img/item/6632.png`}
              alt="포지션 이미지"
            /> */}
            최근 100경기 가장 많이 한 포지션
            {Object.entries(recentPositions).map((el, index) => {
              if (index < 2) {
                return (
                  <div key={index}>
                    <img style={{ width: '100px' }} src={`/images/${el[0]}.png`} alt="포지션 이미지" />
                    {el[1]}
                  </div>
                );
              }
              return null;
            })}
            <div>{JSON.stringify(recentPositions)}</div>
          </div>
        </div>
        <div className="border"></div>
        <div className="march-data">매치 데이터</div>
      </Container>
    </MainLayout>
  );
};

const Container = styled.div`
  height: 94vh;
  .user-info {
    width: 100%;
    margin: 30px auto;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  .border {
    width: 100%;
    border-top: 1px solid red;
  }
  .march-data {
    width: 100%;
    margin: 30px auto;
  }
`;

export default inject('userStore', 'champStore')(observer(User));
