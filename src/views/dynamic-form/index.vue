<template>
    <div style="width: 300px; margin: auto;">
        <el-input class="" placeholder="生成层级" v-model="info.max"></el-input>
        <el-input placeholder="每层生成的节点个数" v-model="info.count"></el-input>
        <tree :root="root"></tree>
    </div>
</template>
<script setup lang="ts">
import tree from './tree.vue'
import { ref, watch } from 'vue';


export interface FormPops {
    level?: number,
    nextCommonOptionSet: number[],
    type: 'input' | 'select';
    value: [],
    options: number[],
    children: FormPops[];
    count: number;
    parent: FormPops | null
}

const info = ref({
    count: 2,
    max: 2
})

watch(info.value, () => {
    console.log(info.value);
    root_.children = []
    root.value = genRoot(root_, 2, info.value.max)
})

const genRoot = (preObj: FormPops, level: number, max: number = 3) => {
    if (level > max) {
        return preObj
    }
    for (let i = 1; i <= preObj?.count; i++) {
        const newObj: FormPops = {
            level,
            type: 'select',
            value: [],
            options: preObj.nextCommonOptionSet,
            nextCommonOptionSet: [10 + level, 20 + level, 30 + level],
            children: [],
            count: 2,
            parent: preObj
        }

        let _ = genRoot(newObj, level + 1, max)
        preObj.children.push(_)
    }

    return preObj
}

const root_: FormPops = {
    level: 1,
    type: 'select',
    value: [],
    options: [1, 2, 3],
    nextCommonOptionSet: [4, 5, 6, 7, 8, 9],
    children: [],
    count: info.value.count,
    parent: null
}

const root = ref<FormPops>(genRoot(root_, 2, info.value.max))

</script>