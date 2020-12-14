## TODO
- 유저의 현재 티어를 보여준다
- 유저의 최근 10게임 승률을 보여준다
- 유저가 현재 게임을 진행 중인지를 알려준다


### 현재 티어
#### api
/lol/summoner/v4/summoners/by-name/{summonerName} 에서 나온 id를
 /lol/league/v4/entries/by-summoner/{encryptedSummonerId} 에 넣으면
 res의 tier값
