//该文件用于创建整个文件的路由器
import { createRouter, createWebHashHistory } from 'vue-router'



const routes = [
    { 
        path: '/', 
        component: () => import('../pages/home.vue')
    },
    { 
        path: '/bishi', 
        component: () => import('../pages/bishi.vue')
    },
    { 
        path: '/mianshi', 
        component: () => import('../pages/mianshi.vue')
    },
    { 
        path: '/youhua', 
        component: () => import('../pages/youhua.vue')
    },
    { 
        path: '/fenxi', 
        component: () => import('../pages/fenxi.vue')
    },
    { 
        path: '/jiexi', 
        component: () => import('../pages/jiexi.vue')
    },
  ]
  
const router =createRouter({
    // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
    history: createWebHashHistory(),
    routes, // `routes: routes` 的缩写
  })


export default router