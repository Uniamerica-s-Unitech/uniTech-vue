<template>
  <main class="main">
    <div v-if="mensagem.ativo">
          <div class="mensagem">
            <strong>{{ mensagem.titulo }}</strong> {{ mensagem.mensagem }}
          </div>
      </div>
    <div>
      <h2>Nome do aluno:</h2>
      <input type="text" v-model="aluno.nome" />
    </div>

    <div>
      <h2>RA:</h2>
      <input type="text" v-model="aluno.ra" />
    </div>

    <div>
      <h2>RG:</h2>
      <input type="text" v-model="aluno.rg" />
    </div>

    <div>
      <h2>CURSO:</h2>
      <select type="text" v-model="aluno.curso">
        <option v-for="item in cursos" :key="item.id" :value="item">
          {{ item.nome }}
        </option>
      </select>
    </div>

    <div>
      <h2>PERÍODO:</h2>
      <select type="text" v-model="aluno.periodo">
        <option v-for="item in periodos" :key="item.id" :value="item">
          {{ item.nome }}
        </option>
      </select>
    </div>
    <div class="btns">
      <button class="btn_editar" @click="onClickEditar()">Editar</button>
      <button class="btn_deletar" @click="onClickExcluir()">Excluir</button>
      <router-link to="/alunos">Voltar</router-link>
    </div>
  </main>
</template>
  
<script lang="ts">
import { defineComponent } from "vue";

import { Aluno } from "@/modal/aluno";
import AlunoClient from "@/client/AlunoClient";

import { Curso } from "@/modal/curso";
import CursoClient from "@/client/CursoClient";

import { Periodo } from "@/modal/periodo";
import PeriodoClient from "@/client/PeriodoClient";

export default defineComponent({
  name: "acessarAluno",
  data() {
    return {
      aluno: new Aluno(),
      cursos: new Array<Curso>(),
      periodos: new Array<Periodo>(),
        mensagem: {
        ativo: false as boolean,
        titulo: "" as string,
        mensagem: "" as string,
        css: "" as string
      }
    };
  },
  computed: {
    id() {
      return this.$route.query.id;
    },
  },
  mounted() {
    if (this.id !== undefined) {
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
        .catch((error) => {
          console.log(error);
        });
    },
    buscarPeriodos() {
      PeriodoClient.listAll()
        .then((sucess) => {
          this.periodos = sucess;
          console.log(sucess);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    buscarCursos() {
      CursoClient.listAll()
        .then((sucess) => {
          this.cursos = sucess;
          console.log(sucess);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    onClickEditar() {
      AlunoClient.editar(this.aluno.id, this.aluno)
        .then((sucess) => {
          this.aluno = new Aluno();
          console.log(sucess);

          this.mensagem.ativo = true;
          this.mensagem.titulo = "Aluno alterado com sucesso ";
        })
        .catch((error) => {
          console.log(error);

          this.mensagem.ativo = true;
          this.mensagem.titulo = "Erro, não foi possivel alterar o Aluno";
        });
    },
    onClickExcluir() {
      AlunoClient.deletar(this.aluno.id)
        .then((sucess) => {
          this.aluno = new Aluno();

          this.mensagem.titulo = "Aluno deletado com sucesso ";
        })
        .catch((error) => {
          console.log(error);

          this.mensagem.ativo = true;
          this.mensagem.titulo = "Erro, não foi possivel deleltar o Aluno";
        });
    },
  },
});
</script>