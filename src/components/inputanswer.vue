<template>
     <div class="quiz-container">
        <div class="quiz-box">
          <div class="quiz-question">{{}}</div>
          <input v-model="currentAnswer" class="answer-input" placeholder="请输入答案" />
        </div>
        <div class="button-container">
          <el-button style="width: 100px; height: 45px;">上一题</el-button>   
          <el-button style="width: 100px; height: 45px;">下一题</el-button>   
          <el-button style="width: 100px; height: 45px;">提  交</el-button>   
        </div>
      </div>
</template>

<script setup>
import {reactive,ref} from 'vue';
import { Service } from "@/utils/service"
const data=reactive({
    currentAnswer:'',
})

</script>

<style scoped>
.quiz-container {
  border: 2px solid #333;
  border-radius: 10px;
}

.quiz-box {
  padding: 20px;
  margin-bottom: 10px;
}

.quiz-question {
  font-size: 18px;
  margin-bottom: 10px;
}

.answer-input {
  width: 800px;
  height: 200px;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #333;
  border-radius: 5px;
}

.button-container {
  margin-top: 20px;
  margin-bottom: 20px;
}

/* button {
  padding: 10px 20px;
  font-size: 16px;
  background-color: #007BFF;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
} */
</style>
