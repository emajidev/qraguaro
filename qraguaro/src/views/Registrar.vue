<template>
  <div id ="#Registrar">
      <!--  formulario de registro  -->
    <h2>Registrar</h2>
      <form action="">
        <input class="input-crud" type="text" placeholder="Nombre" v-model="name">
        <input class="input-crud" type="text" placeholder="Apellido" v-model="lastName">
        <input class="input-crud" type="text" placeholder="Cedula" v-model="cid">
        <input class="input-crud" type="text" placeholder="Telefono" v-model="telf">
        <input class="input-crud" type="email" placeholder="Correo" v-model="email">
        <input class="input-crud btn-send" value="Guardar" v-on:click="createUser ">
      </form> 
      <h2>Registrados </h2>
      <div id="list"  v-for = "(item , index) in  users" :key="item.id" >
        <ul ref="input">  
          <li class="list-inline"> <input :readonly="disableInput" class="blok-in"   type="text" :placeholder="item.name" v-model="item.lastNameU "  >  </li>
          <li class="list-inline"> <input :readonly="disableInput" class="blok-in"    type="text" :placeholder="item.lastName" v-model="item.cidU">  </li>
          <li class="list-inline"> <input :readonly="disableInput" class="blok-in"    type="text" :placeholder="item.cid" v-model="item.telfU">  </li>
          <li class="list-inline"> <input :readonly="disableInput" class="blok-in"     type="email" :placeholder="item.email" v-model="item.emailU">  </li>
          <li id="botones" class="list-inline"> 
            
              <button id="update"   v-on:click="onedit(index ,false )"  >Actualizar</button>
            <button id="save" v-on:click ="updateUser(index, item.id, item.lastNameU, item.cidU, item.telfU, item.emailU )" >Guardar</button>
    
    

          </li>   
          <li class="list-inline"> <button  v-on:click="deliteUser(item.id , index)" > Eliminar </button> </li>
        </ul>
      </div>
  </div>  
</template>


<script>
import io from 'socket.io-client';
import axios from 'axios'

export default {
  name: 'Registrar',
  components: {
    
  },
  
  data() {
    return {
      dialog: false,
      activada : false,
      placeholderValue:'watafaka',
      users:[],
      user: '',
      name:'',
      lastName:'',
      cid:'',
      telf:'',
      email:'',
      disableInput:true
      
    };
  },
  methods: {
    sendForm(){
        console.log(this.name);
        console.log(this.lastName);
        console.log(this.cid);
        console.log(this.telf);
        console.log(this.email);
        let usuario={
          name : this.name,
          lastname : this.lastName,
          cid : this.cid,
          telf : this.telf,
          email : this.email,
      }
      
    
    }, 
    onedit:function ( index ,onRead) {
      
      
      
      var ninputs = this.$refs.input[index].childNodes;
      ninputs.forEach(function(e){
        
          console.log(e.querySelector("#update")); 
        
        if(e.querySelector("#update")){
          console.log('actualizar');
          console.log( e.querySelector("#update").parentNode);
          var update = e.querySelector("#update");
          var save = e.querySelector("#save");
          update.style.display="none";
          save.style.display="inline-block";
          }  
        if(e.querySelector("input")){
          console.log('inputs');
          e.querySelector("input").readOnly=onRead;
          }
        });   
         
    },
 
   
    getUser: async function (){
      let vue = this;
      let res = await axios.get('http://10.0.32.44:3333/list');
      vue.users = res.data;
      console.log(res.data);
    },
    createUser: async function (){
    
      let user={
            name : this.name,
            lastName : this.lastName,
            cid : this.cid,
            telf : this.telf,
            email : this.email,
        }
      let res = await axios.post('http://10.0.32.44:3333/create-user', user)
      this.getUser();
      this.name  = '';
      this.lastName  = '';
      this.cid  = '';
      this.telf  = '';
      this.email  = '';
        
      console.log(res.data);
    },
    updateUser: async function(index,id, nameU,lastNameU,cidU,telfU,emailU) {
      console.log("la posicion es " ,index);
      this.activada = !this.activada;
      var ninputs = this.$refs.input[index].childNodes;
      ninputs.forEach(function(e){
        if(e.querySelector("#save")){
          console.log('guardado');
          console.log( e.querySelector("#save").parentNode);
          var save = e.querySelector("#save");
          var update = e.querySelector("#update");
          save.style.display="none";
          update.style.display="inline-block";
          } 
         
        if(e.querySelector("input")){
          console.log('inputs');
          e.querySelector("input").readOnly=true;
          }
        });   
      
      let userUpdate={
            id: id,
            name : nameU,
            lastName : lastNameU,
            cid : cidU,
            telf : telfU,
            email : emailU
        }
        
        console.log(userUpdate);
        let res = await axios.post('http://10.0.32.44:3333/update-user',userUpdate)
        console.log(res.data); 
      
    },
    deliteUser:async function (idEvent , index) {
      let idUser = {
        id: idEvent 
      }
       if(confirm("Do you really want to delete?")){
        let res = await axios.post('http://10.0.32.44:3333/delete-user', idUser)
        console.log(res.data);
        if (res.data.deleted){
        console.log('borrar');
        this.users.splice(index , 1);
        }
       }
      
      },
    },
   mounted() {
     this.getUser();
    },
};

</script>
<style scope>
#save{
  display: none;
}
</style>
