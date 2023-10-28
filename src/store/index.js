//此文件夹用来创建store
import { createStore } from 'vuex'
import question from './modules/question'
const store = createStore({
    modules:{
        question
    }
  })
  