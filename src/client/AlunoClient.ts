import axios, { AxiosInstance } from "axios";

import { Aluno } from "@/modal/aluno";

export class AlunoClient{
    private axiosAluno : AxiosInstance;

    constructor(){
        this.axiosAluno = axios.create({
            baseURL:'http://localhost:8080/api/aluno',
            headers:{'Content-Type':'application/json'}
        });
    }

    public async findById(id : number) : Promise<Aluno> {
        try {
            return (await this.axiosAluno.get<Aluno>(`/${id}`)).data
        } catch (error : any) {
            return Promise.reject(error.response)
        }
    }

    public async listAll() : Promise<Aluno[]> {
        try{
            return(await this.axiosAluno.get<Aluno[]>(`/lista`)).data;
        } catch(error :any){
            return Promise.reject(error.response);
        }
    }

    public async cadastrar(aluno : Aluno) : Promise<string> {
        try{
            return(await this.axiosAluno.post<string>(``, aluno)).data;
        } catch (error : any) {
            return Promise.reject(error.response);
        }
    }

    public async editar(id: number, aluno : Aluno) : Promise<string> {
        try {
            return(await this.axiosAluno.put<string>(`/${id}`, aluno)).data;
        } catch (error : any) {
            return Promise.reject(error.response);
        }
    }

    public async deletar(id : number) : Promise<string> {
        try {
            return (await this.axiosAluno.delete<string>(`/${id}`)).data;
        } catch (error : any) {
            return Promise.reject(error.response);
        }
    }
}
export default new AlunoClient;