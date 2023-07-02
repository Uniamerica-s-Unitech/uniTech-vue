<template>
    <div id="modal">
      <div id="modal_content">
        <p>Novo curso</p>
        <form>
            <div class="input">
                <h2>Nome do curso:</h2>
                <input type="text" v-model="curso.nome" placeholder="Informe nome do curso">
            </div>
            <div class="btns">
                <button class="btn_cadastrar" type="button" @click="cadastrar()">Cadastrar</button>
                <button class="btn_fechar" @click="fecharModal">Fechar</button>
            </div>
        </form>
      </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Curso } from '@/modal/curso';
import CursoClient from '@/client/CursoClient'

export default defineComponent({
  name: 'modalCadastrarCurso',
  data() {
    return {
      curso: new Curso(),
      exibirModal: true
    };
  },
  methods: {
    cadastrar(){
      CursoClient.cadastrar(this.curso).then(sucess =>{
        this.curso = new Curso();
      })
      .catch(error =>{
        console.log(error);
      })
    },
    fecharModal() {
      this.$emit('fechar');
    }
  }
});
</script>