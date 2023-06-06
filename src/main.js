import { createApp } from 'vue';
import App from './App.vue';
import {createPinia} from 'pinia';;
import router from './router';
import { library } from "@fortawesome/fontawesome-svg-core";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAWNKIWs-eHKHuqkd3qbg5ksyN8aTEvUWA",
  authDomain: "tournamovie-c1fd4.firebaseapp.com",
  projectId: "tournamovie-c1fd4",
  storageBucket: "tournamovie-c1fd4.appspot.com",
  messagingSenderId: "204138051686",
  appId: "1:204138051686:web:241f0cfb120f4b8ee395a7"
};

// Initialize Firebase
initializeApp(firebaseConfig);

library.add(faPhone);

import "../src/assets/tailwind.css"

const app = createApp(App)

app.use(router)
app.use(createPinia())

app.component("font-awesome-icon", FontAwesomeIcon).mount('#app')
