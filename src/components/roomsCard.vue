<template>
   <!--rooms card-->
   <div class="flex justify-between pb-6 pt-1 px-4 rounded-lg shadow-md mt-6 bg-gradient-to-tr from-cyan-800 to-slate-600">
    <!-- <p class="text-white">{{ 'from_actor' in room.game }}</p> -->
    <div class="relative w-[30%]">
        
        <img 
            class="absolute top-2 rounded-full shadow-xs shadow-black ring-1 ring-gray-400 w-16 h-16 object-cover"
            :src=" 'from_actor' in props.room.game ? src + props.room.game.from_actor.profile_path : src + props.room.game.from_movie.poster_path "
        >
        <img 
            class="absolute top-6 left-10 shadow-xs shadow-gray-600 ring-1 ring-gray-400 rounded-full  w-16 h-16 object-cover"
            :src=" 'to_actor' in props.room.game ? src + props.room.game.to_actor.profile_path : src + props.room.game.to_movie.poster_path " 
        >
    </div>
    <div class="w-[50%] flex flex-col pt-2">
        <h3 class="text-lg font-bold text-white">{{props.room.name}}</h3>
        <p class="mt-2 text-white text-xs">{{Math.floor(props.room.time_limit / 60)}} minute</p>
        <p class="text-white text-xs">{{ props.room.step_limit }} steps</p>
    </div>
    <div class="w-[20%] flex flex-col justify-around items-center">
        <img v-if="props.room.password && !props.room.in_game" src="../assets/lock.svg" class="w-[30%] h-[30%] mt-3">
        <p v-if="props.room.in_game" class="text-md font-bold text-white">In Game</p>
        <p v-if="!props.room.in_game && props.room.player_count === props.room.player_limit" class="text-md font-bold text-white">Full</p>
        <p class="text-white text-xs font-light">
            <span :style='{color: props.room.player_count === 0 ? "red" : "lawngreen"}'>{{props.room.player_count}}</span>
            /{{props.room.player_limit}}
        </p>
    </div>
    </div>
    <!--rooms card End-->
</template>

<script setup>
import {ref, toRefs} from 'vue';

const src = ref("https://image.tmdb.org/t/p/original");

const props = defineProps({
    room: Object,
});

</script>

<style lang="scss" scoped>

</style>