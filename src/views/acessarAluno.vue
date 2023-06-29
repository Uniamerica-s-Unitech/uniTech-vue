<template>
  <main class="main">
    <div>
      <h2>Nome:</h2>
      <input type="text" v-model="aluno.nome">
    </div>

    <div>
      <h2>RA:</h2>
      <input type="text" v-model="aluno.ra">
    </div>

    <div>
      <h2>RG:</h2>
      <input type="text" v-model="aluno.rg">
    </div>

    <div class="select">
      <h2>CURSO:</h2>
      <select type="text" :v-model="aluno.curso">
        <option v-for="item in cursos" :key="item.id" :value="item.nome">
          {{ item.nome }}
        </option>
      </select>
    </div>

    <div class="select">
      <h2>PERÍODO:</h2>
      <select type="text" :v-model="aluno.periodo">
        <option v-for="item in periodos" :key="item.id" :value="item.nome">
          {{ item.nome }}
        </option>
      </select>
    </div>
    <div class="btns">
      <button class="btn_editar" @click="onClickEditar()">
        Editar
      </button>
      <button class="btn_deletar" @click="onClickExcluir()">
        Excluir
      </button>
      <router-link to='/alunos' class="acessar">Voltar</router-link>
    </div>
  </main>
</template>
  
<script lang="ts">
import { defineComponent} from 'vue';

import { Aluno } from '@/modal/aluno';
import AlunoClient from '@/client/AlunoClient';

import { Curso } from '@/modal/curso';
import CursoClient from '@/client/CursoClient';

import { Periodo } from '@/modal/periodo';
import PeriodoClient from '@/client/PeriodoClient';

export default defineComponent({
  name: 'acessarAluno',
  data() {
    return {
      aluno: new Aluno(),
      cursos: new Array<Curso>(),
      periodos: new Array<Periodo>(),
    };
  },
  computed: {
    id(){
      return this.$route.query.id
    },
    form(){
      return this.$route.query.form
    }
  },
  mounted() {
  
  if(this.id !== undefined){
  this.findById(Number(this.id));
  }

  this.buscarPeriodos();
  this.buscarCursos();
  },
  methods: {
    findById(id: number) {
      AlunoClient.findById(id)
        .then((aluno) => {
          this.aluno = aluno;
        })
      .catch(error => {
        console.log(error);
      });
    },
    buscarPeriodos() {
      PeriodoClient.listAll().then(sucess =>{
        this.periodos = sucess;
        console.log(sucess);
      })
      .catch(error =>{
          console.log(error)

      })
    },
    buscarCursos() {
      CursoClient.listAll().then(sucess =>{
        this.cursos = sucess;
        console.log(sucess);
      })
      .catch(error =>{
          console.log(error)

      })
    },
    onClickEditar(){
      console.log("Antes do metodo");
      AlunoClient.editar(this.aluno.id, this.aluno)
      .then(sucess => {
        this.aluno = new Aluno()
        console.log(sucess);        
      })
      .catch(error => {
        console.log(error)
      });
    },
    onClickExcluir(){
      AlunoClient.deletar(this.aluno.id)
      .then(sucess =>{
        this.aluno = new Aluno();
      })
      .catch(error =>{
        console.log(error)
      })
    }
  }
});
</script>

<style lang="scss">
:root {
    --accent-green: rgb(12, 141, 12);
    --accent-grey: #ccc;
    --accent-wait: #fff;
    --accent-black: #000;
    --accent-red : rgb(255, 0, 0);
    --accent-yellow : rgb(255, 255, 0);
}
.main{
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  margin-top: 10rem;
  background-color: var(--accent-grey);
  padding: 2rem;
  border-radius: 1rem;
  gap: 1.5rem;

  div{
    select:focus{
      box-shadow: 0 0 0 0;
      outline: 0;
    }
    select{
      height: 2rem;
      border-color: var(--accent-green);
      border-width: 2px;
      font-size: 18px;
    }
  }
  input[type="text"]{
    height: 2rem;
    width: 15rem;
    border: 2px solid var(--accent-green);
    font-size: 18px;
    margin-top: .4rem;
  }

  .btns{
      display: flex;
      justify-content: space-evenly;
      .btn_editar , .btn_deletar{
        padding: .2rem .5rem;
        border: none;
        background-color: var(--accent-green);
        color: var(--accent-wait);
        border-radius: .8rem;
        cursor: pointer;
        font-size: 18px;
      }

      .btn_editar:hover{
        background-color: var(--accent-yellow);
        color: var(--accent-black);
        transition: .5s;
      }
      .btn_deletar:hover{
        background-color: var(--accent-red);
        transition: .5s;
      }
      a{
        padding: .5rem 1rem;
        border: none;
        background-color: var(--accent-green);
        color: var(--accent-wait);
        border-radius: .8rem;
        cursor: pointer;
      }
      a:hover{
        background-color: var(--accent-wait);
        color: var(--accent-black);
        transition: .5s;
      }
    }
}
</style>