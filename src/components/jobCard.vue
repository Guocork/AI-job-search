<template>
  <el-row :gutter="24">
    <el-col :span="8" v-for="(item, index) in jobList" :key="item.id">
      <el-card shadow="always">
        <template #header>
          <div class="card-header">
            <span>{{ item.companyName }}</span>
            <el-button @click="window.open(`${item.jobUrl}`, '_blank');" text>点击投递</el-button>
          </div>
        </template>
        <el-descriptions column="1">
          <el-descriptions-item label="🚀">{{ item.jobTitle }}</el-descriptions-item>
          <el-descriptions-item label="👨‍🎓">{{ item.jobDescription }}</el-descriptions-item>
          <el-descriptions-item label="📍">{{ item.jobLocation }}</el-descriptions-item>
          <el-descriptions-item label="🏢">{{ item.jobRequirements }}</el-descriptions-item>
          <el-descriptions-item label="🏢">{{ item.companyDescription }}</el-descriptions-item>
        </el-descriptions>
      </el-card>
    </el-col>
  </el-row>
</template>

<script setup>
import { ref, onMounted, reactive } from 'vue';
import { selectJobListApi } from '@/api/job'

const jobList = ref([]);
const showTooltip = ref(false);

const fetchJobList = () => {
  selectJobListApi().then(res => {
    jobList.value = res.data;
  })
};

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
