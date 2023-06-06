<template>  
    <!--Navbar-->
        <NavBar :userInfoL="userInfoL" :socket="socket"/>
    <!--Navbar-->

    <!--Game Rooms-->
        <Game :socket="socket" :name="userName" :userInfoL="userInfoL"/>
    <!--Game Rooms End-->

</template>

<script setup>
import {ref, onMounted, watch} from 'vue';
import axios from 'axios';
import {useRouter} from 'vue-router';
import NavBar from '../components/NavBar.vue';
import Game from '../components/Game.vue';
import {getAuth, onAuthStateChanged } from 'firebase/auth';

const router = useRouter();
const token = JSON.parse(localStorage.token);
const userName = ref('');
const auth = getAuth();
const user = ref([]);
const userInfoL = ref([]);

onMounted(async()=>{
  if (localStorage.token) {
    // const response = await axios.get(`https://apisrv0001.tournamovie.com/profile`,
    // {
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //   }
    // });
    onAuthStateChanged(auth, (data) => {
      if (data) {
        user.value = data       
        userInfoL.value = {
          id : user.value.uid,
          name : user.value.displayName,
          email : user.value.email,
          image : user.value.photoURL,
        };
        userName.value = user.value.displayName;
      } else {
        console.log('the user is signed out')
      }
    });
    
  } else {
    router.push({name:"Login",});      
  }
})

const socket = new WebSocket("wss://apisrv0001.tournamovie.com/websocket/main?jwt=" + token);



</script>
