<template>
  <div class="app">
    <navbar 
  :logo="logo_src" :alt="logo_name"
  :home_icon="home_src" :alt_home="home_name"
  :alunos_icon="alunos_src" :alt_alunos="alunos_name"
  :notebook_icon="notebook_src" :alt_notebook="notebook_name"
  />
  <router-view/>
  </div>
</template>

<script lang="ts">
import navbar from './components/navbar.vue'
export default({
  components:{
    navbar
  },
  data(){
    return{
      logo_src:"/img/logo-unitech.svg",
      logo_name:"logo",
      home_src:"/img/home.svg",
      home_name:"icon home",
      alunos_src:"/img/alunos.svg",
      alunos_name:"icon alunos",
      notebook_src:"/img/notebooks.svg",
      notebook_name:"icon notebook"
    }
  }
})
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Lexend+Deca:wght@300;400;500;600;700;800;900&display=swap');
:root {
    --accent-green: rgb(12, 141, 12);
    --accent-grey: rgb(185, 185, 185);
}
*{
  margin: 0px;
  padding: 0px;
  font-family: 'Lexend Deca', sans-serif;
}
.app{
  display: flex;
  width: 100%;
}
</style>