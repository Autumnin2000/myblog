import axios from 'axios'
const url = 'http://localhost:3000/getList'
const getDetails = (id:Number) => {
  return new Promise((resolve,reject) => {
    axios.get(url+id)
    .then((res) =>{
      resolve(res)
    })
    .catch((err) =>{
      reject(err)
    })
  })
}
export default getDetails