import axios, { AxiosInstance } from "axios";

import { Modelo } from "@/modal/modelo";

export class ModeloClient{
    private axiosModelo : AxiosInstance;

    constructor(){
        this.axiosModelo = axios.create({
            baseURL:'http://localhost:8080/api/modelo',
            headers:{'Content-Type':'application/json'}
        });
    }

    public async findById(id : number) : Promise<Modelo> {
        try {
            return (await this.axiosModelo.get<Modelo>(`/${id}`)).data
        } catch (error : any) {
            return Promise.reject(error.response)
        }
    }

    public async listAll() : Promise<Modelo[]> {
        try{
            return(await this.axiosModelo.get<Modelo[]>(`/lista`)).data;
        } catch(error :any){
            return Promise.reject(error.response);
        }
    }

    public async cadastrar(modelo : Modelo) : Promise<string> {
        try{
            return(await this.axiosModelo.post<string>(``, modelo)).data;
        } catch (error : any) {
            return Promise.reject(error.response);
        }
    }

    public async editar(id: number , modelo : Modelo) : Promise<string> {
        try {
            return(await this.axiosModelo.put<string>(`/${id}`, modelo)).data;
        } catch (error : any) {
            return Promise.reject(error.response);
        }
    }

    public async deletar(id: number) : Promise<string> {
        try {
            return (await this.axiosModelo.delete<string>(`/${id}`)).data;
        } catch (error : any) {
            return Promise.reject(error.response);
        }
    }
}
export default new ModeloClient;