<template>
    <el-steps :space="200" :active=stepIndex space="33%" align-center simple style="margin-bottom: 10px;">
        <el-step title="填写基本信息" description="填写面试岗位和简历内容" />
        <el-step title="开始面试" />
        <el-step title="总结" />
    </el-steps>


    <el-row>
        <el-col :span="24">
            <el-card v-if="stepIndex === 0">
                <el-form label-width="auto" :model="form">
                    <el-form-item label-position="right">
                        <el-form-item label="岗位名称">
                            <el-input v-model="form.jobName" size="large" placeholder="请输入岗位名称" />
                        </el-form-item>
                    </el-form-item>
                    <el-form-item label="简历内容">
                        <el-input v-model="form.resume" type="textarea" placeholder="请输入简历内容" :autosize="{ minRows: 8 }" />
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="beginInterviews()">下一步</el-button>
                    </el-form-item>
                </el-form>
            </el-card>
            <el-card v-if="stepIndex === 1">
                <el-form label-width="auto" label-position="top">
                    <el-form-item v-for="(item, index) in questionList" :key="index" :label=item.question>
                        <el-input v-model="item.myAnswer" size="large" :autosize="{ minRows: 5 }" />
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="stepIndex.value = 0">上一步</el-button>
                        <el-button type="primary" @click="beginInterviews()">开始面试</el-button>
                        <el-button type="primary" @click="beginInterviews()">下一步</el-button>
                    </el-form-item>
                </el-form>
            </el-card>
        </el-col>
    </el-row>
</template>

<script setup>
import { reactive, ref, h, watch } from 'vue';
import { ElMessageBox, ElLoading } from 'element-plus'
import { sendMessage } from '@/api/colingo'

const form = ref({});
const stepIndex = ref(0);
const questionList = ref([]);

const beginInterviews = () => {
    stepIndex.value = 1;
    questions.value = [];
    const text = `你现在是一位面试官，我正在面试的岗位名称：${form.value.jobName}, 我的简历：\n${form.value.resume}, 请你提供10道题来判断我是否能够胜任这个岗位，其中7到题为岗位技术题，3道题为人际关系题`
    sendMessage(text).then(
        res => {
            const text = res.run.results[0][0].value.content;
            const regex = /(^\d+\.\s)(.*)/gm;
            const matchArray = Array.from(text.matchAll(regex));
            console.log("matchArray", matchArray);
            const questions = matchArray.map(match => match[2].trim());
            questions.forEach(item => {
                questionList.value.push({
                    question: item
                })
            })
        }
    )
}




















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
