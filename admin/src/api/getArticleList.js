import axios from 'axios';
const url = 'http://localhost:3000/getList'
let getArticleList = () =>{
  return new Promise((resolve, reject) => {
    axios.get(url)
      .then((res) => {
          console.log(res);
        resolve(res)
      })
      .catch((err) => {
        reject(err)
      })
  })
}
export default getArticleList