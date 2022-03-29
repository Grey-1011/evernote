<template>
  <div id="notebook-list">
    <h1>{{message}}</h1>
    <ul>
      <li><router-link to="/note/1">笔记本1</router-link></li>
      <li><router-link to="/note/2">笔记本2</router-link></li>
    </ul>
  </div>
</template>

<script>
export default {
  name:'Notebooks',
  data(){
    return{
      message:'notebooks page'
    }
  }

}
</script>

<style scoped>
h1{
  color: #2c3e50;
}
</style>