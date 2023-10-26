//此文加单独引入axios进行封装

import axios from 'axios'


axios.defaults.headers['Content-type']='application/json;charset=utf-8'

export const Service=axios.create({
    timeout:8000,
  });