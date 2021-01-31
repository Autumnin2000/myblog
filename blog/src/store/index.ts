import { createStore } from 'vuex'

export default createStore({
  state: {
    commentList: [],
    articleId: 0,
    isCommented: 0,
    searchData: []
  },
  mutations: {
    changeCommentList (state, value) {
      state.commentList = value
    },
    setArticleId (state, value) {
      state.articleId = value
    },
    setCommentedState (state) {
      state.isCommented++
      console.log(state)
    },
    setSearchData (state, value) {
      state.searchData = value
    }
  },
  getters: {
    getCommentState (state) {
      return state.isCommented
    }
  }

})
