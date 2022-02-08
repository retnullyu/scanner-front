import Vue from 'vue';
import Router from 'vue-router';

Vue.use (Router);

/* Layout */
import Layout from '@/layout';

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  //默认的路由 公共路由
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import ('@/views/redirect/index'),
      },
    ],
  },


  {
    path: '/login',
    component: () => import ('@/views/login/index'),
    hidden: true,
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    hidden: true,
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import ('@/views/dashboard/index'),
        meta: {title: '首页', icon: 'dashboard', noCache: true, affix: true},
      },
      {
        path: 'userInfo',
        name: 'UserInfo',
        component: () => import ('@/views/dashboard/userInfo/index'),
        meta: {title: '个人信息', noCache: true, affix: true},
      },
    ],
  },

  {
    path: '/error',
    name: 'Error',
    component: Layout,
    redirect: '/error/404',
    hidden: true,
    children: [
      {
        path: '404',
        component: () => import ('@/views/error/404/index'),
      },
      {
        path: '401',
        component: () => import ('@/views/error/401/index'),
      },
    ],
  },
  {
    path: '/information',
    name: 'information',
    component: Layout,
    redirect: '/information/directory',
    meta: {
      resources: 'fofa_history',
      title: '敏感信息收集',
    },
    children: [
      {
        path: 'directory',
        name: 'directory',
        component: () => import ('@/views/information/directory'),
        meta: {
          resources: 'fofa_history',
          title: '目录扫描',
        },
      },
      {
        path: 'subdomain',
        name: 'subdomain',
        component: () => import ('@/views/information/subdomain'),
        meta: {
          resources: 'fofa_history',
          title: '子域名爆破',
        },
      },
      {
        path: 'port',
        name: 'port',
        component: () => import ('@/views/information/port'),
        meta: {
          resources: 'fofa_history',
          title: '端口扫描',
        },
      }

    ],
  },
  {
    path: '/vuln',
    name: 'vuln',
    component: Layout,
    redirect: '/vuln/json',
    meta: {
      resources: 'fofa_history',
      title: '漏洞扫描',
    },
    children: [

      {
        path: 'vuln',
        name: 'vuln',
        component: () => import ('@/views/vuln/json'),
        meta: {
          resources: 'fofa_history',
          title: '简单漏洞扫描',
        },
      },
      {
        path: 'weakpass',
        name: 'weakpass',
        component: () => import ('@/views/vuln/weakpass'),
        meta: {
          resources: 'fofa_history',
          title: '弱口令探测',
        },
      },
    ],
  },
  

  // 404 page must be placed at the end !!!
  {
    path: '*',
    redirect: '/error/404',
    hidden: true,
  },
];

// 异步挂载的路由
// 动态需要根据权限加载的路由表
// 这个路由链，根据数据库中的一一对应，也就是说这是一个最完整的路由链，
// 根据登录的用户权限的不同，然后从中提取出对应当前用户的路由添加到vue router中
// meta:属性中resources属性最为重要，用meta.resources和我们获取用户信息中menus.resources匹配
export const asyncRouterMap = [
  {
    path: '/pre',
    name: 'Pre',
    component: Layout,
    redirect: '/pre/index',
    meta: {
      resources: 'pre',
      title: '权限管理',
    },
    children: [
      {
        path: 'index',
        name: 'PrePerm',
        component: () => import ('@/views/pre/perm/index'),
        meta: {
          resources: 'pre_perm',
          title: '权限管理',
        },
      },
      {
        path: 'user',
        name: 'PreUser',
        component: () => import ('@/views/pre/user/index'),
        meta: {
          resources: 'pre_user',
          title: '用户管理',
        },
      },
      {
        path: 'role',
        name: 'PreRole',
        component: () => import ('@/views/pre/role/index'),
        meta: {
          resources: 'pre_role',
          title: '角色管理',
        },
      }
    ],
  },
  {
    path: '/fofa',
    name: 'fofa',
    component: Layout,
    redirect: '/fofa/query',
    meta: {
      resources: 'fofa',
      title: 'fofa信息收集',
    },
    children: [
      {
        path: 'index',
        name: 'index',
        component: () => import ('@/views/fofa/query'),
        meta: {
          resources: 'fofa_query',
          title: 'fofa查询',
        },
      },
      {
        path: 'history',
        name: 'history',
        component: () => import ('@/views/fofa/history'),
        meta: {
          resources: 'fofa_history',
          title: '查询历史',
        },
      }

    ],
  },
  {
    path: '/sys',
    name: 'Sys',
    component: Layout,
    redirect: '/sys/index',
    meta: {
      resources: 'sys',
      title: '系统设置',
    },
    children: [

      {
        path: 'logs',
        name: 'SysLogs',
        component: () => import ('@/views/sys/logs/index'),
        meta: {
          resources: 'sys_logs',
          title: '日志数据',
        },
      },
      {
        path: 'swagger',
        name: 'SysSwagger',
        component: () => import ('@/views/sys/swagger/index'),
        meta: {
          resources: 'sys_swagger2',
          title: 'API文档',
        },
      },
    ],
  },
];

const createRouter = () =>
  new Router ({
    // mode: 'history', // require service support
    scrollBehavior: () => ({y: 0}),
    routes: constantRoutes,
  });

const router = createRouter ();

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter () {
  const newRouter = createRouter ();
  router.matcher = newRouter.matcher; // reset router
}

export default router;
