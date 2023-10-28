<template>
  <div>
    🚀👨‍🎓🏢
  </div>
  <div class="job-list">
    <div v-for="(job, index) in jobList" 
    :key="index" 
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
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, reactive } from 'vue';
import { getMessage } from '@/api/methods'

const jobList = ref([]);
const showTooltip = ref(false);

const fetchJobList = () => {

};

onMounted(() => {
  // 在组件加载时发送请求给后台，并将返回的职位信息存储在jobList中
  fetchJobList();
});

  

const navigateToJobPage = (url) => {
  // 跳转到指定网页
  window.open(url, '_blank');
};
</script>

<style scoped>
.job-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.job-item {
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.2s;
  width: 300px;
  margin: 10px;
  position: relative;
}

.job-item:hover {
  background-color: #f0f0f0;
  transform: scale(1.02);
}

.job-title {
  font-size: 20px;
  font-weight: bold;
}

.job-company {
  font-size: 16px;
}

.job-description {
  margin-top: 10px;
}

.tooltip {
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
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s, transform 0.3s;
}

.fade-enter,
.fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
