<template>
    <div class="ring-2 ring-gray-500 mt-6 w-[25%] p-4 rounded-lg flex flex-col items-center backdrop-blur-sm bg-cyan-600/30">
        <div class="flex w-[95%]">
            <button @click="showCreate.type = false" class="text-2xl font-bold w-[8%]">
                <svg style="color: white; font-weight:bold" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-left" viewBox="0 0 16 16"> <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z" fill="white"></path> </svg>
            </button>
            <h2 class="text-white text-xl ml-[25%]">Create Room</h2>
        </div>

        <input type="text" placeholder="Room's Name" class="input_rooms" v-model="roomName">
        <input type="text" placeholder="Password" class="input_rooms" v-model="password">

        <!--players number Steps and Time-->
            <div class="w-[80%] mt-4 flex">
                <div class="w-[40%] py-2">
                    <label class="text-sm font-semibold text-white">Players No: </label>
                </div>
                <div class="flex w-[60%] bg-gray-300 rounded-md">
                    <button @click="playersNoNegative" class="w-[25%] hover:bg-gray-400 rounded-md">
                        <span class="m-auto text-xl font-bold">-</span>
                    </button>
                    <input type="number" class="py-2 w-[50%] bg-transparent text-center"  v-model="playersNo">
                    <button @click="playersNoPositive" class="w-[25%] hover:bg-gray-400 rounded-md">
                        <span class="m-auto text-xl font-bold">+</span>
                    </button>
                </div>
            </div>      
            <div class="w-[80%] mt-3 flex">
                <div class="w-[40%] py-2">
                    <label class="text-sm font-semibold text-white">Time in Min: </label>
                </div>
                <div class="flex w-[60%] bg-gray-300 rounded-md">
                    <button @click="TimeNegative" class="w-[25%] hover:bg-gray-400 rounded-md">
                        <span class="m-auto text-xl font-bold">-</span>
                    </button>
                    <input type="number" class="py-2 w-[50%] bg-transparent text-center"  v-model="time">
                    <button @click="TimePositive" class="w-[25%] hover:bg-gray-400 rounded-md">
                        <span class="m-auto text-xl font-bold">+</span>
                    </button>
                </div>
            </div>      
            <div class="w-[80%] mt-3 flex">
                <div class="w-[40%] py-2">
                    <label class="text-sm font-semibold text-white">Steps: </label>
                </div>
                <div class="flex w-[60%] bg-gray-300 rounded-md">
                    <button @click="stepsNegative" class="w-[25%] hover:bg-gray-400 rounded-md">
                        <span class="m-auto text-xl font-bold">-</span>
                    </button>
                    <input type="number" class="py-2 w-[50%] bg-transparent text-center"  v-model="steps">
                    <button @click="steps++" class="w-[25%] hover:bg-gray-400 rounded-md">
                        <span class="m-auto text-xl font-bold">+</span>
                    </button>
                </div>
            </div>      
            <div class="w-[80%] mt-3 flex">
                <div class="w-[40%] py-2">
                    <label class="text-sm font-semibold text-white">Win Limit: </label>
                </div>
                <div class="flex w-[60%] bg-gray-300 rounded-md">
                    <button @click="winNegative" class="w-[25%] hover:bg-gray-400 rounded-md">
                        <span class="m-auto text-xl font-bold">-</span>
                    </button>
                    <input type="number" class="py-2 w-[50%] bg-transparent text-center"  v-model="win">
                    <button @click="winPositive" class="w-[25%] hover:bg-gray-400 rounded-md">
                        <span class="m-auto text-xl font-bold">+</span>
                    </button>
                </div>
            </div>      
        <!--players number Steps and Time End-->

        <button 
            @click="showPath.type = !showPath.type"
            class="w-[95%] rounded-md mt-4 py-2 flex justify-between bg-gradient-to-tr from-cyan-800 to-slate-600 hover:bg-slate-500"> 
            <div class="w-[40%] flex justify-evenly">
                <img :src="path1.img" class="w-11 h-11 object-cover rounded-full" />
                <p class="mt-2 text-white font-light">Start</p>
            </div>
            <div class="w-[20%]">
                <svg style="color: white" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-double-right mt-3 ml-5" viewBox="0 0 16 16"> <path fill-rule="evenodd" d="M3.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L9.293 8 3.646 2.354a.5.5 0 0 1 0-.708z" fill="white"></path> <path fill-rule="evenodd" d="M7.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L13.293 8 7.646 2.354a.5.5 0 0 1 0-.708z" fill="white"></path> </svg>
            </div>
            <div class="w-[40%] flex justify-evenly">
                <img :src="path2.img" class="w-11 h-11 object-cover rounded-full" />
                <p class="mt-2 text-white font-light">Finish</p>
            </div>    
        </button>

        <button @click="create" class="w-[50%] py-2 mt-6 rounded-md font-bold text-gray-100 hover:bg-cyan-900">Create Room</button>
    </div>
    <div v-if="showPath.type" class="mt-16 ml-[10%] w-[25%]">
        <PathSelect :path1="path1" :path2="path2" :card1="card1" :card2="card2" :showPath="showPath"/>
    </div>
