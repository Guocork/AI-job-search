<template>
    <div>
        <div class="hezi1">
            <el-input 
              v-model="input1" 
              placeholder="简历风格"  
              style="height: 45px;width: 950px;" 
              clearable
              :prefix-icon="Search" />   
        </div>
        <div class="hezi2">
            <el-button style="width: 100px; height: 45px;">上传简历</el-button>
        </div>
    </div>
</template>

<script setup>

</script>

<style scoped>
.hezi1{
    float: left;
    margin-left: 130px;
}
.hezi2{
    float: left;
    margin-left: 100px;
}
</style>
