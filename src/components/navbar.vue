<template>
    <nav>
        <div>
        <img :src="logo" :alt="alt">
        <section>
            <a><router-link to="/home"><img :src="home_icon" :alt="alt_home">Home</router-link></a>
            <a><router-link to="/alunos"><img :src="alunos_icon" :alt="alt_alunos">Alunos</router-link></a>
            <a><router-link to="/notebook"><img :src="notebook_icon" :alt="alt_notebook">Notebook</router-link></a>
        </section>
        </div>
    </nav>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
    name: "navbar",
    props:["logo","alt","home_icon","alunos_icon","notebook_icon","alt_home","alt_alunos","alt_notebook"]
})
</script>

<style lang="scss">
nav{
  display: flex;
  justify-content: center;
  background-color: #fff;
  box-shadow: inset -14px 0px 29px -16px rgba(184,184,184,1);
  height: 100vh;
  width: 18%;

  div{
    display: flex;
    flex-direction: column;
    gap: 5rem;
    margin-top: 5rem;
    section{
      a{
        display: flex;
        text-decoration: none;
        justify-content: flex-start;
        padding: 0.5rem 1rem;
        align-items: center;
        color: black;
        transition: .5ms;
        img{
          width: 2rem;
          height: 2rem;
          margin-right: 1rem;
        }
      }
      a.router-link-active.router-link-exact-active{
            background-color: var(--accent-green);
            color: #fff;
            width: 100%;
            height: 100%;
            text-decoration: none;
            border-radius: 0.8rem
        }
      }
    }
  }
</style>
