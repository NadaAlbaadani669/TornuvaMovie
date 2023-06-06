<template>
    <div v-if="errorMes" class="mt-16">
        <h1 class="text-white text-center text-xl font-bold">{{errorMes}}</h1>
    </div>
    <div class="mb-10 px-8 py-4 grid grid-cols-2 md:grid-cols-3  xl:grid-cols-5 gap-4 content-center">
        
        <div v-for="movie in moviesList" :key="movie" class="relative">
            <MovieCard :movie="movie" />
        </div>
    </div>
    
</template>

<script setup>
import MovieCard from '../components/MovieCard.vue';
import {ref, onMounted, onUpdated, watch} from 'vue';
import getMovies from '../api/getMovies';
import {useRoute} from 'vue-router';


const route = useRoute();

const token = ref(JSON.parse(localStorage.token));  
const errorMes = ref('');
const pageNumber = ref(1);
const search = ref('');
if(route.query.search){
    search.value = route.query.search;
}

const moviesList = ref(await getMovies(pageNumber.value, search.value, token.value));


onMounted(()=>{
    watch(
        ()=>route.query.search,
        async(newValue)=>{
            moviesList.value = (await getMovies(pageNumber.value, newValue, token.value)) 
        }
    );

    window.addEventListener("scroll", async()=>{
        let scrollTop = document.documentElement.scrollTop;
        let scrollHeight = document.documentElement.scrollHeight;
        let clientHeight = document.documentElement.clientHeight;
        // scrollTop + clientHeight >= scrollHeight - 10
        if(scrollHeight - scrollTop <= clientHeight ){
            pageNumber.value += 1;
            
            moviesList.value.push(...await getMovies(pageNumber.value, search.value, token.value));
        }
    });
    if(moviesList.value.length === 0){
        errorMes.value = 'The Movie You have Searched is not found';
    }
    
})



</script>

<style lang="scss" scoped>

</style>