import {defineStore} from 'pinia';


export const userInfoStore = defineStore("userInfo", {
    state : ()=> ({
        userInfo: [],
    }),
    actions: {
        addUser(id, name, email, image, token){
            this.userInfo.push({
                id: id,
                name: name,
                email: email,
                image: image,
                token: token,
            });
        },
        deleteUser(){
            this.userInfo = []
        },
        
    }
})