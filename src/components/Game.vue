<template>
    <!--Rooms Div-->
        <div 
        v-if="!showCreate.type && !showOtherDevice" 
        class="ml-[25%] text-white h-auto w-[45%] mt-6 py-4 flex flex-col justify-center items-center z-0"
        :key="refreashRooms" >
            <h2 class="text-2xl font-bold text-gray-200 mb-4">Game Rooms</h2>
            <h3 v-if="rooms.length === 0" class="mt-2">No Room</h3>
            
            <div class="w-[80%] hover:cursor-pointer" v-if="rooms.length !== 0" v-for="room in rooms" :key="room">
                <roomsCard @click="roomEnter(room)" :room="room" :key="componentKey" />
                 <!--Password Enter-->
                    <div v-if="showPassword && room.password === true" class="z-10 w-[70%] mx-[15%] rounded-md text-center py-4 my-4 backdrop-contrast-sm bg-white/30">
                        <h2 class="text-xl font-bold">Join To</h2>
                        <h3 class="text-lg font-semibold">{{room.name}}</h3>
                        <input type="text" placeholder="Password" v-model="roomPassword" class="mt-4 p-2 rounded-md bg-transparent placeholder-gray-300 text-gray-300 ring-[1.8px] ring-gray-600"> 
                        <br>
                        <button @click="roomEnterWithPassword(room)" class="bg-cyan-800 hover:bg-cyan-700 py-1 px-6 rounded-md mt-2">Join</button>
                    </div>
                <!--Password Enter End -->
            </div>

            <div class="mt-8">
                <button @click="createBtn" class="ring-[1.5px] ring-gray-500 p-3 rounded-md text-gray-200 hover:bg-gray-700">Create</button>
            </div>
        </div>
    <!--Rooms Div End-->

    <!--Create Div-->
        <div v-if="showCreate.type" class="flex justify-center">
            <CreateRoom :name="name" :socket="socket" :showCreate="showCreate" :game="game"/>
        </div>
    <!--Create Div End-->
   
    <!--Other Device-->
        <div v-if="showOtherDevice" class="z-10 w-[30%] backdrop-blur-sm bg-white/30 ml-[35%] mt-20 p-10 flex flex-col rounded-md">
            <h3 class="text-white font-semibold text-xl text-center">There's a connection problem, You need to log out from the other device</h3>
            <button @click="logOut" class="text-white flex justify-evenly mt-10 w-[40%] ml-[30%] font-bold hover:bg-gray-400 p-2 rounded-md">
                <span>           
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-log-out"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
                </span>
                Log out
            </button>
        </div>
    <!--Other Device End-->

</template>

<script setup>
import {ref, watch} from 'vue';
import roomsCard from '../components/roomsCard.vue';
import CreateRoom from '../components/CreateRoom.vue';
import {useRouter} from 'vue-router';


const props = defineProps({
    socket: Object,
    name: String,
    userInfoL: Object
});

const socket = ref(props.socket);
const componentKey = ref(0);
const refreashRooms = ref(0);

const rooms = ref([]);
const showCreate = ref({
    type:false,
});
const showOtherDevice = ref(false);
const router = useRouter();
const token = JSON.parse(localStorage.token);
const game = ref({
    id: null,
    admin_id: null,
    password: ''
});
const showPassword = ref(false);
const roomPassword = ref('');

const userInfoL = ref([])
setTimeout(()=>{
    userInfoL.value = props.userInfoL;
},500)

const connect = () => {
    socket.value.onopen = () => {
        console.log('Connected to socket');
    };
    socket.value.onmessage = function (event) {
        const e = JSON.parse(event.data);
        const header = e["header"];
        const data = e["data"];
        switch (header) {
            case "all_rooms":
                console.log("TÜM ODALAR GELDİ");
                rooms.value = data;
                console.log(rooms.value);
                break;
            case "create_room":
                console.log(data);
                if(userInfoL.value.id === data.admin_id){
                    game.value.id = data.id;
                    game.value.admin_id = data.admin_id;
                    // game.value.password = data.password !== '' ? data.password : '' ;
                };
                rooms.value.push(data);
                break;
            case "room_ingame":
                console.log(data);
                var roomIndex = rooms.value.findIndex(item => item.id === data.id);
                rooms.value[roomIndex].in_game = data.ingame;
                break;
            case "update_room":
                var roomIndex = rooms.value.findIndex(item => item.id === data.id);
                rooms.value[roomIndex] = data;
                break;
            case "partial_room":
                var roomIndex = rooms.value.findIndex(item => item.id === data.id);
                rooms.value[roomIndex].admin_id = data.admin_id;
                rooms.value[roomIndex].player_count = data.player_count;
                console.log(data);
                break;
            case "remove_room":
                var roomIndex = rooms.value.findIndex(item => item.id === data.id);
                rooms.value.splice(roomIndex, 1);
                break;
            default:
                console.log("TANIMLANAMAYAN HEADER: " + header , data);
        }


    };
    socket.value.onerror = function (error) {
        console.log(JSON.stringify(error));
    };
}
connect();

setTimeout(() => {
    if (rooms.value.length === 0 && socket.value.readyState !== 1) {
        showOtherDevice.value = true;
        // setInterval(()=>{
        //     // socket.value.close();
        //     window.location.reload();              
        // },5000);   
    };
},1000);


watch(
    () => rooms.value,
    () => {
        componentKey.value ++;
    }
);

const roomEnter = (room)=>{
    if(room.password === true){
        showPassword.value = !showPassword.value
    }
    else{
        router.push({
            name:'GameRoom',
            query:{
                id: room.id,
                password: ''
            }
        });
    };
};
const roomEnterWithPassword = (room)=>{
    if(roomPassword.value){
        // console.log(roomPassword.value)
        router.push({
                name:'GameRoom',
                query:{
                    id: room.id,
                    password: roomPassword.value
                },
        });
    }
};



const logOut = () => {
    socket.value.close(
        console.log("connection Closed"),
    );
    // socketRoom.value.close(
    //     console.log("Room Socket Have Been Closed")
    // );
    localStorage.removeItem('token');
    router.push({name: "Login"});
};


const createBtn = () => {
    showCreate.value.type = true;
}

</script>

<style scoped>
input:focus 
{
    outline: none !important;
}
</style>