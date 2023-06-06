<template>
    <nav 
        v-on-click-outside="onClickOutsideHandler"
        class="sticky top-0 z-10 flex justify-between bg-cyan-700 shadow-md h-14 py-[3px]">
        <div class="flex items-center ml-20">
            <RouterLink to="/" class="text-xl text-white font-bold ">Tourna Movie</RouterLink>
        </div>
        <div class="text-xl text-white flex justify-around w-[15%] ">
            <button @click="goToMovies" >Movies</button>
            <button @click="goToActors" >Actors</button>
        </div>
        <div @click="userInfoShow = !userInfoShow" class=" relative px-2 flex items-center mx-20 my-auto">
            <!--profile picture-->
            <img class="h-11 w-11 rounded-full ring-1 ring-gray-400 hover:cursor-pointer" :src="userInfoL.image" referrerpolicy="no-referrer">
            <div class="absolute bg-green-500 w-2 h-2 right-2 bottom-1 rounded-full ring-1 ring-white"></div>
            <!--profile picture end-->  
            
            <!--profile menu-->
            <profileMenu v-if="userInfoShow" :userInfoL="userInfoL" :socket="socket"/>
            <!--profile menu end-->
        </div>
    </nav>
</template>

<script setup>
import {ref, toRefs} from 'vue';
import profileMenu from '../components/profileMenu.vue';
import {vOnClickOutside } from '@vueuse/components';
import {useRouter} from 'vue-router';

const router = useRouter();

const props = defineProps({
    userInfoL: Object,
    socket: Object
});

const socket = ref(props.socket);
const { userInfoL } = toRefs(props);
const userInfoShow = ref(false);
// console.log(userInfoL.value.name)

const onClickOutsideHandler = ()=>{
    if(userInfoShow.value === true){
        userInfoShow.value = false
    }
};

const goToMovies = ()=>{
    router.push({name:"Movies"});
};
const goToActors = ()=>{
    router.push({name:"Actors"});
};

</script>