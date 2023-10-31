<template>
  <div>
    <el-row justify="center">
      <el-col :span="23">
        <div class="grid-content ep-bg-purple-dark">
          <el-input v-model="input1" placeholder="工作名/要求/位置/月薪" style="height: 45px;" clearable :prefix-icon="Search" />
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="6">
        <div class="grid-content ep-bg-purple">
          <el-select v-model="value1" class="m-2" placeholder="工作类型" size="large">
            <el-option v-for="item in options1" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </div>
      </el-col>
      <el-col :span="2" :offset="0">
        <div class="grid-content ep-bg-purple">
          <el-select v-model="value2" class="m-2" placeholder="工作地点" size="large">
            <el-option v-for="item in options2" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </div>
      </el-col>
      <el-col :span="2" :offset="1">
        <div class="grid-content ep-bg-purple">
          <el-select v-model="value3" class="m-2" placeholder="经验要求" size="large">
            <el-option v-for="item in options3" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </div>
      </el-col>
      <el-col :span="2" :offset="1">
        <div class="grid-content ep-bg-purple">
          <el-select v-model="value4" class="m-2" placeholder="工作方向" size="large">
            <el-option v-for="item in options4" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </div>
      </el-col>
      <el-col :span="3" :offset="3">
        <div class="grid-content ep-bg-purple">
          <span>显示工资  </span>
          <el-switch v-model="value5" size="large"/>
        </div>
      </el-col>
    </el-row>
    <jobCard />
  </div>
</template>

<script setup>
import jobCard from '@/components/jobCard.vue'
import { Search } from '@element-plus/icons-vue'
import { reactive, ref } from 'vue';

// const data=reactive({
//     options1:[
//         '全职',
//         '兼职',
//         '远程',
//     ],
//     options2:[
//         '北京',
//         '上海',
//         '杭州',
//         '深圳',
//     ],options3:[
//         '不限',
//         '一年',
//         '二年',
//         '三年及以上',
//     ],options4:[
//         '程序员',
//         '运营',
//         '设计师',
//         '产品经理',
//     ]
// })

const value1 = ref('')
const value2 = ref('')
const value3 = ref('')
const value4 = ref('')
const value5 = ref(true)

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
</script>

<style scoped>
.el-row {
  margin-bottom: 20px;
}
</style>
