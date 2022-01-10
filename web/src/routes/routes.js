import DashboardLayout from '@/views/Layout/DashboardLayout.vue';

import NotFound from '@/views/NotFoundPage.vue';

const routes = [
  {
    path: '/',
    component: DashboardLayout,
    meta: {navbarType: 'dark'},
    children: [
      {
        path: '/',
        name: 'maps',
        component: () => import(/* webpackChunkName: "demo" */ '../views/Map.vue'),
        meta: {navbarType: 'dark'},
      },
      {
        path: '*', 
        component: NotFound
      }
    ]
  },
];

export default routes;
