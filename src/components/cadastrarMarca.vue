<template>
  <div class="modal">
    <div class="modal_content">
      <p>Nova marca</p>
      <form>
        <div class="input">
          <h2 for="nome">Nome de marca:</h2>
          <input
            type="text"
            id="nome"
            name="nome"
            v-model="marca.nome"
            placeholder="Informe nome da narca"
          />
        </div>
        <div class="btns">
          <button class="btn_cadastrar" type="button" @click="cadastrar()">
            Cadastrar
          </button>
          <button class="btn_fechar" @click="fecharModal">Fechar</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Marca } from "@/modal/marca";
import MarcaClient from "@/client/MarcaClient";

export default defineComponent({
  name: "modalCadastrarMarca",
  data() {
    return {
      marca: new Marca(),
      exibirModal: true,
    };
  },
  methods: {
    cadastrar() {
      MarcaClient.cadastrar(this.marca)
        .then((sucess) => {
          this.marca = new Marca();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    fecharModal() {
      this.$emit("fechar");
    },
  },
});
</script>