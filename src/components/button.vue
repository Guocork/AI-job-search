<template>
    <div>
        <el-divider border-style="double" />
        <el-button link @click="TiaoZhuan1">
           <el-icon :size="18"><ChatLineSquare /></el-icon>
           <span id="button1">生成简历</span>
        </el-button>
        <el-divider border-style="double" />
        <el-button link @click="TiaoZhuan2">
        <el-icon :size="18"><User /></el-icon>
        <span id="button1">模拟面试</span>
        </el-button>
        <el-divider border-style="double" />
        <el-button link @click="TiaoZhuan3">
        <el-icon :size="18"><Document /></el-icon>
        <span id="button1">模拟笔试</span>
        </el-button>
        <el-divider border-style="double" />
        <el-button link @click="OpenAlert">
        <el-icon :size="18"><Compass /></el-icon>
        <span id="button1">智能分析</span>
        </el-button>
    </div>
</template>

<script setup>
import { ElMessageBox } from 'element-plus'
import { useRouter } from 'vue-router'
  function OpenAlert(){
  ElMessageBox.alert('此功能尚未上线', '提示', {
    confirmButtonText: '确定'
  })
}
const router = useRouter()
const TiaoZhuan1=()=>{
  router.push('/youhua')
}

const TiaoZhuan2=()=>{
  router.push('/mianshi')
}

const TiaoZhuan3=()=>{
  router.push('/bishi')
}

</script>

<style scoped>
#button1{
    font-weight: 600;
    font-size: large;
}
</style>