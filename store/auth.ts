import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
    
    state: () => ({
        authenticated: false,
        user_id: 0
    }),
    actions: {

        async login(email: any) {

            const user = await $fetch('/api/get_user_email',{
                method: 'POST',
                body: {
                    email: email
                }
            })

            if(user.user !== null){
                this.authenticated = true
                this.user_id = user.user.id
            }

        },

        logout() {
            this.authenticated = false
            this.user_id = 0
        }
    }

})