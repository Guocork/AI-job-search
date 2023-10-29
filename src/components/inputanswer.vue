<template>
  <div class="quiz-container">
    <!-- <template v-for="(item,index) in questionsList"> -->
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
        <div class="button-container">
      <el-button @click="data.selectedIndex = data.selectedIndex - 1" :disabled="data.selectedIndex == 0"
        style="width: 100px; height: 45px;">上一题</el-button>
      <el-button @click="data.selectedIndex = data.selectedIndex + 1"
        :disabled="data.selectedIndex >= questionsList.length - 1" style="width: 100px; height: 45px;">下一题</el-button>
      <el-button @click="submitAnswers" style="width: 100px; height: 45px;">提 交</el-button>
    </div>
      </template>
    </div>
    <!-- </template> -->
    <!-- <div class="button-container">
      <el-button @click="data.selectedIndex = data.selectedIndex - 1" :disabled="data.selectedIndex == 0"
        style="width: 100px; height: 45px;">上一题</el-button>
      <el-button @click="data.selectedIndex = data.selectedIndex + 1"
        :disabled="data.selectedIndex >= questionsList.length - 1" style="width: 100px; height: 45px;">下一题</el-button>
      <el-button @click="submitAnswers" style="width: 100px; height: 45px;">提 交</el-button>
    </div> -->
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

const judgenum=ref(true)

const router = useRouter()

const store = useStore()

const props = defineProps({
  //子组件接收父组件传递过来的值
  info: String,
})


const play = () => {
  judgenum.value=false
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
  })
  loading.close()
};

const submitAnswers = () => {
  const loading = ElLoading.service({
    lock: true,
    text: 'Loading',
    background: 'rgba(0, 0, 0, 0.7)',
  })
  let questionMessage = "\n";
  let answerMessage = "\n";
  for (let index = 0; index < questionsList.value.length; index++) {
    const element = questionsList.value[index];
    questionMessage = questionMessage + (index + 1) + "：" + element.question + "\n";
    answerMessage = answerMessage + (index + 1) + "：" + element.answer + "\n";
  }
  const message = "这里有5道题：" + questionMessage + "这是我的对5道题的回答，" + answerMessage + "每道题20分，请为我的每个回答进行打分,并说出你打分的原因以及这5道题给出正确标准的答案。并且针对我的回答进行总体评价优、良、差。回答的格式为：得分：{}、题目：{}、我的答案：{}、标准答案：{}、分析：{}";
  let backmessage = ref([
    {
      score: '',//得分
      question: '',//问题
      userAnswers: '',//用户答案
      rightAnswer: '',//正确答案
      analysis: ''//分析
    },
    {
      allAnalysis: ''//总体评价
    }
  ])
  //   得分：0、题目：1、我的答案：ssadas、标准答案：二进制是一种数制，使用0和1表示数字的方式。、分析：你的回答完全错误，没有给出二进制的正确定义。

  // 得分：0、题目：2、我的答案：dasd、标准答案：冒泡排序算法的原理是通过相邻元素的比较和交换来实现排序，每一轮将最大（或最小）的元素冒泡到最后（或最前）的位置。、分析：你的回答没有提供冒泡排序算法的原理，是错误的。

  // 得分：0、题目：3、我的答案：dasd、标准答案：数据库的主键是一种唯一标识符，用于唯一标识数据库表中的每一条记录。、分析：你的回答没有给出主键的正确定义，是错误的。

  // 得分：0、题目：4、我的答案：dasd、标准答案：递归函数是在函数的定义中调用自身的函数。、分析：你的回答没有给出递归函数的正确定义，是错误的。

  // 得分：0、题目：5、我的答案：asdas、标准答案：常见的数据结构包括数组、链表和树。、分析：你的回答没有列举出常见的数据结构，是错误的。

  // 总体评价：差。你的回答完全错误，没有给出任何正确的答案。请仔细学习相关知识后再回答问题。
  sendMessage(message).then(
    res => {
      const regex = /得分：(\d+)、题目：(\d+)、我的答案：(.+?)、标准答案：(.+?)、分析：(.+?)\n/g;
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
      resultList.forEach((item, index) => {
        resultList[index].question = questionsList.value[index].question
      })
      console.log(resultList);
      store.commit('question/addData', resultList);
    }
  )
  loading.close()
  router.push('/jiexi')
}
const prevQuestion = () => {
  if (questionsList != [] && data.selectedIndex > 0) {
    data.selectedIndex = data.selectedIndex - 1;
  }
}

const nextQuestion = () => {
  if (questionsList != [] && data.selectedIndex > 0) {
    data.selectedIndex = data.selectedIndex + 1;
  }
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
