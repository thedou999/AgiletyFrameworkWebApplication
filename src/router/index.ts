import { RouteRecordRaw, createRouter, createWebHashHistory, createWebHistory, useRouter } from "vue-router"
import viewIndex from '../components/index.vue'
import index from '../views/home/index.vue'
import userIndex from '../views/user/index.vue'
import logIndex from '../views/log/index.vue'
import menuIndex from '../views/menu/index.vue'
import loginIndex from '../views/login/index.vue'
import mainStore from '../stores/main'
import { axios, baseService } from '../common/apiRequest'
import { IApiDataResult, Menu } from "../types"
import { log } from "echarts/types/src/util/log.js"

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'home',
        meta: { title: 'home' },
        redirect: '/login',
        component: viewIndex,
        children: [
            {
                path: '/index',
                name: 'index',
                meta: { title: '首页' },
                component: index
            }
            // ,
            // {
            //     path: '/user',
            //     name: 'user',
            //     meta: { title: '用户' },
            //     component: userIndex
            // },
            // {
            //     path: '/log',
            //     name: 'log',
            //     meta: { title: '日志' },
            //     component: logIndex
            // },
            // {
            //     path: '/menu',
            //     name: 'menu',
            //     meta: { title: '菜单' },
            //     component: menuIndex
            // }
        ]
    },
    {
        path: '/login',
        name: 'login',
        meta: {title:'login'},
        component: loginIndex
    }
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})

let routeData: Menu[] = []

const SettingUserRouter = async () => {
    const rsp = await axios.get('http://localhost:5108/api/Menu/GetAllMenu')
    // const rsp = await baseService.get('/Menu/GetAllMenu')
    const result = rsp.data as IApiDataResult<Menu[]>

    if (result.success == true) {
        console.log('开始初始化路由信息')
        
        routeData = result.data
    }
    else {
        routeData = []
    }

    const modules = import.meta.glob('../views/*/*.vue')

    const initRoute = (routeData: Menu[]): RouteRecordRaw[] => {
        const initedRouteData: RouteRecordRaw[] = []

        routeData.forEach((route: Menu) => {
            let initedRoute: RouteRecordRaw = {
                path: route.webUrl,
                name: route.webUrlName,
                meta: {
                    id: route.id,
                    title: route.menuText
                } as any
            }
            initedRoute.component = modules[route.vueFilePath]

            if (route.children.length > 0) {
                initedRoute.children = initRoute(route.children)
            } else {
                initedRoute.children = []
            }

            initedRouteData.push(initedRoute)
        })

        return initedRouteData
    }

    const initedRouteData = initRoute(routeData);

    initedRouteData.forEach((r: RouteRecordRaw) => {
        router.addRoute('home', r)
    })
}


await SettingUserRouter()


router.beforeEach(async (to, from, next) => {

    if(to.path != "/login"){
        console.log('执行settingUserRouter');
        try{
            await SettingUserRouter();
            mainStore().initMenu(routeData)
        }catch(e){
            console.log(e)
        }
    }
    
    if(mainStore().$state.accessToken == null && to.name !== 'login')
    {
        console.log('to login')
        mainStore().$state.accessToken = null
        mainStore().$state.refreshToken = null
        mainStore().$state.menuList = []
        mainStore().$state.user = null

        localStorage.removeItem('main')

        next('/login')
        return
    }

    next()
})


export default router