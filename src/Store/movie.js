import {defineStore} from 'pinia';

export const movieInfoStore = defineStore("movieInfo", {
    state: ()=>({
        movieInfo: {},
    }),
    actions:{
        addMovie(movie){
            this.movieInfo = movie 
        },
        deleteMovie(){
            this.movieInfo = []
        },
    }
})