<template>
    <div class="flex flex-col items-center py-10 mt-28">
        <div class="container backdrop-blur-md bg-white/30 border-0 rounded-xl flex flex-col items-center h-auto py-6 px-10 shadow-md">
            <!--send code-->
            <div v-if="section === 1" class="flex flex-col items-center">
                <h3 class="text-md text-red-500 font-bold">{{ errorMes }}</h3>
                <h1 class="text-2xl mt-2 mb-4">Forgot Password</h1>
                <input class="input-text w-[60%]" type="text" v-model="email" placeholder="Enter Your Email" required>
                <button class="mt-6 button" @click="sendCode">Send Code</button>
            </div>
            <!--send code end-->
            <!--check code-->
            <div v-if="section === 2" class="flex flex-col items-center">
                <h3 class="text-md text-red-500 font-bold">{{ errorMes }}</h3>
                <h1 class="text-2xl mt-2 mb-4">Check Code</h1>
                <input class="input-text" type="text" v-model="code" placeholder="Enter confirmation code" required>
                <button class="mt-6 button" @click="checkCode">Check Code</button>
            </div>
            <!--check code end-->
            <!--Reset Password-->
            <div v-if="section === 3" class="flex flex-col items-cnter">
                <h1 class="text-2xl mb-4">Reset Password</h1>
                <h3 class="text-md text-red-500 font-bold">{{ errorMes }}</h3>
                <input type="password" class="input-text" v-model="password" placeholder="Enter Password" required>
                <input type="password" class="input-text" v-model="password2" placeholder="Re-enter Password" required>
                <button class="button mt-6" @click="resetPassword">Reset Password</button>
            </div>
            <!--Reset Password End-->
            <div v-if="section === 4" class="flex flex-col items-center">
                <h1 class="text-xl">{{successMes}}</h1>
            </div>
        </div>
    </div>
</template>

<script setup>
import axios from 'axios';
import {ref} from 'vue';
import { useRouter } from 'vue-router';

const email = ref("");
const errorMes = ref("");
const router = useRouter();
const section = ref(1);
const code = ref(null);
const password = ref("");
const password2 = ref("");
const successMes = ref("")

const sendCode = async()=>{
    try{
        if(email.value){        
            const response = await axios.get(`https://apisrv0001.tournamovie.com/forgot?email=${email.value}`);
            
            var x = setInterval(()=>{
            var expire_date = new Date(response.data.expire_at * 1000).getTime();
            var current_time = new Date().getTime();
            var finished = expire_date - current_time
            if (finished < 0) {
                clearInterval(x);
                router.push({name:"Login"})
                console.log("EXPIRED");
            }
            },1000);
            section.value = 2

        }else{
            errorMes.value = "Enter your email"; 
        }
    }catch(error){
        errorMes.value= error.response.data.error;
    }
};
const checkCode = async()=>{
   try{
    const response = await axios.get(`https://apisrv0001.tournamovie.com/forgot/check?email=${email.value}&code=${code.value}`);
    if(response.data.status === `Code ${code.value} is correct.`){
        section.value = 3;
    };
   }catch(error){
    errorMes.value= error.response.data.error;
   }
};

const resetPassword = async()=>{
    try{
        if(password.value === password2.value){
            const response = await axios.post(`https://apisrv0001.tournamovie.com/forgot/change`,
            {
                "code": code.value,
                "email": email.value,
                "password": password.value,
                "repassword": password2.value
            });
            
            successMes.value = response.data.status + "You need to login to your account";
            section.value = 4;
            setTimeout(()=>{
                router.push({name:"Login"});
            },6000);
        }
        else{
            errorMes.value = "Password must be the same"; 
        }
    }catch(error){
        errorMes.value= error.response.data.error;
    }
}
</script>

<style scoped>
input:focus 
{
    outline: none !important;
}
</style>