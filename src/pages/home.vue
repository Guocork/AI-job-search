<template>
  <div>
    <el-row justify="center">
      <el-col :span="18">
        <div class="grid-content ep-bg-purple-dark">
          <el-input v-model="params.jobTitle" placeholder="工作名/要求/位置/月薪" style="height: 45px;" clearable
            :prefix-icon="Search" >
            <template #append>
              <el-button :icon="Search" @click="change"/>
            </template>
          </el-input>
        </div>
      </el-col>
    </el-row>
    <el-row justify="center">
      <el-col :span="6">
        <div class="grid-content ep-bg-purple">
          <el-select v-model="params.type" class="m-2" placeholder="工作类型" size="large" filterable clearable>
            <el-option v-for="item in options1" :key="item.value1" :label="item.label" :value="item.value1" />
          </el-select>
        </div>
      </el-col>
      <el-col :span="2" :offset="0">
        <div class="grid-content ep-bg-purple">
          <el-select v-model="params.jobLocation" class="m-2" placeholder="工作地点" size="large" filterable @change="change"
            clearable>
            <el-option v-for="item in options2" :key="item.value2" :label="item.label" :value="item.value2" />
          </el-select>
        </div>
      </el-col>
      <el-col :span="2" :offset="1">
        <div class="grid-content ep-bg-purple">
          <el-select v-model="params.experence" class="m-2" placeholder="经验要求" size="large" filterable clearable>
            <el-option v-for="item in options3" :key="item.value3" :label="item.label" :value="item.value3" />
          </el-select>
        </div>
      </el-col>
      <el-col :span="2" :offset="1">
        <div class="grid-content ep-bg-purple">
          <el-select v-model="params.jobTitle" class="m-2" placeholder="工作方向" size="large" filterable @change="change"
            clearable>
            <el-option v-for="item in options4" :key="item.value4" :label="item.label" :value="item.value4" />
          </el-select>
        </div>
      </el-col>
      <el-col :span="3" :offset="3">
        <!-- <div class="grid-content ep-bg-purple">
          <span>显示工资  </span>
          <el-switch v-model="value5" size="large"/>
        </div> -->
        <div class="grid-content ep-bg-purple-light">
          <el-upload v-model:file-list="fileList" class="upload-demo"
            action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15" multiple :on-preview="handlePreview"
            :on-remove="handleRemove" :before-remove="beforeRemove" :limit="1" :on-exceed="handleExceed"
            :on-success="handlesuccess">
            <el-button style="height: 45px;">上传简历</el-button>
            <!-- <template #tip>
            <div class="el-upload__tip">
                文件大小不要超过500KB.
            </div>
          </template> -->
          </el-upload>
        </div>
      </el-col>
    </el-row>
    <jobCard :info="params" ref="childComp" />
  </div>
</template>

<script setup>
import jobCard from '@/components/jobCard.vue'
import { Search } from '@element-plus/icons-vue'
import { reactive, ref, watch } from 'vue';

const childComp = ref(null);

const params = ref({});

// watch(
//   () => value2.value,
//   () => {
//     console.log(value2.value);
//     childComp.value.play1();
//   }
// )

const options1 = [
  {
    value1: '全职',
    label: '全职',
  },
  {
    value1: '兼职',
    label: '兼职',
  },
  {
    value1: '远程',
    label: '远程',
  }
]

const options2 = [
  {
    value2: '北京',
    label: '北京',
  },
  {
    value2: '上海',
    label: '上海',
  },
  {
    value2: '杭州',
    label: '杭州',
  },
  {
    value2: '深圳',
    label: '深圳',
  }
]

const options3 = [
  {
    value3: '不限',
    label: '不限',
  },
  {
    value3: '一年',
    label: '一年',
  },
  {
    value3: '两年',
    label: '两年',
  },
  {
    value3: '三年及以上',
    label: '三年及以上',
  }
]

const options4 = [
  {
    value4: '程序员',
    label: '程序员',
  },
  {
    value4: '运营',
    label: '运营',
  },
  {
    value4: '设计师',
    label: '设计师',
  },
  {
    value4: '产品经理',
    label: '产品经理',
  }
]

const change = () => {
  childComp.value.fetchJobList();
}
</script>

<style scoped>
.el-row {
  margin-bottom: 20px;
}
</style>
