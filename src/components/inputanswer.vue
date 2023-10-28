<template>
  <div class="quiz-container">
    <div class="quiz-box">
      <div class="quiz-question">题目1:{{ currentQuestion.question }}</div>
      <input v-model="currentAnswer" class="answer-input" placeholder="请输入答案" />
    </div>
    <div class="button-container">
      <el-button @click="prevQuestion" :disabled="data.currentQuestionIndex === 0"
        style="width: 100px; height: 45px;">上一题</el-button>
      <el-button @click="nextQuestion" :disabled="data.currentQuestionIndex === questions.length - 1"
        style="width: 100px; height: 45px;">下一题</el-button>
      <el-button @click="submitAnswers" style="width: 100px; height: 45px;">提 交</el-button>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, defineProps, toRefs, computed } from 'vue';
import { sendMessage } from '@/api/methods'
import { ElLoading } from 'element-plus'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useRouter } from 'vue-router'
const data = reactive({
  currentAnswer: '',
  currentQuestionIndex: 0,
  userAnswers: Array(5).fill(""),
})
const questions = ref([
  { question: "题目1" },
  { question: "题目2" },
  { question: "题目3" },
  { question: "题目4" },
  { question: "题目5" },
]);

const router = useRouter()

const currentQuestion = computed(() => questions.value[data.currentQuestionIndex]);

const props = defineProps({
  //子组件接收父组件传递过来的值
  info: String,
})
const play = () => {
  console.log("你成功调用方法")
  sendMessage(props.info).then(res => {
    console.log(res);
  })
};

const submitAnswers = () => {
  const loading = ElLoading.service({
    lock: true,
    text: 'Loading',
    background: 'rgba(0, 0, 0, 0.7)',
  })
  sendMessage(data.currentAnswer).then(
  )
  ElMessageBox.confirm(
    //展示得分情况与答案解析
    "data.currentQuestionIndex",
    'Warning',
    {
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancel',
      type: 'warning',
      draggable: true,
    }
  ).then(() => {
    loading.close()
    router.push('/jiexi')
  })
}
const prevQuestion = () => {
  if (data.currentQuestionIndex > 0) {
    data.userAnswers[data.currentQuestionIndex] = data.currentAnswer;
    data.currentQuestionIndex--;
    data.currentAnswer = data.userAnswers[data.currentQuestionIndex];
  }
}

const nextQuestion = () => {
  if (data.currentQuestionIndex < questions.value.length - 1) {
    data.userAnswers[data.currentQuestionIndex] = data.currentAnswer;
    data.currentQuestionIndex++;
    data.currentAnswer = data.userAnswers[data.currentQuestionIndex];
  }
}

defineExpose({
  play,
});
const { info } = toRefs(props)
</script>

<style scoped>
.quiz-container {
  border: 1px solid #333;
  border-radius: 10px;
}

.quiz-box {
  padding: 20px;
  margin-bottom: 10px;
}

.quiz-question {
  font-size: 18px;
  margin-bottom: 50px;
  margin-top: 50px;
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
