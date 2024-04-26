import {createRouter,createWebHistory} from '../../node_modules/vue-router/index.js';
import router_Index from '@/views/router_index';
import router_Second from '@/views/router_second';
import router_Three from '@/views/router_three'
import Large_screen from '@/views/large_screen'

// 路由配置
const routes = [{
		path: '/',
		component: Large_screen
	},
	{
		path: '/large_screen',
		component: Large_screen
	},
	{
		path: '/router_index',
		component: router_Index
	},
	{
		path: '/router_second',
		component: router_Second
	},
	{
		path: '/router_three',
		component: router_Three
	}
];

// 创建router实例
const router = createRouter({
	history: createWebHistory(),
	routes
});

export default router;