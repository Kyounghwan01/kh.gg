## TODO
- 유저의 현재 티어를 보여준다
- 유저의 최근 10게임 승률을 보여준다
- 유저가 현재 게임을 진행 중인지를 알려준다


## 현재 티어
### api
/lol/summoner/v4/summoners/by-name/{summonerName} 에서 나온 id를
 /lol/league/v4/entries/by-summoner/{encryptedSummonerId} 에 넣으면
 res의 tier값

## 최근 10게임
/lol/summoner/v4/summoners/by-name/{summonerName} 에서 나온 accountId를 사용
 /lol/match/v4/matchlists/by-account/{encryptedAccountId}에서 나온 matches의 객체의 gameId를 
 /lol/match/v4/matches/{matchId}에 넣어 호츌
 teamId가 100이면 블루, 200이면 레드, 100팀의 플레이어는 1,2,3,4,5 200팀의 플레이어는 6,7,8,9,10 임시 id를 가짐
 win의 값으로 승패 알림
 participantIdentities에서 나온 participantId가 team의 임시 Id와 동일하고, 이 객체의 player.accountId가 내가 검색한 유저의 id와 일치한지 확인하고 승패 판정

1. team100이 이겼는지 200이 이겼는지 체크 (/lol/match/v4/matches/{matchId})

2. 검색한 소환사의 아이디를 체크 (/lol/summoner/v4/summoners/by-name/{summonerName})

3. 이 아이디가 team100에 있는지 200에 있는지 체크

4. 이 아이디가 졌는지 이겼는지 체크

## 현재 진행중인가
/lol/spectator/v4/active-games/by-summoner/{encryptedId}
에서 gameId가 null이면 안하는거
