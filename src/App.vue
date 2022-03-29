<template>
  <div id="app">
    <Sidebar/>
    <router-view/>
  </div>
</template>

<script>
import Sidebar from '@/components/Sidebar'
export default {
  name:'app',
  components: {Sidebar}
}
</script>

<style>
@import '//at.alicdn.com/t/font_3287615_j457c90xc8s.css';

*{
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html,body, #app {
  height: 100%;
}
body{
  font-size: 14px;
  background: #eee;
  -moz-osx-font-smoothing: grayscale;
}
a{
  text-decoration: none;
  color: #444;
}
ul,ol{
  list-style: none;
}
/*.btn{*/
/*  color: #666;*/
/*  font-size: 12px;*/
/*  padding: 2px 4px;*/
/*  background: #fff;*/
/*  box-shadow: 0 0 2px 0 #ccc;*/
/*  border: none;*/
/*  cursor: pointer;*/
/*  display: inline-block;*/
/*}*/

#app{
  display: flex;
  align-items: stretch;
}


</style>