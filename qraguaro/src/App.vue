<template>
  <div id="app">
       <table>
       <td  valign="top" class="z-pm" id="sidebar">
        <div id="brand" >
            <p>Qraguaro</p>
            <div class="logo" > </div>
            <div id="clock">
                <digital-clock :blink="true" :displaySeconds="true" :twelveHour="true"  />
            </div>
        </div>
        <div id="menu">
            <!-- <input id="search" type="text" placeholder="Buscar"> -->
           <router-link to ="/registrar" class="Inicio"> <button id="btn-login"> ingresar</button></router-link>    
        </div>
        <div class="subtitle">
             <h5 >Entradas</h5>
        </div>
        <div id="showAccess"></div>
    </td>
    <td valign="top" class="z-pm center" >
   
		<div class="z-pm" id="welcomebar" >
            <ul id="menu-content">
                <li> <router-link to ="/" class="Escáner">Escáner</router-link> </li>
                <li> <router-link to ="/Listado" class="Inicio">Listado</router-link> </li>
                <li> <router-link to ="/registrar" class="Inicio">Registrar</router-link> </li>
                <li> <router-link to ="/about" class="Inicio">Ayuda</router-link> </li>    
            </ul>
        
         <!-- <button id="btn-logut" v-on:click ="logout()" >salir</button> -->
        </div>	
        <div class="content">
       <!--    Visualizar los routers o enlaces -->
          <router-view></router-view>
   
        </div>
       
    
   



    </td>
    </table>

  </div>
</template>

<style>
    body{
        font-family: OpenSans, Verdana, Tahoma, Arial, "Trebuchet MS", "Times New Roman", Georgia, sans-serif, serif;
        background: rgb(27, 30, 34);
    }
    a{
        text-decoration: none;
        margin:0;
    padding:0;
    font-size:100%;
    vertical-align:baseline;
    background:transparent;
    color:rgb(29, 126, 113)
    }
    a:hover{
        color: none;
        text-decoration:none;
        
    }
    table{
        width:100% ;
        height:100%;
        position: absolute;
        top: 0;left: 0;
        border: 0;
        border-spacing: 0;
        border-collapse: collapse;
        
    }
    h5{
    font-weight: 500;
    }
    #clock{
        margin-top: 20px;
        text-align: center;
        color: aquamarine;
        font-size: 20px;
    }
    ul{
        display: block;
        padding: 0;
        margin: 0;
    }
    li,a{
        display: inline;
        text-decoration: none;
        list-style: none;
        color: #e1ffff;
        line-height:35px;
        cursor: pointer;
        padding-left: 10px;
        padding: 0 10px 0 10px;
    }
    input{
        font-family: OpenSans, Verdana, Arial, Helvetica, sans-serif;
        font-size: 12px;
        
    }
    #btn-login{
        background: none;
        border: 1px white solid;
        border-radius: 8px;
        color: white;
        margin: 20px 0 50px 0;
        padding: 5px;
        width: 80%;
        outline:none;
        cursor: pointer;
      
    }
    .btn-send{
        border: none;
        background: rgb(112, 252, 112);
        width: 100px;
        text-align: center;
        margin-left: 15px;
        height: 25px;
        font-weight: bold;
        border-radius: 5px;
        font-family: Verdana, Geneva, Tahoma, sans-serif;
        cursor: pointer;
        
    }
    .block-in{
    background: none;
    border: none;
    color: #23282E;
    font-size:12px;
    }
    .list-inline{
        display:inline;
    }
    .logo{
    margin-top: 20px;
    width: 100%;
    height: 120px;
    background-image: url("assets/images/logo.png");
    background-repeat: no-repeat;
    background-size: 50%; 
    background-position: center; 
    }
    #brand > p{
        text-align: center;
        color: aqua;
        letter-spacing: 10px;
        font-size: 15px;
        background: #2E353D;
        margin: 0;
        height: 35px;
        padding: 8px;
    }
    .welcome{
    padding-left: 5px; padding-top: 12px;
    display: inline;
    }
    #btn-logut{
        position: absolute;
        right: 0;
        display: inline;
        
    }
    #date{
    text-align:center; color: rgb(2, 86, 134)
    }
    #interrogation{
    color: rgba(240, 248, 255, 0.5)
    }
    .z-pm ,h5{
        padding: 0; margin: 0;
    }
    #sidebar{
        background:transparent; width:250px; height:100%;background:#23282E;
    }

    #welcomebar{
        background: #2E353D;
        height: 35px;
        width: 100%;
        color: #ccc;
        font-size: 14px;
    }
    #search{
        width: 90%;
        height: 20px;
        margin: 3%;
        border: none;
        padding-left: 5px;
        border-radius: 2px;
    }
    #menu{
        background:#23282E;
        top: 0;
        left: 0;
        margin: 0;
        padding: 0;
        width: 100%;
    
        position: relative;
        font-family: OpenSans, Verdana;
        font-size: 12px;
        font-weight: 400;
        text-align: center;
       
    }
    .subtitle{
        background:#5d6b6e36;
        border-radius: 0 20px 0 0;
        width: 100px;
        height: 50px;
        color: #bbbbbb;
        padding: 20px;
    }
    #showAccess{
        background: #5d6b6e36;
        width: 100%;
        height: 70%;
    }
    .qrscam{
        float: left;
        width: 300px;
        height: 300px;
        background: greenyellow;
        box-shadow:5px 5px 15px rgba(35, 40, 46, 0.171);
        margin: 50px 5px 0 ;
    }
    .userIdPhoto{
        float: left;
        width: 200px;
        height: 300px;
        background: rgb(255, 255, 255);
        box-shadow:5px 5px 15px rgba(35, 40, 46, 0.171);
        margin: 50px 5px 0 ;
    }
    #p-profile{
        width: 100px;
        height: 100px;
        border-radius: 50px;
        background: rgb(58, 64, 71);
        margin: 10px auto;
    }
    .t-profile{
        width: 80%;
        height: 15px;
        border-radius: 5px;
        background: rgb(58, 64, 71);
        margin: auto;
        margin-top: 18px;
    }
    .content{
        position: relative;
        width: 100%;
        height: 80%;
        display: flex;
        justify-content: center;
       
    }
    .btn-index{
        float: left;
        width: 100px;
        height: 100px;
        background: rgba(59, 185, 1, 0.623);
        box-shadow:5px 5px 15px rgba(35, 40, 46, 0.171);
        
        border-radius: 8px;
        margin: 10px 50px 0 ;
    }
    .btn-img{
        width: 70%;
        height: 70%;
    }
    body{
        -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none; 
    }
</style>

<script>
import DigitalClock from "vue-digital-clock";
import axios from 'axios'
export default {
  name: 'app',
  data:{
      hour:0,
      minutes:0,
      seconds:0

  },
  components: {
   DigitalClock
  },
  methods: {
    logout() {
      console.log("SALISTE DE LA SESSION")
       let vue = this;
        console.log(this.$session.get('admin'))
        let tokenout = {
            token : this.$session.get('admin')
        }
        axios.post('http://10.0.32.44:3333/logout',tokenout )
        .then(function (response) {
            if(response.data.deleted){
                vue.$session.destroy()
                vue.$router.push('/')
                console.log("Destruido")
            }   
                console.log(response.data);
              })
              .catch(function(error){
                console.log(error);
              });    
      } 
  }
}
</script>