<template>
  <div id="note-detail">
    <h1>{{message}}:{{$route.params.noteId}}</h1>
  </div>
</template>

<script>
import Auth from '@/apis/auth'
export default {
  data(){
    return {
      message:'noteDetail page'
    }
  },
  created() {
    Auth.getInfo()
      .then(res => {
        if(!res.isLogin){
          this.$router.push({path:'/login'})
        }
      })
  }
}
</script>

<style lang="scss" scoped>

</style>