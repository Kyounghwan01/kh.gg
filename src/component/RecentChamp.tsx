import React from 'react';

export default function RecentChamp({ name, count, version }: { name: string; count: number; version: string }) {
  return (
    <div>
      <img style={{ width: '100px' }} src={`http://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${name}.png`} alt="포지션 이미지" />
      {count}
    </div>
  );
}
