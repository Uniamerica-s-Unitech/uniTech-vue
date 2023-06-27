import { AbstractEntity } from "./abstract-entity";
export class Curso extends AbstractEntity{
    nome! : String

    constructor(){
        super()
        this.ativo = true
    }
}