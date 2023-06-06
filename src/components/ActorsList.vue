<template>
    <div v-if="errorMes" class="mt-16">
        <h1 class="text-white text-center text-xl font-bold">{{errorMes}}</h1>
    </div>
    <div class="mb-10 px-8 py-4 grid grid-cols-2 md:grid-cols-3  xl:grid-cols-5 gap-4 content-center">
        <div v-for="actor in ActorsList" :key="actor" class="relative">
            <ActorCard :actor="actor" />
        </div>
    </div>
    
</template>

<script setup>
import ActorCard from '../components/ActorCard.vue';
import {ref, onMounted, onUpdated, watch} from 'vue';
import getActros from '../api/getActros';
import {useRoute} from 'vue-router';

const route = useRoute();

const token = ref(JSON.parse(localStorage.token));  
const errorMes = ref('');
const pageNumber = ref(1);
const search = ref('');
if(route.query.search){
    search.value = route.query.search;
}
console.log(search.value)
const ActorsList = ref(await getActros(pageNumber.value, search.value, token.value));


onMounted(()=>{
    watch(
        ()=>route.query.search,
        async(newValue)=>{
            ActorsList.value = (await getActros(pageNumber.value, newValue, token.value)) 
        });

    window.addEventListener("scroll", async()=>{
        let scrollTop = document.documentElement.scrollTop;
        let scrollHeight = document.documentElement.scrollHeight;
        let clientHeight = document.documentElement.clientHeight;
        // scrollTop + clientHeight >= scrollHeight - 10
        if(scrollHeight - scrollTop <= clientHeight ){
            pageNumber.value += 1;
            
            ActorsList.value.push(...await getActros(pageNumber.value, search.value, token.value));
        }
    });
    if(ActorsList.value.length === 0){
        errorMes.value = 'The Actor You have Searched is not found';
    }
    
})



</script>

<style lang="scss" scoped>

</style>