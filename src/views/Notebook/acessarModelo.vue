<template>
  <main class="main">
    <div>
      <h2>Nome do modelo:</h2>
      <input type="text" v-model="modelo.nome" />
    </div>
    <div>
      <h2>Marca:</h2>
      <select v-model="modelo.marca">
        <option>Selecione um marca</option>
        <option v-for="marca in marcas" :key="marca.id" :value="marca">
          {{ marca.nome }}
        </option>
      </select>
    </div>
    <div class="btns">
      <button class="btn_editar" @click="onClickEditar()">Editar</button>
      <button class="btn_deletar" @click="onClickExcluir()">Excluir</button>
      <router-link to="/notebook">Voltar</router-link>
    </div>
  </main>
</template>
    
<script lang="ts">
import { defineComponent } from "vue";
import { Modelo } from "@/modal/modelo";
import ModeloClient from "@/client/ModeloClient";
import { Marca } from "@/modal/marca";
import MarcaClient from "@/client/MarcaClient";
export default defineComponent({
  name: "acessarPeriodo",
  data() {
    return {
      modelo: new Modelo(),
      marcas: new Array<Marca>(),
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
    this.buscarMarcas();
  },
  methods: {
    findById(id: number) {
      ModeloClient.findById(id)
        .then((modelo) => {
          this.modelo = modelo;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    buscarMarcas() {
      MarcaClient.listAll()
        .then((sucess) => {
          this.marcas = sucess;
          console.log(sucess);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    onClickEditar() {
      ModeloClient.editar(this.modelo.id, this.modelo)
        .then((sucess) => {
          this.modelo = new Modelo();
          console.log(sucess);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    onClickExcluir() {
      ModeloClient.deletar(this.modelo.id)
        .then((sucess) => {
          this.modelo = new Modelo();
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
});
</script>