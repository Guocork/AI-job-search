//次文件夹用来封装网络请求方法
import request from '@/utils/service';

export function sendMessage(params){
    return request({
        url: 'api/sdk/p/e710d8fce898158d4e4a/a/4064d95056c180fca7ad/r',
        method: 'post',
        mock: false,
        data: {
              "version": 1,
              "config": {
                  "OUTPUT_STREAM": {
                      "provider_id": "openai",
                      "model_id": "gpt-3.5-turbo",
                      "use_cache": true
                  }
              },
              "blocking": true,
              "inputs": [
                  {
                      "messages": [
                          {
                              "role": "user",
                              "content": `${params}`
                          }
                      ]
                  }
              ]
          }
      })
}