import axios from "axios";
const key = "5f96323678d05ff0c4eb264ef184556868e303b32a2db88ecbf15746e6f25e02";

// const getSplashImage = (page = 1) => {
//   return fetch("https://api.qa.studiomate.kr/v2/member/board")
//     .then(res => res.json())
//     .catch(err => {
//       console.log(13323333);
//       throw err;
//     });
// };
const getSplashImage = (page = 1) =>
  axios.get(
    `https://api.unsplash.com/photos/?client_id=${key}&page=${page}&per_page=30`
  );

export { getSplashImage };
