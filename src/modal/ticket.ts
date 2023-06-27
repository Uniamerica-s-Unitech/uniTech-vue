import { AbstractEntity } from "./abstract-entity";
import { Aluno } from "./aluno";
import { Notebook } from "./notebook";
export class Ticket extends AbstractEntity{
    ra! : Aluno
    id_patrimonio! : Notebook
    data_entrega! : Date
    data_devolucao! : Date
    comentario_devolusao! : String

    constructor(){
        super()
        this.ativo = true
    }
}