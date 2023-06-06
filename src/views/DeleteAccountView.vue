<template>
    <div class="w-[40%] ml-[30%] mt-20 container backdrop-blur-sm bg-white/30 border-0 rounded-xl flex flex-col items-center h-auto py-6 px-10 shadow-md">
        <h3 class="text-white text-lg">Are You sure You want to delete You Account</h3>
        <div class="flex justify-evenly w-[90%] mt-10">
            <button @click="yes" class="bg-gray-300 hover:bg-gray-500 py-2 px-8 rounded-xl">Yes</button>
            <button @click="no" class="bg-gray-300 hover:bg-gray-500 py-2 px-8 rounded-xl">No</button>
        </div>
    </div>
</template>

<script setup>
import {ref} from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const router = useRouter();
const token = ref(JSON.parse(localStorage.token));

const yes = async()=>{
    const response = await axios.delete(`https://apisrv0001.tournamovie.com/update/delete`,
    {
      headers: {
        Authorization: `Bearer ${token.value}`,
      }
    });
    if (response.status === 200) {
        alert('Account deleted successfully');
        router.push({name: "Login"});        
    } else {
        Alert(response.error.message);
    }
 
    
}
const no = ()=>{
    router.push({name: "Home"});
}

</script>

<style lang="scss" scoped>

</style>