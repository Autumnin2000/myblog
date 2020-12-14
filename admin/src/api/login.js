import axios from 'axios'
import qs from 'qs'
const url = 'http://localhost:3000/login'

let userLogin =(username,password) =>{
  return new Promise((resolve, reject) => {
    axios.post(url,qs.stringify({
      username,
      password
    }))
      .then((res) => {
        resolve(res)
      })
      .catch((err) => {
        reject(err)
      })
  })
}
export default userLogin;
