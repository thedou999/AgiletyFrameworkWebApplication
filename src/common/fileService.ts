import { baseService } from "./apiRequest";

const GetImage = function (imagePath:string) {
    return baseService.get('/File/GetImage',{
        params:{
            imagePath:imagePath
        },
        responseType: 'blob'
    }).then(rsp => {
        return rsp.data
    })
    
}

export {GetImage}