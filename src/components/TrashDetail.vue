<template>
  <div id="trash-detail">
    <h1>{{message}}:{{$route.params.noteId}}</h1>
  </div>
</template>

<script>
import Auth from '@/apis/auth'
export default {
  data(){
    return{
      message:'TrashDetail page'
    }
  },
  created() {
    Auth.getInfo()
      .then(res=>{
        if(!res.isLogin){
          this.$router.push({path:'/login'})
        }
      })
  }
}
</script>

<style lang="scss" scoped>

</style>