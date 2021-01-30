# khgg

- [배포 링크](https://khgg.netlify.com/)

## Intorduction

- opgg를 오마주로 클론 코딩한 프로젝트입니다.
- 프로젝트 기간 : 2021. 1

## Content

- [Requirements](#Requirements)
- [Installation](#Installation)
- [Features](#Features)
- [Skills](#Skills)
- [Deployment](#Deployment)
- [roit api 정보](#roit-api-정보)
- [Challenges](#Challenges)

## Requirements

- 프로젝트를 클론 받고 정상적인 사용을 위해서는 [riot api](https://developer.riotgames.com/)가 필요합니다. 링크를 타고 들어가셔서 회원가입 후 api key를 발급 받으신 후 `.env`에 key를 등록하시면 됩니다.
- riot api를 웹에서 바로 호출하면 CORS 정책에 따라 **CORS ERROR**가 뜨게 됩니다. 저의 경우는 우회 사이트를 따로 만들어 해결하였습니다. 구글에 `cors-anywhere`를 검색하시면 cors 우회에 관련된 방법을 알 수 있습니다.
- 크롬 기반입니다.

## Installation

```javascript
git clone https://github.com/Kyounghwan01/kh.gg.git
yarn install

yarn start
```

## Features

- 유저 검색
- 유저 정보
- 최근 솔로 랭크 100경기 포지션 현황
- 최근 솔로 랭크 100경기 사용 챔피언 현황
- 최근 솔로 랭크 100경기 매치 정보
  - 처음은 10경기만 보이고 100 경기 까지 페이지네이션

## Skills

### frontend

- ES2015+
- TypeScript
- React
- React hook
- Mobx
- Styled-components
- Scss

### backend

- roit api

## Deployment

### Client

- Netlify 배포

## riot api 정보

### riot api version

```
GET:  https://ddragon.leagueoflegends.com/api/versions.json
```

### champion info

```
GET: https://ddragon.leagueoflegends.com/cdn/:version/data/ko_KR/champion.json
```

### champion img

```
// img 태그 내에서 바로 호출할 것
GET: http://ddragon.leagueoflegends.com/cdn/:version/img/champion/${champName}.png
```

### user profile img

```
// img 태그 내에서 바로 호출할 것
GET: http://ddragon.leagueoflegends.com/cdn/:version/img/champion/${profileId}.png
```

### rune info

```
GET: https://ddragon.leagueoflegends.com/cdn/:version/data/ko_KR/runesReforged.json
```

### rune img

```
// img 태그 내에서 바로 호출할 것
GET: https://ddragon.canisback.com/img/:runeName
```

### spell info

```
GET: https://ddragon.leagueoflegends.com/cdn/:version/data/ko_KR/summoner.json
```

### spell img

```
// img 태그 내에서 바로 호출할 것
GET: http://ddragon.leagueoflegends.com/cdn/:version/img/spell/${spellName}.png
```

### item img

```
// img 태그 내에서 바로 호출할 것
GET: http://ddragon.leagueoflegends.com/cdn/:version/img/item/${itemId}.png
```

### user data

```
GET:  https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/:userName
```

### user private data

```
GET: https://kr.api.riotgames.com/lol/league/v4/entries/by-summoner/:encryptedAccountId
```

### recent match data

```
GET: https://kr.api.riotgames.com/lol/match/v4/matchlists/by-account/:encryptedAccountId
```

### match detail

```
GET: https://kr.api.riotgames.com/lol/match/v4/matches/:matchId
```

### 현재 진행중 확인

```
// gameId가 null이면 게임 안하는 중

GET: https://kr.api.riotgames.com/lol/spectator/v4/active-games/by-summoner/:encryptedId
```

## Challenges

### typeScript

- 기본 타입 정의는 물론, api response까지 strict하게 정의
- 처음 설계를 할때는 사용할 모든 타입을 정의하기에 시간이 많이 소요됬으나, 본격적인 개발을 착수할 때는 타입 추론이 잘 되어 ts를 쓸지 않을 때보다 수월하게 개발 했음

### riot api cors 우회

- [cors-anywhere](https://github.com/Kyounghwan01/cors-anywhere) 사용하여 프록시 우회로 해결
- 웹을 한번 더 거치기 때문에 시간이 소요되나 이것만큼 깔끔한 해결책이 없었음
- aws lambda를 사용해 자체 서버를 만드는 방법도 있으나 빠르게 프로젝트가 루즈해지는 것 같아 위 방법으로 해결

### 비동기

- 유저 이름 검색 후, 최근 match data, 포지션, 챔피언 사용수, 유저 정도 등 여러 api의 res를 한 화면에 담아야 했는데, match data 내에 있는 챔피언 id, img를 다른 api에서 또 사용하기 때문에 한번에 여러 api를 쏘고 데이터를 맵핑 하는 과정에서 비동기 사용에 심의를 기울인것 같다.
- css를 위해 새로 고침할 때 마다 riot에게 정보를 다시 호출하는 과정에서 시간을 많이 소요

### css

- 부스스트랩를 쓰지 않고, styled-components와 scss만을 이용하여 구현
