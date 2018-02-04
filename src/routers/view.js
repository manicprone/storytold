import Vue from 'vue';
import Router from 'vue-router';
import HomePage from '../pages/HomePage.vue';
import ViewStoryPage from '../pages/ViewStoryPage.vue';
import ManageProfilePage from '../pages/ManageProfilePage.vue';
import ManageStoriesPage from '../pages/ManageStoriesPage.vue';
import ManageStoryPage from '../pages/ManageStoryPage.vue';
import ManageChaptersPage from '../pages/ManageChaptersPage.vue';
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

      // ------------------------------------------------------- View Story Page
      {
        path: '/view/story/:activeStoryID',
        name: 'view-story',
        props: true,
        component: ViewStoryPage,
      },
      { path: '/view', redirect: '/' },
      { path: '/view/story', redirect: '/' },

      // --------------------------------------------------- Manage Profile Page
      {
        path: '/manage/profile',
        name: 'manage-profile',
        component: ManageProfilePage,
      },
      { path: '/manage', redirect: '/manage/profile' },

      // ---------------------------------------------------- Manage Story Pages
      {
        path: '/manage/stories',
        name: 'manage-stories',
        component: ManageStoriesPage,
      },
      {
        path: '/manage/story/:activeStoryID',
        name: 'manage-story',
        props: true,
        component: ManageStoryPage,
      },
      { path: '/manage/story', redirect: '/manage/stories' },

      // -------------------------------------------------- Manage Chapters Page
      {
        path: '/manage/chapters',
        name: 'manage-chapters',
        component: ManageChaptersPage,
      },

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
