<template>
  <div id="login">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="main"></div>
          <div class="form">
            <h3 @click="showRegister">注册</h3>
            <transition name="slide">
              <div :class="{show:isShowRegister}" class="register">
                <input type="text" v-model="register.username" placeholder="用户名">
                <input type="password" v-model="register.password" @keyup.enter="onRegister" placeholder="密码">
                <p :class="{error:register.isError}">{{register.notice}}</p>
                <div class="button" @click="onRegister">注册</div>
              </div>
            </transition>
            <h3 @click="showLogin">登录</h3>
            <transition name="slide">
              <div :class="{show:isShowLogin}" class="login">
                <input type="text" v-model="login.username" placeholder="输入用户名">
                <input type="password" v-model="login.password" @keyup.enter="onLogin" placeholder="密码">
                <p :class="{error:login.isError}">{{login.notice}}</p>
                <div class="button" @click="onLogin">登录</div>
              </div>
            </transition>
            <div v-show="isShowLogin" class="login">
              <input type="text" v-model="login.username" placeholder="输入用户名">
              <input type="password" v-model="login.password" placeholder="密码">
              <p :class="{error:login.isError}">{{login.notice}}</p>
              <div class="button" @click="onLogin">登录</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions} from 'vuex'

export default {
  name:'Login',
  data(){
    return{
      isShowLogin:true,
      isShowRegister:false,
      login:{
        username:'',
        password:'',
        notice:'输入用户名和密码',
        isError:false
      },
      register: {
        username: '',
        password: '',
        notice: '创建账户后，请记住用户名和密码',
        isError: false
      }
    }
  },
  methods:{
    ...mapActions({
      loginUser:'login',
      registerUser:'register',
    }),
    showLogin(){
      this.isShowLogin = true
      this.isShowRegister = false
    },
    showRegister(){
      this.isShowRegister = true
      this.isShowLogin = false
    },
    onRegister(){
      let result1 = this.validUsername(this.register.username)
      if(!result1.isValid){
        this.register.isError = true
        this.register.notice = result1.notice
        return
      }
      let result2 = this.validPassword(this.register.password)
      if(!result2.isValid){
        this.register.isError = true
        this.register.notice = result2.notice
        return
      }

      console.log(`start register..., username: ${this.register.username},password:${this.register.password}`)
      // 接口封装成 API
      this.registerUser({username:this.register.username,password:this.register.password})
        .then(() =>{
          this.register.isError = false
          this.register.notice =''
          // Bus.$emit('userInfo',{username:this.register.username})

          this.$router.push({path:'/notebooks'})
          }).catch(data => {
            this.register.isError =  true
            this.register.notice = data.msg
          })
    },

    onLogin(){
      let result3 = this.validUsername(this.login.username)
      if(!result3.isValid){
        this.login.isError = true
        this.login.notice = result3.notice
        return
      }
      let result4 = this.validPassword(this.login.password)
      if(!result4.isValid){
        this.login.isError = true
        this.login.notice = result4.notice
        return
      }

      console.log(`start login..., username: ${this.login.username}, password: ${this.login.password}`)
      //封装接口
      this.loginUser({username:this.login.username,password:this.login.password})
          .then(()=>{
            this.login.isError = false
            this.login.notice = ''
            // Bus.$emit('userInfo',{ username:this.login.username }) // 触发用户信息事件

            this.$router.push({path:'/notebooks'}) // 登录成功后跳转至 笔记本列表页面
            console.log('start redirect...')
          }).catch(data =>{ // 因为这里是 箭头函数，所以这里的 this 和 外面的 this 是一致的
            this.login.isError = true
            this.login.notice = data.msg
            })
    },
    validUsername(username){
      return{
        isValid:/^[a-zA-Z_0-9\u4e00-\u9fa5]{3,9}$/.test(username),
        notice:'用户名要求3~15个英文、数字、下划线、中文字符'
      }
    },
    validPassword(password){
      return{
        isValid:/^.{6,16}$/.test(password),
        notice:'密码长度要求6~16个字符'
      }
    }

  }
}
</script>

<style lang="less">
.modal-mask{
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,.7);
  display: table;
  transition: opacity .3s ease;
}

.modal-wrapper{
  display: table-cell;
  vertical-align: middle;
}

.modal-container{
  width: 800px;
  height: 500px;
  margin: 0 auto;
  background: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0,0,0.33);
  transition: all .3s ease;
  font-family: Helvetica,Arial,sans-serif;
  display: flex;
}

.main{
  flex: 1;
  background: url(../assets/loginBackground.jpg) center center no-repeat;
  background-size: cover;
}

.form{
  width: 270px;
  border-left: 1px solid #ccc;
  overflow: hidden;

  h3{
    padding: 10px 20px;
    margin-top: -1px;
    font-weight: normal;
    font-size: 16px;
    border-top: 1px solid #eee;
    cursor: pointer;

    &:nth-of-type(2){
      border-bottom: 1px solid #eee;
    }
  }

  .button{
    background: #1f1f1f;
    height: 36px;
    line-height: 36px;
    text-align: center;
    font-weight: bold;
    color: #fff;
    border-radius: 4px;
    margin-top: 18px;
    cursor: pointer;
  }

  .login,.register{
    padding: 0 20px;
    border-top: 1px solid #eee;
    height: 0;
    overflow: hidden;
    transition: height .4s;

    &.show{
      height: 193px;
    }

    input{
      display: block;
      width: 100%;
      height: 35px;
      line-height: 35px;
      padding: 0 6px;
      border-radius: 4px;
      border: 1px solid #ccc;
      outline: none;
      font-size: 14px;
      margin-top: 10px;
    }
    input:focus{
      border: 2px solid #1f1f1f;
    }
    p{
      font-size: 12px;
      margin-top: 10px;
      color: #444;
    }
    .error{
      color: red;
    }
  }
  .login{
    border-top: 0;
  }
}

</style>