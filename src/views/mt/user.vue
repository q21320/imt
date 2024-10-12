<script lang="ts" setup>
import { ref } from 'vue'
import md5 from 'md5'
import CryptoJS from 'crypto-js';
import { message } from 'ant-design-vue';
import { invoke } from "@tauri-apps/api/core";

const open = ref(false)
const open1 = ref(false)
const formRef = ref()
const form1Ref = ref()
const SALT = "2af72f100c356273d46284f6fd1dfc08"
const AesKey = 'qbhajinldepmucsonaaaccgypwuvcjaa'; // 密钥
const AesIv = '2018534749963515'; // 初始化向量
interface FormState {
    mobile: string;
    code: string;
}
const btnLoading = ref(false)
const keyNum = ref(0)
const btnText = ref('发送验证码')
const columns = [
    {
        title: '手机号',
        name: 'mobile',
        dataIndex: 'mobile',
    },
    {
        title: 'i茅台用户id',
        name: 'userId',
        dataIndex: 'userId',
    },
    {
        title: '省份',
        name: 'province',
        dataIndex: 'province',
    },
    {
        title: '城市',
        name: 'city',
        dataIndex: 'city',
    },
    {
        title: '操作',
        name: 'action',
        dataIndex: 'action',
    },
]
const userList = ref(JSON.parse(localStorage.getItem('userList') || "[]") || [])
const formState = ref<FormState>({
    mobile: '',
    code: '',
});

const formState1 = ref({
    mobile: "",
    userId: "",
    province: "",
    city: "",
    shopCode: "",
    shopId: "",
    lat: '',
    lng: '',
})

const handleOk = () => formRef.value.validate().then((valid: boolean) => (valid && login()));
const login = async () => {
    const timestamp = Date.now().toString()
    const params = {
        mobile: formState.value.mobile,
        vCode: formState.value.code,
        md5: md5(SALT + formState.value.mobile + formState.value.code + "" + "" + timestamp),
        "MT-APP-Version": '1.7.3',
        ydToken: '',
        ydLogId: '',
        timestamp
    };
    const res = await invoke("http_request", {
        url: "https://app.moutai519.com.cn/xhr/front/user/register/login",
        headers: {
            "User-Agent": "iOS;16.3;Apple;?unrecognized?",
            "Content-Type": "application/json",
            "MT-Device-ID": "2F2075D0-B66C-4287-A903-DBFF6358342A",
            "MT-APP-Version": "1.7.3",
            "MT-R": "clips_OlU6TmFRag5rCXwbNAQ/Tz1SKlN8THcecBp/HGhHdw==",
            "MT-Request-ID": "167560018873318465",
            "MT-K": "1675213490331",
            "MT-Lat": "28.499562",
            "MT-Lng": "102.182324",
            "MT-User-Tag": "0",
            "MT-Network-Type": "WIFI",
            "MT-Team-ID": "",
            "MT-Bundle-ID": "com.moutai.mall",
            "MT-Info": "028e7f96f6369cafe1d105579c5b9377",
        },
        method: "POST",
        body: JSON.stringify(params)
    })
    console.log(res);
    // if (res.code === 2000) {
    //     userList.value = userList.value.filter((item: { idCode: string; }) => item.idCode !== res.data.idCode)
    //     res.data.mobile = formState.value.mobile
    //     userList.value.push(res.data)
    //     localStorage.setItem('userList', JSON.stringify(userList.value))
    //     open.value = false
    // } else {
    //     message.error(res.message)
    // }
}

const sendCode = async () => {
    if (!/^1[3456789]\d{9}$/.exec(formState.value.mobile)) return message.error('手机号格式不正确');
    if (btnLoading.value) return
    const timestamp = Date.now().toString()
    const params = {
        mobile: formState.value.mobile,
        md5: md5(SALT + formState.value.mobile + timestamp),
        timestamp
    };
    const res = await invoke("http_request", {
        url:"https://app.moutai519.com.cn/xhr/front/user/register/vcode",
        headers: {
            "User-Agent": "iOS;16.3;Apple;?unrecognized?",
            "Content-Type": "application/json",
            "MT-Device-ID": "2F2075D0-B66C-4287-A903-DBFF6358342A",
            "MT-APP-Version": "1.7.3",
            "MT-R": "clips_OlU6TmFRag5rCXwbNAQ/Tz1SKlN8THcecBp/HGhHdw==",
            "MT-Request-ID": "167560018873318465",
            "MT-K": "1675213490331",
            "MT-Lat": "28.499562",
            "MT-Lng": "102.182324",
            "MT-User-Tag": "0",
            "MT-Network-Type": "WIFI",
            "MT-Team-ID": "",
            "MT-Bundle-ID": "com.moutai.mall",
            "MT-Info": "028e7f96f6369cafe1d105579c5b9377",
        },
        method: "POST",
        body: JSON.stringify(params)
    })
    console.log(res);
    // if (res.code === 2000) {
    //     codeText()
    // }
}

