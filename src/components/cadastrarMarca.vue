<template>
  <div class="modal">
    <div class="modal_content">
      <div v-if="mensagem.ativo">
          <div class="mensagem">
            <strong>{{ mensagem.titulo }}</strong> {{ mensagem.mensagem }}
          </div>
      </div>
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
      mensagem: {
        ativo: false as boolean,
        titulo: "" as string,
        mensagem: "" as string,
        css: "" as string
      }
    };
  },
  methods: {
    cadastrar() {
      MarcaClient.cadastrar(this.marca)
        .then((sucess) => {
          this.marca = new Marca();

          this.mensagem.ativo = true;
          this.mensagem.titulo = "Marca cadastrada com sucesso ";
        })
        .catch((error) => {
          console.log(error);

          this.mensagem.ativo = true;
          this.mensagem.titulo = "Erro, não foi possivel Cadastrar a Marca ";
        });
    },
    fecharModal() {
      this.$emit("fechar");
    },
  },
});
</script>