<template>
  <div class="quiz-container">
    <div class="quiz-box">
      <template v-if="judgenum">
        <el-empty description="description" />
      </template>
      <template v-else>
        <template v-for="(item, index) in questionsList">
          <template v-if="index == data.selectedIndex">
            <div class="quiz-question">题目{{ data.selectedIndex + 1 }}:{{ item.question }}</div>
            <el-input v-model="item.answer" :rows="15" type="textarea" placeholder="请输入答案" />
          </template>
        </template>
        <div v-if="!judgenum" class="button-container">
          <el-button @click="data.selectedIndex = data.selectedIndex - 1" :disabled="data.selectedIndex == 0"
            style="width: 100px; height: 45px;">上一题</el-button>
          <el-button @click="data.selectedIndex = data.selectedIndex + 1"
            :disabled="data.selectedIndex >= questionsList.length - 1" style="width: 100px; height: 45px;">下一题</el-button>
          <el-button @click="submitAnswers" style="width: 100px; height: 45px;">提 交</el-button>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, defineProps, toRefs, computed } from 'vue';
import { sendMessage } from '@/api/methods'
import { ElLoading } from 'element-plus'
import { ElMessage, ElMessageBox } from 'element-plus'
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
  // const requests = [
  //   questionsList.forEach(item => {
  //     const message = `这是我的问题：${item.question}，这是我的回答：${item.myAnswer}，每道题20分，请为我的回答进行打分,并说出你打分的原因以及这5道题给出正确标准的答案。并且针对我的回答进行总体评价优、良、差。请按照我输入的顺序回答，回答的格式为：得分：{}、题目序号：{}、我的答案：{}、标准答案：{}、分析：{}。内容要按照格式回答完整`;
  //     sendMessage(message);
  //   })
  // ];

  // Promise.all(requests)
  //   .then((responses) => {
  //     // 将每个请求的结果拼装到一起
  //     this.results = responses;
  //   })
  //   .catch((error) => {
  //     console.error('请求失败：', error);
  //   });

  let questionMessage = "\n";
  let answerMessage = "\n";
  for (let index = 0; index < questionsList.value.length; index++) {
    const element = questionsList.value[index];
    questionMessage = questionMessage + (index + 1) + "：" + element.question + "\n";
    answerMessage = answerMessage + (index + 1) + "：" + element.answer + "\n";
  }
  const message = "这里有5道题：" + questionMessage + "这是我的对5道题的回答，" + answerMessage + "每道题20分，请为我的每个回答进行打分,并说出你打分的原因以及这5道题给出正确标准的答案。并且针对我的回答进行总体评价优、良、差。请按照我输入的顺序回答，回答的格式为：得分：{}、题目序号：{}、我的答案：{}、标准答案：{}、分析：{}。内容要严格按照格式回答完整,标点符号也不要省略";

  sendMessage(message).then(
    res => {
      console.log(res);
      const regex = /得分：(\d+)、题目序号：(\d+)、我的答案：(.+?)、标准答案：(.+?)、分析：(.+?)\n/g;
      const resultList = [];
      let match;
      while ((match = regex.exec(res)) !== null) {
        const item = {
          score: match[1],
          question: match[2],
          myAnswer: match[3],
          standardAnswer: match[4],
          analysis: match[5],
        };
        resultList.push(item);
      }
      console.log("resultList", resultList);
      store.commit('question/addData', resultList);
      loading.close()
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