const codeText = () => {
    let num = 60
    btnLoading.value = true
    const tiem = setInterval(() => {
        btnText.value = `请待${num}秒...`
        if (num <= 0) {
            btnLoading.value = false
            btnText.value = '发送验证码'
            clearInterval(tiem)
        }
        num--
    }, 1000);
}

const setOpenUserModal = (record: Record<string, any>) => {
    formState1.value = Object.assign(formState1.value, record)
    open1.value = true
}

const handleOk1 = () => {
    form1Ref.value.validate().then((valid: boolean) => {
        if (!valid) return
        const arr = userList.value.filter((item: { idCode: string; }) => item.idCode !== formState1.value.idCode)
        arr.push(formState1.value)
        userList.value = arr
        localStorage.setItem('userList', JSON.stringify(userList.value))
        open1.value = false
    })
}

const getSessionId = async () => {
    const stamp1 = new Date(new Date().setHours(0, 0, 0, 0)).getTime(); //获取当天零点的时间
    const url = `https://static.moutai519.com.cn/mt-backend/xhr/front/mall/index/session/get/${stamp1}`
    const res = await fetch(url).then(res => res.json());
    if (res.code === 2000) return res.data.sessionId
    else return ''
}
const reservation = async (record: Record<string, any>) => {
    const id = await getSessionId()
    if (!id) return message.error('获取sessionId失败')
    keyNum.value = 0
    add(id, record)
}

const add = async (id: string, record: Record<string, any>) => {
    const stamp1 = new Date(new Date().setHours(0, 0, 0, 0)).getTime(); //获取当天零点的时间
    const shopCodes = record.shopCode.split(';')
    const key = shopCodes[keyNum.value]
    if (key) {
        // const shopList = await getNewShopList(id, record.province, stamp1, key)
        // const obj = shopList?.find(item => item.inventory > 0 && item.shopId === record.shopId)
        const params: Record<string, any> = {
            itemInfoList: [{ "itemId": '' + key, "count": 1 }],
            sessionId: '' + id,
            shopId: '' + record.shopId,
            userId: '' + record.userId,
        }
        params["actParam"] = encryptAES_CBC(JSON.stringify(params), AesKey, AesIv)
        const res = await fetch("https://app.moutai519.com.cn/xhr/front/mall/reservation/add", {
            headers: {
                "User-Agent": "iOS;16.3;Apple;?unrecognized?",
                "Content-Type": "application/json",
                "MT-Device-ID": "2F2075D0-B66C-4287-A903-DBFF6358342A",
                "MT-APP-Version": "1.7.3",
                "MT-R": "clips_OlU6TmFRag5rCXwbNAQ/Tz1SKlN8THcecBp/HGhHdw==",
                "MT-Request-ID": "167560018873318465",
                "MT-K": "1675213490331",
                "MT-Lat": record.lat,
                "MT-Lng": record.lng,
                "userId": record.userId,
                "MT-Token": record.token,
                "MT-User-Tag": "0",
                "MT-Network-Type": "WIFI",
                "MT-Team-ID": "",
                "MT-Bundle-ID": "com.moutai.mall",
                "MT-Info": "028e7f96f6369cafe1d105579c5b9377",
            },
            method: "POST",
            body: JSON.stringify(params)
        }).then(res => res.json())
        if (res.code === 2000) {
            keyNum.value++
            add(id, record)
        } else message.error(res.message)
    }
}


// AES CBC加密函数
function encryptAES_CBC(input: string, key: string, iv: string) {
    // 将字符串转换为字节数组
    const keyBytes = CryptoJS.enc.Utf8.parse(key);
    const ivBytes = CryptoJS.enc.Utf8.parse(iv);

    // 将输入字符串转换为字节数组
    const inputBytes = CryptoJS.enc.Utf8.parse(input);

    // 使用 AES-CBC 模式进行加密
    const encrypted = CryptoJS.AES.encrypt(inputBytes, keyBytes, {
        iv: ivBytes,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });

    // 将加密结果转换为 Base64 字符串
    const base64String = encrypted.toString();

    return base64String;
}

