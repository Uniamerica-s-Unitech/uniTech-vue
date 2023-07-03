import axios, { AxiosInstance } from "axios";

import { Curso } from "@/modal/curso";

export class CursoClient {
    private axiosCurso: AxiosInstance;

    constructor() {
        this.axiosCurso = axios.create({
            baseURL: 'http://localhost:8080/api/curso',
            headers: { 'Content-Type': 'application/json' }
        });
    }

    public async findById(id: number): Promise<Curso> {
        try {
            return (await this.axiosCurso.get<Curso>(`/${id}`)).data
        } catch (error: any) {
            return Promise.reject(error.response)
        }
    }

    public async listAll(): Promise<Curso[]> {
        try {
            return (await this.axiosCurso.get<Curso[]>(`/lista`)).data;
        } catch (error: any) {
            return Promise.reject(error.response);
        }
    }

    public async cadastrar(curso: Curso): Promise<string> {
        try {
            return (await this.axiosCurso.post<string>(``, curso)).data;
        } catch (error: any) {
            return Promise.reject(error.response);
        }
    }

    public async editar(id: number, curso: Curso): Promise<string> {
        try {
            return (await this.axiosCurso.put<string>(`/${id}`, curso)).data;
        } catch (error: any) {
            return Promise.reject(error.response);
        }
    }

    public async deletar(id: number): Promise<string> {
        try {
            return (await this.axiosCurso.delete<string>(`/${id}`)).data;
        } catch (error: any) {
            return Promise.reject(error.response);
        }
    }
}
export default new CursoClient;