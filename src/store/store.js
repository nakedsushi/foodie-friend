import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    questionNumber: 0,
    filters: []
  },
  getters: {
    currentQuestionNumber: state => state.questionNumber,
    chosenFilters: state => state.filters
  },
  mutations: {
    changeQuestion(state, num) {
      state.questionNumber = state.questionNumber + num;
    }
  }
});