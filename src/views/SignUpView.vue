<template>
    <div class="flex flex-col items-center py-10 mt-10">
        <div class="container backdrop-blur-md bg-white/30 border-0 rounded-xl flex flex-col items-center h-auto py-6 px-10 shadow-md">
            <h2 class="text-xl uppercase">Sign up</h2>
            <h4 class="text-red-400 font-bold mt-2">{{ errorMes }}</h4>
            <input class="input-text" type="text" v-model="name" placeholder="Enter User Name" required>
            <input class="input-text" type="text" v-model="email" placeholder="Enter Your Email" required>
            <input class="input-text" type="password" v-model="password" placeholder="Enter Password" required>
            <input class="input-text" type="password" v-model="password2" placeholder="Renter Password" required>
            <button @click="registerEvent" class="button mt-10">Sign Up</button>
            <p class="mt-2 text-sm">
                I Already have 
                <span > 
                    <button @click="loginReturn" class="text-gray-200 hover:text-gray-400">An Account</button>
                </span>
            </p>
           
        </div>
    </div>
</template>

<script setup>
import {ref} from 'vue'
import router from '../router';
import axios from 'axios';
import { userInfoStore } from '../Store/user';
import {getAuth, createUserWithEmailAndPassword, onAuthStateChanged} from 'firebase/auth';

const userInfoState = userInfoStore();
const {addUser} = userInfoState;

const password = ref("");
const password2 = ref("");
const name = ref("");
const email = ref("");
const errorMes = ref("");

const registerEvent = async()=>{    //async
//    try{
//     if(password.value === password2.value){
//         const response = await axios.post(`https://apisrv0001.tournamovie.com/register`,{
//             "name": name.value,
//             "email": email.value,
//             "password": password.value
//         });
//         addUser(response.data.id,response.data.name,response.data.email,response.data.image,response.data.token);        
//         localStorage.setItem("token", JSON.stringify(response.data.token));
//         router.push({name:"Home",});
//     }
//     else{
//         errorMes.value = "Password must be the same" 
//     }
//    }catch(error){
//     errorMes.value= error.response.data.error;
//    }
if(password.value === password2.value){
    createUserWithEmailAndPassword(getAuth(), email.value, password.value)
        .then((data) => {
            onAuthStateChanged(getAuth(), (user) => {
                if (user) {
                    console.log(user);
                    // ...
                } else {
                    alert("You are signed out Please sign in to continue.")
                }
                });
            
        })
        .catch((error)=>{
            errorMes.value = error.message ;
        })
}else{
    errorMes.value = "Password must be the same";
}
};

const loginReturn = ()=>{
    router.push({name: "Login",});
};

</script>

<style scoped>
input:focus 
{
    outline: none !important;
}
</style>