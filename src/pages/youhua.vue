<template>
    <el-row :gutter="10" class="hezi1">
        <el-col :span="12">
            <div class="grid-content ep-bg-purple">
                    <el-input v-model="input1" placeholder="个人经历" style="height: 45px;" clearable
                        :prefix-icon="Search" />
            </div>
        </el-col>
        <el-col :span="6">
            <div class="grid-content ep-bg-purple-light">        
                    <el-button style="height: 45px;">生成简历</el-button>               
            </div>
        </el-col>
        <el-col :span="6">
            <div class="grid-content ep-bg-purple-light">        
              <el-upload v-model:file-list="fileList" class="upload-demo"
        action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15" 
        multiple :on-preview="handlePreview"
        :on-remove="handleRemove" 
        :before-remove="beforeRemove" 
        :limit="3" :on-exceed="handleExceed">
        <el-button  style="height: 45px;">上传简历</el-button>
        <template #tip>
            <!-- <div class="el-upload__tip">
                文件大小不要超过500KB.
            </div> -->
        </template>
    </el-upload>          
            </div>
        </el-col>
    </el-row>
    <!-- <el-empty description="description" /> -->
</template>

<script setup>
import { ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { UploadProps, UploadUserFile } from 'element-plus'

const fileList = ref([
  // {
  //   name: 'element-plus-logo.svg',
  //   url: 'https://element-plus.org/images/element-plus-logo.svg',
  // },
  // {
  //   name: 'element-plus-logo2.svg',
  //   url: 'https://element-plus.org/images/element-plus-logo.svg',
  // },
])

const handleRemove = (file, uploadFiles) => {
  console.log(file, uploadFiles)
}

const handlePreview= (uploadFile) => {
  console.log(uploadFile)
}

const handleExceed= (files, uploadFiles) => {
  ElMessage.warning(
    `The limit is 3, you selected ${files.length} files this time, add up to ${
      files.length + uploadFiles.length
    } totally`
  )
}

const beforeRemove = (uploadFile, uploadFiles) => {
  return ElMessageBox.confirm(
    `Cancel the transfer of ${uploadFile.name} ?`
  ).then(
    () => true,
    () => false
  )
}
</script>

<style scoped>
.hezi1{
  margin-bottom: 20px;
}
</style>
