import { createRouter, createWebHashHistory } from 'vue-router';

import UserPage from '../views/frontend/UserPage.vue';
import UserIndex from '../views/frontend/UserIndex.vue';
import PageNotFound from '../views/PageNotFound.vue';

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      component: UserPage,
      children: [
        {
          path: '',
          component: UserIndex,
        },
        {
          path: '/shop',
          component: () => import('../views/frontend/OnlineShop.vue'),
          meta: {
            title: '線上商店',
          },
        },
        {
          path: '/product/:id',
          component: () => import('../views/frontend/ProductDetails.vue'),
        },
        {
          path: '/favorite',
          component: () => import('../views/frontend/FavoriteProducts.vue'),
          meta: {
            title: '收藏清單',
          },
        },
        {
          path: '/order-details',
          component: () => import('../views/frontend/OrderDetails.vue'),
          meta: {
            title: '訂單査詢',
          },
        },
        {
          path: '/faq',
          component: () => import('../views/frontend/FaqPage.vue'),
          meta: {
            title: '常見問題',
          },
        },
        {
          path: '/blog',
          redirect: '/blog/',
          children: [
            {
              path: '/blog/',
              component: () => import('../views/frontend/ArticleList.vue'),
              meta: {
                title: '部落格',
              },
            },
            {
              path: 'article/:id',
              component: () => import('../views/frontend/ArticlePage.vue'),
            },
          ],
        },
        {
          path: '/checkout',
          redirect: '/checkout/cart',
          component: () => import('../views/frontend/UserCheckout.vue'),
          children: [
            {
              path: 'cart',
              component: () => import('../views/frontend/CheckCart.vue'),
              meta: {
                title: '確認商品',
              },
            },
            {
              path: 'information',
              component: () => import('../views/frontend/CheckInfo.vue'),
              meta: {
                title: '填寫資料',
              },
            },
            {
              path: 'pay',
              component: () => import('../views/frontend/CheckPay.vue'),
              meta: {
                title: '確認付款',
              },
            },
            {
              path: 'complete',
              component: () => import('../views/frontend/CheckComplete.vue'),
              meta: {
                title: '完成購物',
              },
            },
          ],
        },
        {
          path: '/:pathMatch(.*)*',
          component: PageNotFound,
          meta: {
            title: '査無此頁',
          },
        },
      ],
    },
    {
      path: '/login',
      component: () => import('../views/backend/AdminLogin.vue'),
      meta: {
        title: '後台登入',
      },
    },
    {
      path: '/admin',
      redirect: '/admin/product',
      component: () => import('../views/backend/AdminPage.vue'),
      children: [
        {
          path: 'product',
          component: () => import('../views/backend/ProductDashboard.vue'),
          meta: {
            title: '商品後台',
          },
        },
        {
          path: 'coupon',
          component: () => import('../views/backend/CouponDashboard.vue'),
          meta: {
            title: '優惠券後台',
          },
        },
        {
          path: 'order',
          component: () => import('../views/backend/OrderDashboard.vue'),
          meta: {
            title: '訂單後台',
          },
        },
        {
          path: 'blog',
          component: () => import('../views/backend/BlogDashboard.vue'),
          meta: {
            title: '部落格後台',
          },
        },
        {
          path: '/admin/:pathMatch(.*)*',
          redirect: '/admin',
        },
      ],
    },
  ],
  scrollBehavior() {
    return {
      top: 0,
    };
  },
});

export default router;
