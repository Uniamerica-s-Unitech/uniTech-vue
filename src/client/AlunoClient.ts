import axios, { AxiosInstance } from "axios";

import { Aluno } from "@/modal/aluno";

export class AlunoClient{
    private axiosClient : AxiosInstance;

    constructor(){
        this.axiosClient = axios.create({
            baseURL:'http://localhost:8080/api/aluno',
            headers:{'Content-Type':'application/json'}
        });
    }

    public async listAll() : Promise<Aluno[]> {
        try{
            return(await this.axiosClient.get<Aluno[]>(`/lista`)).data;
        } catch(error :any){
            return Promise.reject(error.response);
        }
    }

    public async cadastrar(aluno : Aluno) : Promise<void> {
        try{
            return(await this.axiosClient.post('', aluno)).data;
        } catch (error : any) {
            return Promise.reject(error.response);
        }
    }

    public async editar(aluno : Aluno) : Promise<void> {
        try {
            return(await this.axiosClient.post(`/${aluno.id}`, aluno)).data;
        } catch (error : any) {
            return Promise.reject(error.response);
        }
    }

    public async deletar(aluno : Aluno) : Promise<string> {
        try {
            return (await this.axiosClient.delete(`/${aluno.id}`)).data;
        } catch (error : any) {
            return Promise.reject(error.response);
        }
    }
}
export default new AlunoClient;