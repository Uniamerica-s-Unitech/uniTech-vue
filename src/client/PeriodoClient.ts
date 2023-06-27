import axios, { AxiosInstance } from "axios";

import { Periodo } from "@/modal/periodo";

export class PeriodoClient{
    private axiosClient : AxiosInstance;

    constructor(){
        this.axiosClient = axios.create({
            baseURL:'http://localhost:8080/api/periodo',
            headers:{'Content-Type':'application/json'}
        });
    }

    public async listAll() : Promise<Periodo[]> {
        try{
            return(await this.axiosClient.get<Periodo[]>(`/lista`)).data;
        } catch(error :any){
            return Promise.reject(error.response);
        }
    }

    public async cadastrar(periodo : Periodo) : Promise<void> {
        try{
            return(await this.axiosClient.post('', periodo)).data;
        } catch (error : any) {
            return Promise.reject(error.response);
        }
    }

    public async editar(periodo : Periodo) : Promise<void> {
        try {
            return(await this.axiosClient.post(`/${periodo.id}`, periodo)).data;
        } catch (error : any) {
            return Promise.reject(error.response);
        }
    }

    public async deletar(periodo : Periodo) : Promise<string> {
        try {
            return (await this.axiosClient.delete(`/${periodo.id}`)).data;
        } catch (error : any) {
            return Promise.reject(error.response);
        }
    }
}
export default new PeriodoClient;