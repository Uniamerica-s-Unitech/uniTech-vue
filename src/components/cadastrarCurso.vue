<template>
  <div class="modal">
    <div class="modal_content">
      <div v-if="mensagem.ativo">
          <div class="mensagem">
            <strong>{{ mensagem.titulo }}</strong> {{ mensagem.mensagem }}
          </div>
      </div>
      <p>Novo curso</p>
      <form>
        <div class="input">
          <h2>Nome do curso:</h2>
          <input
            type="text"
            v-model="curso.nome"
            placeholder="Informe nome do curso"
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
import { Curso } from "@/modal/curso";
import CursoClient from "@/client/CursoClient";

export default defineComponent({
  name: "modalCadastrarCurso",
  data() {
    return {
      curso: new Curso(),
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
      CursoClient.cadastrar(this.curso)
        .then((sucess) => {
          this.curso = new Curso();

          this.mensagem.ativo = true;
          this.mensagem.titulo = "Curso cadastrado com sucesso";
        })
        .catch((error) => {
          console.log(error);

          this.mensagem.ativo = true;
          this.mensagem.titulo = "Erro, não foi possivel Cadastrar o Curso";
        });
    },
    fecharModal() {
      this.$emit("fechar");
    },
  },
});
</script>