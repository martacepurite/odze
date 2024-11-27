<script setup>

import { ref } from 'vue'

const email = ref('')
const password = ref('')
const password_again = ref('')
const type = ref('')
const organization = ref('')
const message = ref('')

function password_check() {
    if (password.value === password_again.value) {
        validate_user()
    } else {
        message.value = 'Passwords do not match'
    }
}

async function validate_user() {
    const user = await $fetch('/api/get_user_email', {
        method: 'POST',
        body: {
            email: email.value,
        }
    })

    if (user.user !== null) {
        message.value = 'Email taken'
    } else if (type.value === 'admin') {
        validate_org()
    } else if (type.value === 'standart') {
        register_private()
    }
}

async function validate_org() {
    const org = await $fetch('/api/get_org_name', {
        method: 'POST',
        body: {
            name: organization.value,
        }
    })

    if (org.organization !== null) {
        message.value = 'Organization exists'
    } else {
        register_admin()
    }

}

async function register_admin() {
    const org = await $fetch('/api/create_org', {
        method: 'POST',
        body: {
            name: organization.value,
            isPrivate: false
        }
    })


    const user = await $fetch('/api/register', {
        method: 'POST',
        body: {
            email: email.value,
            password: password.value,
            userType: 'orgadmins',
            orgId: org.organization.id
        }
    })
    alert("Great success!")
    navigateTo("/login")
}

async function register_private() {
    const organization = await $fetch('/api/create_org', {
        method: 'POST',
        body: {
            name: email.value + "_org",
            isPrivate: true
        }
    })

    const user = await $fetch('/api/register', {
        method: 'POST',
        body: {
            email: email.value,
            password: password.value,
            userType: 'privusers',
            orgId: organization.organization.id
        }
    })
    alert("Great success!")
    navigateTo("/login")
}

</script>


<template>
    <section>
        <div class="signin">
            <div class="content">
                <h2>Reģistrācija</h2>
                <form class="form" v-on:submit.prevent="password_check"> <!--class="login-box"-->

                    <div class="inputBox">
                        <input v-model="email" required /> <i>E-pasts:</i>
                    </div>
                    <div class="inputBox">
                        <input v-model="password" required /> <i>Parole:</i>
                    </div>
                    <div class="inputBox">
                        <input v-model="password_again" required /> <i>Parole atkārtoti:</i>
                    </div>

                    <div class="inputBox">
                        <div style="color:whitesmoke; line-height: 2em;">Konta tips:</div>
                        <select v-model="type" required>
                            <option value="admin">Organizācijas administrators</option>
                            <option value="standart" selected>Standarta lietotājs</option>
                        </select>
                    </div>

                    <div class="inputBox">
                        <div v-if="type === 'admin'">
                            <input v-model="organization" required /><i>Organizācijas nosaukums:</i>
                        </div>
                    </div>

                    <div class="links">
                        <a href="/login">Uz pieteikšanos</a>
                    </div>

                    <p style="color:red; text-align: center;">{{ message }}</p>

                    <div class="inputBox">
                        <input type="submit" value="Reģistrēties">
                    </div>
                </form>
            </div>
        </div>
    </section>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap');

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Quicksand', sans-serif;
}

section {
    position: absolute;
    width: 99vw;
    height: 69vh;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2px;
    flex-wrap: wrap;
    overflow: hidden;
}

section .signin {
    position: absolute;
    width: 400px;
    background: #222;
    z-index: 1000;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 40px;
    border-radius: 4px;
    box-shadow: 0 15px 35px rgba(0, 0, 0, 9);
}

section .signin .content {
    position: relative;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 40px;
}

section .signin .content h2 {
    font-size: 2em;
    color: green;
    text-transform: uppercase;
}

section .signin .content .form {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 25px;
}

section .signin .content .form .inputBox {
    position: relative;
    width: 100%;
}

section .signin .content .form .inputBox input {
    position: relative;
    width: 100%;
    background: #333;
    border: none;
    outline: none;
    padding: 25px 10px 7.5px;
    border-radius: 4px;
    color: #fff;
    font-weight: 500;
    font-size: 1em;
}

section .signin .content .form .inputBox i {
    position: absolute;
    left: 0;
    padding: 15px 10px;
    font-style: normal;
    color: #aaa;
    transition: 0.5s;
    pointer-events: none;
}

.signin .content .form .inputBox input:focus~i,
.signin .content .form .inputBox input:valid~i {
    transform: translateY(-7.5px);
    font-size: 0.8em;
    color: #fff;
}

.signin .content .form .links {
    position: relative;
    width: 100%;
    display: flex;
    justify-content: space-between;
}

.signin .content .form .links a {
    color: #fff;
    text-decoration: none;
}

.signin .content .form .links a:nth-child(2) {
    color: green;
    font-weight: 600;
}

.signin .content .form .inputBox input[type="submit"] {
    padding: 10px;
    background: green;
    color: #000;
    font-weight: 600;
    font-size: 1.35em;
    letter-spacing: 0.05em;
    cursor: pointer;
}

input[type="submit"]:active {
    opacity: 0.6;
}

select {
    position: relative;
    width: 100%;
    background: #333;
    border: none;
    outline: none;
    padding: 25px 10px 7.5px;
    border-radius: 4px;
    color: #fff;
    font-weight: 500;
    font-size: 1em;
}

</style>