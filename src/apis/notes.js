import request from '@/helpers/request'
import {friendlyDate} from '@/helpers/util'
import dayjs from 'dayjs'

const URL = {
    GET:'/notes/from/:notebookId',
    ADD:'/notes/to/:notebookId',
    UPDATE: '/notes/:noteId',
    DELETE: '/notes/:noteId'
}

export default {
    getAll({notebookId}) {
        return new Promise((resolve,reject)=>{
            request(URL.GET.replace(':notebookId',notebookId))
                .then(res => {
                    res.data = res.data.map(note=>{
                        note.createdAt = dayjs(note.createdAt).locale('zh-cn').format('YYYY/MM/DD/HH:mm')
                        note.updatedAt = friendlyDate(note.updatedAt)
                        return note
                    }).sort((note1,note2)=>{
                        return note1.updatedAt < note2.updatedAt
                    })
                    resolve(res)
                }).catch(err =>{
                    reject(err)
                })
        })
    },
    updateNote({ noteId },{ title,content}){
        return request(URL.UPDATE.replace(':noteId',noteId),'PATCH',{title,content})
    },
    deleteNote({noteId}) {
        return request(URL.DELETE.replace(':noteId',noteId),'DELETE')
    },
    addNote({notebookId},{title = '',content=''} = {title:'',content:''}) {
        return new Promise((resolve,reject)=>{
            request(URL.ADD.replace(':notebookId',notebookId),'POST',{title,content})
                .then(res=>{
                    res.data.updatedAt = friendlyDate(res.data.updatedAt)
                    res.data.createdAt = dayjs(res.data.createdAt).locale('zh-cn').format('YYYY/MM/DD/HH:mm')
                    resolve(res)
                }).catch(err=>{
                    reject(err)
            })
        })
    }
}