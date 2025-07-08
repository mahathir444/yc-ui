import { createWebHashHistory, createRouter } from 'vue-router';

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      redirect: {
        name: 'main',
      },
      children: [
        {
          path: 'main',
          name: 'main',
          component: () => import('@/views/main.vue'),
          redirect: {
            name: 'dev',
          },
          children: [
            {
              path: 'dev',
              name: 'dev',
              component: () => import('@/views/dev.vue'),
            },
            {
              path: 'common',
              name: 'common',
              component: () => import('@/views/demo/Common.vue'),
            },
            {
              path: 'layout',
              name: 'layout',
              component: () => import('@/views/demo/Layout.vue'),
            },
            {
              path: 'dataShow',
              name: 'dataShow',
              component: () => import('@/views/demo/DataShow.vue'),
            },
            {
              path: 'dataInput',
              name: 'form',
              component: () => import('@/views/demo/DataInput.vue'),
            },
            {
              path: 'feedback',
              name: 'feedback',
              component: () => import('@/views/demo/Feedback.vue'),
            },
            {
              path: 'navigation',
              name: 'navigation',
              component: () => import('@/views/demo/Navigation.vue'),
            },
            {
              path: 'other',
              name: 'other',
              component: () => import('@/views/demo/other.vue'),
            },
          ],
        },
      ],
    },
  ],
});

export default router;
