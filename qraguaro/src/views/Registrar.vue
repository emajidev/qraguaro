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
          <li class="list-inline"><p>{{index}}</p></li>
          <li class="list-inline"> <input :readonly="disableInput" class="blok-in"   type="text" :placeholder="item.name" v-model="item.lastNameU "  >  </li>
          <li class="list-inline"> <input :readonly="disableInput" class="blok-in"    type="text" :placeholder="item.lastName" v-model="item.cidU">  </li>
          <li class="list-inline"> <input :readonly="disableInput" class="blok-in"    type="text" :placeholder="item.cid" v-model="item.telfU">  </li>
          <li class="list-inline"> <input :readonly="disableInput" class="blok-in"     type="email" :placeholder="item.email" v-model="item.emailU">  </li>
          
          <li id="botones" class="list-inline"> 
            
              <button id="update"   v-on:click="onedit(index ,false )"   >Actualizar</button>
            <button id="save" v-on:click ="confirmeSave(index)"  >Guardar</button>
            <template >
                <div class="confirm" >
                  <div class="box-confirm">
           <h5>Seguro que desea guardar los cambios?</h5>
           <button v-on:click ="cancel(index)" >No</button>
           <button v-on:click ="updateUser(index, item.id, item.lastNameU, item.cidU, item.telfU, item.emailU )"  >Si</button>
         </div>
         </div>
            </template>
        
          </li>   
          <li class="list-inline"> <button  v-on:click="deliteUser(item.id , index)" > Eliminar </button> </li>
        </ul>
       
      </div>
      
  </div>  
  
</template>


<script>
import io from 'socket.io-client';
import axios from 'axios'
import { async } from 'q';

export default {
  name: 'Registrar',
  components: {
    
  },
  
  data() {
    return {
      isEdit:false,
      confirm: false,
      value: null,
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
 

    onedit:function ( index ,onRead) {
      
      console.log("probar si es una array ", this.users);
      
      /* this.ArrayUser.push({
        isEdit:false,
      }) */
      
      console.log("el item es ", index);
      var ninputs = this.$refs.input[index].childNodes;
      ninputs.forEach(function(e){
        
         
        
        if(e.querySelector("#update")){
       
          var update = e.querySelector("#update");
          var save = e.querySelector("#save");
          update.style.display="none";
          save.style.display="inline-block";
          }  
        if(e.querySelector("input")){
          e.querySelector("input").readOnly=onRead;
          }
        });   
         
    },
 
   
    getUser: async function (){
      let vue = this;
      let res = await axios.get('http://10.0.32.44:3333/list');
      vue.users = res.data;
      let modificador = Object.entries(vue.users[0]);
      modificador.push({
        edit:false
      })
      console.log(modificador);
    },
    createUser: async function (){
      
      let user= {
            name : this.name,
            lastName : this.lastName,
            cid : this.cid,
            telf : this.telf,
            email : this.email,
            edit : false
            
      };
      let dataUser = (user)
      console.log("objeto enviado",user);
      let res = await axios.post('http://10.0.32.44:3333/create-user',user)
      this.getUser();
      this.name  = '';
      this.lastName  = '';
      this.cid  = '';
      this.telf  = '';
      this.email  = '';
      
      console.log(res.data);
 

    },
    confirmeSave(index){
      
      let isEdit = true;
      var ninputs = this.$refs.input[index].childNodes;
      ninputs.forEach(function(e){
        if(e.querySelector("#save")){
          console.log('guardado');
          console.log( e.querySelector("#save").parentNode);
          var save = e.querySelector("#save");
          var update = e.querySelector("#update");
          var confirm = e.querySelector(".confirm");
          save.style.display="none";
          confirm.style.display="flex";
          } 
         
        if(e.querySelector("input")){
          console.log('inputs');
          e.querySelector("input").readOnly=true;
          }
        }); 
    },
    cancel(index){
       var ninputs = this.$refs.input[index].childNodes;
      ninputs.forEach(function(e){
        if(e.querySelector("#save")){
          console.log('guardado');
          console.log( e.querySelector("#save").parentNode);
          var save = e.querySelector("#save");
          var update = e.querySelector("#update");
          var confirm = e.querySelector(".confirm");
          update.style.display="inline-block";
          confirm.style.display="none";
          

          }} );
          this.getUser();
    },
    updateUser:async function(index,id, nameU,lastNameU,cidU,telfU,emailU) {
      console.log("la posicion es " ,index);
      this.confirm = !this.confirm; 
      var ninputs = this.$refs.input[index].childNodes;
      ninputs.forEach(function(e){
    if(e.querySelector("#update")){
      var update = e.querySelector("#update");
      update.style.display="inline-block";
       var update = e.querySelector("#update");
       var confirm = e.querySelector(".confirm");
      update.style.display="inline-block";
       confirm.style.display="none";
    }
      });   
      let userUpdate={
            id: id,
            name : nameU,
            lastName : lastNameU,
            cid : cidU,
            telf : telfU,
            email : emailU,
            estado: false
        }
        
        console.log("se guardo");
        
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
   mounted:async function() {
     this.getUser();

     
    },

};

</script>
<style scope>
#save,.confirm{
  display: none;
}
  .md-dialog {
    max-width: 768px;
  }
.confirm{
   position: fixed;
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
p{
  color: black;
  display: inline;
}
.box-confirm{
  color: black;
  background: white;
  width: 200px;
  
}
</style>
