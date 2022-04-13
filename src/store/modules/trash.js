import Trash from '@/apis/trash'
import {Message} from 'element-ui'

const state = {
    trashNotes:null,
    currentTrashNoteId:null,
}

const getters = {
    trashNotes:state => state.trashNotes || [],

    currentTrashNote:(state,getters)=> {
        if (!state.currentTrashNoteId) return getters.trashNotes[0] || {}
        return state.trashNotes.find(note => note.id === parseInt(state.currentTrashNoteId)) || {}
    },

    belongTo:(state,getters,rootState,rootGetters)=>{
        let notebook = rootGetters.notebooks.find(notebook => notebook.id === parseInt(getters.currentTrashNote.notebookId))||{}
        return notebook.title || ''
    }
}

const mutations = {
    setTrashNotes(state,payload){
        state.trashNotes = payload.trashNotes
    },
    // addTrashNote(state,payload){
    //     setTrashNotes.unshift(payload.note)
    // },
    deleteTrashNote(state,payload){
        state.trashNotes = state.trashNotes.filter(note => note.id !== payload.noteId)
    },
    setCurrentTrashNote(state,payload={}){
        state.currentTrashNoteId = payload.currentTrashNoteId
    }
}

const actions = {
    getTrashNotes({commit}){
        return Trash.getAll().then(res=>{
            commit('setTrashNotes',{trashNotes:res.data})
        })
    },
    deleteTrashNote({commit}, {noteId}) {
        return Trash.deleteNote({noteId}).then(res=>{
            commit('deleteTrashNote',{noteId})
            Message.success(res.msg)
        })
    },
    revertTrashNote({commit},{noteId}){
        return Trash.revertNote({noteId}).then(res=>{
            commit('deleteTrashNote',{noteId})
            Message.success(res.msg)
        })
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}