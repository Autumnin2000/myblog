import axios from 'axios'
const url = 'http://localhost:3000/search/'
const getSearchList = (keywords: string) => {
  return new Promise((resolve, reject) => {
    axios.get(url + keywords)
      .then((res) => {
        resolve(res)
      })
      .catch((err) => {
        reject(err)
      })
  })
}
export default getSearchList
