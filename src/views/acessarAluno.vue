<template>
  <main>
    <div class="nome col">
      <label class=" row m-auto col-form-label">Nome:</label>
      <input type="text" class="form-control" v-model="aluno.nome">
    </div>

    <div class="nome col">
      <label class=" row m-auto col-form-label">RA:</label>
      <input type="text" class="form-control" v-model="aluno.ra">
    </div>

    <div class="nome col">
      <label class=" row m-auto col-form-label">RG:</label>
      <input type="text"  class="form-control" v-model="aluno.rg">
    </div>

    <div class="nome col">
      <label>CURSO:</label>
      <select type="text" class="row ms-1" v-model="aluno.curso">
        <option v-for="item in cursos" :value="item">
          {{ item.nome }}
        </option>
      </select>
    </div>

    <div class="nome col">
      <label>PERÍODO:</label>
      <select type="text" class="row ms-1" v-model="aluno.periodo">
        <option v-for="item in periodos" :value="item">
          {{ item.nome }}
        </option>
      </select>
    </div>

    <button @click="onClickEditar()">
      Editar
    </button>
    <button  @click="onClickExcluir()">
      Excluir
    </button>

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