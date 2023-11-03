<template>
    <div>
        <el-divider border-style="double" />
        <el-button link @click="TiaoZhuan1">
           <el-icon :size="18"><ChatLineSquare /></el-icon>
           <span id="button1">优化简历</span>
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
        <el-divider border-style="double" />
        <el-button link @click="TiaoZhuan4">
           <el-icon :size="18"><Orange /></el-icon>
           <span id="button1">求职社区</span>
        </el-button>
    </div>
</template>

<script setup>
import { ElMessageBox,ElNotification  } from 'element-plus'
import { useRouter } from 'vue-router'
  function OpenAlert(){
  ElMessageBox.alert('此功能尚未上线', '提示', {
    confirmButtonText: '确定'
  })
}
const router = useRouter()
const TiaoZhuan1=()=>{
  // ElNotification({
  //   title: '提示',
  //   message: '该功能未上线,程序小哥正在拼命加班',
  //   type: 'warning',
  // })
  router.push('/youhua')
}

const TiaoZhuan2=()=>{
  router.push('/mianshi')
}

const TiaoZhuan3=()=>{
  router.push('/bishi')
}

const TiaoZhuan4=()=>{
  ElMessageBox.alert('此功能尚未上线', '提示', {
    confirmButtonText: '确定'
  })
}

</script>

<style scoped>
#button1{
    font-weight: 600;
    font-size: large;
}
</style>