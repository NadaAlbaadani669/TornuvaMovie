<template>
     <!--  -->
    <div class="background pb-8 text-white pt-28 px-4 xxs:px-18 xs:px-20 bg-opacity-5" :style="{ 'background-image': 'url(' + backgroundUrl + ')' }">  
        <div class="flex">
            <div>
                <img class="w-30 h-80  md:w-54 md:h-80 z-2 shadow-black shadow-xl" :src="posterUrl" alt="">
            </div>
            <div class="pt-1 xs:pt-4 ml-2 xxs:ml-4 xs:ml-8 w-2/5 md:w-3/5 text-white shadow-black drop-shadow-xl">
                <h3 class="text-md xs:text-lg font-bold">{{ movie.title }}</h3>
                <p class="mt-2 text-base">{{ movie.release_date }}</p>
                <p class="text-base">Language: <span class="uppercase">{{ movie.original_language }}</span></p>
                <p class="mt-2 xs:w-94 xs:mt-8 xs:max-h-48 text-[0.5rem] xxs:text-[0.65rem] mx:text-sm md:text-base">{{ movie.overview }}</p>
            </div>
        </div>
    </div>
</template>

<script setup>
import {ref} from 'vue';

import {movieInfoStore} from '../Store/movie.js';
import { storeToRefs } from 'pinia';




const movieInfoState = movieInfoStore();
const {movieInfo} = storeToRefs(movieInfoState);

const movie = ref(movieInfo.value);
const backgroundUrl = ref("https://image.tmdb.org/t/p/original"+movie.value.backdrop_path);
const posterUrl = ref("https://image.tmdb.org/t/p/original"+movie.value.poster_path);

</script>

<style scoped>
.background{
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    position: relative;
    height: 39rem;
    width: auto;
}
</style>