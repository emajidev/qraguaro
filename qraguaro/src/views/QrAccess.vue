<template>
  <div class="QrAccess">

        <div class="content">

          
        <!--   camara scanner -->
        <div class="qrscam">
          <ScanQr v-if="show"  v-on:code-scanned="codeScanned" v-on:error-captured="errorCaptured" :stop-on-scanned="true" :draw-on-found="true" :responsive="false"/>
         {{scanned}}
        </div>
    
    
        <div class="userIdPhoto">
            <div id="p-profile" class="content"><h1 id="interrogation">?</h1></div>
            <div class="t-profile"></div>
            <div class="t-profile"></div>
            <div class="t-profile"></div>
            <div class="t-profile"></div>
            <div class="t-profile"></div>
        </div>
        
        <h4 id="date">Miercoles 12/3/2019 12:00 pm</h4>
        <div class="content">
            <div class="btn-index content"><img src="../assets/icons/list.png" class="btn-img" alt=""></div>
            <div class="btn-index content"><img src="../assets/icons/stadistics.png" class="btn-img" alt=""></div>
            <div class="btn-index content"><img src="../assets/icons/cron.png" class="btn-img" alt=""></div>
        </div>  


        <button v-on:click="onLed">onled</button>
        <button v-on:click="offLed">offLed</button>
        <button v-on:click = "getUser"> consultar</button>
          <!-- Modificacion de usuarios  -->
  
    <h3>lista</h3>
    <div id="list"  v-for = "(item , index) in  users" >
      
      <ul>    
      <li>   </li><li></li> 
      <li> <input class="" type="text" :placeholder="item.name" v-model="item.lastNameU ">  </li>
      <li> <input class="" type="text" :placeholder="item.lastName" v-model="item.cidU">  </li>
      <li> <input class="" type="text" :placeholder="item.cid" v-model="item.telfU">  </li>
      <li> <input class="" type="text" :placeholder="item.email" v-model="item.emailU">  </li>
      <li> <button class="" v-on:click ="updateUser( item.id, item.lastNameU, item.cidU, item.telfU, item.emailU )" >Actualizar</button></li>
      <li> <button  v-on:click="deliteUser(item.id , index)" > Eliminar </button> </li>
    
      </ul>
    
    </div>

   <!--  formulario de registro  -->
   <h3>Registrar</h3>
    <form action="">
      <input class="input-crud" type="text" placeholder="Nombre" v-model="name">
      <input class="input-crud" type="text" placeholder="Apellido" v-model="lastName">
      <input class="input-crud" type="text" placeholder="Cedula" v-model="cid">
      <input class="input-crud" type="text" placeholder="Telefono" v-model="telf">
      <input class="input-crud" type="email" placeholder="Correo" v-model="email">
      <input class="input-crud" value="Enviar" v-on:click="createUser">
    </form> 
        
    </td>
    </table>
  </div>
</template>

<script>
// @ is an alias to /src

import ScanQr from '@/components/ScanQr.vue'
import io from 'socket.io-client';
import axios from 'axios'
import { async } from 'q';

export default {
  name: 'QrAccess',
  components: {
    ScanQr
  },
  data() {
    return {
      placeholderValue:'watafaka',
      users:[],
      errorMessage: "",
      scanned: "",
      show: true,
      user: '',
      message: '',
      messages: [],
      socket : io('10.0.32.38:3001'),
      socketArdu : io('10.0.32.38:3000'),
      name:'',
      lastName:'',
      cid:'',
      telf:'',
      email:'',
      
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
      console.log(usuario);
    
      },
      
      sendMessage(e) {
            e.preventDefault();
            
            this.socket.emit('SEND_MESSAGE', {
                
                user: this.user,
                message: this.message
            });
            this.message = ''
        },
        onLed(e){
            e.preventDefault();
            this.socketArdu.emit('on');
            
        },
         offLed(e){
            e.preventDefault();
            this.socketArdu.emit('off');
        },
         OpenDoor(){
            /* e.preventDefault(); */
            this.socketArdu.emit('OpenDoor');
            
         
        },
      ///// Envia el codigo scaneado al servidor para verificar 
      codeScanned: async function (code){
      this.scanned = code;
      console.log(this.scanned);
     
      let res = await axios.post('http://10.0.32.44:3333/checkQR', {QR: this.scanned});
      console.log(res.data);
      this.OpenDoor();
    },
   
    getUser: async function (){
    let vue = this;
    let res = await axios.get('http://10.0.32.44:3333/list');
    vue.users = res.data;
    console.log(res.data);
    },
   sendDataUser: async function (){
     
    let res = await axios.post('http://10.0.32.44:3333/checkQR', {
    QR: this.scanned
  })
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
  console.log(res.data);
  },
  updateUser: async function(id, nameU,lastNameU,cidU,telfU,emailU) {
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
     let res = await axios.post('http://10.0.32.44:3333/delete-user', idUser)
  console.log(res.data);
      if (res.data.deleted){
        console.log('borrar');
        this.users.splice(index , 1);
      }
    },
    errorCaptured(error) {
      switch (error.name) {
        case 'NotAllowedError':
          this.errorMessage = 'Camera permission denied.'
          break;
        case 'NotFoundError':
          this.errorMessage = 'There is no connected camera.'
          break;
        case 'NotSupportedError':
          this.errorMessage = 'Seems like this page is served in non-secure context.'
          break;
        case 'NotReadableError':
          this.errorMessage = 'Couldn\'t access your camera. Is it already in use?'
          break;
        case 'OverconstrainedError':
          this.errorMessage = 'Constraints don\'t match any installed camera.'
          break;
        default:
          this.errorMessage = 'UNKNOWN ERROR: ' + error.message
      }
      console.error(this.errorMessage);
    }
  },
   mounted() {
        this.socket.on('MESSAGE', (data) => {
            this.messages = [...this.messages, data];
            // you can also do this.messages.push(data)
        });
    }
};

</script>
<style scope>

</style>