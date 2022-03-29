<template>
  <div id="sidebar">
    <avatar/>
    <div class="icons">
      <router-link to="/note/1"><i class="iconfont icon-notePads"></i>Notepads</router-link>
      <router-link to="/notebooks"><i class="iconfont icon-notes"></i>All notes</router-link>
      <router-link to="/trash/2"><i class="iconfont icon-Trash"></i>Trash</router-link>
    </div>
    <div class="logout" @click="onLogout">
      <i class="iconfont icon-logout"></i>
    </div>
  </div>
</template>

<script>
import Avatar from '@/components/Avatar'
export default {
  components: {Avatar}
}
</script>

<style lang="less" scoped>
#sidebar {
  position: relative;
  width: 232px;
  //text-align: center;
  background: #1f1f1f;

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
    //text-align: left;
    cursor: pointer;
    //margin-left: 16px;
  }
}
</style>