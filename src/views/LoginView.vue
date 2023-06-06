<template>
    <div class="flex flex-col items-center py-10 ">
        <div v-if="emailLogin" class="container backdrop-blur-sm bg-white/30 border-0 rounded-xl flex flex-col items-center h-auto py-6 px-10 shadow-md">
            <div class="flex w-[95%]">
                <button @click="emailLogin = false" class="text-2xl font-bold w-[15%] mr-[27%]">
                    <svg style="color: white; font-weight:bold" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-left" viewBox="0 0 16 16"> <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z" fill="white"></path> </svg>
                </button>
                <h1 class="text-2xl text-white">Log in</h1>
            </div>
            <h3 v-if="errorMes" class="text-red-500 text-xl">{{ errorMes }}</h3>
            <div class="mt-2 w-[80%] flex flex-col items-baseline">
                <input type="text" class="input-text" v-model="email" placeholder="Email">
                <input v-if="!showPassword" type="password" class="input-text" v-model="password" placeholder="Password">
                <input v-else type="text" class="input-text" v-model="password" placeholder="Password">
                <label class="mt-2">
                    <input type="checkbox" name="show_password" class="bg-gray-100 p-1" v-model="showPassword">
                    <span class="text-gray-200 ml-2">Show Password</span>
                </label>
            </div>        
            <button class="mt-10 button" @click="login">Log in</button>
            <p class="mt-2">
                Forgot
                <span class="text-gray-200 hover:text-gray-400">
                    <button class="a" @click="forgotPassword">Password</button>
                </span>
            </p>
            <p>
                Do not have an
                <span class="text-gray-200 hover:text-gray-400">
                    <button @click="registerButton" class="a" href="#">Account</button>
                </span>
            </p>      
            
        </div>

        <!--First component-->
            <div v-if="!emailLogin" class="container backdrop-blur-sm bg-white/30 border-0 rounded-xl flex flex-col items-center h-auto py-6 px-10 shadow-md">
                <img src="../assets/logo.png" class="w-[40%] h-[40%]">
                <h1 class="text-2xl text-white font-bold">Tornuva Movie</h1>
                <div class="flex flex-col mt-8">
                    <button @click="googleLogin" class="bg-white rounded-full py-2 px-6 flex mt-3">
                        <img src="../assets/google.png" class="w-[10%] mr-2">
                        Continue with Google
                    </button>
                    <button @click="twitterLogin" class="bg-white rounded-full py-2 px-6 flex mt-3">
                        <img src="../assets/twitter.png" class="w-[10%] mr-2">
                        Continue with Twitter
                    </button>
                </div>
                <h3 class="mt-3 text-white">OR</h3>
                <div>
                    <button @click="emailLogin = true" class="rounded-full py-2 px-7 flex mt-3 text-gray-500 bg-gray-800">
                        <img src="../assets/email.png" class="w-[10%] mr-2 mt-[1px]">
                        Continue with Email
                    </button>
                </div>
            </div>
        <!--First component End-->
    </div>
</template>

<script setup>
import axios from 'axios';
import {ref} from 'vue';
import { userInfoStore } from '../Store/user';
import {useRouter} from 'vue-router';
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider,  TwitterAuthProvider} from 'firebase/auth';


const email = ref("");
const password = ref("");
const showPassword = ref(false);
const errorMes = ref('');
const router = useRouter();
const emailLogin = ref(false);

const Googleprovider = new GoogleAuthProvider();
const Twitterprovider = new  TwitterAuthProvider();
const auth = getAuth();
const token = ref('');

const userInfoState = userInfoStore();
const {addUser} = userInfoState;

const login = async()=>{
    
    // try{
    //     const response  = await axios.post(`https://apisrv0001.tournamovie.com/login`, 
    //     {
    //         "username_or_email": user_name.value,
    //         "password": password.value
    //     });
    //     addUser(response.data.id,response.data.name,response.data.email,response.data.image,response.data.token);
    //     localStorage.setItem("token", JSON.stringify(response.data.token));        

    //     router.push({name:'Home'});

                
    // }catch(error){
    //     errorMes.value= error.response.data.error;
    // }   
    signInWithEmailAndPassword(auth, email.value, password.value)
        .then((data) => {
            // const response = await axios.post(`https://apisrv0001.tournamovie.com/login`,{
            //     "username_or_email": email.value,
            //     "password": password.value
            // });
            localStorage.setItem("token", JSON.stringify(data.user.getIdToken));        
            router.push({name:'Home'});
        })
        .catch((error) => {
            // const errorCode = error.code;
            errorMes.value = error.message;
        });
};

const registerButton = ()=>{
    router.push({name: 'Signup'});
};

const forgotPassword = ()=>{
    router.push({name:"ForgotPassword"})
};

const googleLogin = ()=>{
    signInWithPopup(auth, Googleprovider)
        .then(async(data)=>{
            // console.log(await(data.user.getIdToken()))
            token.value = await(data.user.getIdToken());
            // console.log(token.value);
            localStorage.setItem("token", JSON.stringify(token.value));      
            router.push({name:'Home'});
           
        })
        .catch((error)=>{
            console.log(error);
        })
}
const twitterLogin = ()=>{
    signInWithPopup(auth, Twitterprovider)
        .then((data)=>{
            console.log(data);
        })
        .catch((error)=>{
            console.log(error);
        })
}

</script>

<style scoped>
input:focus 
{
    outline: none !important;
}
</style>