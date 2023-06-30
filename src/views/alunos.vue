<template>
    <div id="body">
        <header>
            <div id="head">
                <div id="serch">
                    <img id="serch_icon" src="../img/search_icon.svg" alt="serch">
                    <input id="serch_input" type="search" placeholder="Pesquisar aluno ou ra" v-model="termoPesquisa" @input="realizarPesquisa">
                </div>
                <div id="botais">
                    <div>
                        <button class="btn" @click="abrirAlunoModal">Adicionar Aluno</button>
                        <Modal v-if="modalAlunoAberto" @fechar="fecharAlunoModal">
                            <modalCadastrarAluno />
                        </Modal>
                    </div>
                    <div>
                        <button class="btn" @click="abrirCursoModal">Adicionar Curso</button>
                        <Modal v-if="modalCursoAberto" @fechar="fecharCursooModal">
                            <modalCadastrarCurso />
                        </Modal>
                    </div>
                    <div>
                        <button class="btn" @click="abrirPeriodoModal">Adicionar Período</button>
                        <Modal v-if="modalPeriodoAberto" @fechar="fecharPeriodoModal">
                            <modalCadastrarPeriodo />
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
                            <th>NOME</th>
                            <th>RA</th>
                            <th>RG</th>
                            <th>CURSO</th>
                            <th>PERÍODO</th>
                            <th>AÇÃO</th>
                        </tr>
                        <tr v-for="(aluno, index) in alunos" :key="aluno.id">
                            <td class="id">{{ index + 1 }}</td>
                            <td class="nome">{{ aluno.nome }}</td>
                            <td class="ra">{{ aluno.ra }}</td>
                            <td class="rg">{{ aluno.rg }}</td>
                            <td class="curso">{{ aluno.curso.nome }}</td>
                            <td class="periodo">{{ aluno.periodo.nome }}</td>
                            <td class="botao">
                                <router-link :to="{ path: '/acessarAluno', query: { id: aluno.id } }" class="acessar">Acessar</router-link>
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
import modalCadastrarPeriodo from '../components/cadastrarPeriodo.vue'
import modalCadastrarCurso from '../components/cadastrarCurso.vue'
import modalCadastrarAluno from '../components/cadastrarAluno.vue'
import { Aluno } from '@/modal/aluno';
import AlunoClient from '@/client/AlunoClient';
export default defineComponent({
    name: 'Alunos',
    components: {
        modalCadastrarPeriodo,
        modalCadastrarCurso,
        modalCadastrarAluno
    },
    data(){
        return{
            modalPeriodoAberto: ref(false),
            modalCursoAberto: ref(false),
            modalAlunoAberto: ref(false),
            alunos: [] as Aluno[],
            termoPesquisa: ''
        };
    },
    methods: {
    async buscarAlunos() {
      try {
            this.alunos = await AlunoClient.listAll();
        } 
        catch (error) {
            console.error('Erro ao buscar alunos:', error);
        }
    },
    realizarPesquisa() {
            const termoPesquisa = this.termoPesquisa.toLowerCase();
            if (termoPesquisa === '') {
                this.buscarAlunos(); // Restaura a lista original de alunos
            } else {
                this.alunos = this.alunos.filter(aluno => {
                    const nome = aluno.nome.toLowerCase();
                    const ra = aluno.ra.toLowerCase();
                    return nome.includes(termoPesquisa) || ra.includes(termoPesquisa);
                });
            }
        },
    },
    mounted() {
        this.buscarAlunos();
    },
    setup() {
    const modalPeriodoAberto = ref(false);
    const modalCursoAberto = ref(false);
    const modalAlunoAberto = ref(false);

    const abrirPeriodoModal = () => {
        modalPeriodoAberto.value = true;
    };

    const fecharPeriodoModal = () => {
        modalPeriodoAberto.value = false;
    };

    const abrirCursoModal = () => {
        modalCursoAberto.value = true;
    };

    const fecharCursooModal = () => {
        modalCursoAberto.value = false;
    };

    const abrirAlunoModal = () => {
        modalAlunoAberto.value = true;
    };

    const fecharAlunoModal = () => {
        modalAlunoAberto.value = false;
    };

    return {
        modalPeriodoAberto,
        modalCursoAberto,
        modalAlunoAberto,
        abrirPeriodoModal,
        fecharPeriodoModal,
        abrirCursoModal,
        fecharCursooModal,
        abrirAlunoModal,
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
            width: 65%;
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
            width: 37.5%;

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
            width: 10%;
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