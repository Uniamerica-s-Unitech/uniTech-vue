<template>
  <div class="modal">
    <div class="modal_content">
      <p>Editar</p>
      <form>
        <div class="nav_editar">
          <div class="alinhar">
            <button class="btn_listar" @click.prevent="mostrarCursos">
              Cursos
            </button>
            <button class="btn_listar" @click.prevent="mostrarPeriodos">
              Periodos
            </button>
          </div>
        </div>

        <hr />
        <main class="main_editar">
          <div v-if="mostrarListaCursos" class="quadro_tabela_lista">
            <div class="scroll">
              <table>
                <tr>
                  <th>#</th>
                  <th>NOME</th>
                  <th>AÇÃO</th>
                </tr>
                <tr v-for="(curso, index) in cursos" :key="curso.id">
                  <td>{{ index + 1 }}</td>
                  <td>{{ curso.nome }}</td>
                  <td>
                    <router-link
                      :to="{ path: '/acessarCurso', query: { id: curso.id } }"
                      class="acessar"
                      >Acessar</router-link
                    >
                  </td>
                </tr>
              </table>
            </div>
          </div>
          <div v-if="mostrarListaPeriodos" class="quadro_tabela_lista">
            <div class="scroll">
              <table>
                <tr>
                  <th>#</th>
                  <th>NOME</th>
                  <th>AÇÃO</th>
                </tr>
                <tr v-for="(periodo, index) in periodos" :key="periodo.id">
                  <td>{{ index + 1 }}</td>
                  <td>{{ periodo.nome }}</td>
                  <td>
                    <router-link
                      :to="{
                        path: '/acessarPeriodo',
                        query: { id: periodo.id },
                      }"
                      class="acessar"
                      >Acessar</router-link
                    >
                  </td>
                </tr>
              </table>
            </div>
          </div>
        </main>
        <div class="div_fechar">
          <button class="btn_fechar" @click="fecharModal">Fechar</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Periodo } from "@/modal/periodo";
import { Curso } from "@/modal/curso";
import PeriodoClient from "@/client/PeriodoClient";
import CursoClient from "@/client/CursoClient";
export default defineComponent({
  name: "EditarCursosPeriodos",
  data() {
    return {
      curso: new Curso(),
      periodo: new Periodo(),
      cursos: new Array<Curso>(),
      periodos: new Array<Periodo>(),
      mostrarListaCursos: true,
      mostrarListaPeriodos: false,
    };
  },
  computed: {
    id() {
      return this.$route.query.id;
    },
  },
  mounted() {
    if (this.id !== undefined) {
      this.findByIdCurso(Number(this.id));
    }

    if (this.id !== undefined) {
      this.findByIdPeriodo(Number(this.id));
    }

    this.buscarPeriodos();
    this.buscarCursos();
  },
  methods: {
    findByIdCurso(id: number) {
      CursoClient.findById(id)
        .then((curso) => {
          this.curso = curso;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    findByIdPeriodo(id: number) {
      PeriodoClient.findById(id)
        .then((periodo) => {
          this.periodo = periodo;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    buscarPeriodos() {
      PeriodoClient.listAll()
        .then((sucess) => {
          this.periodos = sucess;
          console.log(sucess);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    buscarCursos() {
      CursoClient.listAll()
        .then((sucess) => {
          this.cursos = sucess;
          console.log(sucess);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    mostrarCursos() {
      this.mostrarListaCursos = true;
      this.mostrarListaPeriodos = false;
    },
    mostrarPeriodos() {
      this.mostrarListaCursos = false;
      this.mostrarListaPeriodos = true;
    },
    onClickEditarCurso() {
      CursoClient.editar(this.curso.id, this.curso)
        .then((sucess) => {
          this.curso = new Curso();
          console.log(sucess);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    onClickExcluirCurso() {
      CursoClient.deletar(this.curso.id)
        .then((sucess) => {
          this.curso = new Curso();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    onClickEditarPeriodo() {
      PeriodoClient.editar(this.periodo.id, this.periodo)
        .then((sucess) => {
          this.periodo = new Periodo();
          console.log(sucess);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    onClickExcluirPeriodo() {
      PeriodoClient.deletar(this.periodo.id)
        .then((sucess) => {
          this.periodo = new Periodo();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    fecharModal() {
      this.$emit("fechar");
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
.modal_content {
  padding-bottom: 0;
  form {
    .nav_editar {
      display: flex;
      width: 100%;
      margin: 0rem 10rem;
      .alinhar {
        display: flex;
        width: 100%;
        .btn_listar {
          width: 100%;
          height: 100%;
          padding: 0.5rem 1rem;
          border: none;
          font-size: 18px;
          cursor: pointer;
        }
        .btn_listar:focus {
          background-color: var(--accent-green);
          color: var(--accent-wait);
        }
      }
    }
  }
  .div_fechar {
    display: flex;
    justify-content: center;
    margin: 1rem 0;
    .btn_fechar {
      padding: 0.5rem 1rem;
      border: none;
      background-color: var(--accent-green);
      color: var(--accent-wait);
      border-radius: 0.8rem;
      cursor: pointer;
    }
    .btn_fechar:hover {
      background-color: var(--accent-red);
      transition: 0.5s;
    }
  }
}
main.main_editar {
  width: 100%;
  .quadro_tabela_lista {
    background-color: var(--accent-grey);
    width: 100%;
    border-radius: 0 0 2rem 2rem;
    margin: 0 auto;
    padding: 1.5rem 0;
  }
}
</style>