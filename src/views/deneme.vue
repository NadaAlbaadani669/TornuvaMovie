<template>
    <div v-for="x in userInfo" :key="x">
     {{ x.id }}
     {{ x.name }}
     {{ x.email }}
     {{ x.image }}
     {{ x.token }}
    </div>
    <input v-model="newNumber" type="text">
    <input v-model="email" type="text">
    <button class="button" @click="addNumber(newNumber, email)">Add number</button>

    <hr class="mt-8">
    <button class="button mt-8" @click="deleteUser">Remove Items</button>
</template>

<script setup>
import { userInfoStore } from '../Store/user';
import {ref} from 'vue';
import { storeToRefs } from 'pinia';

const newNumber = ref("");
const email = ref("");


const userStore = userInfoStore();
const {userInfo} = storeToRefs(userStore);
const {addUser , deleteUser} = userStore;

const addNumber = (x, y)=>{
    addUser(x, y)
    newNumber.value = ""
    email.value = ""
}


console.log(userInfo)
</script>

<style lang="scss" scoped>

</style>