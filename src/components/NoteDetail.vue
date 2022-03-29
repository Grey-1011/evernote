<template>
  <div id="note-detail">
    <h1>{{message}}:{{$route.params.noteId}}</h1>
  </div>
</template>

<script>

export default {
  data(){
    return {
      message:'noteDetail page'
    }
  }
}
</script>

<style lang="scss" scoped>

</style>