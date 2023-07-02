<template>
    <div id="modal">
      <div id="modal_content">
        <p>Novo aluno</p>
        <form>
            <div class="input">
                <h2>Nome do aluno:</h2>
                <input type="text" v-model="aluno.nome" placeholder="Informe nome do aluno">

                <h2>Números de RA:</h2>
                <input type="text" v-model="aluno.ra" placeholder="Informe o RA">
                
                <h2>Números de RG:</h2>
                <input type="text" v-model="aluno.rg" placeholder="Informe o RG">
                <div>
                    <h2>Selecione um período:</h2>
                    <select v-model="aluno.periodo">
                        <option>Selecione um período</option>
                        <option v-for="periodo in periodos" :key="periodo.id" :value="periodo">{{ periodo.nome }}</option>
                    </select>
                </div>
                <div>
                    <h2>Selecione um curso:</h2>
                    <select v-model="aluno.curso">
                        <option>Selecione um curso</option>
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