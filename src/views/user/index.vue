<template>
    <el-card class="box-card">
        <el-row>
            <el-form class="demo-form-inline" :inline="true">
                <el-form-item label="关键字" style="color:aliceblue">
                    <el-input v-model="searchQuery.searchString" placeholder="用户名..."></el-input>
                </el-form-item>
                <el-form-item style="color: aliceblue;">
                    <el-button type="primary" @click="UserQuery">查询</el-button>
                </el-form-item>
                <el-form-item style="color: aliceblue">
                    <el-button type="primary" @click="AddUser">新增</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="TestFunc">测试</el-button>
                </el-form-item>
            </el-form>
        </el-row>

        <el-row>
            <el-table :data="tableData" style="width:100%" :row-class-name="tableRowClassName">
                <el-table-column type="index" label="序号" width="60" />
                <el-table-column prop="name" label="用户名称" />
                <el-table-column prop="genderTypeDescription" label="性别">
                    <template #default="scope">
                        {{ User_GetGenderType(scope.row) }}
                    </template>
                </el-table-column>
                <el-table-column prop="userType" label="用户类型">
                    <template #default="scope">
                        {{ User_GetUserType(scope.row) }}
                    </template>
                </el-table-column>
                <el-table-column prop="status" label="用户状态">
                    <template #default="scope">
                        {{ User_GetStatus(scope.row) }}
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="500">
                    <template #default="scope">
                        <el-row class="mb-12">
                            <el-button size="small" @click="Show1" type="success">查看考情</el-button>
                            <el-button size="small" @click="Show1" type="info">查看工作日志</el-button>
                            <el-button size="small" @click="Show1" type="warning">发送通知</el-button>
                            <el-button size="small" @click="Show1" type="danger">职业调动</el-button>
                        </el-row>
                    </template>
                </el-table-column>
            </el-table>

            <div class="pagination">
                <el-config-provider :locale="zhCn">
                    <el-pagination v-model:current-page="searchQuery.currentPage"
                        v-model:page-size="searchQuery.pageSize" :page-sizes="[5, 10, 20, 30, 40]" :small="small"
                        :disabled="disabled" :background="background" layout="total,sizes,prev,pager,next,jumper"
                        :total="searchQuery.recordCount" @size-change="SizeChangeHanlder"
                        @current-change="CurrentChangeHanler">
                    </el-pagination>
                </el-config-provider>
            </div>
        </el-row>
    </el-card>


    <el-dialog v-model="dialogVisible" title="新增用户" width="40%">
        <el-form :model="userForm" :rules="userRules" ref="userFormRef" label-width="120px">
            <el-form-item label="用户名称" prop="name">
                <el-input v-model="userForm.name" placeholder="用户名称"></el-input>
            </el-form-item>

            <el-row>
                <el-col :span="12">
                    <el-form-item label="用户密码" prop="password">
                        <el-input type="password" v-model="userForm.password" placeholder="用户密码" />
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="确认密码" prop="confirmPassword">
                        <el-input type="password" v-model="userForm.confirmPassword" placeholder="确认密码" />
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row>
                <el-col :span="12">
                    <el-form-item label="性别" prop="gender">
                        <el-radio-group v-model="userForm.gender">
                            <el-radio label=1>男性</el-radio>
                            <el-radio label=0>女性</el-radio>
                        </el-radio-group>
                    </el-form-item>
                </el-col>

                <el-col :span="12">
                    <el-form-item label="是否启用" prop="isEnabled">
                        <el-switch v-model="userForm.isEnabled" />
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row>
                <el-col>
                    <el-form-item label="用户头像" prop="imageUrl">
                        <el-upload class="avatar-uploader" :action="imageApiUrl" :show-file-list="false"
                            :on-success="HandleAvatarSuccess" :before-upload="BeforeAvatarUpload">
                            <img style="width:100px;height: 100px;" v-if="userForm.imageUrl" :src="baseImageUrl"
                                class="avatar" />
                            <el-icon v-else class="avatar-uploader-icon">
                                <Plus />
                            </el-icon>
                        </el-upload>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row>
                <el-col :span="12">
                    <el-form-item label="手机号码" prop="mobile">
                        <el-input v-model="userForm.mobile" placeholder="手机号码" />
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="电话号码" prop="phone">
                        <el-input v-model="userForm.phone" placeholder="电话号码" />
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="qq号码" prop="qq">
                        <el-input v-model="userForm.qq" placeholder="qq号码" />
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="微信">
                        <el-input v-model="userForm.weChat" placeholder="微信" />
                    </el-form-item>
                </el-col>
            </el-row>

            <el-form-item label="邮箱地址" prop="email">
                <el-input v-model="userForm.email" placeholder="邮箱地址" />
            </el-form-item>
            <el-form-item>
                <el-input v-model="userForm.address" type="textarea" placeholder="详细地址" />
            </el-form-item>
        </el-form>

        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogVisible = false">取消</el-button>
                <el-button type="primary" @click="SubUserForm(userFormRef)">确认</el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import {
    IUser, ISearchQuery, IPagingData,
    User_GetGenderType, User_GetUserType, User_GetStatus,
    IAddUser,
    IApiDataResult
} from '../../types/index.ts'
import axios, { AxiosHeaders, AxiosResponse } from 'axios'
import { GetUserPage } from '../../common/userService'
import { GetImage } from '../../common/fileService'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import { apiUrl, baseService } from '../../common/apiRequest.ts';
import { ElMessage, ElMessageBox, FormContext } from 'element-plus';
import { tourStepProps } from 'element-plus/lib/components/tour/src/step.js';

