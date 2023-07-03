import axios, { AxiosInstance } from "axios";

import { Notebook } from "@/modal/notebook";

export class NotebookClient {
    private axiosNotebook: AxiosInstance;

    constructor() {
        this.axiosNotebook = axios.create({
            baseURL: 'http://localhost:8080/api/notebook',
            headers: { 'Content-Type': 'application/json' }
        });
    }

    public async findById(id: number): Promise<Notebook> {
        try {
            return (await this.axiosNotebook.get<Notebook>(`/${id}`)).data
        } catch (error: any) {
            return Promise.reject(error.response)
        }
    }

    public async listAll(): Promise<Notebook[]> {
        try {
            return (await this.axiosNotebook.get<Notebook[]>(`/lista`)).data;
        } catch (error: any) {
            return Promise.reject(error.response);
        }
    }

    public async cadastrar(notebook: Notebook): Promise<string> {
        try {
            return (await this.axiosNotebook.post<string>(``, notebook)).data;
        } catch (error: any) {
            return Promise.reject(error.response);
        }
    }

    public async editar(id: number, notebook: Notebook): Promise<string> {
        try {
            return (await this.axiosNotebook.put<string>(`/${id}`, notebook)).data;
        } catch (error: any) {
            return Promise.reject(error.response);
        }
    }

    public async deletar(id: number): Promise<string> {
        try {
            return (await this.axiosNotebook.delete<string>(`/${id}`)).data;
        } catch (error: any) {
            return Promise.reject(error.response);
        }
    }
}
export default new NotebookClient;