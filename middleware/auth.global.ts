import { storeToRefs } from 'pinia';
import { useAuthStore } from '~/store/auth';

export default defineNuxtRouteMiddleware((to) => {
    const { authenticated } = storeToRefs(useAuthStore());

    if(!authenticated.value && to.name === 'users-id'){
        return navigateTo('/')
    }
    
})