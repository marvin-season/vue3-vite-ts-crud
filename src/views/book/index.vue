<script setup lang="ts">
import { useBook, useBookDetail } from '@/hook/book';
import { BookDetailProps } from '@/types';
import { FormInstance } from 'element-plus';
import { reactive, ref } from 'vue';

const formRef = ref<FormInstance>()
const visiable = ref(false);
const editVisiable = ref(false);
const editBook = reactive<Omit<BookDetailProps, 'id'>>({
    title: '',
    author: ''
});
const url = '/book'
const { books } = useBook(url);
const { mutate: fetchDetail, book } = useBookDetail(url);

const handleViewDetail = (row: any) => {
    fetchDetail(row.id)
    visiable.value = true;
}

const handleEdit = () => {
    editVisiable.value = true
}


// const removeDomain = (item: DomainItem) => {
//     const index = dynamicValidateForm.domains.indexOf(item)
//     if (index !== -1) {
//         dynamicValidateForm.domains.splice(index, 1)
//     }
// }


const submitForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.validate((valid) => {
        if (valid) {
            console.log('submit!')
        } else {
            console.log('error submit!')
            return false
        }
    })
}

const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
}

</script>
<template>
    <div>
        <el-table :data="books" border>
            <el-table-column prop="id" label="ID" />
            <el-table-column prop="title" label="名称" width="300" />
            <el-table-column prop="author" label="作者" width="120" />
            <el-table-column fixed="right" label="Operations" width="120">
                <template #default='{ row }'>
                    <el-button link type="primary" size="small" @click="handleViewDetail(row)">Detail</el-button>
                    <el-button link type="primary" size="small" @click="handleEdit">Edit</el-button>
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

        <el-dialog v-model="editVisiable" width="33%">
            <el-form ref="formRef" :model="editBook" label-width="120px" class="demo-dynamic">
                <el-form-item prop="title" label="Title">
                    <el-input v-model="editBook.title" />
                </el-form-item>
                <el-form-item prop="author" label="Author">
                    <el-input v-model="editBook.author" />
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm(formRef)">Submit</el-button>
                    <el-button @click="resetForm(formRef)">Reset</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>