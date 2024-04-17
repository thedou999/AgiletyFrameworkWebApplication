import { axios, baseService } from './apiRequest'
import { IApiDataResult , Log, IPagingData} from '../types/index.ts'

export async function GetLogPageAsync(pageIndex:number,pageSize:number,searchString?:string) {
    return baseService.get('/Log/GetLogPage',{
        params:{
            pageIndex:pageIndex,
            pageSize:pageSize,
            searchString:searchString
        }
    }).then(rsp => {
        const result = rsp.data as IApiDataResult<IPagingData<Log>>
        return result
    })
}