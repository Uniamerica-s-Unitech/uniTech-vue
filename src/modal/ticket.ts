import { AbstractEntity } from "./abstract-entity";
import { Aluno } from "./aluno";
import { Notebook } from "./notebook";
export class Ticket extends AbstractEntity{
    ra! : Aluno
    patrimonio! : Notebook
    dataEntrega! : Date
    dataDevolucao! : Date

    constructor(){
        super()
        this.ativo = true
    }
}