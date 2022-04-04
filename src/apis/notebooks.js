import request from '@/helpers/request'
import {friendlyDate} from '@/helpers/util.js'
import dayjs from 'dayjs'

const URL = {
    GET:'/notebooks',
    ADD:'/notebooks',
    UPDATE:'/notebooks/:id',
    DELETE:'/notebooks/:id'
}

export default {
    getAll(){
        return new Promise((resolve,reject)=>{
            request(URL.GET)
                .then(res =>{
                    res.data = res.data.sort((notebook1,notebook2) => notebook1.updatedAt < notebook2.updatedAt ? 1 : -1)
                    res.data.forEach(notebook =>{
                        notebook.updatedAt = friendlyDate(notebook.updatedAt)
                        notebook.createdAt = dayjs(notebook.createdAt).locale('zh-cn').format('YYYY/MM/DD/HH:mm')
                    })
                    // console.log(res.data)
                    resolve(res)
                }).catch(err =>{reject(err)})
        })
    },
    updateNotebook(notebookId,{title = ''} = {title: ''}){
       return request(URL.UPDATE.replace(':id',notebookId),'PATCH',{title})
    },
    deleteNotebook(notebookId){
        return request(URL.DELETE.replace(':id',notebookId),'DELETE')
    },
    addNotebook({title = ''} = {title:''}){
        return new Promise((resolve,reject)=> {
            request(URL.ADD, 'POST', {title})
                .then(res => {
                    console.log('res.data', res.data)
                    res.data.createdAt = dayjs(res.data.createdAt).locale('zh-cn').format('YYYY/MM/DD/HH:mm')
                    resolve(res)
                }).catch(res=>{
                console.log(reject(res))
            })
        })
    }

}