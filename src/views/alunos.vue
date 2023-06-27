<template>
    <div id="body">
        <header>
            <div id="head">
                <div id="serch">
                    <img id="serch_icon" src="../img/search_icon.svg" alt="serch">
                    <input id="serch_input" type="search" placeholder="Pesquisar aluno....">
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
                            <th>ID</th>
                            <th>NOME</th>
                            <th>RG</th>
                            <th>CURSO</th>
                            <th>PERÍODO</th>
                            <th>RA</th>
                            <th>AÇÃO</th>
                        </tr>

                        <tr>
                            <td>1</td>
                            <td>Homam Alsuyoufi</td>
                            <td>f3588117</td>
                            <td>Eng.sofwaer</td>
                            <td>2 semestre</td>
                            <td>405512</td>
                            <td><button>Acessar</button></td>
                        </tr>
                    </table>
                </div>
            </div>
        </main>
    </div>
</template>

<script lang="ts">
import { defineComponent,ref } from 'vue';
import modalCadastrarPeriodo from '../components/cadastrarPeriodo.vue'
import modalCadastrarCurso from '../components/cadastrarCurso.vue'
import modalCadastrarAluno from '../components/cadastrarAluno.vue'
export default({
    components: {
        modalCadastrarPeriodo,
        modalCadastrarCurso,
        modalCadastrarAluno
    },
    data(){
        return{
            modalPeriodoAberto: ref(false),
            modalCursoAberto: ref(false),
            modalAlunoAberto: ref(false)
        };
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
        padding: 1rem;
        margin: 0 auto;
        width: 95%;
        border-spacing: 0;
    
        td{
            height: 3rem;
            text-align: center;
            font-size: 18px;
        }
        th{
            font-size: 20px;
            padding-bottom: 2rem;
        }
        tr{
            td{
                button{
                    background-color: var(--accent-green);
                    padding: 0.5rem 1rem;
                    border: none;
                    border-radius: 1rem;
                    color: var(--accent-wait);
                    cursor: pointer;
                }
                button:hover{
                    background-color: var(--accent-wait);
                    color: var(--accent-black);
                    transition: .5s;
                }
            }
        }
    }
}
</style>