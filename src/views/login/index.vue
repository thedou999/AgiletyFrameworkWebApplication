<template>
    <div class="login">
        <div class="login-content">
            <div class="login-form login-item">
                <p class="login-title">朝夕敏捷通用后台</p>
                <el-form :model="loginData" :rules="rules" ref="loginForm" label-width="70px" class="demo-ruleForm">
                    <el-form-item label="用户名" prop="username">
                        <el-input v-model="loginData.username"/>
                    </el-form-item>

                    <el-form-item label="密码" prop="password">
                        <el-input v-model="loginData.password"/>
                    </el-form-item>
                
                    <el-form-item>
                        <el-button @click="SubForm(loginForm)">登录</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { IApiDataResult, LoginData, IUser } from '../../types/index.ts'
import { ElMessage, FormInstance, FormRules } from 'element-plus';
import { loginService } from '../../common/apiRequest'
import mainStore from '../../stores/main';
import { RouteLocationRaw, useRouter } from 'vue-router';

const loginData = ref<LoginData>(new LoginData())
const loginForm = ref()
const router = useRouter() 

const rules = ref<FormRules>({
    username:[
        { required:true, message:'请正确输入用户名', trigger:'blur' },
        { min:3, max:18, trigger:'blur'}
    ],
    password:[
        {required:true, message:'请正确输入密码', trigger:'blur'}
    ]
})

async function SubForm(loginForm:FormInstance){
    loginForm.validate(async (isValid: boolean, invalidFields ) => {
        if(isValid == true){
            const rsp = await loginService.post('/auth/Account',null,{
                params:{
                    username:loginData.value.username,
                    password:loginData.value.password
                }
            })
            const result = rsp.data as IApiDataResult<any>
            if(result.success == true){
                mainStore().$state.accessToken = result.data.accessToken
                mainStore().$state.refreshToken = result.data.refreshToken
                mainStore().$state.user = result.data.user as IUser

                console.log(mainStore().$state.user.imageurl);
            
                router.push({
                    path:'/index'
                } as RouteLocationRaw)
            }
            else{
                ElMessage({
                    message:result.message,
                    type:'warning'
                })
            }
        }
        else{
            console.log('error submit',invalidFields)
        }
    })

}


</script>