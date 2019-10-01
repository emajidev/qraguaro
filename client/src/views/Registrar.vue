<template>
 <div id ="#Registrar">
     <!--  formulario de registro  -->
   <h3>Registrar</h3>
    <form action="">
      <input class="input-crud" type="text" placeholder="Nombre" v-model="name">
      <input class="input-crud" type="text" placeholder="Apellido" v-model="lastName">
      <input class="input-crud" type="text" placeholder="Cedula" v-model="cid">
      <input class="input-crud" type="text" placeholder="Telefono" v-model="telf">
      <input class="input-crud" type="email" placeholder="Correo" v-model="email">
      <input class="input-crud btn-send" value="Enviar" v-on:click="createUser">
    </form> 
</div>   
</template>


<script>
// @ is an alias to /src

import ScanQr from '@/components/ScanQr.vue'
import io from 'socket.io-client';
import axios from 'axios'
import { async } from 'q';

export default {
  name: 'Registrar',
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
