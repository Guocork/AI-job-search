<template>
     <div class="quiz-container">
        <div class="quiz-box">
          <div class="quiz-question">题目1:{{data.currentQuestion}}</div>
          <input v-model="currentAnswer" class="answer-input" placeholder="请输入答案" />
        </div>
        <div class="button-container">
          <el-button @click="prevQuestion" :disabled="currentQuestionIndex === 0" style="width: 100px; height: 45px;">上一题</el-button>   
          <el-button @click="nextQuestion" :disabled="currentQuestionIndex === data.questions.length - 1" style="width: 100px; height: 45px;">下一题</el-button>   
          <el-button @click="submitAnswers" style="width: 100px; height: 45px;">提  交</el-button>   
        </div>
      </div>
</template>

<script setup>
import {reactive,ref,defineProps,toRefs} from 'vue';
import {sendMessage} from '@/api/methods'
const data=reactive({
    currentAnswer:'',
    currentQuestion:'',
    currentQuestionIndex: 0,
    questions: [
        { question: "题目1" },
        { question: "题目2" },
        { question: "题目3" },
        { question: "题目4" },
        { question: "题目5" },
      ],

})

const props = defineProps({
  //子组件接收父组件传递过来的值
  info: String,
})
const play = () => {
  console.log("你成功调用方法")
  sendMessage(props.info).then(res=>{
    console.log(res);
    data.currentQuestion=res
  })
};

const submitAnswers =()=>{
  sendMessage(data.currentAnswer).then(

  )
}
const prevQuestion=()=>{

}

const nextQuestion=()=>{
  
}

defineExpose({
  play,
});
const {info} =toRefs(props)
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
