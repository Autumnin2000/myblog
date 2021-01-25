import axios from 'axios'
import qs from 'qs'
const url = 'http://localhost:3000/addComment/'
const addComment = (name: string, content: string, date: Date, articleId: number, Id: number) => {
  return new Promise((resolve, reject) => {
    axios.post(url + articleId, qs.stringify({
      name,
      content,
      date,
      Id
    }))
      .then((res) => {
        resolve(res)
      })
      .catch((err) => {
        reject(err)
      })
  })
}
export default addComment
