import axios from 'axios'
const url = 'http://localhost:3000/getList'
const getTimeLine = () => {
  return new Promise((resolve, reject) => {
    axios.get(url)
      .then((res) => {
        resolve(res)
      })
      .catch((err) => {
        reject(err)
      })
  })
}
export default getTimeLine
