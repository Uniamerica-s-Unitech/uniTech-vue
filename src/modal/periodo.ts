import { AbstractEntity } from "./abstract-entity";
export class Periodo extends AbstractEntity{
    nome! : String

    constructor(){
        super()
        this.ativo = true
    }
}