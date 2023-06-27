import { AbstractEntity } from "./abstract-entity";
import { Modelo } from "./modelo";
export class Notebook extends AbstractEntity{
    Id_patrimonio! : String
    modelo! : Modelo
    comentario! : String

    constructor(){
        super()
        this.ativo = true
    }
}