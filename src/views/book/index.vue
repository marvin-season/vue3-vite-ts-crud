<script setup lang="ts">
import { useBook, useBookDetail } from '@/hook/book';
import { ref, toRef } from 'vue';
const visiable = ref(false);
const url = '/book'
const { books } = useBook(url);
const { mutate: fetchDetail, book } = useBookDetail(url);
const handleViewDetail = async (row: any) => {
    fetchDetail(row.id)
    visiable.value = true;
}

</script>
<template>
    <div>
        <el-table :data="books" border>
            <el-table-column prop="id" label="ID" />
            <el-table-column prop="title" label="名称" width="300"/>
            <el-table-column prop="author" label="作者" width="120"/>
            <el-table-column fixed="right" label="Operations" width="120">
                <template #default='{ row }'>
                    <el-button link type="primary" size="small" @click="handleViewDetail(row)">Detail</el-button>
                    <el-button link type="primary" size="small">Edit</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-dialog v-model="visiable" title="Tips" width="50%" v-if="book">
            <h3>{{ book.title }}</h3>
            <h5>{{ book.author }}</h5>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="visiable = false">Cancel</el-button>
                    <el-button type="primary" @click="visiable = false">
                        Confirm
                    </el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>