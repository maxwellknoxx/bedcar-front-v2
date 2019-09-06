import Vue from 'vue';
import Router from 'vue-router';


import { Role } from './role';
import login from '../components/login'
import HomePage from '../home/HomePage'
import Customer from '../components/customers'
import ShowCustomers from '../components/showCustomers'
import Payments from '../components/payments'
import Admin from '../admin/AdminPage'
import Statistics from '../components/statistics'

Vue.use(Router);

export const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'default',
      component: login
    },

    {
      path: '/home',
      name: 'home',
      component: HomePage
    },

    {
      path: '/login',
      name: 'login',
      component: login
    },

    {
      path: '/customers',
      name: 'customers',
      component: Customer
    },

    {
      path: '/showCustomers',
      name: 'showCustomers',
      component: ShowCustomers,
    },

    {
      path: '/payments',
      name: 'payments',
      component: Payments,
      meta: { authorize: Role.Admin }
    },

    {
      path: '/admin',
      name: 'admin',
      component: Admin,
      meta: { authorize: Role.Admin }
    },

    {
      path: '/statistics',
      name: 'statistics',
      component: Statistics,
      meta: { authorize: Role.Admin }
    },

    // otherwise redirect to home
    { path: '*', redirect: '/' }
  ]
});

router.beforeEach((to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = ['/login', '/',];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('user');

  if (authRequired && !loggedIn) {
    return next('/login');
  }

  next();
})