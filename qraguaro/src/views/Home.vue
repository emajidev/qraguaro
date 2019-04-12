<template>
  <div class="home">
    <table>
       <td  valign="top" class="z-pm" id="sidebar">
        <div id="brand" >
            <img class="logo" src="qraccon.png" alt="">
        </div>
        <div id="menu">
            <input id="search" type="text" placeholder="Buscar">
            <ul id="menu-content">
                <li> <router-link to ="/" class="Inicio">Inicio</router-link> </li>
                <li> <router-link to ="/scan" class="Inicio">Scan</router-link> </li>
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

<script>
export default {
  name: 'home',
  components: {
   
  }
}
</script>