
<template>
    <div class="breadcrumb"> 
        <el-breadcrumb :separator-icon="ArrowRight">
            <el-breadcrumb-item v-for="v in lists" :key="v.path">
                <router-link :to="v.path">{{ v.meta.title }}</router-link>
            </el-breadcrumb-item>
        </el-breadcrumb>
    </div>
</template>


<script setup lang="ts">
import { ArrowRight } from '@element-plus/icons-vue'
import { ref, onMounted, watch } from 'vue'
import { RouteLocationNormalizedLoaded, useRoute } from "vue-router";  //导入路由

const route = useRoute();
const lists = ref<RouteLocationNormalizedLoaded[]>([]);   //作为面包屑展示数据的数组 

//监听普通类型
watch(route, (to, from) => { //直接监听
    getBreadcrumb(to.matched);
});

onMounted(() => { //生命周期-挂载完成 
    getBreadcrumb(route.matched);
})

function getBreadcrumb(matched: any) {
    lists.value = matched;
}

</script>