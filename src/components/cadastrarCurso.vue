<template>
    <div id="modal">
      <div id="modal_content">
        <p>Curso</p>
        <form>
            <div class="input">
                <label for="nome">Nome do curso:</label>
                <input type="text" id="nome" name="nome" v-model="curso.nome" placeholder="Informe nome do curso">
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
import { Curso } from '@/modal/curso';
import CursoClient from '@/client/CursoClient'

export default defineComponent({
  name: 'modalCadastrarCurso',
  data() {
    return {
      curso: new Curso(),
      exibirModal: true
    };
  },
  methods: {
    cadastrar(){
      CursoClient.cadastrar(this.curso).then(sucess =>{
        this.curso = new Curso();
      })
      .catch(error =>{
        console.log(error);
      })
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