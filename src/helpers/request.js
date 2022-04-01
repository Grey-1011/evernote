import axios from 'axios'

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.baseURL = 'https://note-server.hunger-valley.com'//若 后端接口并没有写好呢？
axios.defaults.withCredentials = true

export default function request(url,type = 'GET',data = {}){
    return new Promise((resolve,reject)=>{
        let option = {
            url,
            method:type,
            validateStatus(status){
                return (status >= 200 && status < 300) || status === 400
            }
        }
        if(type.toLowerCase() === 'get') {
            option.params = data
        }else{
            option.data = data
        }
        axios(option).then(res => {
            if(res.status === 200){
                resolve(res.data)
            }else {
                console.log(res.data)
                reject(res.data)
            }
        }).catch(err => {
            console.error({msg:'网络异常'})
            reject({msg:'网络异常'})
            return err
        })
    })
}

// request('auth/login','Post',{username:'小新',password:'123456'})
//     .then(data=>{
//         console.log(data)
//     })