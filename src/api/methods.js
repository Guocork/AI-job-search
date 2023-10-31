//次文件夹用来封装网络请求方法
import request from '@/utils/service';

export function sendMessage(params) {
    return request({
        url: '/colingo/ai',
        method: 'post',
        mock: false,
        data: {
            "version": 1,
            "config": {
                "OUTPUT_STREAM": {
                    "provider_id": "openai",
                    "model_id": "gpt-3.5-turbo",
                    "use_cache": false
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

export function getMessage() {
    return request({
        url: 'api/sdk/p/e710d8fce898158d4e4a/a/31740fb4d2b09e5819ce/r ',
        method: 'get',
        mock: false,
        data: {
            "version": 1,
            "config": {
                "OUTPUT_STREAM_": {
                    "provider_id": "minimax",
                    "model_id": "abab5.5-chat",
                    "use_cache": true, "use_semantic_cache": false
                }, "OUTPUT_STREAM": { "provider_id": "openai", "model_id": "gpt-4", "use_cache": true, "use_semantic_cache": false }, "REFINE": { "provider_id": "ernie", "model_id": "ernie-bot", "use_cache": true, "use_semantic_cache": false }, "WEB_CRAWL_1": { "provider_id": "browserlessapi", "use_cache": false, "error_as_output": true }
            },
            "blocking": true,
            "stream": true,
            "inputs": [{ "Key": "Value" }]
        }
    })
}

export function resumeHelper() {
    return request({
        url: '/colingo/ai',
        method: 'post',
        mock: false,
        data: {
            "version": 1, "config": { "RESUME_FILE": { "use_cache": true }, "OUTPUT_STREAM": { "provider_id": "baichuan", "model_id": "Baichuan2-53B", "use_cache": true, "use_semantic_cache": false } }, "blocking": true, "inputs": [{ "Key": "Value" }]
        }
    })
}