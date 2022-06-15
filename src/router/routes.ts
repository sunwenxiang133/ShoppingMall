import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/ShopPage',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: 'ShopPage', component: () => import('pages/ShopPage.vue') },
      {
        path: 'CartPage',
        component: () => import('pages/CartPage.vue'),
      },
      {
        path: 'OrderPage',
        component: () => import('pages/OrderPage.vue'),
      },
      {
        path: 'LoginPage',
        component: () => import('pages/LoginPage.vue'),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
