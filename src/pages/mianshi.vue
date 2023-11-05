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
                <el-form-item>
                    <el-button type="primary" @click="stepIndex.value = 0">上一步</el-button>
                    <el-button type="primary" @click="openConfirmBox()">提交</el-button>
                </el-form-item>
                <el-form label-width="auto" label-position="top">
                    <el-form-item v-for="(item, index) in questionList" :key="index" :label=item.question>
                        <el-input v-model="item.myAnswer" type="textarea" show-word-limit maxlength="350"
                            :autosize="{ minRows: 5 }" />
                    </el-form-item>
                </el-form>
            </el-card>
            <el-card v-if="stepIndex === 2">
                <el-text class="mx-1">{{ summarize }}</el-text>
            </el-card>
        </el-col>
    </el-row>
</template>

<script setup>
import { ref, } from 'vue';
import { ElMessageBox, ElLoading } from 'element-plus'
import { sendMessage } from '@/api/colingo'

const form = ref({});
const stepIndex = ref(0);
const questionList = ref([]);
const summarize = ref('');

const beginInterviews = () => {
    const loading = ElLoading.service({
        lock: true,
        text: '加载面试题中，请稍等......',
        background: 'rgba(0, 0, 0, 0.7)',
    })
    const text = `你现在是一位面试官，我正在面试的岗位名称：${form.value.jobName}, 我的简历：\n${form.value.resume}, 请你提供10道题来判断我是否能够胜任这个岗位，其中7到题为岗位技术题，3道题为人际关系题`
    sendMessage(text).then(
        res => {
            stepIndex.value = 1;
            questionList.value = [];
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
            loading.close();
        }
    )
}

const openConfirmBox = () => {
    ElMessageBox.confirm(
        '您确认要提交面试问卷吗?',
        {
            confirmButtonText: '确认',
            cancelButtonText: '取消'
        }
    )
        .then(() => {
            const loading = ElLoading.service({
                lock: true,
                text: '正在努力分析回答内容和岗位的匹配度，请稍等......',
                background: 'rgba(0, 0, 0, 0.7)',
            })
            const text = `你现在是一位面试官，我正在面试的岗位名称：${form.value.jobName}, 这是我的简历：\n${form.value.resume}\n,这里有一个json对象：${JSON.stringify(questionList.value)}。\n其中question为问题，myAnswer为我的回答，请你根据这些问题以及我对于的回答来分析我是否能够胜任这个岗位，如果不能胜任，请用委婉的话来说一下为什么你认为我不能胜任这个岗位以及需要提升的地方`
            sendMessage(text).then(
                res => {
                    stepIndex.value = 2;
                    console.log(res);
                    summarize.value = res.run.results[0][0].value.content;
                    loading.close();
                }
            )
        })
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
