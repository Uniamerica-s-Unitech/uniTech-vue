import axios, { AxiosInstance } from "axios";

import { Curso } from "@/modal/curso";

export class CursoClient{
    private axiosClient : AxiosInstance;

    constructor(){
        this.axiosClient = axios.create({
            baseURL:'http://localhost:8080/api/curso',
            headers:{'Content-Type':'application/json'}
        });
    }

    public async listAll() : Promise<Curso[]> {
        try{
            return(await this.axiosClient.get<Curso[]>(`/lista`)).data;
        } catch(error :any){
            return Promise.reject(error.response);
        }
    }

    public async cadastrar(curso : Curso) : Promise<void> {
        try{
            return(await this.axiosClient.post('', curso)).data;
        } catch (error : any) {
            return Promise.reject(error.response);
        }
    }

    public async editar(curso : Curso) : Promise<void> {
        try {
            return(await this.axiosClient.post(`/${curso.id}`, curso)).data;
        } catch (error : any) {
            return Promise.reject(error.response);
        }
    }

    public async deletar(curso : Curso) : Promise<string> {
        try {
            return (await this.axiosClient.delete(`/${curso.id}`)).data;
        } catch (error : any) {
            return Promise.reject(error.response);
        }
    }
}
export default new CursoClient;