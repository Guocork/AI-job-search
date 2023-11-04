<template>
    <div class="container">
        <el-row :gutter="20">
            <el-col :span="12">
                <div class="grid-content ep-bg-purple">
                    <el-input class="wrap" v-model="input1" placeholder="自我介绍/个人经历" type="input" clearable
                        :prefix-icon="Search" size="large" autofocus="true" show-word-limit="true" :rows="2" @change="" />
                </div>
            </el-col>
            <el-col :span="6">
                <div class="grid-content ep-bg-purple-light">
                    <el-upload v-model:file-list="fileList" class="upload-demo"
                        action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15" multiple
                        :on-preview="handlePreview" :on-remove="handleRemove" :before-remove="beforeRemove" :limit="1"
                        :on-exceed="handleExceed" :on-success="handlesuccess">
                        <el-button style="height: 45px;">上传简历</el-button>


                    </el-upload>
                </div>
            </el-col>
            <el-col :span="6">
                <el-button @click="mianshi1" style="width: 100px; height: 45px;">开始面试</el-button>
            </el-col>
        </el-row>
        <!-- 输入部分 -->
        <el-card class="box-card">
            <el-countdown v-show="showTime" title="剩余时间" :value="restTime" />
            <div style="margin: 10px;">{{ question }}</div>
            <el-form ref="formRef" :model="numberValidateForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="回答" prop="age">
                    <el-input v-model="userAnswer" type="text" autocomplete="off" />
                </el-form-item>
                <el-form-item>
                    <el-button>上一题</el-button>
                    <el-button>下一题</el-button>
                    <el-button @click="resetForm(formRef)">重置</el-button>
                    <el-button type="primary" @click="submitForm()">提交</el-button>
                </el-form-item>
            </el-form>
        </el-card>
        <!-- <div class="part2">
            <inputanswer
                :info="'我在准备参加' + input1 + '的面试，现在请你给我出5道题，来模拟我的面试内容，请按照：题目：{}的内容输出，注意不要输出任何多余的内容，你也不需要输出任何回复我提问的内容，例如：理解你的要求，以下是五道题目；祝你好运等等与题目无关的内容'"
                ref="childComp" />
        </div> -->
    </div>
</template>

<script setup>
import { reactive, ref, h, watch } from 'vue';
import inputanswer from '../components/inputanswer.vue'
import { ElMessageBox, ElLoading } from 'element-plus'
import { FormInstance } from 'element-plus'
import { sendMessage } from '@/api/colingo'

// 自我介绍
const input1 = ref('')

// 剩余时间
const restTime = ref(Date.now() + 1000 * 60 * 60 * 7)

// 问题
const question = ref('欢迎参加面试')

// 显示时间
const showTime = ref(false)

const userAnswer = ref('')

const mianshi1 = () => {
    const prompt1 = '现在你是面试官，我在面试vue程序员的岗位，请出一道面试题。'
    const loading = ElLoading.service({
        lock: true,
        text: 'Loading',
        background: 'rgba(0, 0, 0, 0.7)',
    })
    //网络请求
    sendMessage(prompt1).then(
        res => {
            question.value = res.run.results[0][0].value.content
        }
    )
    watch(
        () => question.value,
        () => {
            showTime.value = true
            loading.close();
        }
    )
    // childComp.value.play();
}

const formRef = ref()

const message = ref('')

const numberValidateForm = reactive({
    age: '',
})

const submitForm = () => {
    const prompt2 = '现在你是面试官，这里有一道面试题目以及我的回答，请你根据我的回答进行分析与评价，并且给出你的建议。\n' + question.value + userAnswer.value
    //loading
    const loading = ElLoading.service({
        lock: true,
        text: 'Loading',
        background: 'rgba(0, 0, 0, 0.7)',
    })
    //接口拿数据
    sendMessage(prompt2).then(
        res => {
            message.value = res.run.results[0][0].value.content
        }
    )
    watch(
        () => message.value,
        () => {
            ElMessageBox({
                title: '面试评价',
                message: h('div', [
                    h('span', null, message.value),
                ]),
                confirmButtonText: '确定',
            })
            //loading结束
            loading.close();
        }
    )
}

const resetForm = (formEl) => {
    if (!formEl) return
    formEl.resetFields()
}


</script>

<style scoped>
.box-card {
    height: 400px;
    width: 480px;
    margin: auto;
    text-align: center;
}

.wrap {
    border-width: 2px;
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
