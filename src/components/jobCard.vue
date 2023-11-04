<template>
  <div class="job-list">
    <!-- <div v-for="(job, index) in jobList" :key="index" 
         class="job-item" 
         @mouseenter="showTooltip = true"
         @mouseleave="showTooltip = false" 
         @click="navigateToJobPage(job.url)">

      <div class="job-title">🚀{{ job.title }}</div>
      <div class="job-description">👨‍🎓{{ job.description }}</div>
      <div class="job-location">🏢{{ job.location }}</div>

      <transition name="fade">
        <div v-if="showTooltip" class="tooltip">点击查看详情</div>
      </transition>
    </div> -->
    <el-card v-for="(job, index) in jobList" :key="index" class="box-card" 
         @mouseenter="showTooltip = true"
         @mouseleave="showTooltip = false" >
      <template #header>
        <div class="card-header">
          <span>{{job.corporation }}</span>
          <el-button class="button" @click="tiaozhuan1" text>点击投递</el-button>
        </div>
      </template>
      <div class="text item">🚀  {{ job.title }}</div>
      <div class="text item">👨‍🎓 {{ job.description }}</div>
      <div class="text item">📍  {{ job.location }}</div>
      <div class="text item">🏢 {{ job.education }}</div>
    </el-card>
    <!-- <transition name="fade">
        <div v-if="showTooltip" class="tooltip">ggggggg</div>
      </transition> -->
  </div>
</template>

<script setup>
import { ref, onMounted, reactive } from 'vue';
import { getMessage } from '@/api/methods'
import { jobListApi } from '@/api/methods'

const jobList = ref([
  {
    corporation:'青岛国信发展（集团）有限责任公司',
    title: '技术开发岗（计算机方向）',
    description: '1.具有计算机视觉、人工智能、物联网、大数据等技术研究与应用经历，熟练运用编程者优先；2.具有科研项目申报与管理相关经历；3.学习能力、理解能力、适应能力强，作风踏实过硬。',
    location: '青岛市、烟台市、浙江省台州市，随船期间于青岛、浙江、福建、广东、海南等地',
    education:'硕士|计算机科学与技术、软件工程、计算机应用技术、人工智能等。'
  }
]);
const showTooltip = ref(false);

const fetchJobList = () => {
  jobListApi()
};

const tiaozhuan1=()=>{
  window.open('https://xiaoyuan.zhaopin.com/job/CC234215610J40508363307', '_blank');
}

onMounted(() => {
  // 在组件加载时发送请求给后台，并将返回的职位信息存储在jobList中
  fetchJobList();
});



// const navigateToJobPage = (url) => {
//   // 跳转到指定网页
//   window.open('https://colingo.ai/', '_blank');
// };



</script>

<style scoped>
/* .job-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
} */

/* .job-item {
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.2s;
  width: 200px;
  margin: 10px;
  position: relative;
} */

.box-card:hover {
  background-color: #f0f0f0;
  transform: scale(1.02);
}

/* .job-title {
  font-size: 20px;
  font-weight: bold;
} */

/* .job-company {
  font-size: 16px;
} */

/* .job-description {
  margin-top: 10px;
} */

/* .tooltip {
  background-color: #333;
  color: #fff;
  padding: 5px 10px;
  border-radius: 5px;
  position: absolute;
  top: -30px;
  left: 50%;
  transform: translateX(-50%);
  opacity: 0.8;
  transition: opacity 0.3s, transform 0.3s;
  transform-origin: bottom;
} */

/* .fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s, transform 0.3s;
} */

/* .fade-enter,
.fade-leave-to

.fade-leave-active in <2.1.8 */
  /* /* {
  opacity: 0;
  transform: translateY(-10px);
} */


.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.box-card {
  width: 400px;
  margin-bottom: 20px;
  border-radius: 10%;
}
</style> 
