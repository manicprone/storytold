import Vue from 'vue';
import Router from 'vue-router';
import HomePage from '../pages/HomePage.vue';
import ManageChaptersPage from '../pages/ManageChaptersPage.vue';
import ManageMyProfilePage from '../pages/ManageMyProfilePage.vue';
import AdminRootPage from '../pages/AdminRootPage.vue';
import AdminDashboardPage from '../pages/AdminDashboardPage.vue';
import AdminUsersPage from '../pages/AdminUsersPage.vue';

Vue.use(Router);

export function createRouter() {
  const router = new Router({
    mode: 'history',
    scrollBehavior: () => ({ y: 0 }),

    routes: [

      // ------------------------------------------------------------- Home Page
      {
        path: '/',
        name: 'home',
        component: HomePage,
      },

      // -------------------------------------------------- Manage Chapters Page
      {
        path: '/manage/chapters',
        name: 'manage-chapters',
        component: ManageChaptersPage,
      },

      // ------------------------------------------------ Manage My Profile Page
      {
        path: '/manage/profile',
        name: 'manage-profile',
        component: ManageMyProfilePage,
      },
      { path: '/manage', redirect: '/manage/profile' },

      // ----------------------------------------------------------- Admin Pages
      {
        path: '/admin',
        component: AdminRootPage,
        children: [
          {
            path: '',
            name: 'admin-dashboard',
            component: AdminDashboardPage,
          },
          {
            path: 'users',
            name: 'admin-users',
            component: AdminUsersPage,
          },
        ],
      },

    ],
  });

  return router;
}
