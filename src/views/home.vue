<template>
    <div id="body">
        <header>
            <div id="head">
                <div id="serch_home">
                    <img id="serch_icon" src="../img/search_icon.svg" alt="serch">
                    <input id="serch_input" type="search" placeholder="Pesquisar aluno ou ra ou id-patrimonio" v-model="termoPesquisa" @input="realizarPesquisa">
                </div>
                <div id="botais_home">
                    <div>
                        <button class="btn" @click="abrirTicketModal">Nova entrega</button>
                        <Modal v-if="modalTicketAberto" @fechar="fecharTicketModal">
                            <modalCadastrarTicket />
                        </Modal>
                    </div>
                </div>
            </div>
            <hr>
        </header>

        <h1>Tickets</h1>

        <main>
            <div class="quadro_tabela">
                <div class="scroll">
                    <table>
                        <tr>
                            <th>#</th>
                            <th>NOME</th>
                            <th>RA</th>
                            <th>CURSO</th>
                            <th>ID_PATRIMONIO</th>
                            <th>DATA DE ENTREGA</th>
                            <th>AÇÃO</th>
                        </tr>
                        <tr v-for="(ticket, index) in tickets" :key="ticket.id">
                            <td>{{ index + 1 }}</td>
                            <td>{{ ticket.ra.nome }}</td>
                            <td>{{ ticket.ra.ra }}</td>
                            <td>{{ ticket.ra.curso.nome }}</td>
                            <td>{{ ticket.patrimonio.patrimonio }}</td>
                            <td>{{ ticket.dataEntrega }}</td>
                            <td>
                                <router-link :to="{ path: '/acessarTicket', query: { id: ticket.id } }" class="acessar">Acessar</router-link>
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
        </main>
    </div>
</template>

<script lang="ts">
import { defineComponent,ref} from 'vue';
import modalCadastrarTicket from '@/components/cadastrarTicket.vue'
import { Ticket } from '@/modal/ticket';
import TicketClient from '@/client/TicketClient';
export default defineComponent({
    name: 'Ticket',
    components: {
        modalCadastrarTicket
    },
    data(){
        return{
            modalTicketAberto: ref(false),
            tickets: [] as Ticket[],
            TicketOriginais: [] as Ticket[],
            termoPesquisa: ''
        };
    },
    methods: {
    async buscarTicket() {
      try {
            this.tickets = await TicketClient.listaAberta();
            this.TicketOriginais = [...this.tickets];
        } 
        catch (error) {
            console.error('Erro ao buscar alunos:', error);
        }
    },
    realizarPesquisa() {
        const termoPesquisa = this.termoPesquisa.toLowerCase();
      if (termoPesquisa === '') {
        this.tickets = [...this.TicketOriginais];
      } else {
        this.tickets = this.TicketOriginais.filter((ticket) => {
          const nome = ticket.ra.nome.toLowerCase();
          const ra = ticket.ra.ra.toLowerCase();
          const patrimonio = ticket.patrimonio.patrimonio.toLowerCase();
          return nome.includes(termoPesquisa) || ra.includes(termoPesquisa) || patrimonio.includes(termoPesquisa);
        });
      }
        },
    },
    mounted() {
        this.buscarTicket();
    },
    setup() {
    const modalTicketAberto = ref(false);

    const abrirTicketModal = () => {
        modalTicketAberto.value = true;
    };

    const fecharTicketModal = () => {
        modalTicketAberto.value = false;
    };

    return {
        modalTicketAberto,
        abrirTicketModal,
        fecharTicketModal
    };
  }
})
</script>

<style lang="scss">
:root {
    --accent-green: rgb(12, 141, 12);
    --accent-grey: rgb(185, 185, 185);
    --accent-wait: #fff;
    --accent-black: #000;
}
#body{
    display: flex;
    flex-direction: column;
    width: 82%;
}

header{
    margin-bottom: 2rem;
    #head{
        display: flex;
        padding: 1rem;
        #serch_home{
            display: flex;
            align-items: center;
            width: 90%;
            gap: 0.7rem;

            #serch_icon{
                width: 2rem;
                height: 2rem;
            }
            #serch_input{
               width: 100%; 
               height: 100%;
               border: none;
               outline: 0;
               font-size: 25px;
               
               
            }
        }
        #botais_home{
            display: flex;
            align-items: center;
            flex-direction: row-reverse;
            gap: 1rem;
            margin-right: 1rem;
            width: 10%;

            .btn{
                padding: 0.5rem;
                border-radius: 1rem;
                border: none;
                background-color: var(--accent-green);
                color: var(--accent-wait);
                font-size: 15px;
                box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
                cursor: pointer;
            }

            .btn:hover{
                background-color: var(--accent-grey);
                color: var(--accent-black);
                transition: .5s;
            }
        }
        
    }
    
    hr{
        border: 1px solid var(--accent-green);        
    }
}
h1{
    margin: 0 0 3rem 3rem;
    font-size: 35px;
}


main{
    height: 100%;
    
    .quadro_tabela{
        background-color: var(--accent-grey);
        width: 95%;
        border-radius: 3rem ;
        margin: 0 auto;
        padding: 1.5rem 0;
    }
    .scroll{
        overflow: auto;
        height: 60vh;
        flex-grow: 1;
        background-color: var(--accent-grey);
        width: 99%;
        margin: 0 auto;
    }
    /* width */
    ::-webkit-scrollbar {
        width: 10px;
    
    }

    /* Track */
    ::-webkit-scrollbar-track {
        background: #f1f1f1; 
        border-radius: 2rem;
    
    }
    
    /* Handle */
    ::-webkit-scrollbar-thumb {
        background: var(--accent-green); 
        border-radius: 2rem;
    }

    /* Handle on hover */
    ::-webkit-scrollbar-thumb:hover {
        background: #555; 
    }

    table{
        padding: 2rem;
        margin: 0 auto;
        width: 100%;
        border-spacing: 0;
    
        td{
            height: 4rem;
            text-align: center;
            font-size: 18px;
        }
        tr{
            width: 100%;
        }
        td.id{
            width: 1%;
        }
        td.nome{
            width: 20%;
            word-wrap: break-word;
        }
        td.rg{
            width: 15%;
        }
        td.ra{
            width: 10%;
        }
        td.curso{
            width: 20%;
        }
        td.periodo{
            width: 20%;
        }
        td.botao{
            width: 19%;
        }
        th{
            font-size: 20px;
            padding-bottom: 2rem;
        }
        .acessar{
            background-color: var(--accent-green);
            padding: 0.5rem 1rem;
            border: none;
            border-radius: 1rem;
            color: var(--accent-wait);
            cursor: pointer;
            a{
                text-decoration: none;
            }
        }
        .acessar:hover{
            background-color: var(--accent-wait);
            color: var(--accent-black);
            transition: .5s;
        }
    }
    a{
        text-decoration: none;
    }
}
</style>