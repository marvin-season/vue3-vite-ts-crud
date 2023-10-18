<template>
    <el-descriptions title="Book Info" @click="handleClick">
        <el-descriptions-item label="Title">{{ props.book?.title }}</el-descriptions-item>
        <el-descriptions-item label="Author">{{ props.book?.author }}</el-descriptions-item>
        <el-descriptions-item label="Price">${{ props.book?.price }}</el-descriptions-item>
    </el-descriptions>
</template>

<script setup lang="ts">
import { BookDetailProps } from '@/types/index.ts'

const props = defineProps<{ book: BookDetailProps | null }>()

// defineEmits<{ (e: 'click_', id: number): void,  }>()
const emit = defineEmits<{
    click: [id: number]
}>()

const handleClick = () => {
    if (props.book?.id) {
        console.log(props.book.id);
        emit('click', props.book?.id)
    }
}

</script>