<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style>
body{
    font-family: OpenSans, Verdana, Tahoma, Arial, "Trebuchet MS", "Times New Roman", Georgia, sans-serif, serif;
    background: #EDEDED;
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
li{
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