</template>

<script setup>
import {ref, onMounted} from 'vue';
import {useRouter} from 'vue-router'
import PathSelect from '../components/PathSelect.vue';
import getRandomMovie from '../api/getRandomMovie.js';
import getRandomActor from '../api/getRandomActor.js';
import CryptoJS from 'crypto-js';

// const CryptoJS = require("crypto-js");
const token = JSON.parse(localStorage.token);

const props = defineProps({
    name: String,
    socket: Object,
    showCreate: Object,
    game : Object,
});

const socket = ref(props.socket);
const name = ref(props.name);
const showPath = ref({
    type: false,
});
const showCreate = ref(props.showCreate);
const router = useRouter();
const game = ref(props.game);


const roomName = ref(name.value + "'s Room");
const password = ref('');
const playersNo = ref(2);
const time = ref(5);
const steps = ref(10);
const path = ref(null); 
const win = ref(1)

const card1 = ref([]);
const card2 = ref([]);
const path1 = ref({
    type:'',
    name:'',
    img: '', 
});
const path2 = ref({
    type:'',
    name:'',
    img: '', 
});

onMounted(async()=>{
    let x = Math.floor(Math.random() * 2);
        let y = Math.floor(Math.random() * 2);
    if(x === 0){
        path1.value.type = 'movie';
    } else {
        path1.value.type = 'actor'
    };

    if(y === 0){
        path2.value.type = 'movie';
    }else path2.value.type = 'actor';

    if(path1.value.type === 'movie'){
        card1.value = await(getRandomMovie(token)); 
        path1.value.name = card1.value.title;
        path1.value.img = "https://image.tmdb.org/t/p/original"+card1.value.poster_path;
    }
    else{
        card1.value = await(getRandomActor(token));
        path1.value.name = card1.value.name;
        path1.value.img = "https://image.tmdb.org/t/p/original"+card1.value.profile_path;
    }
    if(path2.value.type === 'movie'){
        card2.value = await(getRandomMovie(token)); 
        path2.value.name = card2.value.title;
        path2.value.img = "https://image.tmdb.org/t/p/original"+card2.value.poster_path;
    }
    else{
        card2.value = await(getRandomActor(token));
        path2.value.name = card2.value.name;
        path2.value.img = "https://image.tmdb.org/t/p/original"+card2.value.profile_path;
    }
   
})

const playersNoNegative = () => {
    if(playersNo.value < 2){
        playersNo.value = 1;
    }
    else{
        playersNo.value --;
    }
}
const playersNoPositive = () => {
    if(playersNo.value > 9){
        playersNo.value = 10;
    }
    else{
        playersNo.value ++;
    }
}
const TimeNegative = () => {
    if(time.value < 2){
        time.value = 1;
    }
    else{
        time.value --;
    }
}
const TimePositive = () => {
    if(time.value > 29){
        time.value = 30;
    }
    else{
        time.value ++;
    }
}
const stepsNegative = () => {
    if(steps.value < 2){
        steps.value = 1;
    }
    else{
        steps.value --;
    }
}
const winNegative = () => {
    if(win.value < 2){
        win.value = 1;
    }
    else{
        win.value --;
    }
}
const winPositive = () => {
    if(win.value > playersNo.value -1){
        win.value = playersNo.value;
    }
    else{
        win.value ++;
    }
}

const create = () => {    
    socket.value.send(JSON.stringify( {
        "header": "create_room",
        "data": {
            "name": roomName.value,
            "password": password.value,
            "player_limit": playersNo.value,
            "time_limit": time.value * 60,
            "win_limit": win.value,
            "step_limit": steps.value,
            "game": {
            "from": card1.value.id,
            "to": card2.value.id,
            "from_type": path1.value.type.toUpperCase(),
            "to_type": path2.value.type.toUpperCase(),
            }
        }
    }));
    game.value.password = password.value;
    setTimeout(()=>{
        router.push({
            name:'GameRoom',
            query:{
                id: game.value.id,
                password: game.value.password
            }
        });
    }, 700)
    
}


</script>

<style scoped>
input[type='number']::-webkit-inner-spin-button,
input[type='number']::-webkit-outer-spin-button 
{
    -webkit-appearance: none;
    margin: 0;
}
input:focus 
{
    outline: none !important;
}
</style>