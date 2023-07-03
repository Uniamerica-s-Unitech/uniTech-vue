<template>
  <main class="main">
    <div>
      <h2>Nome:</h2>
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
        })
        .catch((error) => {
          console.log(error);
        });
    },
    onClickExcluir() {
      PeriodoClient.deletar(this.periodo.id)
        .then((sucess) => {
          this.periodo = new Periodo();
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
});
</script>