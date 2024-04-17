import { el } from "element-plus/es/locales.mjs"

export interface IApiResult {
    success: boolean,
    message?: string,
}
export interface IApiDataResult<T> extends IApiResult {
    data: T,
    oValue?: T
}

export class Menu {
    public id: string = ''
    public menuText: string = ''
    public menuType: number = 0
    public icon: string = ''
    public webUrlName: string = ''
    public webUrl: string = ''
    public vueFilePath: string = ''
    public component: any = null
    public children: Menu[] = []

//     public string? MenuText { get; set; }
// public int ? MenuType { get; set; }
// public string ? Icon { get; set; }
// public string ? WebUrlName { get; set; }
// public string ? WebUrl { get; set; }
// public string ? VueFilePath { get; set; }
// public byte ? IsLeafNode { get; set; }

// public ICollection<MenuEntity> ? Children { get; set; } =[];
}
export interface IUser {
    id: number,
    name?: string,
    password?: string,
    userType?: number,
    phone?: string,
    mobile?: string,
    address?: string,
    email?: string,
    weChat?: string,
    gender: number,
    imageurl?: string,
    lastLoginTime: string
    isEnable: boolean,

    createTime: string,
    modifyTime: string,
    status: number,
    roles?: []
}
export function User_GetGenderType(u: IUser): string {
    if (u.gender == 1) {
        return '男性'
    } else if (u.gender == 2) {
        return '女性'
    } else {
        return 'unknow'
    }
}
export function User_GetUserType(u: IUser): string {
    if (u.userType == 1) {
        return '管理员'
    } else if (u.userType == 2) {
        return '普通用户'
    } else {
        return 'unknow'
    }
}
export function User_GetStatus(u: IUser): string {

    if (u.status == 1) {
        return '可用'
    } else if (u.status == 2) {
        return '冻结'
    } else {
        return '已删除'
    }
}
export interface IPagingData<T> {
    recordCount: number
    pageIndex: number
    pageSize: number
    dataList: T[]
    searchString?: string
}

export interface ISearchQuery {
    currentPage: number
    pageSize: number
    recordCount: number
    searchString?: string
    oldSearchString?: string
}

export interface IAddUser {
    name: string
    password: string
    confirmPassword: string
    userType: number
    phone: string
    mobile: string
    address: string
    email: string
    weChat: string
    qq: string
    gender: number
    imageUrl: string
    isEnabled: boolean
}

export class Log {
    public date: string = ''
    public thread: string = ''
    public level: string = ''
    public logger: string = ''
    public message: string = ''
    public exception: string = ''
    public createTime: string = ''
    public modifyTime: string = ''
    public status: number = 0
}

export class EChartData {
    public title: string = ''
    public chartData: Array<number> = []
    public chartxAxis: Array<string> = []
    public color: string = ''
    public chartType: string = ''
}

export class LoginData{
    public username:string = ''
    public password:string = ''
}