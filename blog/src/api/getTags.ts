import axios from 'axios'
let url = 'http://localhost:3000/getTags'
const getTags = (id?: number) => {
  if (id) {
    url = url + '/' + id
  }
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
export default getTags
