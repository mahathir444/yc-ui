import { createWebHashHistory, createRouter } from 'vue-router';
// 自定义路由元信息
declare module 'vue-router' {
  interface RouteMeta {
    title?: string;
  }
}

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
            name: 'lyc',
          },
          children: [
            {
              path: 'lyc',
              name: 'lyc',
              component: () => import('@/views/test-lyc.vue'),
            },
            {
              path: 'lsh',
              name: 'lsh',
              component: () => import('@/views/test-lsh.vue'),
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
  scrollBehavior(_to, _from, savedPosition) {
    return savedPosition
      ? savedPosition
      : {
          left: 0,
          top: 0,
        };
  },
});

router.beforeEach((_to, _from, next) => {
  next();
});

export default router;
