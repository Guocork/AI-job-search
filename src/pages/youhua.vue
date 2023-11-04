<template>
  <!-- <el-row :gutter="10" class="hezi1">
    <el-col :span="6">
      <div class="grid-content ep-bg-purple">
        <el-select v-model="value1" class="m-2" placeholder="求职职位" size="large">
          <el-option v-for="item in options1" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </div>
    </el-col>
    <el-col :span="6">
      <div class="grid-content ep-bg-purple-light">
        <el-select v-model="value2" class="m-2" placeholder="工作时长" size="large">
          <el-option v-for="item in options2" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </div>
    </el-col>
    <el-col :span="6">
      <div class="grid-content ep-bg-purple-light">
        <el-upload v-model:file-list="fileList" class="upload-demo"
          action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15" multiple :on-preview="handlePreview"
          :on-remove="handleRemove" :before-remove="beforeRemove" :limit="1" :on-exceed="handleExceed"
          :on-success="handlesuccess">
          <el-button style="height: 45px;">上传简历</el-button>
          <template #tip>
            <div class="el-upload__tip">
                文件大小不要超过500KB.
            </div>
          </template>
        </el-upload>
      </div>
    </el-col>
    <el-col :span="6">
      <div class="grid-content ep-bg-purple-light">
        <el-button @click="youhua" style="height: 45px;">优化简历</el-button>
      </div>
    </el-col>
  </el-row> -->
  <el-row :gutter="20">
    <el-col :span="12">
      <el-card class="box-card1">
        <el-form class="demo-ruleForm">
          <el-form-item>
            
          </el-form-item>
          <el-form-item>
            <el-button type="primary">优化简历</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </el-col>
    <el-col :span="12">
      <el-card class="box-card2">
        {{ userReseme }}
      </el-card>
    </el-col>
  </el-row>
  <!-- <div class="common-layout">
    <el-container>
      <el-aside width="200px" background="black">Aside</el-aside>
      <el-main>Main</el-main>
    </el-container>
  </div> -->
</template>

<script setup>
import { ref } from 'vue'
import { ElMessage, ElMessageBox, ElLoading } from 'element-plus'
import { UploadProps, UploadUserFile } from 'element-plus'
import { sendMessage } from '@/api/colingo'

const userReseme = ref('我是接口返回的简历')

const value1 = ref('')

const prompt = ref('你是谁')

const youhua = () => {
  const loading = ElLoading.service({
    lock: true,
    text: 'Loading',
    background: 'rgba(0, 0, 0, 0.7)',
  })
  //网络请求
  sendMessage(prompt.value).then(
    res => {
      userReseme.value = res.run.results[0][0].value.content
    }
  )
  loading.close()
}

const options1 = [
  {
    value: '程序员',
    label: '程序员',
  },
  {
    value: '产品经理',
    label: '产品经理',
  },
  {
    value: '运营',
    label: '运营',
  },
  {
    value: '市场',
    label: '市场',
  },
  {
    value: '销售',
    label: '销售',
  },
]

const value2 = ref('')

const options2 = [
  {
    value: '无',
    label: '无',
  },
  {
    value: '一年',
    label: '一年',
  },
  {
    value: '两年',
    label: '两年',
  },
  {
    value: '三年',
    label: '三年',
  },
  {
    value: '三年以上',
    label: '三年以上',
  },
]


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

const handlePreview = (uploadFile) => {
  console.log(uploadFile)
}

const handlesuccess = (files, uploadFiles) => {
  ElMessage.success(
    '上传成功'
  )
}

const handleExceed = (files, uploadFiles) => {
  ElMessage.warning(
    '只能上传一份简历'
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
.hezi1 {
  margin-bottom: 20px;
}

.text {
  font-size: 14px;
}

.item {
  padding: 18px 0;
}

.box-card {
  width: 480px;
}
</style>
