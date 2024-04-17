<template>
    <el-aside width="200px" class="aside">
        <el-menu :default-active="route.path" exact class="el-menu-vertical-demo" router>
            
            <el-menu-item class="menu" index="/index" style="padding: 0px">
                <div style="width: 80%;padding-bottom:10px;height:85%;padding-left: 10px;">
                    <el-image id="myImage" style="width:260px;" :src="zhaoxiImage"/>
                </div>
            </el-menu-item>
            
            <el-menu-item class="menu" index="/index">
                <el-icon>
                    <component is="House"></component>
                </el-icon>
                <span>首页</span>
            </el-menu-item>

            <NavItem v-for="v in items" :key="v.webUrl" :item="v" :basePath="v.webUrl"></NavItem>

        </el-menu>
    </el-aside>
</template>

<script setup lang="ts">
import NavItem from './navItem.vue';
import zhaoxiImage from '../assets/images/朝夕敏捷开发通用.png'
import { useRoute } from 'vue-router';
import { reactive } from 'vue';
import { Menu } from '../types/index.ts'
import mainStore from '../stores/main'

const route = useRoute();
const items = mainStore().$state.menuList


</script>