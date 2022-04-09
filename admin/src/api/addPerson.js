import axios from 'axios';
import qs from 'qs'
const url = 'http://localhost:3000/addPerson'
let addPerson = (obj) =>{
  const { username,password,nickname,age,eamil,level } = obj;
  return new Promise((resolve, reject) => {
    axios.post(url,qs.stringify({
      username,
      password,
      nickname,
      age,
      eamil,
      level
    }))
      .then((res) => {
        resolve(res)
      })
      .catch((err) => {
        reject(err)
      })
  })
}
export default addPerson