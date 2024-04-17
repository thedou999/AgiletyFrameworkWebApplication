<template>
    <el-menu-item class = "menu" :index="basePath" v-if="item.children.length<=0">
        <el-icon>
            <component :is="item.icon"></component>
        </el-icon>
        <span>{{ item.menuText }}</span>
    </el-menu-item>

    <el-sub-menu class="menu" :index="basePath" v-else>
        <template #title>
            <el-icon>
                <component :is="item.icon"></component>
            </el-icon>
            <span>{{ item.menuText }}</span>
        </template>
        <Navitem v-for="sub in item.children" :key="sub.webUrl" :item="sub" :basePath="sub.webUrl"/>
    </el-sub-menu>
</template>

<script setup lang="ts">
import type { Menu } from '../types/index.ts'
import Navitem from './navItem.vue'

const props = defineProps<{item : Menu, basePath:string}>()



</script>