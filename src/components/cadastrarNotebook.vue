<template>
    <div id="modal">
      <div id="modal_content">
        <p>Novo notebook</p>
        <form>
            <div class="input">
                <h2>Id-patrimonio do notebook:</h2>
                <input type="text" v-model="notebook.patrimonio" placeholder="Informe nome do notebook">

                <div>
                    <h2>Selecione um modelo:</h2>
                    <select v-model="notebook.modelo">
                        <option>Selecione um modelo</option>
                        <option v-for="modelo in modelos" :key="modelo.id" :value="modelo">{{ modelo.nome }}</option>
                    </select>
                </div>
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
import NotebookClient from '@/client/NotebookClient';
import ModeloClient from '@/client/ModeloClient';
import { Notebook } from '@/modal/notebook';
import { Modelo } from '@/modal/modelo';
export default defineComponent({
  name: 'modalCadastrarNotebook',
  data() {
    return {
        notebook: new Notebook(),
        modelos: new Array<Modelo>(),
        modeloSelecionado: '',
        exibirModal: true
    };
  },
  mounted(){
    this.buscarModelos();
  },
  methods: {
    async buscarModelos() {
      try {
        this.modelos = await ModeloClient.listAll();
      } catch (error) {
        console.log(error);
      }
    },
    cadastrar() {
      NotebookClient.cadastrar(this.notebook)
        .then(success => {
          this.notebook = new Notebook();
        })
        .catch(error => {
          console.log(error);
        });
    },
    fecharModal() {
      this.$emit('fechar');
    }
  }
});
</script>