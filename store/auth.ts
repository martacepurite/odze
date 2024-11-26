import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
    
    state: () => ({
        authenticated: false,
        user_id: 0,
        usertype: '',
        orgid: 0
    }),
    actions: {

        async login(email: any, password: any){

            const user = await $fetch('/api/get_user_email',{
                method: 'POST',
                body: {
                    email: email
                }
            })

            if(user.user !== null){
                if(user.user.password === password){

                    this.authenticated = true
                    this.user_id = user.user.id
                    this.usertype = user.user.userType
                    this.orgid = user.user.orgId
                }
            }
        },

        logout() {
            this.authenticated = false
            this.user_id = 0
            this.usertype = ''
            this.orgid = 0
        }
    },

    })