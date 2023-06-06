<template>
    <div class="mt-4 p-1 flex justify-end pr-10 ">
        <label class="py-2 pr-1 pl-5 w-[90%] xxs:w-[60%] xs:w-[40%] lg:w-[30%] xl:w-[25%] text-white text-md rounded-md ring-1 ring-gray-400">
            <input @keyup.enter="searchHanddle" type="text" v-model="searchInput" class="bg-transparent focus:outline-none w-[90%]">
            <button @click="searchHanddle" class="items-center mt-[1px]">
                <svg style="color: rgb(203, 200, 180);" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16"> <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" fill="#cbc8b4"></path> </svg>
            </button>
        </label>
    </div>
</template>

<script setup>
import {ref, onUpdated} from 'vue';
import {useRouter} from 'vue-router';

const router = useRouter();

const search = ref('');
const searchInput = ref('');

const props = defineProps({
    modelName:String
});

const searchHanddle = ()=>{
    search.value = searchInput.value;
    if(search.value){
        router.push({
            name: props.modelName,
            query:{
                search: search.value
            }
        })
    };
    
};

</script>

