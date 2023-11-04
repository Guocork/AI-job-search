<template>
  <div class="quiz-container">
    <div class="quiz-box">
      <template v-if="judgenum">
        <el-empty description="description" />
      </template>
      <template v-else>
        <template v-for="(item, index) in questionsList" :key="index">
          <template v-if="index == data.selectedIndex">
            <div class="quiz-question">题目{{ data.selectedIndex + 1 }}:{{ item.question }}</div>
            <el-input v-model="item.answer" :rows="15" type="textarea" placeholder="请输入答案" />
          </template>
        </template>
        <div v-if="!judgenum" class="button-container">
          <el-button @click="data.selectedIndex = data.selectedIndex - 1" :disabled="data.selectedIndex == 0"
            style="width: 100px; height: 45px;">上一题</el-button>
          <el-button @click="next" :disabled="data.selectedIndex >= questionsList.length - 1"
            style="width: 100px; height: 45px;">下一题</el-button>
          <el-button @click="submitAnswers" style="width: 100px; height: 45px;">提 交</el-button>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, defineProps, toRefs, computed } from 'vue';
import { sendMessage } from '@/api/colingo'
import { ElLoading } from 'element-plus'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex';

const data = reactive({
  currentAnswer: '',
  currentQuestionIndex: 0,
  userAnswers: Array(5).fill(""),
  selectedIndex: 0,
})

let questionsList = ref([]);

const judgenum = ref(true)

const router = useRouter()

const store = useStore()

const props = defineProps({
  //子组件接收父组件传递过来的值
  info: String,
})

const next = () => {
  const thisSelectedIndex = data.selectedIndex;
  const thisQuestion = questionsList.value[thisSelectedIndex]
  const message =
    "现在有一道面试题，\n内容是：" + thisQuestion.question + "这是我的回答：" + thisQuestion.answer + "。\n请给我这道题的标准正确答案，并且分析我的答案。";
  sendMessage(message).then(
    res => {
      // res.data.run.results[0][0].value.content
      // questionsList.value[thisSelectedIndex].standardAnswer = res;
    }
  )
  data.selectedIndex = data.selectedIndex + 1;
}

const play = () => {
  data.selectedIndex = 0;
  judgenum.value = true;
  questionsList.value.length = 0;
  const loading = ElLoading.service({
    lock: true,
    text: 'Loading',
    background: 'rgba(0, 0, 0, 0.7)',
  })
  sendMessage(props.info).then(res => {
    let startIndex = 0;
    for (let index = 1; index < 6; index++) {
      let index = res.indexOf("：", startIndex);
      startIndex = res.indexOf("题", index);
      if (startIndex == -1) {
        questionsList.value.push({
          question: res.substring(index + 1)
        });
      } else {
        questionsList.value.push({
          question: res.substring(index + 1, startIndex)
        });
      }
    }
    loading.close();
    judgenum.value = false;
  })
};

const submitAnswers = () => {
  const loading = ElLoading.service({
    lock: true,
    text: 'Loading',
    background: 'rgba(0, 0, 0, 0.7)',
  })
  const thisSelectedIndex = data.selectedIndex;
  const thisQuestion = questionsList.value[thisSelectedIndex]
  const message =
    "现在有一道面试题，\n内容是：" + thisQuestion.question + "这是我的回答：" + thisQuestion.answer + "。\n请给我这道题的标准正确答案，并且分析我的答案。";
  sendMessage(message).then(
    res => {
      questionsList.value[thisSelectedIndex].standardAnswer = res;
      console.log(questionsList.value);
      store.commit('question/addData', questionsList.value);
      loading.close();
      router.push('/jiexi')
    }
  )
}

defineExpose({
  play,
});
const { info } = toRefs(props)
</script>

<style scoped>
.quiz-container {
  /* border: 1px solid #333; */
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

/* .answer-input {
  width: 800px;
  height: 200px;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #333;
  border-radius: 5px;
} */

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
