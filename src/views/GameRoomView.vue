<template>
    <!--navbar-->
        <div>
            <NavBar :userInfoL="userInfoL" :socket="socket"/>
        </div>
    <!--navbar end-->
    <div class="flex justify-center">
        <!--Room Info -->
            <div class="flex justify-center w-[25%]">
                <RoomInfo :room="room" :players="players" :userInfoL="userInfoL" :key="componentKey" :socketRoom="socketRoom" :showEditRoom="showEditRoom"/>
            </div>
        <!--Room Info end-->
        <!--Edit Room-->
            <div class="w-[25%] ml-[8%] flex justify-center">   <!--v-if="showEditRoom.type"-->
                <EditRoom :showEditRoom="showEditRoom" :room="room"/>
            </div>
        <!--Edit Room End-->
    </div>

</template>

<script setup>
import {ref, watch} from 'vue';
import {useRoute, useRouter} from 'vue-router';
import axios from 'axios';
import NavBar from '../components/NavBar.vue';
import RoomInfo from '../components/RoomInfo.vue';
import EditRoom from '../components/EditRoom.vue';

const route = useRoute();
const router = useRoute();
const token = JSON.parse(localStorage.token);
const players = ref([]);
const room = ref([]);
const componentKey = ref(0);
const showEditRoom = ref({
    type: false
});


const roomId = ref(route.query.id);
const roomPassword = ref(route.query.password ? route.query.password : '');


const userName = ref('');


const userInfoL = ref([]);

async function checkToken() {
  if (localStorage.token) {
    const response = await axios.get(`https://apisrv0001.tournamovie.com/profile`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
    userInfoL.value = {
      id : response.data.id,
      name : response.data.name,
      email : response.data.email,
      image : response.data.image,
    };
    userName.value = userInfoL.value.name;
    
  } else {
    router.push({name:"Login",});      
  }
}

checkToken();
const socket = new WebSocket("wss://apisrv0001.tournamovie.com/websocket/main?jwt=" + token);


const socketRoom = new WebSocket (`wss://apisrv0001.tournamovie.com/websocket/room?id=${roomId.value}&password=${roomPassword.value}&jwt=${token}`);
const connectRoom = () => {
    socketRoom.onopen = () => {
        console.log("room Socket has been connected");
    };
    socketRoom.onmessage = function(event) {
        const e = JSON.parse(event.data);
        const header = e["header"];
        const data = e["data"];
        console.log(header, data);
        switch(header){
            case "init_lobby":
                console.log(data);
                players.value = data.players;
                room.value = data.room;
                break;
            case "player_joined":
                players.value.push(data);
                break;
            case "player_left":
                var playerIndex = players.value.findIndex(item => item.id === data.id);
                room.value.admin_id = data.admin_id;
                console.log(room.value)
                players.value.splice(playerIndex, 1);
                break;
            case "toggle_ready":
                var playerIndex = players.value.findIndex(item => item.id === data.id);
                players.value[playerIndex].ready = data.ready;
                break;
            default:
                console.log("TANIMLANAMAYAN HEADER: " + header , data);
        }
    };
    socketRoom.onerror = function (error) {
        console.log("TANIMLANAMAYAN HEADER: " + error);
    }

};
connectRoom();
setTimeout(()=>{
},200)

watch(
    () => room.value,
    () => {
        componentKey.value ++;
    }
);

</script>

<style lang="scss" scoped>

</style>