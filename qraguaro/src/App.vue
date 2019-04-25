<template>
  <div id="app">
       <table>
       <td  valign="top" class="z-pm" id="sidebar">
        <div id="brand" >
            <img class="logo" src="qraccon.png" alt="">
        </div>
        <div id="menu">
            <input id="search" type="text" placeholder="Buscar">
            <ul id="menu-content">
                <li> <router-link to ="/" class="Escáner">Escáner</router-link> </li>
                <li> <router-link to ="/Listado" class="Inicio">Listado</router-link> </li>
                <li> <router-link to ="/registrar" class="Inicio">Registrar</router-link> </li>
                <li> <router-link to ="/about" class="Inicio">Lista</router-link> </li>
                
            </ul>
        </div>
    </td>
    <td valign="top" class="z-pm center" >
   
		<div class="z-pm" id="welcomebar" ><h5 class="welcome">B i e n v e n i d o</h5></div>	
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
        background: #EDEDED;
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
    ul{
        display: block;
        padding: 0;
        margin: 0;
    }
    li,a{
        text-decoration: none;
        list-style: none;
        color: #e1ffff;
        line-height:35px;
        cursor: pointer;
        padding-left: 10px;
    }
    input{
        font-family: OpenSans, Verdana, Arial, Helvetica, sans-serif;
        font-size: 12px;
        
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
    .blok-in{
    background: none;
    border: none;
    color: #23282E;
    font-size:12px;
    }
    .list-inline{
        display:inline;
    }
    .logo{
    width: 100%;
    }
    .welcome{
    padding-left: 5px; padding-top: 12px;
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
        background:transparent; width:175px; height:100%;background:#23282E;
    }

    #welcomebar{
        background: #2E353D;
        height: 35px;
        width: 100%;
        color: #ccc;
        font-size: 18px;
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
        display: flex;
        justify-content: center;
        align-items: center;
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
</style>