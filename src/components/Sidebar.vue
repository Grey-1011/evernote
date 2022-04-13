<template>
  <div id="sidebar">
      <div class="mask">
        <avatar/>
        <div class="icons">
          <router-link to="/note"><i class="iconfont icon-notePads"></i>Notepads</router-link>
          <router-link to="/notebooks"><i class="iconfont icon-notes"></i>All notes</router-link>
          <router-link to="/trash"><i class="iconfont icon-Trash"></i>Trash</router-link>
        </div>
        <div class="logout">
          <i class="iconfont icon-logout" @click="onLogout"></i>
        </div>
      </div>
  </div>
</template>

<script>
import Avatar from '@/components/Avatar'
import {mapActions} from 'vuex'

export default {
  components: {Avatar},
  data() {
    return {}
  },
  methods: {
    ...mapActions(['logout']),
    onLogout() {
      this.logout({ path:'/login' })
      // console.log('logout')
      // Auth.logout().then(data => {
      //   Bus.$emit('userInfo', {username: Avatar.data().username})
      //   this.$router.push({path: '/login'})
      //   console.log(data)
      // })
    }
  }
}
</script>

<style lang="less" scoped>
#sidebar{
  display: flex;
  position: relative;
}
.mask {
  position: relative;
  width: 232px;
  background: #1a1a1a;
  .icons {
    //text-align: left;
  }

  .icons a {
    padding: 8px 0;
    display: block;
    color: #fff;
  }

  .icons .router-link-active {
    background: #5e6266;
  }

  .iconfont {
    padding-left: 40px;
    letter-spacing: 8px;
    color: #fff;
  }

  .logout {
    position: absolute;
    bottom: 20px;
    width: 100%;
    cursor: pointer;
  }
}
.appear {
  position: absolute;
  top: 24px;
  right: 8px;
  cursor: pointer;
  color: #fff;
  z-index: 10;
}
.show{
  position: absolute;
  top: 50%;
  z-index: 10;
  color: #1f1f1f;
  cursor: pointer;
}

.side-enter-active, .side-leave-active {
  transition: all 1s ease;
}

.side-enter, .side-leave-to {
  transform: translateX(-200px);
  transition: all .4s ease;
  //opacity: 0;
}
</style>