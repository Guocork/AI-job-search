<template>
     <div class="quiz-container">
    <div class="quiz-box">
      <div class="quiz-question">{{ }}</div>
      <input v-model="currentAnswer" class="answer-input" placeholder="请输入答案" />
    </div>
    <div class="button-container">
      <button>上一题</button>
      <button>下一题</button>
      <button>提交</button>
    </div>
  </div>
</template>

<script setup>
import {reactive,ref} from 'vue';
const data=reactive({
    currentAnswer:'',
})
</script>

<style scoped>
/* .quiz-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px;
} */

.quiz-box {
  border: 2px solid #333;
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 10px;
}

.quiz-question {
  font-size: 18px;
  margin-bottom: 10px;
}

.answer-input {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #333;
  border-radius: 5px;
}

.button-container {
  display: flex;
  justify-content: space-between;
}

button {
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
}
</style>
