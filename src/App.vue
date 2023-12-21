<template>
  <div>
    <nav>
      <router-link to="/">Courses</router-link> |
      <router-link to="/aboutView">About</router-link> 
    </nav>
    <router-view />
  </div>
</template>

<script>
import router from './router';

export default {
    name: 'App',
    components: { router }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
