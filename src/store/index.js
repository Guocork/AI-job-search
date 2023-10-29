//此文件夹用来创建store
import { createStore } from 'vuex'
import question from './modules/question'

export default createStore({
    modules:{
        question
    }
  })
  