<template>
  <div class="modal">
    <div class="modal_content">
      <div v-if="mensagem.ativo">
          <div class="mensagem">
            <strong>{{ mensagem.titulo }}</strong> {{ mensagem.mensagem }}
          </div>
      </div>
      <p>Novo modelo</p>
      <form>
        <div class="input">
          <h2>Nome do modelo:</h2>
          <input
            type="text"
            v-model="modelo.nome"
            placeholder="Informe nome do modelo"
          />
          <div>
            <h2>Selecione uma marca:</h2>
            <select v-model="modelo.marca">
              <option>Selecione um marca</option>
              <option v-for="marca in marcas" :key="marca.id" :value="marca">
                {{ marca.nome }}
              </option>
            </select>
          </div>
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
import ModeloClient from "@/client/ModeloClient";
import MarcaClient from "@/client/MarcaClient";
import { Modelo } from "@/modal/modelo";
import { Marca } from "@/modal/marca";
export default defineComponent({
  name: "modalCadastrarModelo",
  data() {
    return {
      modelo: new Modelo(),
      marcas: new Array<Marca>(),
      marcaSelecionado: "",
      exibirModal: true,
      mensagem: {
        ativo: false as boolean,
        titulo: "" as string,
        mensagem: "" as string,
        css: "" as string
      }
    };
  },
  mounted() {
    this.buscarMarca();
  },
  methods: {
    async buscarMarca() {
      try {
        this.marcas = await MarcaClient.listAll();
      } catch (error) {
        console.log(error);
      }
    },
    cadastrar() {
      ModeloClient.cadastrar(this.modelo)
        .then((success) => {
          this.modelo = new Modelo();

          this.mensagem.ativo = true;
          this.mensagem.titulo = "Modelo cadastrado com sucesso ";
        })
        .catch((error) => {
          console.log(error);

          this.mensagem.ativo = true;
          this.mensagem.titulo = "Erro, não foi possivel Cadastrar o Modelo ";
        });
    },
    fecharModal() {
      this.$emit("fechar");
    },
  },
});
</script>