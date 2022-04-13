<template>
  <div id="trash">
    <div class="trash-sidebar">
      <h3 class="trash-title">回收站</h3>
      <div class="count">{{trashNotes.length}} notes</div>
<!--      <div class="item">-->
<!--        <div>删除时间</div>-->
<!--        <div>标题</div>-->
<!--      </div>-->
      <ul class="notes">
        <li v-for="note in trashNotes" :key="note">
          <router-link class="router-link" :to="`/trash?noteId=${note.id}`">
            <div class="title">{{ note.title }}</div>
            <div class="date">删除时间：{{ note.updatedAt }}</div>
          </router-link>
        </li>
      </ul>
    </div>

    <div class="trash-detail">
      <div class="note-bar" v-if="true">
        <span>创建日期：{{ currentTrashNote.createdAt }}</span>
        <span> | </span>
        <span>更新日期: {{ currentTrashNote.updatedAt }}</span>
        <span> | </span>
        <span>所属笔记本：{{ belongTo }}</span>

        <a class="btn action" @click="onRevert">恢复</a>
        <a class="btn action" @click="onDelete">彻底删除</a>
      </div>
      <div class="note-title">
        <span>{{ currentTrashNote.title }}</span>
      </div>
      <div class="editor">
        <div class="preview markdown-body" v-html="compiledMarkdown"></div>
      </div>
    </div>
  </div>
</template>

<script>

import MarkdownIt from 'markdown-it'
import {mapGetters,mapMutations,mapActions} from 'vuex'

let md = new MarkdownIt()

export default {
  data() {
    return {
      curTrashNoteContent:''
    }
  },
  created() {
    this.checkLogin({path:'/login'})
    this.getNotebooks()
    this.getTrashNotes()
        .then(()=>{
          this.setCurrentTrashNote({currentTrashNoteId:this.$route.query.noteId})
          this.$router.replace({
            path:'/trash',
            query:{noteId:this.currentTrashNote.id}
          })
        })
  },
  computed: {
    ...mapGetters([
        'trashNotes',
        'currentTrashNote',
        'belongTo'
    ]),
    compiledMarkdown() {
      return md.render(this.currentTrashNote.content || '')
    }
  },
  methods: {
    ...mapMutations([
        'setCurrentTrashNote'
    ]),
    ...mapActions([
        'checkLogin',
        'deleteTrashNote',
        'revertTrashNote',
        'getTrashNotes',
        'getNotebooks'
    ]),
    onRevert() {
      this.revertTrashNote({noteId:this.currentTrashNote.id})
        .then(()=>{
          this.setCurrentTrashNote()
          this.$router.replace({
            path:'/trash',
            query:{noteId:this.currentTrashNote.id}
          })
        })
    },
    onDelete() {
      this.$confirm('删除后将无法恢复','确认删除?',{
        confirmButtonClass:'确定',
        cancelButtonClass:'取消',
        type:'warning'
      }).then(()=>{
        return this.deleteTrashNote({noteId:this.currentTrashNote.id})
      }).then(()=>{
              this.setCurrentTrashNote()
              this.$router.replace({
                  path:'/trash',
                  query:{noteId:this.currentTrashNote.id}
        })
      })
    }
  },
  beforeRouteUpdate(to, from, next) {
    this.setCurrentTrashNote({currentTrashNoteId:to.query.noteId})
    next()
  }
}
</script>

<style lang="less" scoped>
@import url(../assets/css/trash-siderbar);
@import url(../assets/css/trash-detail);
</style>