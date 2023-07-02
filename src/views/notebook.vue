<template>
    <div id="body">
        <header>
            <div id="head">
                <div id="serch">
                    <img id="serch_icon" src="../img/search_icon.svg" alt="serch">
                    <input id="serch_input" type="search" placeholder="Pesquisar Id-patrimonio" v-model="termoPesquisa" @input="realizarPesquisa">
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
                            <td>{{ index + 1 }}</td>
                            <td>{{ notebook.patrimonio }}</td>
                            <td>{{ notebook.modelo.nome }}</td>
                            <td>{{ notebook.modelo.marca.nome }}</td>
                            <td>
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
            notebookOriginais: [] as Notebook[],
            termoPesquisa: ''
        };
    },
    methods: {
    async buscarNotebooks() {
      try {
            this.notebooks = await NotebookClient.listAll();
            this.notebookOriginais = [...this.notebooks];
        } 
        catch (error) {
            console.error('Erro ao buscar notebooks:', error);
        }
    },
    realizarPesquisa() {
            const termoPesquisa = this.termoPesquisa.toLowerCase();
            if (termoPesquisa === '') {
                this.notebooks = [...this.notebookOriginais];
            } else {
                this.notebooks = this.notebookOriginais.filter((notebook) => {
                    const patrimonio = notebook.patrimonio.toLowerCase();
                    return patrimonio.includes(termoPesquisa);
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