<!--  APP.vue
      Author : 이승아  
      Updated : 2024-05-08  -->
<template>
  <TheHeader :navNm="navNm" />
  <h1>날씨에 따라</h1>
  <TheMain :list ="list"/>
  <TheFooter />
</template>

<script>

import TheHeader from './components/TheHeader.vue'
import TheMain from './routes/TheMain.vue'
import TheFooter from './components/TheFooter.vue'
import list from './list.js';

export default {
  name: 'App',
  components: {
    TheHeader,
    TheFooter,
    TheMain,
  },
  data(){
    return{
      navNm : ['날씨','api',],
      filePATH : '/path/to/save/file',
      list : list,
    }
  },
  methods : {
    // dateChange(e){
    //   this.list.base_date = e;
    // }
  },
}
</script>

<style>
@import "../src/assets/css/reset.css";

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  padding-top: 100px;
  background-color: rgb(214, 250, 242);
  position: relative;
  min-height: 100vh;
}
h1{
  font-weight: 700;
  font-size : 20px;
  padding : 20px;
}
</style>
