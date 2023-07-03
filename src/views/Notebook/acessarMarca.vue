<template>
  <main class="main">
    <div>
      <h2>Nome:</h2>
      <input type="text" v-model="marca.nome" />
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
import { Marca } from "@/modal/marca";
import MarcaClient from "@/client/MarcaClient";
export default defineComponent({
  name: "acessarMarca",
  data() {
    return {
      marca: new Marca(),
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
      MarcaClient.findById(id)
        .then((marca) => {
          this.marca = marca;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    onClickEditar() {
      MarcaClient.editar(this.marca.id, this.marca)
        .then((sucess) => {
          this.marca = new Marca();
          console.log(sucess);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    onClickExcluir() {
      MarcaClient.deletar(this.marca.id)
        .then((sucess) => {
          this.marca = new Marca();
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
});
</script>