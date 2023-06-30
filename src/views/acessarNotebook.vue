<template>
  <main class="main">
    <div>
      <h2>ID-PATRIMONIO:</h2>
      <input type="text" v-model="notebook.patrimonio">
    </div>

    <div class="select">
      <h2>MODELO:</h2>
      <select type="text" v-model="notebook.modelo">
        <option v-for="item in modelos" :key="item.id" :value="item">
          {{ item.nome }}
        </option>
      </select>
    </div>

    <div class="btns">
      <button class="btn_editar" @click="onClickEditar()">
        Editar
      </button>
      <button class="btn_deletar" @click="onClickExcluir()">
        Excluir
      </button>
      <router-link to='/notebook' class="acessar">Voltar</router-link>
    </div>
  </main>
</template>
  
<script lang="ts">
import { defineComponent} from 'vue';

import { Notebook } from '@/modal/notebook';
import NotebookClient from '@/client/NotebookClient';

import { Modelo } from '@/modal/modelo';
import ModeloClient from '@/client/ModeloClient';

import { Marca } from '@/modal/marca';
import MarcaClient from '@/client/MarcaClient';

export default defineComponent({
  name: 'acessarNotebook',
  data() {
    return {
      notebook: new Notebook(),
      modelos: new Array<Modelo>(),
      marcas: new Array<Marca>(),
    };
  },
  computed: {
    id(){
      return this.$route.query.id
    }
  },
  mounted() {
  
  if(this.id !== undefined){
  this.findById(Number(this.id));
  }

  this.buscarMarcas();
  this.buscarModelos();
  },
  methods: {
    findById(id: number) {
      NotebookClient.findById(id)
        .then((notebook) => {
          this.notebook = notebook;
        })
      .catch(error => {
        console.log(error);
      });
    },
    buscarMarcas() {
      MarcaClient.listAll().then(sucess =>{
        this.marcas = sucess;
        console.log(sucess);
      })
      .catch(error =>{
          console.log(error)

      })
    },
    buscarModelos() {
      ModeloClient.listAll().then(sucess =>{
        this.modelos = sucess;
        console.log(sucess);
      })
      .catch(error =>{
          console.log(error)

      })
    },
    onClickEditar(){
      console.log("Antes do metodo");
      NotebookClient.editar(this.notebook.id, this.notebook)
      .then(sucess => {
        this.notebook = new Notebook()
        console.log(sucess);        
      })
      .catch(error => {
        console.log(error)
      });
    },
    onClickExcluir(){
      NotebookClient.deletar(this.notebook.id)
      .then(sucess =>{
        this.notebook = new Notebook();
      })
      .catch(error =>{
        console.log(error)
      })
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
    --accent-yellow : rgb(255, 255, 0);
}
.main{
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  margin-top: 10rem;
  background-color: var(--accent-grey);
  padding: 2rem;
  border-radius: 1rem;
  gap: 1.5rem;

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
    margin-top: .4rem;
  }

  .btns{
      display: flex;
      justify-content: space-evenly;
      .btn_editar , .btn_deletar{
        padding: .2rem .5rem;
        border: none;
        background-color: var(--accent-green);
        color: var(--accent-wait);
        border-radius: .8rem;
        cursor: pointer;
        font-size: 18px;
      }

      .btn_editar:hover{
        background-color: var(--accent-yellow);
        color: var(--accent-black);
        transition: .5s;
      }
      .btn_deletar:hover{
        background-color: var(--accent-red);
        transition: .5s;
      }
      a{
        padding: .5rem 1rem;
        border: none;
        background-color: var(--accent-green);
        color: var(--accent-wait);
        border-radius: .8rem;
        cursor: pointer;
      }
      a:hover{
        background-color: var(--accent-wait);
        color: var(--accent-black);
        transition: .5s;
      }
    }
}
</style>