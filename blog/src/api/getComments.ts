import axios from 'axios'
const url = 'http://localhost:3000/comments/'
interface Result {
  data: [{
    content: '';
  }];
}
const getComments = (id: number): Promise<Result> => {
  return new Promise((resolve, reject) => {
    axios.get(url + id)
      .then((res) => {
        resolve(res)
      })
      .catch((err) => {
        reject(err)
      })
  })
}
export default getComments
