import axios from 'axios';
import qs from 'qs'
const url = 'http://localhost:3000/addArticle'
let addArticle = (title,content,desc,date) =>{
  return new Promise((resolve, reject) => {
    axios.post(url,qs.stringify({
      title,
      content,
      desc,
      date
    }))
      .then((res) => {
        resolve(res)
      })
      .catch((err) => {
        reject(err)
      })
  })
}
export default addArticle