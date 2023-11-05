//此文件夹用来封装网络请求方法
import request from '@/utils/service';

export function sendMessage(params) {
    return request({
        url: '/colingo/ai',
        method: 'post',
        mock: false,
        data: {
            "version": 3,
            "config": {
                "OUTPUT_STREAM": {
                    "provider_id": "openai",
                    "model_id": "gpt-3.5-turbo-16k",
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

