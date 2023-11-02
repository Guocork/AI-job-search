<template>
    <div v-for="(item, index) in questionList" :key="index" style="margin-bottom: 20px">
        <el-row justify="center">
            <el-col :span="22">
                <el-card class="box-card">
                    <template #header>
                        <div class="card-header">
                            <span>问题：{{ item.question }}</span>
                        </div>
                    </template>
                    <el-descriptions column="1">
                        <el-descriptions-item label="我的回答：">
                            {{ item.answer }}
                        </el-descriptions-item>
                        <el-descriptions-item label="标准答案：">
                            <pre>{{ item.standardAnswer }}</pre>
                        </el-descriptions-item>
                        <!-- <el-descriptions-item label="答案">
                            {{ item.standardAnswer }}
                        </el-descriptions-item>
                        <el-descriptions-item label="分析">
                            {{ item.analysis }}
                        </el-descriptions-item> -->
                    </el-descriptions>
                </el-card>
            </el-col>
        </el-row>



    </div>
</template>

<script setup>
import { useStore } from 'vuex';
import { computed } from 'vue';

const store = useStore()
const questionList = computed(() => store.state.question.data)
</script>

<style>
.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.text {
    font-size: 14px;
}

.item {
    margin-bottom: 18px;
}

.box-card {
    width: 100%;
}
</style>