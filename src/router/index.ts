import {createRouter, createWebHistory} from 'vue-router';
import AppLayout from '@/layout/AppLayout.vue';
import ItemAppLayout from "@/views/item/component/AppLayout.vue"
import {Local, Session} from '@/utils/storage';
import {useUserInfo} from '@/stores/userInfo';
import eventEmitter from "@/utils/eventEmitter.ts";
import {ElMessage} from "element-plus";
import 'element-plus/es/components/message/style/index'
//
export const itemPage = [
    {
        path: '/',
        name: 'item',
        redirect: '/dashboard',
        component: ItemAppLayout,
        children: [
            {
                path: '/dashboard',
                name: 'dashboard',
                component: () => import('@/views/item/Dashboard.vue')
            },
            {
                path: '/tailwind-playground',
                name: 'tailwind playground',
                redirect: '/tailwind-playground/demo',
                children: [
                    {
                        path: '/tailwind-playground/demo',
                        name: 't-playground-demo',
                        component: () => import('@/views/item/tailwind-playground/Demo.vue')
                    }
                ]
            }
        ]
    }
]

export const defaultPage = [
    {
        path: '/',
        component: AppLayout,
        children: [
            {
                path: '/',
                name: 'dashboard',
                component: () => import('@/views/Dashboard.vue')
            },
            {
                path: '/uikit/formlayout',
                name: 'formlayout',
                component: () => import('@/views/uikit/FormLayout.vue')
            },
            {
                path: '/uikit/input',
                name: 'input',
                component: () => import('@/views/uikit/Input.vue')
            },
            {
                path: '/uikit/floatlabel',
                name: 'floatlabel',
                component: () => import('@/views/uikit/FloatLabel.vue')
            },
            {
                path: '/uikit/invalidstate',
                name: 'invalidstate',
                component: () => import('@/views/uikit/InvalidState.vue')
            },
            {
                path: '/uikit/button',
                name: 'button',
                component: () => import('@/views/uikit/Button.vue')
            },
            {
                path: '/uikit/table',
                name: 'table',
                component: () => import('@/views/uikit/Table.vue')
            },
            {
                path: '/uikit/list',
                name: 'list',
                component: () => import('@/views/uikit/List.vue')
            },
            {
                path: '/uikit/tree',
                name: 'tree',
                component: () => import('@/views/uikit/Tree.vue')
            },
            {
                path: '/uikit/panel',
                name: 'panel',
                component: () => import('@/views/uikit/Panels.vue')
            },

            {
                path: '/uikit/overlay',
                name: 'overlay',
                component: () => import('@/views/uikit/Overlay.vue')
            },
            {
                path: '/uikit/media',
                name: 'media',
                component: () => import('@/views/uikit/Media.vue')
            },
            {
                path: '/uikit/menu',
                component: () => import('@/views/uikit/Menu.vue'),
                children: [
                    {
                        path: '/uikit/menu',
                        component: () => import('@/views/uikit/menu/PersonalDemo.vue')
                    },
                    {
                        path: '/uikit/menu/seat',
                        component: () => import('@/views/uikit/menu/SeatDemo.vue')
                    },
                    {
                        path: '/uikit/menu/payment',
                        component: () => import('@/views/uikit/menu/PaymentDemo.vue')
                    },
                    {
                        path: '/uikit/menu/confirmation',
                        component: () => import('@/views/uikit/menu/ConfirmationDemo.vue')
                    }
                ]
            },
            {
                path: '/uikit/message',
                name: 'message',
                component: () => import('@/views/uikit/Messages.vue')
            },
            {
                path: '/uikit/file',
                name: 'file',
                component: () => import('@/views/uikit/File.vue')
            },
            {
                path: '/uikit/charts',
                name: 'charts',
                component: () => import('@/views/uikit/Chart.vue')
            },
            {
                path: '/uikit/misc',
                name: 'misc',
                component: () => import('@/views/uikit/Misc.vue')
            },
            {
                path: '/blocks',
                name: 'blocks',
                component: () => import('@/views/utilities/Blocks.vue')
            },
            {
                path: '/utilities/icons',
                name: 'icons',
                component: () => import('@/views/utilities/Icons.vue')
            },
            {
                path: '/pages/timeline',
                name: 'timeline',
                component: () => import('@/views/pages/Timeline.vue')
            },
            {
                path: '/pages/empty',
                name: 'empty',
                component: () => import('@/views/pages/Empty.vue')
            },
            {
                path: '/pages/crud',
                name: 'crud',
                component: () => import('@/views/pages/Crud.vue')
            },
            {
                path: '/documentation',
                name: 'documentation',
                component: () => import('@/views/utilities/Documentation.vue')
            }
        ]
    },
    {
        path: '/landing',
        name: 'landing',
        component: () => import('@/views/pages/Landing.vue')
    },
    {
        path: '/pages/notfound',
        name: 'notfound',
        component: () => import('@/views/pages/NotFound.vue')
    },

    {
        path: '/auth/login',
        name: 'login',
        component: () => import('@/views/pages/auth/Login.vue')
    },
    {
        path: '/auth/access',
        name: 'accessDenied',
        component: () => import('@/views/pages/auth/Access.vue')
    },
    {
        path: '/auth/error',
        name: 'error',
        component: () => import('@/views/pages/auth/Error.vue')
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes: [
        ...itemPage,
        // ...defaultPage
    ]
})

eventEmitter.on('API:UN_AUTHORIZED', () => {
    router.push('/auth/login');
})
eventEmitter.on('API:UN_LOGIN', (response) => {
    const directUrl = response.headers.location;
    window.location.href = directUrl; // 去登录页
})
eventEmitter.on('API:NOT_SERVICE_ERROR', () => {
    ElMessage.error('service error')
})

router.beforeEach(async (to, from, next) => {
    next();
})


function getSSOParamsFromURL(route) {
    let token: any = route?.query?.token;

    const queryParamsFromRouteHash = getQueryParamsFromRouteHash(route);
    const getParamValFromHashParams = (key: string) => {
        const param = queryParamsFromRouteHash.find((item) => item[0] === key);
        if (param) return param[1];
        return;
    };
    if (!token) {
        token = getParamValFromHashParams('token');
    }

    return {
        token,
    };
}

function getQueryParamsFromRouteHash(route) {
    let hashStr = route?.hash || '?';
    hashStr = hashStr.slice(hashStr.indexOf('?') + 1, hashStr.length);
    return hashStr.split('&').map((str) => {
        return str.split('=');
    });
}


export default router;

