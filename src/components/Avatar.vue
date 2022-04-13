<template>
  <div>
    <span>{{slug}}</span>
    <h3>{{username}}</h3>
  </div>
</template>

<script>
import {mapGetters,mapActions} from 'vuex'

export default {
  data() {
    return {}
  },
  created() {
    this.setUser()
  },
  methods: {
    ...mapActions({
      setUser: 'checkLogin'
    })
  },
    computed: {
      ...mapGetters([
        'username',
        'slug'
      ]),

      displayName() {
        return this.username
      }
    },
}
</script>

<style scoped>
span{
  display: inline-block;
  width: 30px;
  height: 30px;
  text-align: center;
  line-height: 32px;
  border-radius: 50%;
  background: #c6f88d;
  color: #cccccc;
  text-shadow: 1px 0 1px #795c19;
  text-transform: uppercase;
  font-size: 18px;
  margin: 16px 0 32px 16px;
}
h3{
  display: inline-block;
  padding-left: 8px;
  color: #cccccc;
  font-weight: 400;
}
</style>