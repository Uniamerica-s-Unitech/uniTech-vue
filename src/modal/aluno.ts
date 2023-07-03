import { AbstractEntity } from "./abstract-entity";
import { Curso } from "./curso";
import { Periodo } from "./periodo";
export class Aluno extends AbstractEntity {
    nome!: String
    ra!: String
    rg!: String
    curso!: Curso
    periodo!: Periodo
}