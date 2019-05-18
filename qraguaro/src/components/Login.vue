<template >
<div id="loginBackground" >
  <div id="login" v-click-outside="outside">
    <h2>Login</h2>
      <form action="">
          <input type="text" placeholder="Usuario" v-model="username" >
          <input type="text" placeholder="Contraseña" v-model="password">
      </form>
      <button v-on:click ="login()" >Entrar</button>
      
  </div>
  
</div>
</template>

<script>

import axios from 'axios'
export default {
    
    data(){
     return{
        clickOutside: 0,
        username:'',
        password: '',
        EnterLog:false,
        }; 
    },
    directives:{
     'click-outside': {
      bind: function(el, binding, vNode) {
        // Provided expression must evaluate to a function.
        if (typeof binding.value !== 'function') {
        	const compName = vNode.context.name
          let warn = `[Vue-click-outside:] provided expression '${binding.expression}' is not a function, but has to be`
          if (compName) { warn += `Found in component '${compName}'` }
          
          console.warn(warn)
        }
        // Define Handler and cache it on the element
        const bubble = binding.modifiers.bubble
        const handler = (e) => {
          if (bubble || (!el.contains(e.target) && el !== e.target)) {
          	binding.value(e)
          }
        }
        el.__vueClickOutside__ = handler

        // add Event Listeners
        document.addEventListener('click', handler)
			},
      
      unbind: function(el, binding) {
        // Remove Event Listeners
        document.removeEventListener('click', el.__vueClickOutside__)
        el.__vueClickOutside__ = null

      }
    }
    },
    methods: {

     outside: function(e) {
       var self = this;
    	this.clickOutside += 1
        console.log('clicked outside!')
      if (this.clickOutside > 1){
        this.clickOutside = 0;
        self.$router.push('/')
      }
        
      },
        login: function () {
           let self = this;
            let login = {
                username : this.username,
                password : this.password
            }
            axios.post('http://10.0.32.44:3333/login',login)
              .then(function (response) {
                self.$router.push('/')
                if (response.status === 200 && 'token' in response.data) {
                  vue.$session.start()
                  vue.$session.set('admin', response.data.token)
                  // Vue.http.headers.common['Authorization'] = 'Bearer ' + response.body.token
                  console.log('inicio de sesion', response.data.token);
                  
                }
              })
              .catch(function(error){
                console.log(error);
              });
        }
    }
}
</script>

<style>
#pre{
  color: aliceblue;
}
#loginBackground{
 
   position: fixed;
   display: flex;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  text-align: center;
  background: rgba(0, 0, 0, 0.616);
  display: flex;
  justify-content: center;
  align-items: center;
  
}
#login{
  position: absolute;
  top: 30%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  text-align: center;
  border: 1px rgba(127, 255, 212, 0.664) solid;
  border-radius: 8px;
  padding: 20px 40px 0 40px;
 
}
input{
  display: block;
  margin-top: 10px;
  outline: none;
  background: none;
  border: 1px aquamarine solid;
  border-radius: 8px;
  height: 30px;
  color: aquamarine;
  padding-left: 10px;
}
button{
      background: none;
        border: 1px white solid;
        border-radius: 8px;
        color: white;
        margin: 20px 0 50px 0;
        padding: 5px;
        width: 100%;
        outline:none;
        cursor: pointer;
}
h2{
  color: aquamarine;
  
}
</style>
