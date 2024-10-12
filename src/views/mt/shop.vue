<script lang="ts" setup>
import { ref,computed } from 'vue'
const input = ref('合肥')
const columns = [
    {
        title:'商品ID',
        name: 'shopId',
        dataIndex: 'shopId',
    },
    {
        title:'省份',
        name: 'provinceName',
        dataIndex: 'provinceName',
    },
    {
        title:'城市',
        name: 'cityName',
        dataIndex: 'cityName',
    },
    {
        title:'地区',
        name: 'districtName',
        dataIndex: 'districtName',
    },
    {
        title:'完整地址',
        name: 'fullAddress',
        dataIndex: 'fullAddress',
    },
    {
        title:'纬度',
        name: 'lat',
        dataIndex: 'lat',
    },
    {
        title:'经度',
        name: 'lng',
        dataIndex: 'lng',
    },
    {
        title:'名称',
        name: 'name',
        dataIndex: 'name',
    },
    {
        title:'公司名称',
        name: 'tenantName',
        dataIndex: 'tenantName',
    },
]
const shopsList = ref([])
const searchList = computed(()=>{
    return shopsList.value.filter(item=>{
        return item.fullAddress.indexOf(input.value) !== -1
    })
})
const init = async () => {
    const res = await fetch("https://static.moutai519.com.cn/mt-backend/xhr/front/mall/resource/get", {
        "method": "GET"
    }).then(res => res.json())
    if (res.code === 2000) {
        const url = res.data.mtshops_pc.url
        getShopsList(url)
    }
}

const getShopsList = async (url: string) => {
    const res = await fetch(url, {
        "method": "GET",
    }).then(res => res.json());
    shopsList.value = Object.values(res)
}

init()

const onChange = () => {
    console.log(input.value);
}

</script>
<template>
    <a-space>
        <a-input v-model:value="input" @change="onChange" placeholder="请输入地址"></a-input>
    </a-space>
    <br />
    <br />
    <a-table :scroll="{ x: 2000 }" :columns="columns" :data-source="searchList"></a-table>
</template>
