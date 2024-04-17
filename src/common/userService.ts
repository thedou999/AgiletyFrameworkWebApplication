import { axios, baseService } from './apiRequest.ts'
import { IUser, IApiDataResult, IPagingData} from '../types/index'
import { fa, tr } from 'element-plus/es/locales.mjs'

async function GetUserPage(pageIndex:number,pageSize:number,searchString?:string){
    return baseService.get('/User/GetUserPage',{
        params: {
            pageIndex: pageIndex,
            pageSize: pageSize,
            searchString: searchString
        }
    }).then(function (rsp){
        const result = rsp.data as IApiDataResult<IPagingData<IUser>>
        return result
    })
}

export { GetUserPage }