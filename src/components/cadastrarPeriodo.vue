<template>
  <div class="modal">
    <div class="modal_content">
      <div v-if="mensagem.ativo">
          <div class="mensagem">
            <strong>{{ mensagem.titulo }}</strong> {{ mensagem.mensagem }}
          </div>
      </div>
      <p>Novo período</p>
      <form>
        <div class="input">
          <h2>Nome do período:</h2>
          <input
            type="text"
            v-model="periodo.nome"
            placeholder="Informe nome do período"
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
import { Periodo } from "@/modal/periodo";
import PeriodoClient from "@/client/PeriodoClient";

export default defineComponent({
  name: "modalCadastrarPeriodo",
  data() {
    return {
      periodo: new Periodo(),
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
      PeriodoClient.cadastrar(this.periodo)
        .then((sucess) => {
          this.periodo = new Periodo();

          this.mensagem.ativo = true;
          this.mensagem.titulo = "Periodo cadastrado com sucesso ";
        })
        .catch((error) => {
          console.log(error);

          this.mensagem.ativo = true;
          this.mensagem.titulo = "Erro, não foi possivel Cadastrar o Periodo ";
        });
    },
    fecharModal() {
      this.$emit("fechar");
    },
  },
});
</script>