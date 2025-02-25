<script setup>
import { ref } from 'vue';

const email = ref('')
const pwd = ref('')

const onLogin = () => {
  console.log(email.value, pwd.value)
  if (email.value === 'admin@email.com' && pwd.value === '1234') {
    alert('logueado')
  } else {
    alert('no logueado')
  }
}

</script>

<template>
  <h1>Login</h1>
  <form @submit.prevent="onLogin">
    <label for="email">Email:</label>
    <input type="email" name="email" id="email" v-model="email">
    <label for="pwd">Password:</label>
    <input type="password" name="pwd" id="pwd" v-model="pwd">
    <button>Login</button>
  </form>
</template>

<style scoped>
  form {
    display: flex;
    flex-direction: column;
  }
  button {
    width: 150px;
    margin: 20px auto;
  }
</style>
