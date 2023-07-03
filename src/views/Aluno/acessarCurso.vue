<template>
  <main class="main">
    <div>
      <h2>Nome:</h2>
      <input type="text" v-model="curso.nome" />
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
import { Curso } from "@/modal/curso";
import CursoClient from "@/client/CursoClient";
export default defineComponent({
  name: "acessarCurso",
  data() {
    return {
      curso: new Curso(),
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
  },
  methods: {
    findById(id: number) {
      CursoClient.findById(id)
        .then((curso) => {
          this.curso = curso;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    onClickEditar() {
      CursoClient.editar(this.curso.id, this.curso)
        .then((sucess) => {
          this.curso = new Curso();
          console.log(sucess);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    onClickExcluir() {
      CursoClient.deletar(this.curso.id)
        .then((sucess) => {
          this.curso = new Curso();
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
});
</script>