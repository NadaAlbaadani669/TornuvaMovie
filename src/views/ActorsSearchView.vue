<template>  
    <!--Navbar-->
        <NavBar :userInfoL="userInfoL" />
    <!--Navbar-->
    <!--search section-->
        <SearchBar modelName="ActorsSearch" />
    <!--search section End-->
    
    <Suspense>
        <ActorsList />
        <template #fallback> 
            <div class="text-white text-3xl font-bold ml-[33%] md:ml-[40%] lg:ml-[42%] xl:ml-[45%] mt-36">
                <h1>Loading... </h1>
            </div>    
        </template>
    </Suspense>
    <!--Navbar End-->

</template>

<script setup>
import {ref, onMounted} from 'vue';
import axios from 'axios';
import {useRouter} from 'vue-router';
import NavBar from '../components/NavBar.vue';
import SearchBar from '../components/SearchBar.vue';
import { useRoute } from 'vue-router';
import ActorsList from '../components/ActorsList.vue';

const route = useRoute();
const router = useRouter();

const userInfoL = ref([]);


onMounted(async() => {   
    if(localStorage.token){
        const token = JSON.parse(localStorage.token);
        const response = await axios.get(`https://apisrv0001.tournamovie.com/profile`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        userInfoL.value = {
            id : response.data.id,
            name : response.data.name,
            email : response.data.email,
            image : response.data.image,
        };
    }else{
        router.push({name:"Login",});      
    }
});


</script>
