import Auth from '@/apis/auth'
import router from '@/router'

const state = {
    user:null
}

const getters = {
    username:state => state.user === null ? 'Not login' : state.user.username,
    slug:state => state.user === null ? 'N' : state.user.username.charAt(0)
}

const mutations = {
    setUser(state,payload){
        state.user = payload.user
    }
}

const actions = {
    login({commit},{username,password}){
        return Auth.login({username,password})
            .then(res =>{
                console.log(res)
                commit('setUser',{user:res.data})
            })
    },
    register({commit},{username,password}){
        return Auth.register({username,password})
            .then(res =>{
                console.log(res)
                commit('setUser',{user:res.data})
            })
    },
    checkLogin({commit,state},payload={path:'/'}){
        if(state.user !== null) return Promise.resolve()
        return Auth.getInfo()
            .then(res =>{
                if(!res.isLogin) {
                    // console.log('jump')
                    router.push(payload).then(r => console.log('checkLogin',r))
                }else{
                    commit('setUser',{user: res.data})
                }
            })
    },
    logout({commit},payload = {path:'/login'}){
        return Auth.logout()
            .then(() =>{
                commit('setUser',{user:null})
                router.push(payload).then(r => console.log('logout',r))
            })
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}