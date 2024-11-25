<script setup>
import {ref} from 'vue'

const email = ref('')
const password = ref('')
const password_again = ref('')
const type = ref('')
const organization = ref('')
const message = ref('')

function password_check(){
    if(password.value === password_again.value){
        validate_user()
    }else{
        message.value = 'Passwords do not match'
    }
}

async function validate_user(){
    const user = await $fetch('/api/get_user_email',{
        method: 'POST',
        body: {
            email: email.value,
        }
    })

   if(user.user !==null){
        message.value = 'Email taken'
   }else if(type.value === 'admin'){
        validate_org()
   }else if(type.value === 'standart'){
        register_private()
   }
}

async function validate_org(){
     const org = await $fetch('/api/get_org_name',{
        method: 'POST',
        body: {
            name: organization.value,
        }
    })

    if(org.organization !== null){
        message.value = 'Organization exists'
    }else{
        register_admin()
    }

}

async function register_admin(){
     const org = await $fetch('/api/create_org',{
        method: 'POST',
        body: {
            name: organization.value 
        }
    })


   const user = await $fetch('/api/register',{
        method: 'POST',
        body: {
            email: email.value,
            password: password.value,
            isAdmin: true,
            orgId: org.organization.id
        }
    })
    alert("Great success!")
    navigateTo("/login") 
}
async function register_private(){
    const organization = await $fetch('/api/create_org',{
        method: 'POST',
        body: {
            name: email.value + "_org" 
        }
    })

   const user = await $fetch('/api/register',{
        method: 'POST',
        body: {
            email: email.value,
            password: password.value,
            isAdmin: true,
            orgId: organization.organization.id
        }
    })
    alert("Great success!")
    navigateTo("/login") 
}

</script>


<template>
  <form class="login-box" v-on:submit.prevent="password_check">
  <h1>Reģistrācija</h1>
        E-pasts: <input v-model="email" required/><br>
        Parole: <input v-model="password" required/><br>
        Parole atkārtoti: <input v-model="password_again" required/><br>
        
            Konta tips:
            <select v-model="type" required>
                <option value="admin">Organizācijas administrators</option>
                <option value="standart">Standarta lietotājs</option>
            </select><br>
        <div v-if="type === 'admin'">
            Organizācijas nosaukums: <input v-model="organization" required/><br>
        </div>
        <p>{{ message }}</p>

    <input type="submit" value="Reģistrēties">
  </form>
</template>