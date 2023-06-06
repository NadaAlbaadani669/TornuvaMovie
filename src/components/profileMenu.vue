<template>
    <div  class="absolute top-14 right-0 h-auto w-72 bg-cyan-700 rounded-md py-4 px-2 shadow-md overflow-visible z-10">
        <div class="flex border-b-2 pb-2 ml-1">
            <div class="relative pt-1">
                <img class="h-11 w-11 rounded-full ring-1 ring-gray-400" :src="props.userInfoL.image" alt="">
                <div class="absolute bg-green-500 w-2 h-2 right-2 bottom-1 rounded-full ring-1 ring-white"></div>
            </div> 
            <div class="ml-2">
                <h3 class="text-xl">{{ props.userInfoL.name }}</h3>
                <h4 >{{ props.userInfoL.email }}</h4> 
            </div>                                  
        </div>

        <!--Log out button-->
        <div @click="signOut" class="flex w-[90%] ml-[5%] mt-4 py-2 justify-center hover:bg-cyan-500 rounded-md hover:cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-log-out"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
            <p class="ml-2">Sign out</p>
        </div>
        <div @click="deleteUserFirebase" class="flex justify-center w-[90%] ml-[5%] mt-2 py-2 hover:bg-cyan-500 rounded-md hover:cursor-pointer">
            <p>Delete Account</p>
        </div>
        <!--Log out button end-->
    </div>
</template>

<script setup>
import {ref, watch} from 'vue';
import { useRouter } from 'vue-router';
import { userInfoStore } from '../Store/user';

const props = defineProps({
    userInfoL: Object,
    socket: Object
});
 
const socket = ref(props.socket);
const userInfoState = userInfoStore();
const {deleteUser} = userInfoState;

const router = useRouter();

const signOut = ()=>{    
    socket.value.close(
        console.log("connection Closed"),
    );
    localStorage.removeItem('token');
    deleteUser();
    router.push({name: "Login"});
}

const deleteUserFirebase = () => {
    router.push({name: "DeleteAccount"});
}
</script>

<style lang="scss" scoped>

</style>