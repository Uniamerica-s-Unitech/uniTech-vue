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

<style lang="scss">
:root {
    --accent-green: rgb(12, 141, 12);
    --accent-grey: #ccc;
    --accent-wait: #fff;
    --accent-black: #000;
    --accent-red : rgb(255, 0, 0);
}
#modal{
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}
#modal_content{
  background-color: #fff;
  padding: 2rem;
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  p{
    font-size: 35px;
    margin-bottom: 2rem;
  }
  form{
    display: flex;
    flex-direction: column;

    .input{
      display: flex;
      flex-direction: column;
      gap: .5rem;
      margin-bottom: 2rem;
      input[type="text"]:focus{
        box-shadow: 0 0 0 0;
        outline: 0;
      }
      div{
        select:focus{
          box-shadow: 0 0 0 0;
          outline: 0;
        }
        select{
          height: 2rem;
          border-color: var(--accent-green);
          border-width: 2px;
          font-size: 18px;
        }
      }
      input[type="text"]{
        height: 2rem;
        width: 15rem;
        border: 2px solid var(--accent-green);
        font-size: 18px;
      }
      
    }

    .btns{
      display: flex;
      justify-content: space-evenly;
      .btn_cadastrar , .btn_fechar{
        padding: .5rem 1rem;
        border: none;
        background-color: var(--accent-green);
        color: var(--accent-wait);
        border-radius: .8rem;
        cursor: pointer;
      }

      .btn_cadastrar:hover{
        background-color: var(--accent-grey);
        color: var(--accent-black);
        transition: .5s;
      }
      .btn_fechar:hover{
        background-color: var(--accent-red);
        transition: .5s;
      }
    }
  }
}
</style>