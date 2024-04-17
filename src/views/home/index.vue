<template>
    <div class="module-box">
        <div @click="goto(v.url)" class="box" :sytle="`flex: 0 1 ${100 / lists.length}%; margin:5px;`"
            v-for="(v, i) in lists" :key="i">
            <div class="list-box">
                <i>
                    <el-icon>
                        <component :is="v.icon" />
                    </el-icon>
                </i>
                <p>{{ v.title }}</p>
            </div>
        </div>
    </div>

    <div class="module-box">
        <div style="flex: 0 1 30%;margin: 5px;">
            <el-card class="box-card">
                <Chart :title="materialData?.title" :chartType="materialData?.chartType"
                    :chartData="materialData?.chartData" :chartxAxis="materialData?.chartxAxis"
                    :color="materialData?.color" />
            </el-card>
        </div>
        <div style="flex: 0 1 70%;margin: 5px;">
            <el-card class="box-card">
                <chart :title="productSales?.title" :chartType="productSales?.chartType"
                    :chartData="productSales?.chartData" :chartxAxis="productSales?.chartxAxis"
                    :color="productSales?.color"/>
            </el-card>
        </div>
    </div>

    <div class="module-box">
        <div style="flex: 0 1 100%;margin: 5px;">
            <el-card class="box-card">
                <chart :title="production?.title" :chartType="production?.chartType"
                    :chartData="production?.chartData" :chartxAxis="production?.chartxAxis"
                    :color="production?.color"/>
            </el-card>
        </div>
    </div>

</template>

<script setup lang="ts">
import { ChromeFilled, Opportunity, SwitchFilled, TrendCharts, VideoCameraFilled } from '@element-plus/icons-vue'
import { onMounted, ref } from 'vue';
import { EChartData } from '../../types';
import Chart from './chart.vue'

const lists = ref([
    { title: '数据统计-1', icon: ChromeFilled, url: "/user/index" },
    { title: '数据统计-2', icon: Opportunity, url: "" },
    { title: '数据统计-3', icon: SwitchFilled, url: "" },
    { title: '数据统计-4', icon: TrendCharts, url: "" },
    { title: '数据统计-5', icon: VideoCameraFilled, url: "" }
])

const materialData = ref<EChartData>()
const productSales = ref<EChartData>()
const production = ref<EChartData>()

onMounted(async () => {
    materialDataQuery()
    productSalesQuery()
    productionQuery()
})


const materialDataQuery = async () => {
    materialData.value = {
        title: '条形统计图',
        chartData: [100, 200, 300, 480, 150, 340, 630, 390],
        chartxAxis: [
            'k934',
            'g002',
            'k878',
            'a550',
            'c635',
            'a557',
            'g080'
        ],
        color: '#2277ce',
        chartType: 'bar'
    }
}
const productSalesQuery = async () => {
    productSales.value = {
        title: '折线趋势图',
        chartData: [10, 20, 40, 30, 20, 50, 80, 10, 40, 30, 90],
        chartxAxis: [
            '8:00',
            '9:00',
            '10:00',
            '11:00',
            '12:00',
            '13:00',
            '14:00',
            '15:00',
            '16:00',
            '17:00',
            '18:00',
        ],
        color: '#71c24a',
        chartType: 'line'
    }
}
const productionQuery = async () => {
    production.value = {
        title: '折线统计图趋势',
        chartData: [1000, 1100, 800, 780, 850, 1500, 1670, 1275, 900, 600, 780, 850, 1100, 1240],
        chartxAxis: [
            '1月',
            '2月',
            '3月',
            '4月',
            '5月',
            '6月',
            '7月',
            '8月',
            '9月',
            '10月',
            '11月',
            '12月',
        ],
        color: '#ea8052',
        chartType: 'line'
    }
}

</script>