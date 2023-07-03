<template>
  <main class="main">
    <div>
      <h2>Nome do aluno:</h2>
      <select v-model="ticket.alunoId" disabled>
        <option>Selecione um aluno</option>
        <option v-for="aluno in alunos" :key="aluno.id" :value="aluno">
          {{ aluno.nome }}
        </option>
      </select>
    </div>

    <div>
      <h2>Id_patrimonio do notebook:</h2>
      <select v-model="ticket.notebookId" disabled>
        <option>Selecione um notebook</option>
        <option
          v-for="notebook in notebooks"
          :key="notebook.id"
          :value="notebook"
        >
          {{ notebook.patrimonio }}
        </option>
      </select>
    </div>
    <div>
      <h2>Data da entrega:</h2>
      <input type="text" v-model="ticket.dataEntrega" disabled />
    </div>
    <div>
      <h2>Data da devolução:</h2>
      <input
        type="datetime-local"
        v-model="dataDevolucaoString"
        @change="updateDataDevolucao"
      />
      <button
        class="btn_preencher"
        type="button"
        @click="preencherDataDevolucao"
      >
        Data atual
      </button>
    </div>
    <div class="btns">
      <button class="btn_editar" @click="onClickEditar()">Finalizar</button>
      <router-link to="/home">Voltar</router-link>
    </div>
  </main>
</template>
    
<script lang="ts">
import { defineComponent } from "vue";
import moment from "moment";
import NotebookClient from "@/client/NotebookClient";
import AlunoClient from "@/client/AlunoClient";
import TicketClient from "@/client/TicketClient";
import { Ticket } from "@/modal/ticket";
import { Aluno } from "@/modal/aluno";
import { Notebook } from "@/modal/notebook";

export default defineComponent({
  name: "acessarAluno",
  data() {
    return {
      ticket: new Ticket(),
      alunos: new Array<Aluno>(),
      notebooks: new Array<Notebook>(),
      dataEntregaString: "",
      dataDevolucaoString: "",
    };
  },
  computed: {
    id() {
      return this.$route.query.id;
    },
  },
  mounted() {
    if (this.id !== undefined) {
      this.findById(Number(this.id));
    }

    this.buscarAlunos();
    this.buscarNotebooks();
  },
  methods: {
    findById(id: number) {
      TicketClient.findById(id)
        .then((ticket) => {
          this.ticket = ticket;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    buscarAlunos() {
      AlunoClient.listAll()
        .then((sucess) => {
          this.alunos = sucess;
          console.log(sucess);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    buscarNotebooks() {
      NotebookClient.listAll()
        .then((sucess) => {
          this.notebooks = sucess;
          console.log(sucess);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    onClickEditar() {
      TicketClient.editar(this.ticket.id, this.ticket)
        .then((sucess) => {
          this.ticket = new Ticket();
          console.log(sucess);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    preencherDataEntrega() {
      const dataHoraAtual = moment().format("YYYY-MM-DDTHH:mm");
      this.dataEntregaString = dataHoraAtual;
      this.updateDataEntrega();
    },
    preencherDataDevolucao() {
      const dataHoraAtual = moment().format("YYYY-MM-DDTHH:mm");
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
:root {
  --accent-green: rgb(12, 141, 12);
  --accent-gray-escuro: #6d6d6d;
  --accent-grey: #ccc;
  --accent-wait: #fff;
  --accent-black: #000;
  --accent-red: rgb(255, 0, 0);
  --accent-yellow: rgb(255, 255, 0);
}
.main {
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  margin-top: 5rem;
  background-color: var(--accent-grey);
  padding: 2rem;
  border-radius: 1rem;
  gap: 1.5rem;

  div {
    select:focus {
      box-shadow: 0 0 0 0;
      outline: 0;
    }
    select {
      height: 2rem;
      border-color: var(--accent-green);
      border-width: 2px;
      font-size: 18px;
    }
  }
  input[type="text"],
  input[type="datetime-local"],
  select {
    height: 2rem;
    width: 15rem;
    border: 2px solid var(--accent-green);
    font-size: 18px;
    margin-top: 0.4rem;
  }
  input[type="text"],
  input[type="datetime-local"]:focus {
    box-shadow: 0 0 0 0;
    outline: 0;
  }
  .btn_preencher {
    padding: 0.5rem 0.8rem;
    border: none;
    background-color: var(--accent-green);
    color: var(--accent-wait);
    border-radius: 0.8rem;
    cursor: pointer;
    margin-left: 0.4rem;
  }

  .btns {
    display: flex;
    justify-content: space-evenly;
    .btn_editar,
    .btn_deletar {
      padding: 0.2rem 0.5rem;
      border: none;
      background-color: var(--accent-green);
      color: var(--accent-wait);
      border-radius: 0.8rem;
      cursor: pointer;
      font-size: 18px;
    }

    .btn_editar:hover {
      background-color: var(--accent-yellow);
      color: var(--accent-black);
      transition: 0.5s;
    }
    .btn_deletar:hover {
      background-color: var(--accent-red);
      transition: 0.5s;
    }
    a {
      padding: 0.5rem 1rem;
      border: none;
      background-color: var(--accent-green);
      color: var(--accent-wait);
      border-radius: 0.8rem;
      cursor: pointer;
    }
    a:hover {
      background-color: var(--accent-wait);
      color: var(--accent-black);
      transition: 0.5s;
    }
  }
}
</style>