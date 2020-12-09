import axios from 'axios';
const key = 'RGAPI-3e6ec870-5f4f-4528-bcb9-db78cf2f89ee';

// const getSplashImage = (page = 1) => {
//   return fetch("https://api.qa.studiomate.kr/v2/member/board")
//     .then(res => res.json())
//     .catch(err => {
//       console.log(13323333);
//       throw err;
//     });
// };
const getSplashImage = (page = 1) => axios.get(`https://api.unsplash.com/photos/?client_id=${key}&page=${page}&per_page=30`);

export { getSplashImage };
