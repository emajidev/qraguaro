<template>
  
  <div id="#Listado">
      <h3>Listado </h3>
        <div id="list"  v-for = "(item , index) in  users" >
        <ul>  
        <li>  
        <li class="list-inline"> <input class="inpt block-in"   readonly="readonly" type="text" :placeholder="item.name" v-model="item.lastNameU ">  </li>
        <li class="list-inline"> <input class="inpt block-in"   readonly="readonly" type="text" :placeholder="item.lastName" v-model="item.cidU">  </li>
        <li class="list-inline"> <input class="inpt block-in"   readonly="readonly" type="text" :placeholder="item.cid" v-model="item.telfU">  </li>
        <li class="list-inline"> <input class="inpt block-in"   readonly="readonly" type="text" :placeholder="item.email" v-model="item.emailU">  </li>
         </ul>
    </div>
</div>   
</template>

<script>
// @ is an alias to /src

import ScanQr from '@/components/ScanQr.vue'
import io from 'socket.io-client';
import axios from 'axios'
import { async } from 'q';

export default {
  name: 'Listado',
  components: {
    ScanQr
  },
  data() {
    return {
      placeholderValue:'watafaka',
      users:[],
      errorMessage: "",
      user: '',
      socket : io('10.0.32.38:3001'),
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
    },
   mounted:async function() {
        let vue = this;
        let res = await axios.get('http://10.0.32.44:3333/list');
        vue.users = res.data;
        console.log(res.data);
        
    }
};

</script>
<style scope>

</style>
