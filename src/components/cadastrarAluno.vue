<template>
    <div id="modal">
      <div id="modal_content">
        <p>Aluno</p>
        <form>
            <div class="input">
                <label for="nome">Nome do aluno:</label>
                <input type="text" id="nome" name="nome" v-model="aluno.nome" placeholder="Informe nome do aluno">

                <label for="nome">Números de RA:</label>
                <input type="text" id="ra" name="nome" v-model="aluno.ra" placeholder="Informe o RA">
                
                <label for="nome">Números de RG:</label>
                <input type="text" id="rg" name="nome" v-model="aluno.rg" placeholder="Informe o RG">
                <div>
                    <label for="periodo">Selecione um período:</label>
                    <select id="periodo" v-model="aluno.periodo">
                        <option value="">Selecione um período</option>
                        <option v-for="periodo in periodos" :key="periodo.id" :value="periodo">{{ periodo.nome }}</option>
                    </select>
                </div>
                <div>
                    <label for="curso">Selecione um curso:</label>
                    <select id="curso" v-model="aluno.curso">
                        <option value="">Selecione um curso</option>
                        <option v-for="curso in cursos" :key="curso.id" :value="curso">{{ curso.nome }}</option>
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
import PeriodoClient from '@/client/PeriodoClient';
import CursoClient from '@/client/CursoClient';
import AlunoClient from '@/client/AlunoClient';
import { Aluno } from '@/modal/aluno';
import { Periodo } from '@/modal/periodo';
import { Curso } from '@/modal/curso';
export default defineComponent({
  name: 'modalCadastrarAluno',
  data() {
    return {
        aluno: new Aluno(),
        periodos: new Array<Periodo>(),
        periodoSelecionado: '',
        cursos: new Array<Curso>(),
        cursoSelecionado: '',
        exibirModal: true
    };
  },
  mounted(){
    this.buscarPeriodos();
    this.buscarCursos();
  },
  methods: {
    async buscarPeriodos() {
      try {
        this.periodos = await PeriodoClient.listAll();
      } catch (error) {
        console.log(error);
      }
    },
    async buscarCursos() {
      try {
        this.cursos = await CursoClient.listAll();
      } catch (error) {
        console.log(error);
      }
     },
    cadastrar() {
      AlunoClient.cadastrar(this.aluno)
        .then(success => {
          this.aluno = new Aluno();
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
      label{
        font-size: 20px;
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
      .btn_cadastrar{
        padding: .5rem 1rem;
        border: none;
        background-color: var(--accent-green);
        color: var(--accent-wait);
        border-radius: .8rem;
        cursor: pointer;
      }
      .btn_fechar{
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