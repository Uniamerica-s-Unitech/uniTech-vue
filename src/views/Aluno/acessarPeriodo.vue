<template>
  <main class="main">
    <div v-if="mensagem.ativo">
          <div class="mensagem">
            <strong>{{ mensagem.titulo }}</strong> {{ mensagem.mensagem }}
          </div>
      </div>
    <div>
      <h2>Nome do periodo:</h2>
      <input type="text" v-model="periodo.nome" />
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
import { Periodo } from "@/modal/periodo";
import PeriodoClient from "@/client/PeriodoClient";
export default defineComponent({
  name: "acessarPeriodo",
  data() {
    return {
      periodo: new Periodo(),
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
  },
  methods: {
    findById(id: number) {
      PeriodoClient.findById(id)
        .then((periodo) => {
          this.periodo = periodo;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    onClickEditar() {
      PeriodoClient.editar(this.periodo.id, this.periodo)
        .then((sucess) => {
          this.periodo = new Periodo();
          console.log(sucess);

          this.mensagem.ativo = true;
          this.mensagem.titulo = "Periodo alterado com sucesso ";
        })
        .catch((error) => {
          console.log(error);

          this.mensagem.ativo = true;
          this.mensagem.titulo = "Erro, não foi possivel alterar o Periodo";
        });
    },
    onClickExcluir() {
      PeriodoClient.deletar(this.periodo.id)
        .then((sucess) => {
          this.periodo = new Periodo();

          this.mensagem.ativo = true;
          this.mensagem.titulo = "Periodo deletado com sucesso ";
        })
        .catch((error) => {
          console.log(error);

          this.mensagem.ativo = true;
          this.mensagem.titulo = "Erro, não foi possivel deletar o Periodo";
        });
    },
  },
});
</script>