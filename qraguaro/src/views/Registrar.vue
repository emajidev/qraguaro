<template>
  <div id ="#Registrar">
    
      <!--  formulario de registro  -->
    <h2>Registrar</h2>
      <form action="" >
        <input id="Gname" class="input-crud" type="text" placeholder="Nombre" v-model="name">
        <input id="GlastName" class="input-crud" type="text" placeholder="Apellido" v-model="lastName">
        <input id="Gcid" class="input-crud" type="text" placeholder="Cedula" v-model="cid">
        <input id="Gtelf" class="input-crud" type="text" placeholder="Telefono" v-model="telf">
        <input id="Gemail" class="input-crud" type="email" placeholder="Correo" v-model="email">
        <input  class="input-crud btn-send" value="Guardar" v-on:click="createUser ">
      </form> 
      <h2>Registrados </h2>
      <div ref="list" id="list"  v-for = "(item , index) in  users" :key="item.id" >
        <ul ref="input">  
          <li class="list-inline"><p>{{index}}</p></li>
          <li class="list-inline"> <input :readonly="disableInput" class="inpt block-in"   type="text" :placeholder="item.name" v-model="item.nameU "  >  </li>
                    <li class="list-inline"> <input :readonly="disableInput" class="inpt block-in"    type="text" :placeholder="item.lastName" v-model="item.lastNameU">  </li>
          <li class="list-inline"> <input :readonly="disableInput" class="inpt block-in"    type="text" :placeholder="item.cid" v-model="item.cidU">  </li>
          <li class="list-inline"> <input :readonly="disableInput" class="inpt block-in"    type="text" :placeholder="item.telf" v-model="item.telfU">  </li>
          <li class="list-inline"> <input :readonly="disableInput" class="inpt block-in"     type="email" :placeholder="item.email" v-model="item.emailU">  </li>
          
          <li id="botones" class="list-inline"> 
            
          <button id="update"   v-on:click="onedit(index ,false )"   >Actualizar</button>
          <button id="save" v-on:click ="confirmeSave(index)"  >Guardar</button>
          <template >
            <div class="confirm" >
              <div class="box-confirm">
                <h5>Seguro que desea guardar los cambios?</h5>
                <button v-on:click ="cancelUpdate(index)" >No</button>
                <button v-on:click ="updateUser(index, item.id, item.nameU,  item.lastNameU, item.cidU, item.telfU, item.emailU )"  >Si</button>
              </div>
            </div>
          </template>
        
          </li>   
          <li class="list-inline"> 
            <button id="delete"  v-on:click="confirmeDelete(index)" > Eliminar </button> 
          <template >
            <div class="confirm-delete" >
              <div class="box-confirm">
                <h5>Seguro que desea Eliminar esto?</h5>
                <button v-on:click ="cancelDelete(index)" >No</button>
                <button v-on:click ="deliteUser(item.id , index)"  >Si</button>
              </div>
            </div>
          </template>
          </li>
          
        </ul>
       
      </div>
      
  </div>  
  
</template>


