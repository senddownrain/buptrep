import Vue from 'vue'
import Vuex from 'vuex'
import lessons from './modules/lessons'
import gsheet from './modules/gsheet'
import general from './modules/general'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    general,
    lessons,
    gsheet
  }
})