//#region data
const small = ref(true)
const disabled = ref(false)
const background = ref(true)

const tableData = ref<IUser[]>([])
const searchQuery = ref<ISearchQuery>({
    currentPage: 1,
    pageSize: 5,
    recordCount: 0,
    searchString: ""
})

onMounted(async () => {
    await GetUserPageAndFlash(true)
})
async function UserQuery() {
    await GetUserPageAndFlash(false)
}
async function SizeChangeHanlder() {
    await GetUserPageAndFlash(true)
}
async function CurrentChangeHanler() {
    await GetUserPageAndFlash(false)
}


function FlashSearchQuery<T>(searchQuery: ISearchQuery, paginData: IPagingData<T>): ISearchQuery {
    searchQuery.currentPage = paginData.pageIndex
    searchQuery.pageSize = paginData.pageSize
    searchQuery.recordCount = paginData.recordCount
    searchQuery.searchString = paginData.searchString
    searchQuery.oldSearchString = searchQuery.searchString
    
    return searchQuery
}
async function GetUserPageAndFlash(toFirstPage: boolean) {
    let targetPage = searchQuery.value.currentPage
    if (toFirstPage === true) targetPage = 1
    if (searchQuery.value.searchString !== searchQuery.value.oldSearchString) targetPage = 1

    try {
        const result = await GetUserPage(targetPage, searchQuery.value.pageSize, searchQuery.value.searchString) as IApiDataResult<IPagingData<IUser>>
        tableData.value = result.data.dataList as IUser[]
        FlashSearchQuery(searchQuery.value, result.data as IPagingData<IUser>)
        
        if(result.success !== true){
           throw new Error('请求不成功') 
        }
    }catch(e){
        console.log(e);
    }
}
//#endregion



const dialogVisible = ref(false)
const userForm = ref<IAddUser>({
    name: '',
    password: '',
    confirmPassword: '',
    userType: 2,
    phone: '',
    mobile: '',
    address: '',
    email: '',
    weChat: '',
    qq: '',
    gender: 0,
    imageUrl: '',
    isEnabled: true
})
const userFormRef = ref()
const imageApiUrl = `${apiUrl()}/api/File/UploadFiles`

const AddUser = async () => {
    dialogVisible.value = true
    //await nextTick()
    userFormRef.value.resetFields()
}

const baseImageUrl = ref('')
const BeforeAvatarUpload = (uploadFile: any) => {
}
const HandleAvatarSuccess = async (response: any, uploadFile: any, uploadFiles: any) => {
    
    if (response.success) {
        userForm.value.imageUrl = response.data
        
        // baseImageUrl.value = `${apiUrl()}/${userForm.value.imageUrl}`
        await GetImageInImageUrl()
    }
}
const GetImageInImageUrl = async function () {
    const data = await GetImage(userForm.value.imageUrl)
    baseImageUrl.value = window.URL.createObjectURL(data)
} 

const CheckPassword = (rule, value, callback) => {
    if (!value) {
        return callback(new Error('请确认密码'))
    }
    if (value != userForm.value.password) {
        return callback(new Error('两次密码不一致'))
    }
    callback()
}
const CheckEmail = (rule, value, callback) => {
    if (value === '') {
        callback(new Error('请正确填写邮箱'))
    } else {
        if (value !== '请填写正确邮箱') {
            var reg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
            if (!reg.test(value)) {
                callback(new Error('邮箱地址格式不对'))
            }
        }
        callback()
    }
}
const CheckMobile = (rule, value, callback) => {
    if(value===''){
        callback(new Error('电话号码不得为空'))
    }else if( Number.isNaN(value) ){
        callback(new Error('电话号码只能含有数字'))
    }
    callback()
}
const CheckPhone = (rule,value,callback) => {
    if(value===''){
        callback(new Error('手机号码不得为空'))
    }else if( Number.isNaN(value) ){
        callback(new Error('手机号码只能含有数字'))
    }
    callback()
}

const userRules = ref({
    name: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
    password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
    confirmPassword: [{ validator: CheckPassword, trigger: 'blur' }],
    gender: [{ required: true, message: '请选择性别', trigger: 'blur' }],
    //isEnabled: [{ reqired: true, message: '你确定是否启用', trigger:'blur' }],
    // imageUrl: [{ required: true, message: '请选择头像', trigger: 'blur' }],
    mobile: [{ validator: CheckMobile, trigger: 'blur' }],
    phone: [{ validator: CheckPhone, trigger: 'blur' }],
    email: [{ validator: CheckEmail, trigger: 'blur' }]
})


const SubUserForm = async (userFormRef) => {
    await userFormRef.validate(async (isValid, invalidFields) => {
        
        if (isValid) {
            const rsp = await baseService.post('/User/AddUser', userForm.value)
            const result = rsp.data as IApiDataResult<IUser>
            if (result.success === true) {
                await GetUserPageAndFlash(false)
                dialogVisible.value = false
                ElMessage({
                    type: 'success',
                    message: result.message
                })
            } else {
                ElMessageBox.alert(result.message)
            }
        }
    })
}

const TestFunc = () => {

}




</script>