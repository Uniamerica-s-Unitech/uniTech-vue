<template>
  <main class="main">
    <div>
      <h2>ID-PATRIMONIO:</h2>
      <input type="text" v-model="notebook.patrimonio" />
    </div>

    <div>
      <h2>MODELO:</h2>
      <select type="text" v-model="notebook.modelo">
        <option v-for="item in modelos" :key="item.id" :value="item">
          {{ item.nome }}
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

import { Notebook } from "@/modal/notebook";
import NotebookClient from "@/client/NotebookClient";

import { Modelo } from "@/modal/modelo";
import ModeloClient from "@/client/ModeloClient";

import { Marca } from "@/modal/marca";
import MarcaClient from "@/client/MarcaClient";

export default defineComponent({
  name: "acessarNotebook",
  data() {
    return {
      notebook: new Notebook(),
      modelos: new Array<Modelo>(),
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
    this.buscarModelos();
  },
  methods: {
    findById(id: number) {
      NotebookClient.findById(id)
        .then((notebook) => {
          this.notebook = notebook;
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
    buscarModelos() {
      ModeloClient.listAll()
        .then((sucess) => {
          this.modelos = sucess;
          console.log(sucess);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    onClickEditar() {
      console.log("Antes do metodo");
      NotebookClient.editar(this.notebook.id, this.notebook)
        .then((sucess) => {
          this.notebook = new Notebook();
          console.log(sucess);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    onClickExcluir() {
      NotebookClient.deletar(this.notebook.id)
        .then((sucess) => {
          this.notebook = new Notebook();
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
});
</script>