import React, { useEffect } from 'react';
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
  const { recentPositions } = userStore;
  return (
    <MainLayout>
      <div>user area</div>
      <div>소환사 이름: {summonerName}</div>
      <div>레벨 : {summonerLevel}</div>
      <div>
        솔로랭크 : {tier} {rank}{' '}
      </div>
      <img style={{ width: '100px' }} src={`/images/${tier}.png`} alt="티어 이미지" />
      <div>
        {leaguePoints} LP / : {wins}W {losses}L
      </div>
      <div> Win Ratio {Math.floor((wins / (wins + losses)) * 100)}%</div>

      <div>최근 100경기 라인 뭐했는지</div>
      <div>{JSON.stringify(recentPositions)}</div>
    </MainLayout>
  );
};

export default inject('userStore', 'champStore')(observer(User));
