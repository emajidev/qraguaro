<template>
<div id ='scan'>
 <h3> Escáner QR</h3>
 <div class="contentCode">
    <!--   camara scanner -->
    <ScanQr v-if="show"  v-on:code-scanned="codeScanned" v-on:error-captured="errorCaptured" :stop-on-scanned="true" :draw-on-found="true" :responsive="false"/>  
</div>
<div id="dataQR">
  <h5>
    Codigo QR: {{scanned}}
  </h5>
  <h5>
    Fecha: {{data}}
  </h5>
  <h5>
    Hora: {{hours}}
  </h5>
  <h5>
    Ci: {{cid}} 
  </h5> 
  <h5>
    Nombre: {{name}} {{lastName}}
  </h5> 
   <h5 v-if="showMessage">
     Usuario no registrado 
  </h5> 
   
</div>

</div>    
</template>

<script>
import ScanQr from '@/components/ScanQr.vue'
import io from 'socket.io-client';
import axios from 'axios'
import { async } from 'q';

export default {
    
    name:'scan',
    components: {
    ScanQr
  },
  data() {
    return {
      showMessage:false,
     
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
      data:" ",
      hours:""
      
    };
  },

  methods: {
      OpenDoor(){
        /* e.preventDefault(); */
        this.socketArdu.emit('OpenDoor');
        var meses = new Array ("Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre");
        var f=new Date();
        this.data = f.getDate() + " de " + meses[f.getMonth()] + " de " + f.getFullYear()
        this.hours = f.getHours() + " : "  + f.getMinutes()
        console.log(this.data);
         
        },
      ///// Envia el codigo scaneado al servidor para verificar 
      codeScanned: async function (code){
      var self = this;
      this.scanned = code;
      console.log(this.scanned);
      
      let res = await axios.post('http://10.0.32.44:3333/checkQR', {QR: this.scanned});
      console.log(res.data);
      if(res.data.check){
        if(res.data){
          this.$eventBus.$emit('update-entrances',res.data);
        }
        this.OpenDoor();
        this.cid = res.data.cid;
        this.name = res.data.name;
        this.lastName = res.data.lastName
        this.showMessage = false;
      }else{
      
        this.showMessage = true;
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

};

</script>
<style scope>
.contentCode{
  width: 100%;
  height: 480px;
  display: flex;
  justify-content: center;
  align-items: center;
}
#dataQR{
  margin-top: 25px;
  color: aquamarine;
  background: rgba(41, 48, 59, 0.473);
  padding: 15px;
  border-radius: 5px;
}
#scan{
 color: aquamarine;
 height: auto;
 width: 640px;
 
}
</style>