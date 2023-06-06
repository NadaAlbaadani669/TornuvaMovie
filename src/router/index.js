import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import SignupView from '../views/SignUpView.vue'
import ForgotPasswordView from '../views/ForgotPasswordView.vue'
import MoviesView from '../views/MoviesView.vue'
import MovieSearchView from '../views/SearchView.vue'
import MovieView from '../views/MovieView.vue'
import ActorsView from '../views/ActorsView.vue'
import ActorsSearchView from '../views/ActorsSearchView.vue'
import GameRoomView from '../views/GameRoomView.vue'
import DeleteAccountView from '../views/DeleteAccountView.vue'



const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeView
    },
    {
      path: '/Login',
      name: 'Login',
      component: LoginView
    },
    {
      path: '/Signup',
      name: 'Signup',
      component: SignupView
    },
    {
      path: '/ForgotPassword',
      name: 'ForgotPassword',
      component: ForgotPasswordView
    },
    {
      path: '/Movies',
      name: 'Movies',
      component: MoviesView
    },
    {
      path: '/Movies/Search',
      name: 'MovieSearch',
      component: MovieSearchView
    },
    {
      path: '/Movie/:title',
      name: 'Movie',
      component: MovieView
    },
    {
      path: '/Actors',
      name: 'Actors',
      component: ActorsView
    },
    {
      path: '/Actors/Search',
      name: 'ActorsSearch',
      component: ActorsSearchView
    },
    {
      path: '/Room',
      name: 'GameRoom',
      component: GameRoomView,
      props: true
    },
    {
      path: '/DeleteAccount',
      name: 'DeleteAccount',
      component: DeleteAccountView
    }
   
  ]
})

export default router
