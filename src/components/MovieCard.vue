<template>
    <div class=" p-2" >
        <div @click="handdle" class="relative flex flex-col hover:cursor-pointer">
            <img class=" shadow-xl opacity-100 hover:opacity-30 duration-300" :src="imageLink" alt="">
            <div class="absolute top-3 right-3 p-[0.4rem] rounded-full bg-gray-400  text-white">
                <p class="text-sm font-light">{{ parseFloat(props.movie.vote_average).toFixed(1) }}</p>
            </div>
            <p class="text-white text-opacity-100 mt-2 font-bold">{{ props.movie.title}} 
                <span class="font-light">({{ (props.movie.release_date).slice(0, 4)}})</span>
            </p>    
               
        </div>
    </div>
</template>

<script setup>
import {ref, toRefs} from 'vue';
import {useRouter} from 'vue-router';

import {movieInfoStore} from '../Store/movie.js';
import { storeToRefs } from 'pinia';

const props = defineProps({
    movie: Object,
});
const {movie} = toRefs(props);

const movieInfoState = movieInfoStore();
const {addMovie} = movieInfoState;

const imageLink = ref(`https://image.tmdb.org/t/p/original${movie.value.poster_path}`);
const router = useRouter();

const handdle = ()=>{
    addMovie(movie.value);    
    router.push({
        name:"Movie",
        params:{
            title: movie.value.title,
        },
        props:{
            movie: movie.value,
        }
    });
}
</script>

<style lang="scss" scoped>

</style>