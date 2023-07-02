<template>
    <div id="modal">
      <div id="modal_content">
        <p>Novo período</p>
        <form>
            <div class="input">
                <h2>Nome do período:</h2>
                <input type="text" v-model="periodo.nome" placeholder="Informe nome do período">
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
import { Periodo } from '@/modal/periodo';
import PeriodoClient from '@/client/PeriodoClient';

export default defineComponent({
  name: 'modalCadastrarPeriodo',
  data() {
    return {
      periodo: new Periodo(),
      exibirModal: true
    };
  },
  methods: {
    cadastrar(){
      PeriodoClient.cadastrar(this.periodo).then(sucess =>{
        this.periodo = new Periodo();
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