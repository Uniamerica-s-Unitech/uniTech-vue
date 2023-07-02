<template>
    <div id="modal">
      <div id="modal_content">
        <p>Novo entrega</p>
        <form>
          <div class="input">
            <div>
              <h2>Selecione um aluno:</h2>
              <select v-model="ticket.ra">
                <option>Selecione um aluno</option>
                <option v-for="aluno in alunos" :key="aluno.id" :value="aluno">{{ aluno.nome }}</option>
              </select>
            </div>
            <div>
              <h2>Selecione um notebook:</h2>
              <select v-model="ticket.patrimonio">
                <option>Selecione um notebook</option>
                <option v-for="notebook in notebooks" :key="notebook.id" :value="notebook">{{ notebook.patrimonio }}</option>
              </select>
            </div>
            <div class="data">
                <h2>Data da entrega:</h2>
                <input type="datetime-local" v-model="dataEntregaString" @change="updateDataEntrega">
                <button class="btn_preencher" type="button" @click="preencherDataEntrega">Data atual</button>
            </div> 
            <div class="data">
                <h2>Data da devolução:</h2>
                <input type="datetime-local" v-model="dataDevolucaoString" @change="updateDataDevolucao">
                <button class="btn_preencher" type="button" @click="preencherDataDevolucao">Data atual</button>
            </div> 
        </div>
  
          <div class="btns">
            <button class="btn_cadastrar" type="button" @click="cadastrar">Cadastrar</button>
            <button class="btn_fechar" @click="fecharModal">Fechar</button>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  import moment from 'moment';
  import NotebookClient from '@/client/NotebookClient';
  import AlunoClient from '@/client/AlunoClient';
  import TicketClient from '@/client/TicketClient';
  import { Ticket } from '@/modal/ticket';
  import { Aluno } from '@/modal/aluno';
  import { Notebook } from '@/modal/notebook';
  
  export default defineComponent({
    name: 'modalCadastrarAluno',
    data() {
      return {
        ticket: new Ticket(),
        alunos: [] as Aluno[],
        alunoSelecionado: '',
        notebooks: [] as Notebook[],
        notebookSelecionado: '',
        exibirModal: true,
        dataEntregaString: '',
        dataDevolucaoString: '',
      };
    },
    mounted() {
      this.buscarAlunos();
      this.buscarNotebooks();
    },
    methods: {
      async buscarAlunos() {
        try {
          this.alunos = await AlunoClient.listAll();
        } catch (error) {
          console.log(error);
        }
      },
      async buscarNotebooks() {
        try {
          this.notebooks = await NotebookClient.listAll();
        } catch (error) {
          console.log(error);
        }
      },
      cadastrar() {
        TicketClient.cadastrar(this.ticket)
          .then((success) => {
            this.ticket = new Ticket();
          })
          .catch((error) => {
            console.log(error);
          });
      },
      fecharModal() {
        this.$emit('fechar');
      },
      preencherDataEntrega() {
        const dataHoraAtual = moment().format('YYYY-MM-DDTHH:mm');
        this.dataEntregaString = dataHoraAtual;
        this.updateDataEntrega();
      },
      preencherDataDevolucao() {
        const dataHoraAtual = moment().format('YYYY-MM-DDTHH:mm');
        this.dataDevolucaoString = dataHoraAtual;
        this.updateDataDevolucao();
      },
      updateDataEntrega() {
        this.ticket.dataEntrega = new Date(this.dataEntregaString);
      },
      updateDataDevolucao() {
        this.ticket.dataDevolucao = new Date(this.dataDevolucaoString);
      },
    },
  });
  </script>
  

<style lang="scss">
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
      input[type="text"], input[type="datetime-local"]:focus{
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
      input[type="text"], input[type="datetime-local"]{
        height: 2rem;
        width: 15rem;
        border: 2px solid var(--accent-green);
        font-size: 18px;
      }
      .btn_preencher{
        padding: .5rem .8rem;
        border: none;
        background-color: var(--accent-green);
        color: var(--accent-wait);
        border-radius: .8rem;
        cursor: pointer;
        margin-left: .4rem;
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