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
      redirect: '/main',
      children: [
        {
          path: 'main',
          name: 'main',
          component: () => import('@/views/test.vue'),
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
