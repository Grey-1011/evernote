<template>
  <div>
    <span>{{slug}}</span>
    <h3>{{username}}</h3>
  </div>
</template>

<script>
import Auth from '@/apis/auth'
import Bus from '@/helpers/bus'

export default {
  data(){
    return {
        username:'Not login',
    }
  },
  created() {
    Bus.$on('userInfo',user =>{
      this.username = user.username
    })
      Auth.getInfo()
          .then(res =>{
            console.log(res)
            if(res.isLogin){
                this.username = res.data.username
            }
          })
  },
  computed:{
    slug(){
      return this.username.charAt(0)
    },
    displayName(){
      return this.username
    }
  }
}
</script>

<style scoped>
span{
  display: inline-block;
  width: 30px;
  height: 30px;
  text-align: center;
  line-height: 32px;
  border-radius: 50%;
  background: #c6f88d;
  color: #fff;
  text-shadow: 1px 0 1px #795c19;
  font-weight: bold;
  text-transform: uppercase;
  font-size: 18px;
  margin: 16px 0 24px 16px;
}
h3{
  display: inline-block;
  padding-left: 8px;
  color: #ffffff;
}
</style>