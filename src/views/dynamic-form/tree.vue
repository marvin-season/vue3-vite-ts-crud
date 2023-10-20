<template>
    <el-select v-model="props.root.value" multiple placeholder="Select" style="width: 240px" @removeTag="handleRemove($event, props.root.options)" @change="handleChange($event, props.root.options)">
        <el-option v-if="props.root.type == 'select'" v-for="item in props.root.options" :key="item" :label="item"
            :value="item" />
    </el-select>
    <tree v-if="props.root.value.length > 0" v-for="item in props.root.children" :root="item"></tree>
</template>

<script setup lang="ts">
import { FormPops } from './index.vue';
import lodash from "lodash";

const props = defineProps<{
    root: FormPops
}>()


const handleChange = (value: number[], target: number[]) => {
    console.log(value);
    lodash.remove(target, (n) => {
        return value.includes(n)
    })
}

const handleRemove = (value: number, target: number[]) => {
    if(!target.includes(value)){
       target.push(value);
       target.sort()
    }
}
</script>