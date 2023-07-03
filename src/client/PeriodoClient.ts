import axios, { AxiosInstance } from "axios";

import { Periodo } from "@/modal/periodo";

export class PeriodoClient {
    private axiosPeriodo: AxiosInstance;

    constructor() {
        this.axiosPeriodo = axios.create({
            baseURL: 'http://localhost:8080/api/periodo',
            headers: { 'Content-Type': 'application/json' }
        });
    }

    public async findById(id: number): Promise<Periodo> {
        try {
            return (await this.axiosPeriodo.get<Periodo>(`/${id}`)).data
        } catch (error: any) {
            return Promise.reject(error.response)
        }
    }

    public async listAll(): Promise<Periodo[]> {
        try {
            return (await this.axiosPeriodo.get<Periodo[]>(`/lista`)).data;
        } catch (error: any) {
            return Promise.reject(error.response);
        }
    }

    public async cadastrar(periodo: Periodo): Promise<string> {
        try {
            return (await this.axiosPeriodo.post<string>(``, periodo)).data;
        } catch (error: any) {
            return Promise.reject(error.response);
        }
    }

    public async editar(id: number, periodo: Periodo): Promise<string> {
        try {
            return (await this.axiosPeriodo.put<string>(`/${id}`, periodo)).data;
        } catch (error: any) {
            return Promise.reject(error.response);
        }
    }

    public async deletar(id: number): Promise<string> {
        try {
            return (await this.axiosPeriodo.delete<string>(`/${id}`)).data;
        } catch (error: any) {
            return Promise.reject(error.response);
        }
    }
}
export default new PeriodoClient;