import Vue from 'vue'
import App from './App.vue'
import Vuelidate from "vuelidate";
import router from './router'
import store from './store'
import BootstrapVue from 'bootstrap-vue'

Vue.use(Vuelidate);
Vue.config.productionTip = false;
Vue.use(BootstrapVue);

router.beforeEach((to, from, next) => {
  if(to.meta.requiresAuth) {
    
  }
  console.log(to);
  next();
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
