<template>
    <div>
        <div ref="chart" style="width:100%;height: 300px;"></div>
    </div>
</template>

<script setup>
import * as echarts from 'echarts'
import { watch,ref } from 'vue';

const data = defineProps({
    chartType:{
        type: String
    },
    chartData:{
        type: Array
    },
    chartxAxis:{
        type: Array
    },
    color:{
        type: String
    },
    title:{
        type: String
    }
})

const chart = ref();


watch(()=>data.chartData, (newChartData) => {
    data.chartData = newChartData
    init()
})


function init(){
    let myChart = echarts.init(chart.value)

    var option = {
        title:{
            text: data.title,
            left: 'center',
            textStyle: {
                color: '#fff'
            }
        },
        color: data.color,
        tooltip: {},
        xAxis: {
            data: data.chartxAxis,
            axisLine: {
                lineStyle:{
                    color: '#fff'
                }
            }
        },
        yAxis:{
            axisLine:{
                lineStyle:{
                    color:'#fff'
                }
            }
        },
        grid:{
            containLabel:true,
            left: '2%',
            right: '2%',
            top: '15%',
            bottom: '2%'
        },
        series:[
            {
                name: '销量',
                smooth: true,
                type: data.chartType,
                data: data.chartData
            }
        ]
    }

    myChart.setOption(option)

    window.addEventListener("resize", ()=> {
        myChart.resize()
    })

}

</script>