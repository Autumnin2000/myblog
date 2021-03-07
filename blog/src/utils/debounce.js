import store from '../store/index.ts'
export default function debounce (fn, val, delay) {
  let timer = null
  return function () {
    clearTimeout(timer)
    timer = setTimeout(() => {
      if (val === '') {
        store.commit('setSearchData', [])
        return
      }
      fn.call(this, val)
        .then(res => {
          store.commit('setSearchData', res.data.data)
        })
        .catch(e => {
          console.log(e)
        })
    }, delay)
  }
}
