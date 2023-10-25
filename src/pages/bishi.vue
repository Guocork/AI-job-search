<template>
    <div class="container">
        <div class="part1">
            <div class="hezi1">
                <el-input 
                v-model="input1" 
                placeholder="求职方向（如：程序员/产品经理/运营等）" 
                style="height: 45px;width: 950px;" 
                clearable
               :prefix-icon="Search" />
            </div>
            <div class="hezi2">
                <el-button style="width: 100px; height: 45px;">开始笔试</el-button>   
            </div>
        </div>
        <div class="part2">
            <inputanswer />
        </div>   
    </div>
</template>

<script setup>
import {reactive,ref} from 'vue';
import inputanswer from '../components/inputanswer.vue'
</script>

<style scoped>
.hezi1 {
    float: left;
    margin-left: 130px;
}

.hezi2 {
    float: left;
    margin-left: 100px;
}


</style>
