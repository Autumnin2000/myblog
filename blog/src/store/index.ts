import { createStore } from 'vuex'

export default createStore({
  state: {
    commentList: [],
    articleId: 0,
    isCommented: 0
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
    }
  },
  getters: {
    getCommentState (state) {
      return state.isCommented
    }
  }

})