<script>
import io from 'socket.io-client';
import axios from 'axios'
import { async } from 'q';
import { truncate } from 'fs';

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
      
      console.log("el item es ", index);
    
    
      
      var ninputs = this.$refs.input[index].childNodes;
     
      ninputs.forEach(function(e){
         /*  remover clases para modo edicion */
         if(e.querySelector(".inpt")){
            let input = e.querySelector(".inpt");
            input.classList.remove("block-in");
            console.log("Modo Edicion");
          }
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
    validateForm(valName , valLastName , valCid , valTelf, VEmail){
      //validacion de formulario
      if(valName.length<=0){
        console.log("Ingrese un nombre")
        var vname = false;
      }else{
        vname = true;
      }
      if(valLastName.length<=0){
        console.log("Ingrese  apellido")
        var vlastName = false;
      }else{
        vlastName = true
      }
      if(valCid.length<=0){
        console.log("Ingrese  cedula")
        var vcid= false;
      }else if(!valCid.search(/^([0-9])*$/)){
        console.log("formato de ci correcto");
        vcid = true
      }else{
        console.log("formato ci incorrecto")
      }
       if(valTelf.length<=0){
        var vtelf=true;
        console.log("Ingrese  email")
        }else if(!valTelf.search(/^([0-9])*$/)){
        console.log("formato telefono correcto");
        var vtelf=true;
        }else {
          console.log("formato telefono incorrecto");
          var vtelf=false;
        }
      var regex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
      if(VEmail.length<=0){
        var vemail=true;
        console.log("Ingrese  email")
        }else if( VEmail.search(regex)==0){
        console.log("formato email correcto");
        var vemail=true;
        }else {
          console.log("formato email incorrecto");
          var vemail=false;
        }
      /*   if(vname && vlastName && vcid && vtelf &&vemail ){
          return true
          
        }else{
            
            return{
            vname,
            valLastName,
            vcid,
            vtelf,
            vemail,
          }
        } */
        return{
            vname,
            vlastName,
            vcid,
            vtelf,
            vemail,
        }
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
    
      // Registro de usuario
      // parametros para la validacion 
      let valname = this.name;
      let vallastName = this.lastName;
      let valcid = this.cid;
      let valtelf = this.telf;
      let valemail = this.email
     
      let vname =this.validateForm(valname,vallastName,valcid,valtelf,valemail).vname
      let vlastName =this.validateForm(valname,vallastName,valcid,valtelf,valemail).vlastName
      let vcid =this.validateForm(valname,vallastName,valcid,valtelf,valemail).vcid
      let vtelf =this.validateForm(valname,vallastName,valcid,valtelf,valemail).vtelf
      let vemail =this.validateForm(valname,vallastName,valcid,valtelf,valemail).vemail
      if (!vname){
        let gElement = document.querySelector("#Gname");
        gElement.style.border ="2px red solid";
        gElement.style.borderRadius = "5px ";
        
      }
      if (!vlastName){
        let gElement = document.querySelector("#GlastName");
        gElement.style.border ="2px red solid";
        gElement.style.borderRadius = "5px ";
        
      }
      if (!vcid){
        let gElement = document.querySelector("#Gcid");
        gElement.style.border ="2px red solid";
        gElement.style.borderRadius = "5px ";
        
      }
      if (!vtelf){
        let gElement = document.querySelector("#Gtelf");
        gElement.style.border ="2px red solid";
        gElement.style.borderRadius = "5px ";
        
      }
       if (!vemail){
        let gElement = document.querySelector("#Gemail");
        gElement.style.border ="2px red solid";
        gElement.style.borderRadius = "5px ";
        
      }
     
      if(vname && vlastName && vcid && vtelf && vemail){
        let res = await axios.post('http://10.0.32.44:3333/create-user',user)
        this.getUser();
        this.name  = '';
        this.lastName  = '';
        this.cid  = '';
        this.telf  = '';
        this.email  = '';   
        console.log(res.data);
       }else{
         console.error("ocurrio un error");
       }
      
    

    },
    confirmeSave(index){
      
      let isEdit = true;
      var ninputs = this.$refs.input[index].childNodes;
      ninputs.forEach(function(e){
        /*  remover clases para modo edicion */
         if(e.querySelector(".inpt")){
            let input = e.querySelector(".inpt");
            input.classList.add("block-in");
            console.log("Modo Edicion off");
          }
        if(e.querySelector("#save")){
          console.log('guardado');
          console.log( e.querySelector("#save").parentNode);
          var save = e.querySelector("#save");
          var update = e.querySelector("#update");
          var confirm = e.querySelector(".confirm");
          save.style.display="none";
          confirm.style.visibility="visible";
          } 
         
        if(e.querySelector("input")){
          console.log('inputs');
          e.querySelector("input").readOnly=true;
          }
        }); 
    },
    confirmeDelete(index){
     
      var ninputs = this.$refs.input[index].childNodes;
      ninputs.forEach(function(e){
        console.log(e)
      if(e.querySelector("#delete")){
          console.log('eliminado');
          console.log( e.querySelector("#delete").parentNode);
          var save = e.querySelector("#delete");
          var confirmD = e.querySelector(".confirm-delete");
          
          confirmD.style.visibility="visible"; 
          }  
         
     
        }); 
    },
    cancelUpdate(index){
       var ninputs = this.$refs.input[index].childNodes;
      ninputs.forEach(function(e){
        
        if(e.querySelector("#save")){
          console.log('guardado');
          console.log( e.querySelector("#save").parentNode);
          var save = e.querySelector("#save");
          var update = e.querySelector("#update");
          var confirm = e.querySelector(".confirm");
          update.style.display="inline-block";
          confirm.style.visibility="hidden";
          }
     
          } );
          this.getUser();
    },
     cancelDelete(index){
       var ninputs = this.$refs.input[index].childNodes;
      ninputs.forEach(function(e){
       
        if(e.querySelector("#delete")){
          console.log('eliminar');
          console.log( e.querySelector("#delete").parentNode);
          var deleted = e.querySelector("#delete");
          var confirmD = e.querySelector(".confirm-delete");
          deleted.style.display="inline-block";
          confirmD.style.visibility="hidden";
          }
          } );
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
          confirm.style.visibility="hidden";
      }});
      //validacion de formulario 
         
      let userUpdate={
            id: id,
            name : nameU,
            lastName : lastNameU,
            cid : cidU,
            telf : telfU,
            email : emailU,
            estado: false
        }
         // Registro de usuario
      // parametros para la validacion 
      let valname = nameU;
      let vallastName = lastNameU;
      let valcid = cidU;
      let valtelf = telfU ;
      let valemail = emailU;

      console.log(valname,vallastName,valcid,valtelf,valemail )
        console.log("se guardo");
      let vname =this.validateForm(valname,vallastName,valcid,valtelf,valemail).vname
      let vlastName =this.validateForm(valname,vallastName,valcid,valtelf,valemail).vlastName
      let vcid =this.validateForm(valname,vallastName,valcid,valtelf,valemail).vcid
      let vtelf =this.validateForm(valname,vallastName,valcid,valtelf,valemail).vtelf
      let vemail =this.validateForm(valname,vallastName,valcid,valtelf,valemail).vemail
      
      if(vname && vlastName && vcid && vtelf && vemail){
          let res = await axios.post('http://10.0.32.44:3333/update-user',userUpdate)
        console.log(res.data); 
        }
        
        
        
    },
    deliteUser:async function (idEvent , index) {
      let idUser = {
        id: idEvent 
      }
       
        let res = await axios.post('http://10.0.32.44:3333/delete-user', idUser)
        console.log(res.data);
        if (res.data.deleted){
        console.log('borrar');
        this.users.splice(index , 1);
        
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
  display: none
}
  .md-dialog {
    max-width: 768px;
  }

.confirm, .confirm-delete{
  visibility: hidden;
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
