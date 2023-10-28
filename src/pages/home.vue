<template>
    <div>
        <div class="hezi1">
        <el-input 
        v-model="input1" 
        placeholder="这是home首页"  
        style="height: 45px;width: 1350px;" 
        clearable
        :prefix-icon="Search" />   
    </div>
    <div class="hezi2">
        <jobCard />
    </div>
    </div>
</template>

<script setup>
import jobCard from '@/components/jobCard.vue'
</script>

<style scoped>
</style>
