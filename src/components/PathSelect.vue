<template>
    <div class="text-white p-4 ring-2 ring-gray-400 flex flex-col items-center rounded-md">
        <div class="flex justify-between w-[90%]">
            <button @click="showPath.type = false" class="text-2xl font-bold w-[8%]">
                <svg style="color: white; font-weight:bold" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-left" viewBox="0 0 16 16"> <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z" fill="white"></path> </svg>
            </button>
            <h2 class="text-xl font-bold w-[90%] text-center">Pick Path</h2>
        </div>
        <!--card Section-->
        <div class="flex justify-between mt-8">
            <!--first card-->
            <div class="flex flex-col items-center w-[40%] ">
                <button class=" bg-red-300 ">
                    <img :src="path1.img" class="w-[100%] object-contain"> 
                </button>             
                <p class="font-light text-xs mt-2 w-[70%] h-12">{{ path1.name }}</p>
                <div class="flex content-center py-2 mt-4">
                    <button @click="changePath1">
                        <svg style="color: rgb(214, 214, 209);" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-left-fill mt-1" viewBox="0 0 16 16"> <path d="m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z" fill="#d6d6d1"></path> </svg>
                    </button>
                    <p class="font-light mx-2">{{path1.type}}</p>
                    <button @click="changePath1">
                        <svg style="color: rgb(214, 214, 209);" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-right-fill mt-1" viewBox="0 0 16 16"> <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z" fill="#d6d6d1"></path> </svg>
                    </button>
                </div>
            </div>

            <!--svgs-->
            <div class="flex flex-col justify-around w-[15%] ml-4">
                <svg style="color: white" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-double-right" viewBox="0 0 16 16"> <path fill-rule="evenodd" d="M3.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L9.293 8 3.646 2.354a.5.5 0 0 1 0-.708z" fill="white"></path> <path fill-rule="evenodd" d="M7.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L13.293 8 7.646 2.354a.5.5 0 0 1 0-.708z" fill="white"></path> </svg>
                <button @click="suffle">
                    <!-- <svg style="color: white" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-shuffle" viewBox="0 0 16 16"> <path fill-rule="evenodd" d="M0 3.5A.5.5 0 0 1 .5 3H1c2.202 0 3.827 1.24 4.874 2.418.49.552.865 1.102 1.126 1.532.26-.43.636-.98 1.126-1.532C9.173 4.24 10.798 3 13 3v1c-1.798 0-3.173 1.01-4.126 2.082A9.624 9.624 0 0 0 7.556 8a9.624 9.624 0 0 0 1.317 1.918C9.828 10.99 11.204 12 13 12v1c-2.202 0-3.827-1.24-4.874-2.418A10.595 10.595 0 0 1 7 9.05c-.26.43-.636.98-1.126 1.532C4.827 11.76 3.202 13 1 13H.5a.5.5 0 0 1 0-1H1c1.798 0 3.173-1.01 4.126-2.082A9.624 9.624 0 0 0 6.444 8a9.624 9.624 0 0 0-1.317-1.918C4.172 5.01 2.796 4 1 4H.5a.5.5 0 0 1-.5-.5z" fill="white"></path> <path d="M13 5.466V1.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384l-2.36 1.966a.25.25 0 0 1-.41-.192zm0 9v-3.932a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384l-2.36 1.966a.25.25 0 0 1-.41-.192z" fill="white"></path> </svg> -->
                    <img src="../assets/dice.png" alt="">
                </button>
            </div>
            
            <!--Second card-->
            <div class="flex flex-col items-center w-[40%] ">
                <button class=" bg-red-300 ">
                    <img :src="path2.img" class="w-[100%] object-contain"> 
                </button>             
                <p class="font-light text-xs mt-2 w-[70%] h-12">{{ path2.name }}</p>
                <div class="flex content-center py-2 mt-4">
                    <button @click="changePath2">
                        <svg style="color: rgb(214, 214, 209);" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-left-fill mt-1" viewBox="0 0 16 16"> <path d="m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z" fill="#d6d6d1"></path> </svg>
                    </button>
                    <p class="font-light mx-2">{{path2.type}}</p>
                    <button @click="changePath2">
                        <svg style="color: rgb(214, 214, 209);" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-right-fill mt-1" viewBox="0 0 16 16"> <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z" fill="#d6d6d1"></path> </svg>
                    </button>
                </div>
            </div>
        </div>
        <button @click="showPath.type = false" class="w-[80%] rounded-md hover:bg-gray-700 py-2 mt-4">Pick</button>
    </div>
</template>

<script setup>
import {ref, watch, onMounted} from 'vue';
import getRandomMovie from '../api/getRandomMovie.js';
import getRandomActor from '../api/getRandomActor.js';

const token = JSON.parse(localStorage.token);

const props = defineProps({
    path1: Object,
    path2: Object,
    card1: Object,
    card2: Object,
    showPath: Object
});

const path1 = ref(props.path1);
const path2 = ref(props.path2);
const card1 = ref(props.card1);
const card2 = ref(props.card2);
const showPath = ref(props.showPath)


const changePath1 = async() => {
    if(path1.value.type == 'movie'){
        path1.value.type = 'actor';
        card1.value = await(getRandomActor(token));
        path1.value.name = card1.value.name;
        path1.value.img = "https://image.tmdb.org/t/p/original"+card1.value.profile_path;
    }
    else if(path1.value.type == 'actor'){
        path1.value.type = 'movie';
        card1.value = await(getRandomMovie(token));
        path1.value.name = card1.value.title;
        path1.value.img = "https://image.tmdb.org/t/p/original"+card1.value.poster_path;
    } 
}

const changePath2 = async() => {
    if(path2.value.type == 'movie'){
        path2.value.type = 'actor';
        card2.value = await(getRandomActor(token));
        path2.value.name = card2.value.name;
        path2.value.img = "https://image.tmdb.org/t/p/original"+card2.value.profile_path;
    }
    else if(path2.value.type == 'actor'){
        path2.value.type = 'movie';
        card2.value = await(getRandomMovie(token));
        path2.value.name = card2.value.title;
        path2.value.img  = "https://image.tmdb.org/t/p/original"+card2.value.poster_path;
    } 
}

const suffle = async() => {
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
}


</script>

<style scoped>
.img{
    max-width: 70% !important;
    min-width: 69% !important;
}
</style>