const getNewShopList = async (id: string, province: string, stamp1: number, code: string) => {
    const url = `https://static.moutai519.com.cn/mt-backend/xhr/front/mall/shop/list/slim/v3/${id}/${province}/${code}/${stamp1}`
    const res = await fetch(url).then(res => res.json());
    const list = [];
    if (res.code === 2000) {
        const data = res.data;
        const shopList = data.shops;
        for (const shop of shopList) {
            const shops = shop;
            const items = shops.items;
            for (const item of items) {
                if (item.itemId === "10941") {
                    list.push({
                        shopId: shops.shopId,
                        count: item.count,
                        itemId: item.itemId,
                        inventory: item.inventory
                    });
                }
            }
        }
        return list;
    }
}

</script>

<template>
    <div>
        <a-button type="primary" @click="open = true">添加账户</a-button>
        <br />
        <br />
        <a-table :columns="columns" :data-source="userList">
            <template #bodyCell="{ column, record }">
                <template v-if="column.dataIndex === 'action'">
                    <a-button @click="reservation(record)" type="link">预约</a-button>
                    <a-button type="link" @click="setOpenUserModal(record)">修改</a-button>
                </template>
            </template>
        </a-table>
        <a-modal v-model:open="open" title="信息" @ok="handleOk">
            <a-form ref="formRef" :model="formState">
                <a-form-item label="手机号" name="mobile" :rules="[{ required: true, message: '请输入手机号' }, {
                    pattern: /^1[3456789]\d{9}$/, message: '手机号格式不正确'
                }]">
                    <div flex>
                        <a-input :maxlength="11" v-model:value="formState.mobile" />
                        <a-button :disabled="btnLoading" @click="sendCode" ml-10px>{{ btnText }}</a-button>
                    </div>
                </a-form-item>
                <a-form-item label="验证码" name="code"
                    :rules="[{ required: true, message: '请输入验证码' }, { max: 6, min: 6, message: '请输入正确验证码' }]">
                    <a-input :maxlength="6" v-model:value="formState.code" />
                </a-form-item>
            </a-form>
        </a-modal>
        <a-modal v-model:open="open1" title="Basic Modal" @ok="handleOk1">
            <a-form ref="form1Ref" :model="formState1">
                <a-form-item label="手机号" name="mobile" :rules="[{ required: true, message: '请输入手机号' }, {
                    pattern: /^1[3456789]\d{9}$/, message: '手机号格式不正确'
                }]">
                    <a-input :maxlength="11" v-model:value="formState1.mobile" />
                </a-form-item>
                <a-form-item label="i茅台ID" name="userId" :rules="[{ required: true, message: '请输入i茅台ID' }]">
                    <a-input v-model:value="formState1.userId" />
                </a-form-item>
                <a-form-item label="商品ID" name="shopCode" :rules="[{ required: true, message: '请输入商品ID' }]">
                    <a-input placeholder="例如：1021;1022;1023" v-model:value="formState1.shopCode" />
                </a-form-item>
                <a-form-item label="商铺ID" name="shopId" :rules="[{ required: true, message: '请输入商铺ID' }]">
                    <a-input placeholder="例如：134340129001" v-model:value="formState1.shopId" />
                </a-form-item>
                <a-form-item label="纬度" name="lat" :rules="[{ required: true, message: '请输入纬度' }]">
                    <a-input placeholder="例如：31.831296" v-model:value="formState1.lat" />
                </a-form-item>
                <a-form-item label="经度" name="lng" :rules="[{ required: true, message: '请输入v' }]">
                    <a-input placeholder="例如：117.207593" v-model:value="formState1.lng" />
                </a-form-item>
                <a-form-item label="省份" name="province" :rules="[{ required: true, message: '请输入省份' }]">
                    <a-input placeholder="例如：安徽省" v-model:value="formState1.province" />
                </a-form-item>
                <a-form-item label="城市" name="city" :rules="[{ required: true, message: '请输入城市' }]">
                    <a-input placeholder="例如：合肥市" v-model:value="formState1.city" />
                </a-form-item>
                <!-- <a-form-item label="i茅台ID" name="userId"
                    :rules="[{ required: true, message: '请输入验证码' }]">
                    <a-input :maxlength="6" v-model:value="formState1.userId" />
                </a-form-item>
                <a-form-item label="i茅台ID" name="userId"
                    :rules="[{ required: true, message: '请输入验证码' }]">
                    <a-input :maxlength="6" v-model:value="formState1.userId" />
                </a-form-item>
                 -->
            </a-form>
        </a-modal>
    </div>
</template>

<style lang="less" scoped></style>