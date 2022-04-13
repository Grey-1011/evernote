<template>
  <div id="note" class="detail">
    <Note-sidebar :notes.sync="notes"/>
    <div class="note-detail">
      <div class="note-empty" v-show="!currentNote.id">请选择笔记</div>
      <div class="note-detail-ct" v-show="currentNote.id">
      <div class="note-bar">
          <span>创建日期：{{currentNote.createdAt}}</span>
          <span>更新日期：{{currentNote.updatedAt}}</span>
          <span>{{statusText}}</span>
          <span class="iconfont icon-delete" @click="onDeleteNote"></span>
          <span class="iconfont icon-fullscreen" @click="isShowPreview=!isShowPreview"></span>
      </div>
      <div class="note-title">
        <input type="text" v-model="currentNote.title" @input="onUpdateNote" @keydown="statusText='正在输入...'" placeholder="输入标题"/>
      </div>
      <div class="editor">
        <codemirror ref="refresh" id="codemirror" placeholder="请在此输入内容..."
                    v-model="currentNote.content" :options="cmOptions"
                    v-show="!isShowPreview" @input="onUpdateNote"
                    @inputRead="statusText='正在输入...'"></codemirror>
        <div class="preview markdown-body" v-html="previewContent" v-show="isShowPreview"></div>
      </div>
      </div>
    </div>
  </div>
</template>

<script>
import NoteSidebar from '@/components/NoteSidebar'
import _ from 'lodash'
import { codemirror } from 'vue-codemirror'
import 'codemirror/lib/codemirror.css'
import 'codemirror/mode/markdown/markdown.js'
import 'codemirror/addon/edit/matchbrackets.js'
import 'codemirror/addon/edit/closebrackets.js'
import 'codemirror/addon/edit/closetag.js'
import 'codemirror/theme/elegant.css'
import {mapActions,mapMutations,mapGetters} from 'vuex'
import MarkdownIt from 'markdown-it'

let md = new MarkdownIt()

export default {
  components: {NoteSidebar,codemirror},
  data() {
    return {
      statusText:'未更新',
      isShowPreview:false,
      cmOptions:{
        smartIndent: false,
        electricChars: false,
        mode: 'text/x-markdown',
        theme: 'elegant',
        lineNumbers: false,
        line: true,
        autoCloseBrackets: true,
        matchBrackets: true,
        autoCloseTags:true,
        lineWrapping:true,
        extraKeys:{
          "Tab":function(cm){
            cm.replaceSelection("    ","end")
          }
        }
      }

    }
  },
  created() {
    this.checkLogin({path:'/login'})
  },
  computed:{
    ...mapGetters([
        'notes',
        'currentNote',
        'currentBook'
    ]),
    previewContent(){
      return md.render(this.currentNote.content || '')
    }
  },
  methods:{
    ...mapMutations([
        'setCurrentNote'
    ]),
    ...mapActions([
        'updateNote',
        'deleteNote',
        'checkLogin'
    ]),
    onUpdateNote:_.debounce(function (){
      if(!this.currentNote.id) return
      this.updateNote({noteId: this.currentNote.id,title:this.currentNote.title,content:this.currentNote.content})
        .then(() =>{
          this.statusText = '已保存'
        }).catch(()=>{
          this.statusText = '保存错误'
      })
      // console.log(this.currentNote)
    },2000),
    onDeleteNote(){
      this.deleteNote({noteId:this.currentNote.id})
        .then(()=>{
          // this.notes.splice(this.notes.indexOf(this.currentNote),1)
          this.$router.replace({path:'/note'})
        })
    }
  },
  beforeRouteUpdate(to,from,next){
    // console.log('beforeRouteUpdate')
    // console.log(to, from)
    this.setCurrentNote({currentNoteId:to.query.noteId})
    // 解决 codemirror 需要点一下才能正常显示的问题
    this.timer = setTimeout(()=>{
      this.$refs.refresh.codemirror.refresh()
    })
    // this.currentNote = this.notes.find(note => note.id == to.query.noteId) || {}
    next()
  },
  beforeDestroy() {
    clearTimeout(this.timer)
    this.timmer = null
  }

}
</script>

<style lang="less">
@import url(../assets/css/note-detail.less);
#note {
  display: flex;
  align-items: stretch;
  background: #fff;
  flex: 1;
}
</style>