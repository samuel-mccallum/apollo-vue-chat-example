<template>
  <div id="app">
    <template v-if="loggedIn">
      <Chat />
    </template>
    <template v-else>
      <Login />
    </template>
  </div>
</template>

<script>
//import HelloWorld from './components/HelloWorld.vue'
import Chat from './components/ApolloChat.vue';
import Login from './components/Login.vue';
import { mapState } from 'vuex';

export default {
  name: 'app',
  components: {
    Chat,
    Login
  },
  computed: mapState({
    loggedIn: state => state.user.id
  })
};
</script>

<style lang="scss">
body {
  margin:0;
  padding: 0;
}

#app {
  /*font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  //text-align: center;
  color: #2c3e50;
  //margin-top: 60px;
  display: flex;
  position:absolute;*/
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: space-between;
}
</style>
