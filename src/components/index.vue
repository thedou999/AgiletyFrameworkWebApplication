<template>
    <div id="module">
        <el-container>
            <NavMenu></NavMenu>

            <el-container>
                <el-header>
                    <BreadCrumb></BreadCrumb> 
                    <div style="display: inline-block; float: right;">
                        <div style="display: inline-block; overflow: hidden; height: 36px;">
                            <span>你好，欢迎您{{ mainStore().$state.user.name }}</span>
                        </div>

                        <el-image style="width: 33px; height: 33px;padding: 10px"
                            :scr="baseImageUrl" v-if="baseImageUrl">
                        </el-image>

                        <el-button class="exit" type="primary" @click="Logout">退出登录</el-button>
                    </div> 

                </el-header>
                <el-main>
                    <RouterView></RouterView>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>


<script setup lang="ts">
import NavMenu from './navMenu.vue'
import BreadCrumb from './breadcrumb.vue'
import mainStore from '../stores/main';
import { onMounted, ref } from 'vue';
import { GetImage } from '../common/fileService'
import{ useRouter } from 'vue-router'

const baseImageUrl = ref()
const router = useRouter()

onMounted(async () =>{
    const data = await GetImage(mainStore().$state.user.imageurl)
    baseImageUrl.value = window.URL.createObjectURL(data)
})

function Logout(){
    mainStore().$state.accessToken = null
    mainStore().$state.refreshToken = null
    mainStore().$state.menuList = []
    mainStore().$state.user = null

    localStorage.removeItem('main')
    router.push('/login')
    console.log('logout');
}

</script>