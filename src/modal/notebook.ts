import { AbstractEntity } from "./abstract-entity";
import { Modelo } from "./modelo";
export class Notebook extends AbstractEntity {
    patrimonio!: String
    modelo!: Modelo

    constructor() {
        super()
        this.ativo = true
    }
}