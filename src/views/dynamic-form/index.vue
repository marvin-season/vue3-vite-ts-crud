<template>
    <tree :root="root"></tree>
</template>
<script setup lang="ts">
import tree from './tree.vue'
import { ref, } from 'vue';


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

const genRoot = (preObj: FormPops, level: number, max: 3) => {
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

const root_ = genRoot({
    level: 1,
    type: 'select',
    value: [],
    options: [1, 2, 3],
    nextCommonOptionSet: [4, 5, 6, 7, 8, 9],
    children: [],
    count: 2,
    parent: null
}, 2, 3)

const root = ref<FormPops>(root_)

</script>