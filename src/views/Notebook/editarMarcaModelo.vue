<template>
  <div class="modal">
    <div class="modal_content">
      <p>Editar</p>
      <form>
        <div class="nav_editar">
          <div class="alinhar">
            <button class="btn_listar" @click.prevent="mostrarMarcas">
              Marcas
            </button>
            <button class="btn_listar" @click.prevent="mostrarModelos">
              Modelos
            </button>
          </div>
        </div>
        <hr />
        <main class="main_editar">
          <div v-if="mostrarListaMarcas" class="quadro_tabela_lista">
            <div class="scroll">
              <table>
                <tr>
                  <th>#</th>
                  <th>NOME</th>
                  <th>AÇÃO</th>
                </tr>
                <tr v-for="(marca, index) in marcas" :key="marca.id">
                  <td>{{ index + 1 }}</td>
                  <td>{{ marca.nome }}</td>
                  <td>
                    <router-link
                      :to="{ path: '/acessarMarca', query: { id: marca.id } }"
                      class="acessar"
                      >Acessar</router-link
                    >
                  </td>
                </tr>
              </table>
            </div>
          </div>
          <div v-if="mostrarListaModelos" class="quadro_tabela_lista">
            <div class="scroll">
              <table>
                <tr>
                  <th>#</th>
                  <th>NOME</th>
                  <th>AÇÃO</th>
                </tr>
                <tr v-for="(modelo, index) in modelos" :key="modelo.id">
                  <td>{{ index + 1 }}</td>
                  <td>{{ modelo.nome }}</td>
                  <td>
                    <router-link
                      :to="{ path: '/acessarModelo', query: { id: modelo.id } }"
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
import { Modelo } from "@/modal/modelo";
import { Marca } from "@/modal/marca";
import ModeloClient from "@/client/ModeloClient";
import MarcaClient from "@/client/MarcaClient";
export default defineComponent({
  name: "EditarMarcasModelos",
  data() {
    return {
      marca: new Marca(),
      modelo: new Modelo(),
      marcas: new Array<Marca>(),
      modelos: new Array<Modelo>(),
      mostrarListaMarcas: true,
      mostrarListaModelos: false,
    };
  },
  computed: {
    id() {
      return this.$route.query.id;
    },
  },
  mounted() {
    if (this.id !== undefined) {
      this.findByIdMarcas(Number(this.id));
    }

    if (this.id !== undefined) {
      this.findByIdModelos(Number(this.id));
    }

    this.buscarModelos();
    this.buscarMarcas();
  },
  methods: {
    findByIdMarcas(id: number) {
      MarcaClient.findById(id)
        .then((marca) => {
          this.marca = marca;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    findByIdModelos(id: number) {
      ModeloClient.findById(id)
        .then((modelo) => {
          this.modelo = modelo;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    buscarModelos() {
      ModeloClient.listAll()
        .then((sucess) => {
          this.modelos = sucess;
          console.log(sucess);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    buscarMarcas() {
      MarcaClient.listAll()
        .then((sucess) => {
          this.marcas = sucess;
          console.log(sucess);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    mostrarMarcas() {
      this.mostrarListaMarcas = true;
      this.mostrarListaModelos = false;
    },
    mostrarModelos() {
      this.mostrarListaMarcas = false;
      this.mostrarListaModelos = true;
    },
    onClickEditarMarca() {
      MarcaClient.editar(this.marca.id, this.marca)
        .then((sucess) => {
          this.marca = new Marca();
          console.log(sucess);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    onClickExcluirCurso() {
      MarcaClient.deletar(this.marca.id)
        .then((sucess) => {
          this.marca = new Marca();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    onClickEditarModelo() {
      ModeloClient.editar(this.modelo.id, this.modelo)
        .then((sucess) => {
          this.modelo = new Modelo();
          console.log(sucess);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    onClickExcluirPeriodo() {
      ModeloClient.deletar(this.modelo.id)
        .then((sucess) => {
          this.modelo = new Modelo();
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