<script setup lang="ts">
import { useBooks, useDeleteBook, useSaveBook, useSpecBook } from '@/hook/book';
import { BookDetailProps } from '@/types';
import { ElMessageBox, FormInstance } from 'element-plus';
import { onBeforeMount, ref } from 'vue';
const url = '/book'
const formRef = ref<FormInstance>()
const visiable = ref(false);
const editVisiable = ref(false);
const bookObject = ref<BookDetailProps>({
    id: -1,
    title: '',
    author: ''
});

const { books, refetch } = useBooks(url);
const { book, refetch: fetchDetail } = useSpecBook(url);
const { mutate: saveBook, isSaving } = useSaveBook(url)
const { mutate: deleteBook } = useDeleteBook(url)

onBeforeMount(refetch)

const handleViewDetail = (row: any) => {
    fetchDetail(row.id)
    visiable.value = true;
}

const handleEdit = async (row: any) => {
    handleReset();
    await fetchDetail(row.id)
    bookObject.value = book.value as BookDetailProps
    editVisiable.value = true
}
const handleAdd = async () => {
    handleReset();
    editVisiable.value = true
}

const handleDelete = (id: number) => {
    ElMessageBox.confirm('确定删除吗？', '提示').then(async () => {
        await deleteBook(id)
        refetch()
    })
}

const handleReset = () => {
    bookObject.value = {
        id: -1,
        title: '',
        author: ''
    }
}

const submitForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.validate(async (valid) => {
        if (valid) {
            await saveBook(bookObject.value)
            if (isSaving) {
                refetch()
                editVisiable.value = false
            }
        } else {
            console.log('error submit!')
            return false
        }
    })
}

</script>
<template>
    <div>
        <el-button type="primary" @click="handleAdd">Add</el-button>
        <el-table :data="books" border>
            <el-table-column prop="id" label="ID" />
            <el-table-column prop="title" label="名称" width="300" />
            <el-table-column prop="author" label="作者" width="120" />
            <el-table-column fixed="right" label="Operations" width="200">
                <template #default='{ row }'>
                    <el-button link type="primary" size="small" @click="handleViewDetail(row)">Detail</el-button>
                    <el-button link type="success" size="small" @click="handleEdit(row)">Edit</el-button>
                    <el-button link type="danger" size="small" @click="handleDelete(row.id)">Delete</el-button>
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
            <el-form ref="formRef" :model="bookObject" label-width="120px" class="demo-dynamic">
                <el-form-item prop="title" label="Title">
                    <el-input v-model="bookObject.title" />
                </el-form-item>
                <el-form-item prop="author" label="Author">
                    <el-input v-model="bookObject.author" />
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm(formRef)">Submit</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>