<script lang="ts" setup>
import { ref, computed } from 'vue'
const input = ref('合肥')
const columns = [
    {
        title: '预约商品ID',
        name: 'itemCode',
        dataIndex: 'itemCode',
    },
    {
        title: '标题',
        name: 'title',
        dataIndex: 'title',
    },
    {
        title: '内容',
        name: 'content',
        dataIndex: 'content',
    },
    {
        title: '图片',
        name: 'picture',
        dataIndex: 'picture',
    },
]
const goodInfo = ref({})
const init = async () => {
    const stamp1 = new Date(new Date().setHours(0, 0, 0, 0)).getTime(); //获取当天零点的时间
    const res = await fetch("https://static.moutai519.com.cn/mt-backend/xhr/front/mall/index/session/get/" + stamp1, {
        "method": "GET"
    }).then(res => res.json())
    if (res.code === 2000) {
        console.log(res);
        goodInfo.value = res.data
    }
}

init()

const onChange = () => {
    console.log(input.value);
}

</script>
<template>
    <a-table :columns="columns" :data-source="goodInfo.itemList">
        <template #bodyCell="{ column, text }">
            <template v-if="column.dataIndex === 'picture'">
                <a-image :width="80" :src="text" />
            </template>
        </template>
    </a-table>
</template>
