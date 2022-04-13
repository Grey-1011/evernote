<template>
  <div class="note-sidebar">
    <el-input
        class="input"
        placeholder="Add new note"
        prefix-icon="el-icon-plus"
        @change="onAddNote"
        v-model="input">
    </el-input>

    <el-dropdown class="notebook-title" @command="handleCommand">
      <span class="el-dropdown-link">
        {{currentBook.title}}<i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown" class="menu">
        <el-dropdown-item v-for="notebook in notebooks" :key="notebook.id" :command="notebook.id">{{notebook.title}}</el-dropdown-item>
        <el-dropdown-item command="trash" divided>回收站</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>

    <ul class="notes">
      <li v-for="note in notes" :key="note.id">
        <router-link class="router-link" :to="`/note?noteId=${note.id}&notebookId=${currentBook.id}`">
          <span class="title">{{note.title}}</span>
<!--          <span class="create-time">{{note.createdAt}}</span>-->
          <span class="date">{{note.updatedAt}}</span>
        </router-link>
      </li>
    </ul>

  </div>
</template>

<script>

import {mapGetters,mapActions,mapMutations} from 'vuex'


export default{
  created() {
    this.getNotebooks()
        .then(()=>{
          // this.$store.commit('setCurrentBook',{currentBookId:this.$route.query.notebookId})
          this.setCurrentBook({currentBookId:this.$route.query.notebookId})
          if(this.currentBook.id) return this.getNotes({notebookId:this.currentBook.id})
        }).then(()=>{
          // this.$store.commit('setCurrentNote',{currentNoteId:this.$route.query.noteId
          this.setCurrentNote({currentNoteId:this.$route.query.noteId})
          this.$router.replace({
            path:'/note',
            query:{
              noteId:this.currentNote.id,
              notebookId:this.currentBook.id
            }
          })
        })
  },
  data(){
    return{
      input:''
    }
  },
  computed:{
    ...mapGetters([
        'notebooks',
        'notes',
        'currentBook',
        'currentNote',
    ])
  },
  methods:{
    ...mapMutations([
        'setCurrentBook',
        'setCurrentNote'
    ]),
    ...mapActions([
        'getNotebooks',
        'getNotes',
        'addNote'
    ]),
    handleCommand(notebookId){
      if(notebookId === 'trash'){
        return this.$router.push({path:'/trash'})
      }
      this.$store.commit('setCurrentBook',{currentBookId:notebookId})
      this.getNotes({notebookId}).then(()=> {
        this.setCurrentNote()
        this.$router.replace({
          path: '/note',
          query: {
            noteId: this.currentNote.id,
            notebookId: this.currentBook.id
          }
        })
      })
      // Notes.getAll({notebookId})
      //     .then(res=>{
      //       this.notes = res.data
      //       this.$emit('update:notes',this.notes)
      //     })
    },
    onAddNote(){
      this.addNote({notebookId:this.currentBook.id,title:this.input})
        .then(() =>{
          // console.log(res)
          // this.notes.unshift(res.data)
          this.input = ''
          // Message.success(res.data)
        })
    }
  }
}
</script>

<style lang="less" scoped>
@import url(../assets/css/note-siderbar);
</style>