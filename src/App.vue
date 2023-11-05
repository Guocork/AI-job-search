<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="250px">
        <div class="team_container">
          <p @click="backHome" class="team_name">简优创意</p>
        </div>
        <div>
          AI求职一站式服务平台
        </div>
        <Button />
      </el-aside>
      <divider />
      <el-main>
        <div class="main_container">
          <div class="top_div"></div>
        <div>
          <router-view />
        </div>
        <div class="bottom_div"></div>
        </div>
      </el-main>
    </el-container>
  </div>

</template>

<script setup>
import { ref } from 'vue'
import { Search } from '@element-plus/icons-vue'
import divider from './components/divider.vue'
import Button from './components/button.vue';
import { useRouter } from 'vue-router'
const input1 = ref('')

const router = useRouter()

const backHome=()=>{
  router.push('/')
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  height: 100vh;
}
body {
    margin: 0;
    padding: 0;
  }
/* .common-layout {
	height: 100%;
	width: 100%;
	position: fixed;
} */
.el-container{
  height: 100%;
	width: 100%;
	position: fixed;
}
.team_container{
   position: relative;
   height: 100px;
}
.team_name{
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    font-weight: 1200;
    font-size: 30px;

}
/* .main_container{
  position: relative;
} */

.top_div{
  background-color: #ffffff;
  margin-left: -20px;
    margin-right: -20px;
    margin-top: 40px;
}
.bottom_div{
    position: absolute; 
    bottom: 0; 
    background-color: #ffffff;
    width: 100%;
    z-index: -1; 
    height: 50px;
    margin-left: -20px;
    margin-right: -20px;
}
</style>
