import Vue from 'vue'
import Vuex from 'vuex'
import authorization from './modules/authorization.vue';

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    authorization
}
})
