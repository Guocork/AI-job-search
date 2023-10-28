<template>
    <div class="question-display">
        <h2 class="question-title">{{ question.title }}</h2>
        <div class="user-answer">
            <strong>用户回答:</strong> {{ userAnswer }}
        </div>
        <div class="correct-answer">
            <strong>正确答案:</strong> {{ question.correctAnswer }}
        </div>
        <div class="analysis">
            <strong>分析:</strong> {{ question.analysis }}
        </div>
        <div class="score">
            <strong>得分:</strong> {{ question.score }}
        </div>
    </div>
</template>

<script setup>
import {useStore} from'vuex';
import { reactive, ref, defineProps, toRefs, computed } from 'vue';
const store=useStore()
const question=reactive({
    title:'dasdsdasda',
    correctAnswer:'',
    analysis:'',
    score:''
})

const userAnswer=ref('')
</script>

<style scoped>
.question-display {
  border: 1px solid #ccc;
  padding: 16px;
  margin: 16px;
  border-radius: 4px;
  background-color: #f8f8f8;
}

.question-title {
  font-size: 18px;
  margin-bottom: 10px;
}

.user-answer {
  margin-bottom: 10px;
}

.correct-answer {
  margin-bottom: 10px;
  color: green;
}

.analysis {
  margin-bottom: 10px;
  color: #444;
}
</style>
