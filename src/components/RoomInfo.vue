<template>
    <div class="w-[100%] bg-gray-500 mt-2 p-2 rounded-md">
        <div class="flex mt-2 mb-4">
            <button class="text-2xl font-bold w-[8%]">
                <svg style="color: white; font-weight:bold" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-left font-bold" viewBox="0 0 16 16"> <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z" fill="white"></path> </svg>
            </button>
            <h2 class="text-white ml-[18%] font-semibold text-lg">{{ room.name }}</h2>
        </div>

        <!--Room's Info-->
            <div 
                v-for="player in players" 
                :key="player.id"
                class="flex justify-between px-4 py-4 mt-2 bg-gray-700 h-20 rounded-md backdrop-blur-sm bg-gray-300/30">
                <div class="flex w-[60%] items-center">
                    <div class="relative w-[30%] py-[1%]">
                        <!-- <img 
                            v-if="userInfoL.id !== player.id && player.id !== room.admin_id"
                            src="../assets/dots.png" 
                            class="absolute top-[22%] -left-[35%] w-[50%] hover:cursor-pointer"
                            > -->
                        <img 
                            v-if="room.admin_id === player.id"
                            src="../assets/crown.png" 
                            class="absolute -rotate-12 -top-[18%] left-[7%] w-[30%]">
                        <img :src="player.image" class="w-[80%] rounded-md ml-2">
                    </div>
                    <p class="text-white uppercase text-sm ml-2">{{ player.name }}</p>
                </div>            
                <button v-if="userInfoL.id === player.id" @click="toggleReady" class="text-white">
                    <span v-if="!player.ready" class="ring-2 ring-red-600 rounded-full py-2 px-4">Ready</span>
                    <span v-else  class="ring-2 ring-green-600 rounded-full py-2 px-4">Cancel</span>
                </button>
                <div v-if="userInfoL.id !== player.id">
                    <p :style='{color: player.ready === false ? "red" : "rgb(22 163 74)"}' class="text-md mt-3 font-semibold">{{player.ready ? 'Ready' : 'Not Ready'}}</p>
                </div>
            </div>
        <!--Room's Info End-->
        <!--Game Info-->
            <div class="mt-20">
                <div class="flex justify-between px-4">
                    <img src="../assets/heart.png" class="hover:cursor-pointer w-[7%] h-[7%]">
                    <img @click="showEditRoom.type = !showEditRoom.type" src="../assets/pencil.png" class="hover:cursor-pointer w-[5%] h-[7%] mt-2">
                </div>
                <div class="flex justify-around mt-3">
                    <div class="w-[25%] flex flex-col items-center">
                        <img :src="path1.img" class="rounded-md shadow-md shadow-gray-600">
                        <p class="text-sm mt-1">{{path1.name}}</p>
                    </div>
                    <!-- <div class="bg-green-300 flex h-[50%] mt-[14%] "> -->
                        <svg style="color: white" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-chevron-double-right mt-[18%]" viewBox="0 0 16 16"> <path fill-rule="evenodd" d="M3.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L9.293 8 3.646 2.354a.5.5 0 0 1 0-.708z" fill="white"></path> <path fill-rule="evenodd" d="M7.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L13.293 8 7.646 2.354a.5.5 0 0 1 0-.708z" fill="white"></path> </svg>
                    <!-- </div> -->
                    <div class="w-[25%] flex flex-col items-center">
                        <img :src="path2.img" class=" rounded-md shadow-md shadow-gray-600">
                        <p class="text-sm mt-1">{{path2.name}}</p>
                    </div>
                </div>
            </div>
        <!--Game Info End-->
    </div>
</template>

<script setup>
import {ref} from 'vue';

const props = defineProps({
    room: Object,
    players: Object,
    userInfoL: Object,
    socketRoom: Object,
    showEditRoom: Object,
});
const room = ref([]);
const players = ref([]);
const userInfoL = ref([]);
const socketRoom = ref(null);
const showEditRoom = ref(props.showEditRoom);
const path1 = ref({
    name: '',
    img: '',
});
const path2 = ref({
    name: '',
    img: '',
});



setTimeout(()=>{
    players.value = props.players ;
    room.value = props.room ;
    userInfoL.value = props.userInfoL;
    socketRoom.value = props.socketRoom;
    console.log(socketRoom.value)
    if("from_actor" in room.value.game){
        path1.value.img = "https://image.tmdb.org/t/p/original" + room.value.game.from_actor.profile_path;
        path1.value.name = room.value.game.from_actor.name;
    }else {
        path1.value.img = "https://image.tmdb.org/t/p/original" + room.value.game.from_movie.poster_path ;
        path1.value.name = room.value.game.from_movie.title;
    }
    if("to_actor" in room.value.game){
        path2.value.img = "https://image.tmdb.org/t/p/original" + room.value.game.to_actor.profile_path;
        path2.value.name = room.value.game.to_actor.name
    }else{ 
        path2.value.img = "https://image.tmdb.org/t/p/original" + room.value.game.to_movie.poster_path ;
        path2.value.name = room.value.game.to_movie.title;
    }
},700);

const toggleReady = ()=>{
    setTimeout(()=>{
        socketRoom.value.send(JSON.stringify({
            header : "toggle_ready", 
            data : null 
        }));
    },300);
}

// const bla = ()=>{
//     console.log("blaikj");
// }
</script>

<style lang="scss" scoped>

</style>