<template>
  <div>
    <span :title="user.username">{{slug}}</span>
    <h3>{{user.username}}</h3>
  </div>
</template>

<script>
export default {
  data(){
    return {
      user:{
        username:'Private'
      },
      slug:'P'
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