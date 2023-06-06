<template>
    <div class="mt-4 w-[100%] p-4 rounded-lg  backdrop-blur-sm bg-cyan-600/30">
        <div class="flex w-[95%] text-center">
            <button @click="showEditRoom.type = false" class="text-2xl font-bold w-[8%]">
                <svg style="color: white; font-weight:bold" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-left" viewBox="0 0 16 16"> <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z" fill="white"></path> </svg>
            </button>
            <h2 class="text-white text-xl ml-[25%]">Update Room</h2>
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
            
    </div>
</template>

<script setup>
import {ref} from 'vue';

const props = defineProps({
    showEditRoom : Object,
    room: Object,
});
const showEditRoom = ref(props.showEditRoom);
const room = ref(props.room);

console.log(room.value)


</script>

<style lang="scss" scoped>

</style>