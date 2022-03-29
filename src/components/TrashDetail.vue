<template>
  <div id="trash-detail">
    <h1>{{message}}:{{$route.params.noteId}}</h1>
  </div>
</template>

<script>
export default {
  data(){
    return{
      message:'TrashDetail page'
    }
  }
}
</script>

<style lang="scss" scoped>

</style>