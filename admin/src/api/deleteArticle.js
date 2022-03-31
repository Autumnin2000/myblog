import axios from 'axios';
import qs from 'qs'
const url = 'http://localhost:3000/deleteArticle'
let deleteArticle = (id) =>{
  return new Promise((resolve, reject) => {
    axios.post(url,qs.stringify({
        id
    }))
      .then((res) => {
        resolve(res)
      })
      .catch((err) => {
        reject(err)
      })
  })
}
export default deleteArticle