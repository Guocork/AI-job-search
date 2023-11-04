<template>
  <el-row :gutter="20">
    <el-col :span="12">
      <el-card>
        <el-form label-width="auto" :model="form">
          <el-form-item label-position="right">
            <el-form-item label="岗位名称">
              <el-input v-model="form.jobName" size="large" placeholder="请输入岗位名称" />
            </el-form-item>
          </el-form-item>
          <el-form-item label="简历内容">
            <el-input v-model="form.resume" type="textarea" placeholder="请输入简历内容" :autosize="{ minRows: 8 }" autosize />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submit">优化简历</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </el-col>
    <el-col :span="12">
      <el-card class="box-card2" title="优化后简历">
        <template #header>
          <div class="card-header">
            <span>优化后简历</span>
          </div>
        </template>
        <el-text style="white-space: pre-wrap;text-align: left;" class="mx-1">{{ resume }}</el-text>
      </el-card>
    </el-col>
  </el-row>
</template>

<script setup>
import { ref } from 'vue'
import { ElLoading } from 'element-plus'
import { sendMessage } from '@/api/colingo'

const form = ref({})
const resume = ref()

const submit = () => {
  const loading = ElLoading.service({
    lock: true,
    text: 'Loading',
    background: 'rgba(0, 0, 0, 0.7)',
  })
  const text = `你现在是一名简历优化师，我现在要想面试的岗位是：${form.value.jobName}, 这是我的简历内容：\n${form.value.resume}。\n请你对我的这份简历优化一下并返回, 可以使用emoji表情丰富简历`;
  //网络请求
  sendMessage(text).then(
    res => {
      resume.value = res.run.results[0][0].value.content;
      loading.close();
    }
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
