<template>
    <el-descriptions title="Book Info" @click="handleClick">
        <el-descriptions-item label="Title">{{ book?.title }}</el-descriptions-item>
        <el-descriptions-item label="Author">{{ book?.author }}</el-descriptions-item>
        <el-descriptions-item label="Price">{{ book?.price }}</el-descriptions-item>
    </el-descriptions>
</template>

<script setup lang="ts">
import { BookDetailProps } from '@/types/index.tsx'

const { book } = defineProps<{ book: BookDetailProps | null }>()

// defineEmits<{ (e: 'click_', id: number): void,  }>()
const emit = defineEmits<{
    click: [id: number]
}>()

const handleClick = () => {
    if (book?.id) {
        emit('click', book?.id)
    }
}

</script>