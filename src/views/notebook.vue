<template>
    <div id="body">
        <header>
            <div id="head">
                <div id="serch">
                    <img id="serch_icon" src="../img/search_icon.svg" alt="serch">
                    <input id="serch_input" type="search" placeholder="Pesquisar aluno...." v-model="termoPesquisa" @input="realizarPesquisa">
                </div>
                <div id="botais">
                    <div>
                        <button class="btn" @click="abrirNotebookModal">Adicionar Notebook</button>
                        <Modal v-if="modalNotebookAberto" @fechar="fecharAlunoModal">
                            <modalCadastrarNotebook />
                        </Modal>
                    </div>
                    <div>
                        <button class="btn" @click="abrirModeloModal">Adicionar Modelo</button>
                        <Modal v-if="modalModeloAberto" @fechar="fecharCursooModal">
                            <modalCadastrarModelo />
                        </Modal>
                    </div>
                    <div>
                        <button class="btn" @click="abrirMarcaModal">Adicionar Marca</button>
                        <Modal v-if="modalMarcaAberto" @fechar="fecharPeriodoModal">
                            <modalCadastrarMarca />
                        </Modal>
                    </div>
                </div>
            </div>
            <hr>
        </header>

        <h1>Alunos</h1>

        <main>
            <div class="quadro_tabela">
                <div class="scroll">
                    <table>
                        <tr>
                            <th>#</th>
                            <th>Id-patrimonio</th>
                            <th>Modelo</th>
                            <th>MARCA</th>
                            <th>AÇÃO</th>
                        </tr>
                        <tr v-for="(notebook, index) in notebooks" :key="notebook.id">
                            <td class="id">{{ index + 1 }}</td>
                            <td class="idPatrimonio">{{ notebook.patrimonio }}</td>
                            <td class="modelo">{{ notebook.modelo.nome }}</td>
                            <td class="marca">{{ notebook.modelo.marca.nome }}</td>
                            <td class="botao">
                                <router-link :to="{ path: '/acessarNotebook', query: { id: notebook.id } }" class="acessar">Acessar</router-link>
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
import modalCadastrarMarca from '../components/cadastrarMarca.vue'
import modalCadastrarModelo from '../components/cadastrarModelo.vue'
import modalCadastrarNotebook from '../components/cadastrarNotebook.vue'
import { Notebook } from '@/modal/notebook';
import NotebookClient from '@/client/NotebookClient';
export default defineComponent({
    name: 'notebook',
    components: {
        modalCadastrarMarca,
        modalCadastrarModelo,
        modalCadastrarNotebook
    },
    data(){
        return{
            modalMarcaAberto: ref(false),
            modalModeloAberto: ref(false),
            modalNotebookAberto: ref(false),
            notebooks: [] as Notebook[],
            termoPesquisa: ''
        };
    },
    methods: {
    async buscarNotebooks() {
      try {
            this.notebooks = await NotebookClient.listAll();
        } 
        catch (error) {
            console.error('Erro ao buscar notebooks:', error);
        }
    },
    realizarPesquisa() {
            const termoPesquisa = this.termoPesquisa.toLowerCase();
            if (termoPesquisa === '') {
                this.buscarNotebooks(); // Restaura a lista original de alunos
            } else {
                this.notebooks = this.notebooks.filter(notebook => {
                    const idPatrimonio = notebook.patrimonio.toLowerCase();
                    return idPatrimonio.includes(termoPesquisa)
                });
            }
        },
    },
    mounted() {
        this.buscarNotebooks();
    },
    setup() {
    const modalMarcaAberto = ref(false);
    const modalModeloAberto = ref(false);
    const modalNotebookAberto = ref(false);

    const abrirMarcaModal = () => {
        modalMarcaAberto.value = true;
    };

    const fecharPeriodoModal = () => {
        modalMarcaAberto.value = false;
    };

    const abrirModeloModal = () => {
        modalModeloAberto.value = true;
    };

    const fecharCursooModal = () => {
        modalModeloAberto.value = false;
    };

    const abrirNotebookModal = () => {
        modalNotebookAberto.value = true;
    };

    const fecharAlunoModal = () => {
        modalNotebookAberto.value = false;
    };

    return {
        modalMarcaAberto,
        modalModeloAberto,
        modalNotebookAberto,
        abrirMarcaModal,
        fecharPeriodoModal,
        abrirModeloModal,
        fecharCursooModal,
        abrirNotebookModal,
        fecharAlunoModal
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
        #serch{
            display: flex;
            align-items: center;
            width: 60%;
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
        #botais{
            display: flex;
            align-items: center;
            flex-direction: row-reverse;
            gap: 1rem;
            margin-right: 1rem;
            width: 40%;

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
        td.idPatrimonio{
            width: 20%;
            word-wrap: break-word;
        }
        td.modelo{
            width: 10%;
        }
        td.marca{
            width: 10%;
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