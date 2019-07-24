import Vue from "vue";
import Router from "vue-router";
import registration from "./components/registrationForm.vue";
import authorization from "./components/authorization.vue";
import mainPage from "./components/mainPage.vue";
import profileSupplier from './components/profileSupplier.vue';
import profileCustomer from './components/profileCustomer.vue'


Vue.use(Router);


export default new Router({
  routes: [
    

    {
      path: '/registration',
      name: 'registration',
      component: registration,
    },
    {
      path: '/authorization',
      name: 'authorization',
      component: authorization,
    },
    {
      path: '/main',
      name: 'main',
      component: mainPage,
      meta: { requiresAuth: true },
    },
    {
      path: '/profile-supplier',
      name: 'profileSupplier',
      component: profileSupplier,
      meta: { requiresAuth: true },
    },
    {
      path: '/profile-customer',
      name: 'profileCustomer',
      component: profileCustomer,
      meta: { requiresAuth: true },
    }
  ]
});
