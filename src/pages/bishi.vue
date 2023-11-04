<template>
    <div class="container">
        <el-row :gutter="20">
            <el-col :span="16">
                    <el-input v-model="input1" placeholder="求职方向（如：程序员/产品经理/运营等）" type="input" clearable
                        :prefix-icon="Search" size="large" autofocus="true" show-word-limit="true" :rows="2"
                        @change="bishi1()" />
            </el-col>
            <el-col :span="8">
                <el-button @click="bishi1" style="width: 100px; height: 45px;">开始笔试</el-button>
            </el-col>
        </el-row>
        <div class="part2">
            <inputanswer
                :info="'我在准备参加' + input1 + '的笔试，现在请你给我出5道题，来模拟我的笔试内容，请按照：题目：{}的内容输出，注意不要输出任何多余的内容，你也不需要输出任何回复我提问的内容，例如：理解你的要求，以下是五道题目；祝你好运等等与题目无关的内容'"
                ref="childComp" />
        </div>
    </div>
</template>

<script setup>
import { reactive, ref } from 'vue';
import inputanswer from '@/components/inputanswer.vue'
const input1 = ref('')
const childComp = ref(null);

const bishi1 = () => {
    childComp.value.play();
}
</script>

<style scoped>
.part2 {
    margin-top: 100px;
}</style>
