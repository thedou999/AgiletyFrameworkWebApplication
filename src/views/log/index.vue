<template>
    <el-card>
        <el-row>
            <el-form class="demo-form-inline" :inline="true">
                <el-form-item label="关键字" style="color:aliceblue">
                    <div class="block">
                        <el-input v-model="searchQuery.searchString" placeholder="日志关键字..."/>
                    </div>
                </el-form-item>
                <el-form-item style="color: aliceblue;">
                    <el-button type="primary" @click="">查询</el-button>
                </el-form-item>
            </el-form>
        </el-row>
        <el-row>
            <el-table :data="tableData" style="width:100%" :row-class-name="tableRowClassName">
                <el-table-column type="index" label="序号" width="60"/>
                <el-table-column prop="date" label="时间"/>
                <el-table-column prop="thread" label="线程Id"/>
                <el-table-column prop="logger" label="日志发生类"/>
                <el-table-column prop="message" label="日志消息">
                    <template #default="scope">
                        <div style="display: flex; align-items: center">
                            <el-popover :width="300"
                                popper-style="box-shadow: rgb(14 18 22 /.35%) 0px 10px 38px -10px,
                                rgb(14 18 22 / 20%) 0px 10px 20px -15px; padding:20px">
                                <template #reference>
                                    {{ scope.row.exception }}
                                </template>
                                <template #default>
                                    <div class="demo-rich-conent" style="display: flex;
                                        gap: 16px; flex-direction: column;">
                                        <div>
                                            {{ scope.row.exception }}
                                        </div>
                                    </div>
                                </template>
                            </el-popover>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination v-model:current-page="searchQuery.currentPage"
                    v-model:page-size="searchQuery.pageSize" :page-sizes="[10, 20, 30, 40]"
                    :small="small" :disabled="disabled" :background="background"
                    layout="total,sizes,prev,pager,next,jumper" :total="searchQuery.recordCount"
                    @size-change="SizeChange" @current-change="PageChange">
                </el-pagination>
            </div>
        </el-row>
    </el-card>


</template>
<script setup lang="ts">
import { IPagingData, ISearchQuery,Log } from '../../types/index.ts'
import { onMounted, ref } from 'vue'
import { GetLogPageAsync } from '../../common/logService'
import { baseService } from '../../common/apiRequest'

const searchQuery = ref<ISearchQuery>({
    currentPage: 1,
    pageSize: 5,
    recordCount: 0,
    searchString: "",
    oldSearchString: ""
})
const tableData = ref<Log[]>()
const small = ref(true)
const disabled = ref(false)
const background = ref(true)

onMounted(async function(){
    await GetLogPageAndFlash(true)
})

async function GetLogPageAndFlash(toFirstPage:boolean){
    let targetPage = searchQuery.value.currentPage
    if(toFirstPage==true) targetPage = 1
    if(searchQuery.value.searchString != searchQuery.value.oldSearchString) targetPage = 1

    try{
        const result = await GetLogPageAsync(targetPage,searchQuery.value.pageSize,searchQuery.value.searchString)
        tableData.value = result.data.dataList
        FlashSearchQuery(searchQuery.value,result.data)
        if(result.success == false){
            throw new Error('request error')
        }
    }catch(e){
        console.log(e)
    }
}
async function SizeChange(){
    GetLogPageAndFlash(true)
}
async function PageChange(){
    GetLogPageAndFlash(false)
}

function FlashSearchQuery<T>(searchQuery:ISearchQuery,paginData:IPagingData<T>):ISearchQuery{
    searchQuery.currentPage = paginData.pageIndex
    searchQuery.pageSize = paginData.pageSize
    searchQuery.recordCount = paginData.recordCount
    searchQuery.searchString = paginData.searchString
    searchQuery.oldSearchString = searchQuery.searchString

    return searchQuery
}



</script>