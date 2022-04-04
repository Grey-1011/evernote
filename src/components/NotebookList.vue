<template>
  <div class="detail" id="notebook-list">
    <header>
      <h3>All notes</h3>
      <a href="#" title="新增笔记本" @click.prevent="onCreate" class="btn"><i class="iconfont icon-plus"></i></a>
    </header>
    <main>
      <div class="layout">
        <div class="book-list">
          <router-link to="#" class="notebook" v-for="notebook in notebooks" :key="notebook.title">
            <div class="idea">
              <span class="iconfont icon-mark"></span>
              <span class="title">{{ notebook.title }}</span>
              <!--              <span>({{notebook.noteCounts}})</span>-->
              <span class="create-time">{{ notebook.createdAt }}</span>
            </div>
            <div class="edit">
              <span class="action" @click.stop.prevent="onEdit(notebook)">编辑</span>
              <span class="action" @click.stop.prevent="onDelete(notebook)">删除</span>
              <span class="date">{{ notebook.updatedAt }}</span>
            </div>
          </router-link>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import Auth from '@/apis/auth'
import Notebooks from '@/apis/notebooks.js'
import {friendlyDate} from '@/helpers/util'

//import dayjs from 'dayjs' // ES 2015
// dayjs().format()

export default {
  name: 'Notebooks',
  data() {
    return {
      notebooks: [],
    }
  },
  created() {
    Auth.getInfo()
        .then(res => {
          if (!res.isLogin) {
            this.$router.push({path: '/login'})
          }
          Notebooks.getAll()
              .then(res => {
                this.notebooks = res.data
              })
        })
  },
  methods: {
    onCreate() {
      this.$prompt('请输入笔记本标题', '新建笔记本', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /^.{1,30}$/,
        inputErrorMessage: '笔记本标题不能为空，且不能超过30个字符'
      })
          .then(({value}) => {
            return Notebooks.addNotebook({title: value})
                .then(res => {
                  res.data.updatedAt = friendlyDate(res.data.updatedAt)
                  this.notebooks.unshift(res.data)
                  this.$message({
                    type: 'success',
                    message: res.msg
                  })
                }).catch((res) => {
                  this.$message({
                    type: 'error',
                    message: res.msg
                  })
                })
          })
    },
    onEdit(notebook) {
      let title = ''
      this.$prompt('请输入笔记本标题', '修改笔记本', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /^.{1,30}$/,
        inputErrorMessage: '笔记本标题不能为空，且不能超过30个字符'
      })
          .then(({value}) => {
            title = value
            return Notebooks.updateNotebook(notebook.id,{title})
                .then(res => {
                  notebook.title = title
                  this.$message({
                    type: 'success',
                    message: res.msg
                  })
                }).catch((res) => {
                  this.$message({
                    type: 'error',
                    message: res.msg
                  })
                })
          })
    },
    onDelete(notebook) {
      this.$confirm('确认要删除笔记本吗?', '删除', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        return Notebooks.deleteNotebook(notebook.id)
            .then( res =>{
              this.notebooks.splice(this.notebooks.indexOf(notebook),1)
              this.$message({
                type: 'success',
                message: res.msg
              });
            }).catch((res) => {
              console.log('hhh')
              this.$message({
                type: 'error',
                message: res.msg
            });
        });
      })
    }
  }
}
</script>

<style lang="less" scoped>

@import url(../assets/css/notebook-list.less);
</style>