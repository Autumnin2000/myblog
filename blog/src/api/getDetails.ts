import axios from 'axios'
const url = 'http://localhost:3000/details/'
interface Result {
  data: [];
}
const getDetails = (id: number): Promise<Result> => {
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
export default getDetails
