import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { observer, inject } from 'mobx-react';
import { userProps } from 'types/usetStore.type';
import { champProps } from 'types/champStore.type';
import MainLayout from 'component/MainLayout';
import { BorderWidth, Chart, Point, ChartColor } from 'chart.js';

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

  useEffect(() => {
    const canvas = document.getElementById('doughnut') as HTMLCanvasElement;
    const options = {
      type: 'doughnut',
      data: {
        datasets: [
          {
            data: [wins, losses],
            backgroundColor: ['red', 'yellow'],
          },
        ],
        labels: ['wins', 'losses'],
      },
      options: {
        legend: {
          display: false,
        },
      },
    };
    new Chart(canvas, options);
  }, [wins, losses]);

  return (
    <MainLayout>
      <Container>
        <div className="user-info">
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
              {' '}
              <DoughnutChart id="doughnut" />
              Win Ratio {Math.floor((wins / (wins + losses)) * 100)}%
            </div>
          </div>
          <div className="current-champs">
            최근 많이 사용한 챔쓰
            {/* 배열에 챔피언 이름으로 담아서 이름으로 바로 img 호출 */}
          </div>
          <div className="current-position">
            <img style={{ width: '100px' }} src={`http://ddragon.leagueoflegends.com/cdn/10.25.1/img/item/6632.png`} alt="포지션 이미지" />
            최근 100경기 가장 많이 한 포지션
            {recentPositions.map((el, index) => {
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
            {/* <div>{JSON.stringify(recentPositions)}</div> */}
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
  /* background: #5383e8; */
  .user-info {
    width: 1000px;
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
    width: 1000px;
    margin: 30px auto;
  }
`;

const DoughnutChart = styled.canvas`
  width: 200px !important;
  height: 100px !important;
  display: inline-block !important;
`;

export default inject('userStore', 'champStore')(observer(User));
