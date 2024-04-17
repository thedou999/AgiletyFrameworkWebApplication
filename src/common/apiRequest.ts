import axios, { AxiosHeaders } from 'axios'
import mainStore from '../stores/main'
import { IApiDataResult } from '../types'
import router from '../router/index'

const baseService = axios.create({
    baseURL: 'http://localhost:5108/api',
})
const loginService = axios.create({
    baseURL: 'https://localhost:7252'
})

const apiUrl = () => 'http://localhost:5108'


baseService.interceptors.request.use( config => {
    config.headers.setAuthorization(`Bearer ${mainStore().$state.accessToken}`)
    return config
})
baseService.interceptors.response.use( async rsp => {
    const result = rsp.data

    if(result.Success == false){
        debugger
        console.log('鉴权失败,尝试使用refreshtoken');
        
        const getAccountRsp = await GetAccount()
        const getAccountResult = getAccountRsp.data
        if(getAccountResult.Success == false){
            mainStore().$state.accessToken = null
            mainStore().$state.refreshToken = null
            mainStore().$state.menuList = []
            mainStore().$state.user = null
            localStorage.removeItem('main')

            console.log('拦截器处理鉴权失败，去loging页');
            router.push('/login')

        }else{
            mainStore().$state.accessToken = getAccountResult.data.accessToken
            mainStore().$state.refreshToken = getAccountResult.data.refreshToken
            mainStore().$state.menuList = []
            mainStore().$state.user = getAccountResult.data.user

            console.log('拦截器处理鉴权成功，刷新token');
        }
        return rsp
    }
    return rsp
})



export {axios, baseService, apiUrl,loginService }

async function GetAccount(){
    const getAccountService = axios.create({
        baseURL:'https://localhost:7252',
        headers:new AxiosHeaders().setAuthorization(`Bearer ${mainStore().$state.refreshToken}`)
    })
    return await getAccountService.get('/auth/Account')
}